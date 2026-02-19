import React from 'react';
import { motion } from 'framer-motion';
import OptionCard from '@/components/OptionCard';
import { Baby, Users, Glasses, Armchair, Calendar } from 'lucide-react';

const StepAge = ({ formData, updateFormData, nextStep }) => {
  const options = [
    {
      value: '18-30',
      icon: Baby,
      title: '18 - 30',
      subtitle: 'Best rates available'
    },
    {
      value: '31-45',
      icon: Users,
      title: '31 - 45',
      subtitle: 'Strong approval'
    },
    {
      value: '46-65',
      icon: Glasses,
      title: '46 - 65',
      subtitle: 'Good coverage'
    },
    {
      value: '66+',
      icon: Armchair,
      title: '66+',
      subtitle: 'Limited options'
    }
  ];

  const handleSelect = (value) => {
    updateFormData('age_range', value);
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
            <Calendar className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
          </span>
          How old are you?
        </h2>
        <p className="text-sm md:text-base text-gray-600 pl-14">Your age helps us find the most accurate rates.</p>
      </motion.div>

      <div className="space-y-3 md:space-y-4">
        {options.map((option, index) => (
          <OptionCard
            key={option.value}
            icon={option.icon}
            title={option.title}
            subtitle={option.subtitle}
            selected={formData.age_range === option.value}
            onClick={() => handleSelect(option.value)}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default StepAge;
