import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ShieldCheck, Zap, Gift } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
import StepAge from '@/components/steps/StepAge';
import StepThree from '@/components/steps/StepThree';
import StepFour from '@/components/steps/StepFour';
import StepSix from '@/components/steps/StepSix';
import StepLoading from '@/components/steps/StepLoading';
import PhoneVerification from '@/components/steps/PhoneVerification';
import ThankYou from '@/components/steps/ThankYou';
import SocialProof from '@/components/SocialProof';
import Badges from '@/components/Badges';

const STATE_NAMES = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  DC: 'District of Columbia',
};

const QuizFunnel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [geoState, setGeoState] = useState('');
  const [formData, setFormData] = useState({
    age_range: '',
    smoker: '',
    health: '',
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
          setGeoState(STATE_NAMES[data.state] || data.state);
        }
      })
      .catch(() => {});
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
        return <StepAge formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
      case 1:
        return <StepFour formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
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
                {/* Brand + State pill row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-gray-800 tracking-tight">Quick Life Rates</span>
                  {geoState && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full"
                    >
                      <MapPin className="w-3 h-3" />
                      {geoState}
                    </motion.span>
                  )}
                </div>

                {/* Headline */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
                  See If You Qualify For New 2026 Term Life Rates
                </h1>

                {/* Trust pills */}
                <div className="flex items-center justify-center gap-2 md:gap-3 mb-5">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                    No Exam
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1.5 rounded-full">
                    <Zap className="w-3.5 h-3.5 text-yellow-500" />
                    60 Seconds
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1.5 rounded-full">
                    <Gift className="w-3.5 h-3.5 text-blue-500" />
                    Free Quote
                  </span>
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
            hideLabels={showHeader}
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

        {/* Social proof below the card on step 0 only */}
        {showHeader && (
          <SocialProof className="mt-6" geoState={geoState} />
        )}

        {/* Badges on quiz steps 1-3 only (not step 0, not phone/loading/thankyou) */}
        {!showHeader && !isPhoneVerificationStep && !isThankYouStep && !isLoadingStep && (
          <Badges className="mt-8" />
        )}
      </div>
    </div>
  );
};

export default QuizFunnel;
