import React from 'react';
import { motion } from 'framer-motion';
import { ShieldX, ArrowLeft } from 'lucide-react';

const StepDisqualified = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center py-6 md:py-10"
      >
        <div className="flex justify-center mb-6">
          <span className="p-4 bg-gray-100 rounded-full">
            <ShieldX className="w-10 h-10 text-gray-500" />
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          We're Sorry
        </h2>

        <p className="text-base md:text-lg text-gray-600 mb-6 max-w-md mx-auto">
          Unfortunately, we're unable to find online coverage options for your age group at this time.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 max-w-sm mx-auto">
          <p className="text-sm text-blue-800 font-medium mb-3">
            Are you 68 or younger?
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back & Try Again
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default StepDisqualified;
