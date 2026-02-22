import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import STATE_NAMES from '@/lib/stateNames';

const getDynamicTestimonial = (state) => {
  const name = 'Caleb H.';
  const dynamicState = STATE_NAMES[state] || state || 'USA';
  return { name, state: dynamicState };
};

const FinalReview = ({ state }) => {
  const testimonial = getDynamicTestimonial(state);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-xl"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <img className="w-full h-full object-cover" alt={`Happy customer ${testimonial.name}`} src="/images/testimonial-caleb.jpg" />
        </div>
        <div>
          <div className="flex items-center mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
          <h4 className="font-bold text-gray-800 text-base">Easy And Affordable</h4>
          <p className="text-sm text-gray-600 mt-1">"I was putting off getting life insurance for years. This was so simple and I found a great plan in minutes"</p>
          <p className="text-sm font-semibold text-gray-500 mt-2">- {testimonial.name}, {testimonial.state}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default FinalReview;