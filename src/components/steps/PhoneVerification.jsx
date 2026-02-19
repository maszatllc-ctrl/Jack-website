import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';
import DetailsForm from './phone-verification/DetailsForm';
import OtpForm from './phone-verification/OtpForm';
import FinalReview from './phone-verification/FinalReview';

const RESEND_COOLDOWN_SECONDS = 30;
const MAX_RESENDS = 3;

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

const sendLeadWebhook = async (leadData, eventId) => {
  const webhookSent = sessionStorage.getItem('webhookSent');
  if (webhookSent === 'true') {
    return { success: true, message: "Webhook already sent." };
  }

  try {
    const webhookResponse = await fetch('/api/send-lead-webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
    });
    const webhookData = await webhookResponse.json();

    if (!webhookResponse.ok) {
      throw new Error(webhookData.error || 'Webhook failed');
    }

    // Also send to Facebook CAPI
    const fbc = getCookie('_fbc');
    const fbp = getCookie('_fbp');

    fetch('/api/send-facebook-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadData, event_id: eventId, fbc, fbp }),
    }).catch(err => console.error("Facebook CAPI failed:", err));

    sessionStorage.setItem('webhookSent', 'true');
    return { success: true, data: webhookData };
  } catch (error) {
    console.error("Error sending lead to webhook/CAPI:", error);
    return { success: false, error: error.message };
  }
};


const PhoneVerification = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [currentView, setCurrentView] = useState('details');
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [name, setName] = useState(formData.name || '');
  const [email, setEmail] = useState(formData.email || '');
  const [phone, setPhone] = useState(formData.phone || '');
  const { toast } = useToast();

  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const timerRef = useRef(null);
  const unverifiedLeadTimer = useRef(null);

  const startCooldown = () => {
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
    timerRef.current = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      clearTimeout(unverifiedLeadTimer.current);
    }
  }, []);

  const getLeadData = (isVerified) => {
    const certUrlInput = document.querySelector('input[name="xxTrustedFormCertUrl"]');
    const cert_url = certUrlInput ? certUrlInput.value : null;
    const numericPhone = `+1${phone.replace(/\D/g, '')}`;

    return {
      name,
      email,
      phone: numericPhone,
      age_range: formData.age_range,
      smoker: formData.smoker,
      health: formData.health,
      zip_code: formData.zipCode,
      state: formData.state,
      estimated_rate: formData.estimated_rate || null,
      verified: isVerified,
      cert_url,
    };
  };

  const scheduleUnverifiedLeadSubmission = () => {
    clearTimeout(unverifiedLeadTimer.current);
    unverifiedLeadTimer.current = setTimeout(async () => {
      const unverifiedLeadData = getLeadData(false);

      const { error: dbError } = await supabase.from('term_leads').insert([unverifiedLeadData]);
      if (dbError) {
        console.error('Error saving unverified lead to DB:', dbError);
      } else {
        await sendLeadWebhook(unverifiedLeadData);
      }
    }, 300000);
  };

  const sendOtp = useCallback(async () => {
    setIsLoading(true);
    const numericPhone = `+1${phone.replace(/\D/g, '')}`;
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: numericPhone }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to send OTP.');
      }

      setCurrentView('otp');
      setResendCount(c => c + 1);
      startCooldown();
      scheduleUnverifiedLeadSubmission();
    } catch (error) {
      console.error('Send OTP error:', error);
      toast({
        title: 'Error',
        description: `Could not send verification code. ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [phone, toast]);


  const handleDetailsSubmit = () => {
    updateFormData('name', name);
    updateFormData('email', email);
    updateFormData('phone', phone);
    sendOtp();
  };

  const handleOtpResend = () => {
    if (resendCooldown > 0 || resendCount >= MAX_RESENDS) return;
    setOtp(['', '', '', '']);
    sendOtp();
  };

  const handleOtpSubmit = async (submittedOtp) => {
    setIsLoading(true);
    clearTimeout(unverifiedLeadTimer.current);

    const numericPhone = `+1${phone.replace(/\D/g, '')}`;

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: numericPhone, code: submittedOtp }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Invalid verification code.');
      }

      toast({
        title: 'Phone Verified!',
        description: "Your phone number has been successfully verified.",
        className: "bg-green-500 text-white",
      });

      updateFormData('verified', true);

      const finalLeadData = getLeadData(true);
      const eventId = crypto.randomUUID();

      // Save to Supabase DB
      const { error: dbError } = await supabase.from('term_leads').insert([finalLeadData]);
      if (dbError) {
        console.error('Error saving lead to DB:', dbError);
      }

      // Send to webhook & CAPI
      await sendLeadWebhook(finalLeadData, eventId);

      // Track Facebook Pixel event with event ID for deduplication
      if (window.fbq) {
        window.fbq('track', 'Lead', {}, { eventID: eventId });
      }

      nextStep();

    } catch (error) {
      console.error('Verify OTP error:', error);
      toast({
        title: 'Verification Failed',
        description: error.message || 'The code you entered is incorrect. Please try again.',
        variant: 'destructive',
      });
      setOtp(['', '', '', '']);
      scheduleUnverifiedLeadSubmission();
    } finally {
      setIsLoading(false);
    }
  };


  const goBack = () => {
    if (currentView === 'otp') {
      clearTimeout(unverifiedLeadTimer.current);
      setCurrentView('details');
    } else {
      prevStep();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 min-h-[550px] flex flex-col justify-between">
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {currentView === 'details' && (
              <>
                <FinalReview zipCode={formData.zipCode} state={formData.state} />
                <DetailsForm
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  phone={phone}
                  setPhone={setPhone}
                  isLoading={isLoading}
                  onSubmit={handleDetailsSubmit}
                  estimatedRate={formData.estimated_rate}
                />
              </>
            )}

            {currentView === 'otp' && (
              <OtpForm
                otp={otp}
                setOtp={setOtp}
                isLoading={isLoading}
                onSubmit={handleOtpSubmit}
                resendCooldown={resendCooldown}
                resendCount={resendCount}
                maxResends={MAX_RESENDS}
                onResend={handleOtpResend}
                onBack={() => {
                  clearTimeout(unverifiedLeadTimer.current);
                  setCurrentView('details');
                }}
                maskedPhone={phone ? `(***) ***-${phone.replace(/\D/g, '').slice(-4)}` : ''}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {currentView === 'otp' && (
        <div className="mt-6 text-center">
          <button
            onClick={goBack}
            className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default PhoneVerification;
