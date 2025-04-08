
import React from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PriceCalculator from "@/components/PriceCalculator";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <PriceCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
