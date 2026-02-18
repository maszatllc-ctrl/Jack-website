import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingTexts = [
  "Comparing top carriers…",
  "Finding your best available rate…",
];

const carrierLogos = [
  { alt: 'Aflac Logo', src: 'https://horizons-cdn.hostinger.com/6277cbe0-1200-4d04-bd5a-4eb3a1b485c8/296312efcdfcf88ac11f9b216ba73639.jpg' },
  { alt: 'Corebridge Financial Logo', src: 'https://horizons-cdn.hostinger.com/6277cbe0-1200-4d04-bd5a-4eb3a1b485c8/e06dee7e73c13056d81976a5cfeef51f.png' },
  { alt: 'Aetna Logo', src: 'https://horizons-cdn.hostinger.com/6277cbe0-1200-4d04-bd5a-4eb3a1b485c8/74e408a4bc7ba602c18b24de24968fee.png' },
  { alt: 'Americo Logo', src: 'https://horizons-cdn.hostinger.com/6277cbe0-1200-4d04-bd5a-4eb3a1b485c8/0b07b11f41e42f042b585e8b7b984895.png' },
  { alt: 'Mutual of Omaha Logo', src: 'https://horizons-cdn.hostinger.com/6277cbe0-1200-4d04-bd5a-4eb3a1b485c8/5da962ed2330da832eddb9d10cdb15ac.png' },
  { alt: 'National Life Group Logo', src: 'https://horizons-cdn.hostinger.com/6277cbe0-1200-4d04-bd5a-4eb3a1b485c8/0109bf0b828311538466e106da9fa6a9.png' },
];

const StepLoading = ({ nextStep }) => {
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);

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

  // Duplicate logos for a seamless scroll effect
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
                duration: 10, // Changed from 20 to 10 for faster scroll
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