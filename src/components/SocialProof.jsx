import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialProof = ({ className = '', geoState = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-center gap-2 text-sm md:text-base font-medium text-gray-700 ${className}`}
    >
      <div className="flex items-center gap-0.5">
        <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
      </div>
      <span>
        Trusted by <span className="font-bold">10,000+</span> Families{geoState ? ` in ${geoState}` : ''}
      </span>
    </motion.div>
  );
};

export default SocialProof;