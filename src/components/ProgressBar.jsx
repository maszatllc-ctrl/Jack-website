import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({
  currentStep,
  totalSteps,
  isLastStep
}) => {
  const progress = (currentStep + 1) / totalSteps * 100;
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs md:text-sm font-medium text-gray-700">
          {isLastStep ? "Last Step" : `Step ${currentStep + 1} of ${totalSteps}`}
        </span>
        <span className="text-xs md:text-sm font-medium text-blue-600">
          {isLastStep ? "Almost There" : "Let’s Find Your Best Rate"}
        </span>
      </div>
      <div className="w-full h-2 md:h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
          initial={{
            width: 0
          }}
          animate={{
            width: `${progress}%`
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut'
          }}
        />
      </div>
    </div>
  );
};
export default ProgressBar;