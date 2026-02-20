import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Phone, Clock } from 'lucide-react';

const ThankYou = ({ formData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="flex justify-center mb-6"
      >
        <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 md:w-14 md:h-14 text-green-600" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
          Thank You, {formData.name ? formData.name.split(' ')[0] : ''}!
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto">
          We have all the information we need to find you the best rate.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8 p-5 bg-blue-50 border border-blue-200 rounded-xl text-center"
      >
        <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
        <p className="text-lg font-bold text-blue-900 mb-1">
          Please expect a call shortly
        </p>
        <p className="text-sm text-blue-700">
          A licensed agent is reviewing your information and will call you back in just a few minutes with your best rate.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4 mb-8"
      >
        <h3 className="font-semibold text-lg text-gray-900 mb-4 text-center">What happens next?</h3>

        <div className="flex gap-4 items-start">
          <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">A Licensed Agent Will Call You</h4>
            <p className="text-sm text-gray-600">They'll find the best rate for your situation and walk you through your options — no obligation to purchase</p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Keep Your Phone Nearby</h4>
            <p className="text-sm text-gray-600">Your agent will be reaching out shortly — please keep an eye out for an incoming call</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYou;
