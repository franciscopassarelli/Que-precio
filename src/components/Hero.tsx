
import React from 'react';
import { ArrowDown, Coins, DollarSign, PiggyBank, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById('calculadora');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  Calcula tus precios con precisión y profesionalismo
                </span>
              </h1>
              <p className="mt-4 text-xl text-gray-400">
                Optimiza tus ganancias y define estrategias de precio perfectas para tu negocio con nuestra calculadora avanzada.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={scrollToCalculator} className="text-lg px-6 py-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-opacity font-bold text-black">
                Calcular ahora
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="text-lg px-6 py-6 border-white/10 hover:bg-white/5">
                Conocer más
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">Maximiza ganancias</span>
              </div>
              <div className="flex items-center space-x-2">
                <Coins className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">Incluye impuestos</span>
              </div>
              <div className="flex items-center space-x-2">
                <PiggyBank className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">Calcula descuentos</span>
              </div>
            </div>
          </div>
          
          <div className="glass rounded-3xl p-8 animate-pulse-slow hidden lg:block">
            <div className="aspect-square rounded-2xl bg-gradient-radial from-secondary/30 to-background flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-gradient-to-br from-secondary to-secondary/30 rounded-full flex items-center justify-center mx-auto group-hover:animate-spin-slow">
                  <DollarSign className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Que precio le pongo</h2>
                <p className="text-gray-400 max-w-xs mx-auto">
                  Tu aliado para calcular precios óptimos y maximizar tus ganancias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
