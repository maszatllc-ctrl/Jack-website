import React from 'react';
import { motion } from 'framer-motion';
const Badges = ({
  className = ''
}) => {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    delay: 0.3
  }} className={`mt-6 text-center ${className}`}>
      <div className="flex items-center justify-center gap-4 sm:gap-6 text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="text-lg">⭐️</span>
          <span className="font-semibold text-xs sm:text-sm">4.9/5 Rated</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-lg">⚡</span>
          <span className="font-semibold text-xs sm:text-sm">Instant Quote</span>
        </div>
      </div>
    </motion.div>;
};
export default Badges;