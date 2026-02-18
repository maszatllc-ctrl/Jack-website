import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const OptionCard = ({ icon: Icon, title, subtitle, selected, onClick, delay = 0 }) => {
  return (
    <motion.button
      initial={{ opacity: 0 }} // Removed y: 20 to stop the "move up" animation
      animate={{ opacity: 1 }} // Removed y: 0
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full p-4 md:p-6 rounded-xl border-2 transition-all duration-300 text-left",
        "hover:shadow-lg hover:border-blue-400",
        selected 
          ? "border-blue-600 bg-blue-50 shadow-md" 
          : "border-gray-200 bg-white hover:bg-gray-50"
      )}
    >
      <div className="flex items-start gap-3 md:gap-4">
        <div className={cn(
          "p-2 md:p-3 rounded-lg transition-colors",
          selected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
        )}>
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="flex-1">
          <h3 className={cn(
            "font-semibold text-base md:text-lg mb-1",
            selected ? "text-blue-900" : "text-gray-900"
          )}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs md:text-sm text-gray-600">{subtitle}</p>
          )}
        </div>
        <div className={cn(
          "w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all",
          selected ? "border-blue-600 bg-blue-600" : "border-gray-300"
        )}>
          {selected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full"
            />
          )}
        </div>
      </div>
    </motion.button>
  );
};

export default OptionCard;