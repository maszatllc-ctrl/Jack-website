import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const rateStored = useRef(false);

  const stateName = formData.state || geoState || 'your area';
  const rate = estimateRate(formData);

  const loadingTexts = [
    `Comparing top carriers in ${stateName}…`,
    rate ? `Based on your profile, rates start as low as $${rate}/mo` : 'Finding your best available rate…',
  ];

  useEffect(() => {
    if (rate && !rateStored.current) {
      rateStored.current = true;
      updateFormData('estimated_rate', `$${rate}/mo`);
    }
  }, [rate, updateFormData]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 1250);

    const progressInterval = setInterval(() => {
      setProgress(p => (p >= 100 ? 100 : p + 4));
    }, 100);

    const timer = setTimeout(() => {
      nextStep();
    }, 2500);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [nextStep]);

  const duplicatedLogos = [...carrierLogos, ...carrierLogos];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col items-center justify-center text-center min-h-[450px]">
      <div className="w-full max-w-md">

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

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={loadingTexts[loadingTextIndex]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-lg md:text-xl font-semibold text-gray-700"
          >
            {loadingTexts[loadingTextIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StepLoading;
