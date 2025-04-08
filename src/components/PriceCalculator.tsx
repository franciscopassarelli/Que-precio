
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Minus, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Slider } from "@/components/ui/slider";
import { DollarSign } from 'lucide-react';

interface TaxOrDiscount {
  id: string;
  type: string;
  value: number;
  amount: number;
}

const PriceCalculator = () => {
  const [product, setProduct] = useState('');
  const [cost, setCost] = useState('');
  const [margin, setMargin] = useState<number>(30);
  const [taxesAndDiscounts, setTaxesAndDiscounts] = useState<TaxOrDiscount[]>([
    { id: '1', type: 'IVA (21%)', value: 21, amount: 0 }
  ]);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [basePrice, setBasePrice] = useState<number | null>(null);

  const taxOptions = [
    'IVA (21%)', 
    'IVA (10%)', 
    'IRPF (15%)', 
    'Descuento',
    'Comisión',
    'Impuesto local',
    'Gastos de envío'
  ];

  useEffect(() => {
    calculateAmounts();
  }, [cost, margin, taxesAndDiscounts]);

  const calculateAmounts = () => {
    if (!cost) {
      setTaxesAndDiscounts(prevState => 
        prevState.map(item => ({ ...item, amount: 0 }))
      );
      return;
    }

    const costValue = parseFloat(cost);
    
    if (isNaN(costValue)) return;
    
    // Calcular precio base con margen
    const priceWithMargin = costValue * (1 + margin / 100);
    setBasePrice(priceWithMargin);
    
    // Actualizar los montos de impuestos/descuentos
    const updatedItems = taxesAndDiscounts.map(item => {
      const amount = priceWithMargin * (item.value / 100);
      return { ...item, amount };
    });
    
    setTaxesAndDiscounts(updatedItems);
  };

  const addTaxOrDiscount = () => {
    if (taxesAndDiscounts.length >= 5) {
      toast({
        title: "Límite alcanzado",
        description: "No se pueden agregar más de 5 impuestos o descuentos",
        variant: "destructive"
      });
      return;
    }
    
    const newId = (taxesAndDiscounts.length + 1).toString();
    setTaxesAndDiscounts([
      ...taxesAndDiscounts,
      { id: newId, type: 'IVA (21%)', value: 21, amount: 0 }
    ]);
  };

  const removeTaxOrDiscount = (id: string) => {
    if (taxesAndDiscounts.length <= 1) {
      toast({
        title: "No se puede eliminar",
        description: "Debe haber al menos un impuesto o descuento",
        variant: "destructive"
      });
      return;
    }
    
    setTaxesAndDiscounts(taxesAndDiscounts.filter(item => item.id !== id));
  };

  const updateTaxOrDiscount = (id: string, field: 'type' | 'value', newValue: string | number) => {
    setTaxesAndDiscounts(
      taxesAndDiscounts.map(item => {
        if (item.id === id) {
          if (field === 'type') {
            // Extraer el valor numérico del tipo seleccionado
            let updatedValue = item.value;
            if (typeof newValue === 'string') {
              const match = newValue.match(/\((\d+)%\)/);
              if (match && match[1]) {
                updatedValue = parseInt(match[1], 10);
              } else if (newValue === 'Descuento' || newValue === 'Comisión' || newValue === 'Gastos de envío' || newValue === 'Impuesto local') {
                updatedValue = 0; // Default value for custom types
              }
            }
            return { ...item, [field]: newValue, value: updatedValue };
          }
          return { ...item, [field]: newValue };
        }
        return item;
      })
    );
  };

  const calculateFinalPrice = () => {
    if (!cost) {
      toast({
        title: "Datos incompletos",
        description: "Por favor, ingresa el costo del producto",
        variant: "destructive"
      });
      return;
    }

    const costValue = parseFloat(cost);
    
    if (isNaN(costValue)) {
      toast({
        title: "Valores inválidos",
        description: "El costo debe ser un número válido",
        variant: "destructive"
      });
      return;
    }

    // Calcular precio base con margen
    const priceWithMargin = costValue * (1 + margin / 100);
    
    // Calcular totales de impuestos/descuentos
    let totalTaxes = 0;
    
    taxesAndDiscounts.forEach(item => {
      // Para descuentos, restamos; para impuestos, sumamos
      const factor = item.type.includes('Descuento') ? -1 : 1;
      totalTaxes += (priceWithMargin * (item.value / 100)) * factor;
    });
    
    // Calcular precio final
    const finalPriceValue = priceWithMargin + totalTaxes;
    setFinalPrice(finalPriceValue);
    
    toast({
      title: "Cálculo completado",
      description: `El precio de venta recomendado es: $${finalPriceValue.toFixed(2)}`,
    });
  };

  const handleSliderChange = (value: number[]) => {
    setMargin(value[0]);
  };

  return (
    <section id="calculadora" className="py-16 bg-gradient-to-b from-background to-card/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <a href="#" className="flex items-center space-x-2 group">
          <div className="bg-gradient-to-br from-secondary to-card p-1.5 rounded-full group-hover:animate-spin-slow duration-700">
          <DollarSign className="h-10 w-10 text-white" />
          </div>
          </a>
          </div>
          <h2 className="text-3xl font-bold">Que precio le pongo</h2>
          <p className="text-gray-400 mt-2">Calcula tus precios con confianza y estilo</p>
        </div>
        
        <div className="card-glass rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="space-y-6">
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-gray-300 mb-1">
                ¿Qué producto estás vendiendo?
              </label>
              <Input
                id="product"
                placeholder="Ej: Velas aromáticas, Joyería, Ropa..."
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="bg-secondary/50 border-white/5 text-white"
              />
            </div>
            
            <div>
              <label htmlFor="cost" className="block text-sm font-medium text-gray-300 mb-1">
                ¿Cuánto te costó este producto?
              </label>
              <Input
                id="cost"
                type="number"
                placeholder="Ingresa el precio en $"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="bg-secondary/50 border-white/5 text-white"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm font-medium text-gray-300 mb-2">
                <label htmlFor="margin">¿Qué porcentaje deseas ganar?</label>
                <span className="font-bold text-white">{margin}%</span>
              </div>
              <div className="py-4">
                <Slider
                  id="margin"
                  defaultValue={[30]}
                  max={100}
                  step={1}
                  value={[margin]}
                  onValueChange={handleSliderChange}
                  className="w-full"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-300">Impuestos y descuentos adicionales</h3>
                {basePrice && <span className="text-xs text-gray-400">Precio base: ${basePrice.toFixed(2)}</span>}
              </div>
              
              <div className="space-y-3">
                {taxesAndDiscounts.map((item) => (
                  <div key={item.id} className="flex space-x-2 items-start">
                    <div className="flex-grow">
                      <Select 
                        value={item.type} 
                        onValueChange={(value) => updateTaxOrDiscount(item.id, 'type', value)}
                      >
                        <SelectTrigger className="bg-secondary/50 border-white/5 text-white">
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {taxOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="w-16">
                      <Input
                        type="number"
                        value={item.value === 0 ? '' : item.value}
                        onChange={(e) => updateTaxOrDiscount(item.id, 'value', parseFloat(e.target.value) || 0)}
                        placeholder="%"
                        className="bg-secondary/50 border-white/5 text-white"
                      />
                    </div>
                    
                    <div className="w-20">
                      <Input
                        readOnly
                        value={item.amount ? `$${item.amount.toFixed(2)}` : '$0.00'}
                        className="bg-secondary/50 border-white/5 text-white text-xs"
                      />
                    </div>
                    
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeTaxOrDiscount(item.id)}
                      className="flex-shrink-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                onClick={addTaxOrDiscount} 
                className="w-full mt-3 border-dashed border-white/10 text-gray-400 hover:text-white hover:bg-white/5"
              >
                <Plus className="mr-2 h-4 w-4" /> Agregar impuesto o descuento
              </Button>
            </div>
            
            <Button 
              onClick={calculateFinalPrice} 
              className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-opacity font-bold text-black"
            >
              <Calculator className="mr-2 h-5 w-5" /> Calcular mi precio perfecto
            </Button>
            
            {finalPrice && (
              <div className="mt-4 p-4 rounded-xl bg-secondary/30 border border-white/5">
                <p className="text-gray-400 text-sm">Precio de venta recomendado:</p>
                <p className="text-2xl font-bold text-white">${finalPrice.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Incluye un margen de ganancia del {margin}% y todos los impuestos aplicables
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
