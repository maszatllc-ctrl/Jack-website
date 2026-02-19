import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const getDailyQuoteCount = () => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today - startOfYear) / 86400000);
  const weekCount = 2147 + (dayOfYear * 13) % 400;
  return weekCount.toLocaleString();
};

const SocialProof = ({ className = '', geoState = '' }) => {
  const quoteCount = getDailyQuoteCount();

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
        <span className="font-bold">{quoteCount}</span> quotes requested this week{geoState ? ` in ${geoState}` : ''}
      </span>
    </motion.div>
  );
};

export default SocialProof;