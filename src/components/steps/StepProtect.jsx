import React from 'react';
import { motion } from 'framer-motion';
import OptionCard from '@/components/OptionCard';
import { Heart, Baby, Users, Shield, ShieldQuestion } from 'lucide-react';

const StepProtect = ({ formData, updateFormData, nextStep }) => {
  const options = [
    { 
      value: 'spouse', 
      icon: Heart, 
      title: 'My spouse', 
      subtitle: 'Ensure your partner is financially secure' 
    },
    { 
      value: 'kids', 
      icon: Baby, 
      title: 'My kids', 
      subtitle: 'Protect their future and education' 
    },
    { 
      value: 'family', 
      icon: Users, 
      title: 'My family', 
      subtitle: 'Comprehensive protection for loved ones' 
    },
    { 
      value: 'other', 
      icon: Shield, 
      title: 'Other', 
      subtitle: 'Cover final expenses or business partners' 
    }
  ];

  const handleSelect = (value) => {
    updateFormData('protect', value);
    setTimeout(() => nextStep(), 400);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <span className="p-2 bg-blue-100 rounded-full">
            <ShieldQuestion className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
          </span>
          Who do you want to protect?
        </h2>
        <p className="text-sm md:text-base text-gray-600 pl-14">Choose the people who depend on you financially.</p>
      </motion.div>

      <div className="space-y-3 md:space-y-4">
        {options.map((option, index) => (
          <OptionCard
            key={option.value}
            icon={option.icon}
            title={option.title}
            subtitle={option.subtitle}
            selected={formData.protect === option.value}
            onClick={() => handleSelect(option.value)}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default StepProtect;