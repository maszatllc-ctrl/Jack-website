import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const StepSix = ({
  formData,
  updateFormData,
  nextStep,
  prevStep
}) => {
  const [zipCode, setZipCode] = useState(formData.zipCode || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { toast } = useToast();
  const hasSubmitted = useRef(false);

  const handleZipChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZipCode(value);
  };
  
  const submitZipCode = useCallback(async (zip) => {
    if (isLoading || hasSubmitted.current) return;
    
    hasSubmitted.current = true;
    setIsLoading(true);
    updateFormData('zipCode', zip);

    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
      if (!response.ok) {
        throw new Error('Invalid ZIP code');
      }
      const data = await response.json();
      const state = data.places[0]['state abbreviation'];
      updateFormData('state', state);
      toast({
        title: "Great news!",
        description: `Competitive rates available in ${state}`,
        className: "bg-green-500 text-white",
      });
      nextStep();
    } catch (error) {
      toast({
        title: "ZIP Code Not Found",
        description: "We couldn't verify that ZIP code. Please try another.",
        variant: "destructive"
      });
      hasSubmitted.current = false; // Allow retry on error
    } finally {
        setIsLoading(false);
    }
  }, [isLoading, updateFormData, nextStep, toast]);

  useEffect(() => {
    const isZipValid = zipCode.length === 5 && /^\d+$/.test(zipCode);
    setIsValid(isZipValid);
    if (isZipValid) {
      submitZipCode(zipCode);
    }
  }, [zipCode, submitZipCode]);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      submitZipCode(zipCode);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <Button variant="ghost" onClick={prevStep} className="mb-4 -ml-2 text-gray-600 hover:text-gray-900">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back
      </Button>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <span className="p-2 bg-indigo-100 rounded-full">
            <MapPin className="w-6 h-6 md:w-7 md:h-7 text-indigo-600" />
          </span>
          What's your ZIP code?
        </h2>
        <p className="text-sm md:text-base text-gray-600 pl-14">We'll find the best rates in your area.</p>
      </motion.div>

      <form onSubmit={handleManualSubmit} className="space-y-6">
        <div>
          <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              id="zip-code"
              type="text" 
              inputMode="numeric" 
              value={zipCode} 
              onChange={handleZipChange} 
              placeholder="12345" 
              className="w-full pl-11 pr-11 py-3 md:py-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-base md:text-lg transition-colors" 
              maxLength={5} 
              required 
            />
            {(isValid || isLoading) && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute right-3 inset-y-0 my-auto flex items-center"
              >
                {isLoading ? <Loader2 className="w-7 h-7 text-blue-500 animate-spin" /> : <CheckCircle2 className="w-7 h-7 text-green-500" />}
              </motion.div>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full py-6 text-base md:text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors" disabled={isLoading || !isValid}>
          {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Continue'}
        </Button>
        <p className="text-xs text-gray-500 text-center mt-4">🔒 Your data is secure.</p>
      </form>
    </div>
  );
};

export default StepSix;