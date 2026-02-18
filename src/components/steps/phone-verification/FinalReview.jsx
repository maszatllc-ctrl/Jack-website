import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const getDynamicTestimonial = (zipCode, state) => {
  // Always use "Caleb H." for the name
  const name = 'Caleb H.';

  // Keep the state dynamic based on zip code or fallback to provided state
  const zipNum = parseInt(zipCode, 10);
  let dynamicState = state; // Default to the provided state

  if (zipNum >= 10001 && zipNum <= 14975) dynamicState = 'New York';
  else if (zipNum >= 30001 && zipNum <= 34997) dynamicState = 'Florida';
  else if (zipNum >= 60001 && zipNum <= 62999) dynamicState = 'Illinois';
  else if (zipNum >= 75001 && zipNum <= 79999) dynamicState = 'Texas';
  else if (zipNum >= 90001 && zipNum <= 96162) dynamicState = 'California';
  else dynamicState = dynamicState || 'USA'; // If state is not determined by zip, use the provided state or 'USA'

  return { name, state: dynamicState };
};

const FinalReview = ({ zipCode, state }) => {
  const testimonial = getDynamicTestimonial(zipCode, state);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-xl"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <img className="w-full h-full object-cover" alt={`Happy customer ${testimonial.name}`} src="https://horizons-cdn.hostinger.com/6277cbe0-1200-4d04-bd5a-4eb3a1b485c8/360_f_497179961_q7qggtgng2kkn57ol4csde7utquozqmj-64ZVz.jpg" />
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