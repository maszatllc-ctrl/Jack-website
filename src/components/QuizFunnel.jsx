import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from '@/components/ProgressBar';
import StepAge from '@/components/steps/StepAge';
import StepBudget from '@/components/steps/StepBudget';
import StepThree from '@/components/steps/StepThree';
import StepFour from '@/components/steps/StepFour';
import StepSix from '@/components/steps/StepSix';
import StepLoading from '@/components/steps/StepLoading';
import PhoneVerification from '@/components/steps/PhoneVerification';
import ThankYou from '@/components/steps/ThankYou';
import SocialProof from '@/components/SocialProof';
import Badges from '@/components/Badges';

const QuizFunnel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [geoState, setGeoState] = useState('');
  const [formData, setFormData] = useState({
    age_range: '',
    smoker: '',
    health: '',
    coverage_amount: '',
    zipCode: '',
    state: '',
    name: '',
    phone: '',
    verified: false,
    estimated_rate: '',
  });

  useEffect(() => {
    sessionStorage.removeItem('webhookSent');

    fetch('/api/geo')
      .then(res => res.json())
      .then(data => {
        if (data.state) {
          setGeoState(data.state);
        }
      })
      .catch(() => {});
  }, []);

  const totalSteps = 7;

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
        return <StepAge formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
      case 1:
        return <StepFour formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 2:
        return <StepThree formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <StepBudget formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <StepSix formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <StepLoading formData={formData} updateFormData={updateFormData} nextStep={nextStep} geoState={geoState} />;
      case 6:
        return <PhoneVerification formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 7:
        return <ThankYou formData={formData} />;
      default:
        return null;
    }
  };

  const isThankYouStep = currentStep === totalSteps;
  const isPhoneVerificationStep = currentStep === 6;
  const isLoadingStep = currentStep === 5;

  return (
    <div className="py-4 md:py-8 px-4 w-full">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <AnimatePresence>
            {showHeader && !isThankYouStep && (
              <motion.div
                exit={{ opacity: 0, position: 'absolute', top: 0, left: 0, right: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <SocialProof className="mb-4" geoState={geoState} />
                <div className="text-center mb-6 md:mb-8">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Get Up To $1,000,000 Life Insurance From $1/Day</h1>
                  </div>
                  <p className="text-base md:text-lg text-gray-600">Check Your Best Rate In 60 Seconds — No Medical Exam Required</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isThankYouStep && !isLoadingStep && (
          <ProgressBar
            currentStep={currentStep}
            totalSteps={totalSteps - 1}
            isLastStep={isPhoneVerificationStep}
          />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {!isPhoneVerificationStep && !isThankYouStep && !isLoadingStep && (
          <Badges className="mt-8" />
        )}
      </div>
    </div>
  );
};

export default QuizFunnel;
