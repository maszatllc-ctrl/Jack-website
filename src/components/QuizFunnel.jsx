import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Award } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
import StepAge from '@/components/steps/StepAge';
import StepThree from '@/components/steps/StepThree';
import StepFour from '@/components/steps/StepFour';
import StepSix from '@/components/steps/StepSix';
import StepLoading from '@/components/steps/StepLoading';
import PhoneVerification from '@/components/steps/PhoneVerification';
import ThankYou from '@/components/steps/ThankYou';
import StepDisqualified from '@/components/steps/StepDisqualified';
import SocialProof from '@/components/SocialProof';

const QuizFunnel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [disqualified, setDisqualified] = useState('');
  const [geoState] = useState('New Jersey');
  const [geoStateAbbr] = useState('NJ');
  const [formData, setFormData] = useState({
    age_range: '',
    smoker: '',
    health: '',
    zipCode: '',
    state: '',
    name: '',
    email: '',
    phone: '',
    verified: false,
    estimated_rate: '',
  });

  useEffect(() => {
    sessionStorage.removeItem('webhookSent');
  }, []);

  const totalSteps = 6;

  const showHeader = currentStep === 0;

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepAge formData={formData} updateFormData={updateFormData} nextStep={nextStep} onDisqualify={() => setDisqualified('age')} />;
      case 1:
        return <StepFour formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} onDisqualify={() => setDisqualified('tobacco')} />;
      case 2:
        return <StepThree formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <StepSix formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <StepLoading formData={formData} updateFormData={updateFormData} nextStep={nextStep} geoState={geoState} />;
      case 5:
        return <PhoneVerification formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <ThankYou formData={formData} />;
      default:
        return null;
    }
  };

  const isThankYouStep = currentStep === totalSteps;
  const isPhoneVerificationStep = currentStep === 5;
  const isLoadingStep = currentStep === 4;
  const isDisqualifiedOrDone = disqualified || isThankYouStep;

  return (
    <div className="py-4 md:py-8 px-4 w-full">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <AnimatePresence>
            {showHeader && !isDisqualifiedOrDone && (
              <motion.div
                exit={{ opacity: 0, position: 'absolute', top: 0, left: 0, right: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* State indicator pill */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center mb-4"
                >
                  <span className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    New Jersey Residents
                  </span>
                </motion.div>

                {/* Two-color headline */}
                <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-2">
                  <span className="text-gray-900">Save Up To 38% On</span>{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Life Insurance</span>
                </h1>

                {/* Subheadline */}
                <p className="text-sm md:text-base text-gray-500 text-center mb-4">
                  Answer 4 quick questions to see if you qualify
                </p>

                {/* Trust pills */}
                <div className="flex items-center justify-center gap-2 md:gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                    No Medical Exam
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                    <Award className="w-3.5 h-3.5 text-blue-600" />
                    A+ Rated Carriers
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isDisqualifiedOrDone && !isLoadingStep && !isPhoneVerificationStep && (
          <ProgressBar
            currentStep={currentStep}
            totalSteps={totalSteps - 1}
            isLastStep={isPhoneVerificationStep}
            hideLabels={showHeader}
          />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={disqualified ? 'disqualified' : currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {disqualified ? <StepDisqualified reason={disqualified} /> : renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Social proof below the card on steps 0-2 (not zip, loading, phone, thankyou) */}
        {!disqualified && currentStep <= 2 && (
          <SocialProof className="mt-6" stateAbbr={geoStateAbbr} />
        )}
      </div>
    </div>
  );
};

export default QuizFunnel;
