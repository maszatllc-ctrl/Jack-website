import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { estimateRate } from '@/lib/rateEstimator';

const carrierLogos = [
  { alt: 'Aflac Logo', src: '/images/carriers/aflac.jpg' },
  { alt: 'Corebridge Financial Logo', src: '/images/carriers/corebridge.png' },
  { alt: 'Aetna Logo', src: '/images/carriers/aetna.png' },
  { alt: 'Americo Logo', src: '/images/carriers/americo.png' },
  { alt: 'Mutual of Omaha Logo', src: '/images/carriers/mutual-of-omaha.png' },
  { alt: 'National Life Group Logo', src: '/images/carriers/national-life-group.png' },
];

const StepLoading = ({ formData, updateFormData, nextStep, geoState }) => {
  const [progress, setProgress] = useState(0);
  const [showGoodNews, setShowGoodNews] = useState(false);
  const rateStored = useRef(false);

  const stateName = formData.state || geoState || 'your area';
  const rate = estimateRate(formData);

  useEffect(() => {
    if (rate && !rateStored.current) {
      rateStored.current = true;
      updateFormData('estimated_rate', `$${rate}/mo`);
    }
  }, [rate, updateFormData]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(p => (p >= 100 ? 100 : p + 4));
    }, 100);

    const goodNewsTimer = setTimeout(() => {
      setShowGoodNews(true);
    }, 1500);

    const timer = setTimeout(() => {
      nextStep();
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(goodNewsTimer);
      clearTimeout(timer);
    };
  }, [nextStep]);

  const duplicatedLogos = [...carrierLogos, ...carrierLogos];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col items-center justify-center text-center min-h-[450px]">
      <div className="w-full max-w-md">

        {showGoodNews && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-base font-semibold text-green-800">Good news! You may qualify for savings.</p>
          </motion.div>
        )}

        <p className="text-lg md:text-xl font-semibold text-gray-700 mb-6">
          Comparing top carriers in {stateName}…
        </p>

        <div className="w-full overflow-hidden mb-8" style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}>
            <motion.div
              className="flex"
              animate={{
                x: ['0%', '-100%'],
              }}
              transition={{
                ease: 'linear',
                duration: 10,
                repeat: Infinity,
              }}
            >
              {duplicatedLogos.map((logo, i) => (
                <div key={i} className="flex-shrink-0 w-1/5 mx-4 flex items-center justify-center h-16">
                  <img src={logo.src} alt={logo.alt} className="max-h-8 w-auto object-contain" />
                </div>
              ))}
            </motion.div>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      </div>
    </div>
  );
};

export default StepLoading;
