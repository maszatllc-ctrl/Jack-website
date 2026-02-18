import React from 'react';
import { motion } from 'framer-motion';
import OptionCard from '@/components/OptionCard';
import { User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const StepFive = ({ formData, updateFormData, nextStep, prevStep }) => {
  const options = [
    { 
      value: 'male', 
      icon: User, 
      title: 'Male', 
      subtitle: '' 
    },
    { 
      value: 'female', 
      icon: Users, 
      title: 'Female', 
      subtitle: '' 
    }
  ];

  const handleSelect = (value) => {
    updateFormData('gender', value);
    setTimeout(() => nextStep(), 400);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <Button
        variant="ghost"
        onClick={prevStep}
        className="mb-4 -ml-2 text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          What's your gender?
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          This helps us provide accurate quotes
        </p>
      </motion.div>

      <div className="space-y-3 md:space-y-4">
        {options.map((option, index) => (
          <OptionCard
            key={option.value}
            icon={option.icon}
            title={option.title}
            subtitle={option.subtitle}
            selected={formData.gender === option.value}
            onClick={() => handleSelect(option.value)}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default StepFive;