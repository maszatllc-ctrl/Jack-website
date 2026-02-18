import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ThankYou = ({
  formData
}) => {
  const {
    toast
  } = useToast();
  // Removed handleScheduleCall as the button is being removed.

  return <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <motion.div initial={{
      scale: 0
    }} animate={{
      scale: 1
    }} transition={{
      type: "spring",
      duration: 0.6
    }} className="flex justify-center mb-6">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 md:w-14 md:h-14 text-green-600" />
        </div>
      </motion.div>

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.3
    }} className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
          Thank You! 🎉
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-6">We've received your information and are preparing your quote</p>
      </motion.div>

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.5
    }} className="space-y-4 mb-8">
        <h3 className="font-semibold text-lg text-gray-900 mb-4 text-center">What happens next?</h3>
        
        <div className="flex gap-4 items-start">
          <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Expect a Call Soon</h4>
            <p className="text-sm text-gray-600">A licensed agent will call you shortly to review your best options</p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Check Your Text Messages</h4>
            <p className="text-sm text-gray-600">Our agent will send you an SMS to discuss next steps</p>
          </div>
        </div>
      </motion.div>

      {/* The section "Want To Pick A Time That Works For You?" and its button have been removed */}
    </div>;
};
export default ThankYou;