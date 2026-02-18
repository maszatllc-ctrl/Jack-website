import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const OtpForm = ({
  otp,
  setOtp,
  isLoading,
  onSubmit,
  resendCooldown,
  resendCount,
  maxResends,
  onResend,
  onBack
}) => {
  const otpInputs = useRef([]);
  const { toast } = useToast();
  const abortControllerRef = useRef(null);

  const handleSubmit = (e, codeOverride) => {
    e.preventDefault();
    const finalOtp = codeOverride || otp.join('');
    if (finalOtp.length !== 4) {
      toast({
        title: 'Invalid Code',
        description: 'Please enter the 4-digit code.',
        variant: 'destructive'
      });
      return;
    }
    onSubmit(finalOtp);
  };
  
  useEffect(() => {
    const firstInput = otpInputs.current[0];
    if (firstInput) {
      setTimeout(() => {
        firstInput.focus();
      }, 100);
    }

    if ('OTPCredential' in window) {
      abortControllerRef.current = new AbortController();
      navigator.credentials.get({
        otp: {
          transport: ['sms']
        },
        signal: abortControllerRef.current.signal
      }).then(otpCredential => {
        if (otpCredential && otpCredential.code) {
          const code = otpCredential.code.slice(0, 4);
          setOtp(code.split(''));
          setTimeout(() => {
            otpInputs.current[code.length - 1]?.focus();
            handleSubmit(new Event('submit'), code);
          }, 0);
        }
      }).catch(err => console.error('WebOTP API error:', err));
    }
    return () => abortControllerRef.current?.abort();
  }, [setOtp]);

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      otpInputs.current[index + 1]?.focus();
    }
    
    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.length === 4) {
      handleSubmit(new Event('submit'), newOtp.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const isResendDisabled = isLoading || resendCooldown > 0 || resendCount >= maxResends;

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Enter Verification Code</h2>
      <p className="text-sm md:text-base text-gray-600 mb-8">A 4-digit code was sent to your phone. Enter it below.</p>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2 md:gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => (otpInputs.current[index] = el)}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength="1"
              value={digit}
              onChange={e => handleOtpChange(e, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              className="w-14 h-16 md:w-16 md:h-20 text-center text-3xl md:text-4xl font-semibold border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
              disabled={isLoading}
            />
          ))}
        </div>
        <Button type="submit" className="w-full py-6 text-base md:text-lg font-semibold bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Verify & Get My Quote'}
        </Button>
      </form>
      <p className="text-center text-sm md:text-base text-gray-600 mt-4">🔒 Your information is secure, we'll never spam you.</p>
      <div className="mt-4 text-center">
        <button onClick={onResend} disabled={isResendDisabled} className="text-sm text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed">
          {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Didn\'t get a code? Resend.'}
        </button>
        {resendCount >= maxResends && <p className="text-xs text-red-500 text-center mt-1">Maximum resend limit reached.</p>}
        <p className="text-xs mt-2">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700 underline">
            Wrong phone number? Change here
          </button>
        </p>
      </div>
    </>
  );
};

export default OtpForm;