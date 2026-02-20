import React from 'react';
import { motion } from 'framer-motion';
import OptionCard from '@/components/OptionCard';
import { Check, X, Cigarette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const StepFour = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  onDisqualify
}) => {
  const options = [{
    value: 'no',
    icon: X,
    title: 'No',
    subtitle: 'You may qualify for the best rates'
  }, {
    value: 'yes',
    icon: Check,
    title: 'Yes, I use them',
    subtitle: 'We still have great options'
  }];
  const handleSelect = value => {
    updateFormData('smoker', value);
    if (value === 'yes') {
      setTimeout(() => onDisqualify(), 400);
    } else {
      setTimeout(() => nextStep(), 400);
    }
  };
  return <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <Button variant="ghost" onClick={prevStep} className="mb-4 -ml-2 text-gray-600 hover:text-gray-900">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back
      </Button>

      <motion.div initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <span className="p-2 bg-rose-100 rounded-full">
                <Cigarette className="w-6 h-6 md:w-7 md:h-7 text-rose-600" />
            </span>
            Do you currently use nicotine or tobacco?
        </h2>
        <p className="text-sm md:text-base text-gray-600 pl-14">Includes cigarettes, e-cigarettes, vaping, or chewing tobacco.</p>
      </motion.div>

      <div className="space-y-3 md:space-y-4">
        {options.map((option, index) => <OptionCard key={option.value} icon={option.icon} title={option.title} subtitle={option.subtitle} selected={formData.smoker === option.value} onClick={() => handleSelect(option.value)} delay={index * 0.1} />)}
      </div>
    </div>;
};
export default StepFour;