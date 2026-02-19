import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone, User, Loader2, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DetailsForm = ({
  name,
  setName,
  phone,
  setPhone,
  isLoading,
  onSubmit,
  estimatedRate
}) => {
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const {
    toast
  } = useToast();
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    const phoneIsValid = phone.replace(/\D/g, '').length === 10;
    const nameIsValid = name.trim().length >= 2;
    setIsPhoneValid(phoneIsValid);
    setIsNameValid(nameIsValid);
  }, [phone, name]);

  const handlePhoneChange = e => {
    const input = e.target.value.replace(/\D/g, '');
    const size = input.length;
    let formattedInput = '';
    if (size > 0) {
      formattedInput = '(' + input.substring(0, 3);
    }
    if (size > 3) {
      formattedInput += ') ' + input.substring(3, 6);
    }
    if (size > 6) {
      formattedInput += '-' + input.substring(6, 10);
    }
    setPhone(formattedInput);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!isNameValid) {
      toast({
        title: 'Invalid Name',
        description: 'Please enter your full name.',
        variant: 'destructive'
      });
      return;
    }
    if (!isPhoneValid) {
      toast({
        title: 'Invalid Phone',
        description: 'Please enter a valid 10-digit US phone number.',
        variant: 'destructive'
      });
      return;
    }
    if (!isSubmittingRef.current) {
      isSubmittingRef.current = true;
      onSubmit();
    }
  };

  return <>
      <div className="flex items-center justify-center gap-2 md:gap-4 text-xs md:text-base text-gray-600 mb-6">
        <div className="flex items-center gap-1 md:gap-1.5 p-1.5 md:p-2 bg-green-50 rounded-lg">
          <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600 flex-shrink-0" />
          <span className="font-semibold text-green-700 whitespace-nowrap">No Medical Exam</span>
        </div>
        <div className="flex items-center gap-1 md:gap-1.5 p-1.5 md:p-2 bg-yellow-50 rounded-lg">
          <Award className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-600 flex-shrink-0" />
          <span className="font-semibold text-yellow-700 whitespace-nowrap">A+ Rated Carrier</span>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Good News! We Found Your Best Rate</h2>
      <p className="text-sm md:text-base text-gray-600 mb-4">Almost There — Where Can We Send Your Free Quote?</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="w-full pl-11 pr-4 py-3 md:py-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-base md:text-lg transition-colors" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="tel" value={phone} onChange={handlePhoneChange} placeholder="(555) 123-4567" className="w-full pl-11 pr-11 py-3 md:py-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-base md:text-lg transition-colors" required />
            {isPhoneValid && <motion.div initial={{
            scale: 0,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} className="absolute right-3 inset-y-0 my-auto flex items-center">
                <CheckCircle2 className="w-7 h-7 text-green-500" />
              </motion.div>}
          </div>
        </div>
        <Button type="submit" className="w-full py-6 text-base md:text-lg font-semibold bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'See My Rate'}
        </Button>
      </form>
      <p className="text-xs text-gray-500 text-center mt-4">🔒 Your data is safe. By clicking "See My Rate", you agree to be contacted by a licensed agent via phone or text</p>
    </>;
};
export default DetailsForm;