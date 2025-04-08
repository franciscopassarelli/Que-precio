
import React from 'react';
import { DollarSign, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="#" className="flex items-center space-x-2 group">
                <div className="bg-gradient-to-br from-secondary to-card p-1.5 rounded-full group-hover:animate-spin-slow duration-700">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">Que precio le pongo</span>
              </a>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#inicio" className="text-gray-300 hover:text-white transition-colors duration-200">Inicio</a>
              <a href="#calculadora" className="text-gray-300 hover:text-white transition-colors duration-200">Calculadora</a>
              <a href="#nosotros" className="text-gray-300 hover:text-white transition-colors duration-200">Nosotros</a>
              <a href="#contacto" className="text-gray-300 hover:text-white transition-colors duration-200">Contacto</a>
            </div>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card/90 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#inicio" className="block px-3 py-2 text-base font-medium text-white hover:bg-secondary/50 rounded-md">Inicio</a>
            <a href="#calculadora" className="block px-3 py-2 text-base font-medium text-white hover:bg-secondary/50 rounded-md">Calculadora</a>
            <a href="#nosotros" className="block px-3 py-2 text-base font-medium text-white hover:bg-secondary/50 rounded-md">Nosotros</a>
            <a href="#contacto" className="block px-3 py-2 text-base font-medium text-white hover:bg-secondary/50 rounded-md">Contacto</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
