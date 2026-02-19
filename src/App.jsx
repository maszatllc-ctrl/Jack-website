import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import QuizFunnel from '@/components/QuizFunnel';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfUse from '@/pages/TermsOfUse';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const FACEBOOK_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID;

function App() {
  const location = useLocation();

  useEffect(() => {
    // Facebook Pixel Initialization
    if (!window.fbq) {
      (function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)})(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      
      if (window.fbq) {
        window.fbq('init', FACEBOOK_PIXEL_ID);
        window.fbq('track', 'PageView');
      }
    }

    // TrustedForm Script
    const trustedFormScriptId = 'trustedform-script';
    if (!document.getElementById(trustedFormScriptId)) {
        const tf = document.createElement('script');
        tf.id = trustedFormScriptId;
        tf.type = 'text/javascript';
        tf.async = true;
        tf.src = "https://cdn.trustedform.com/trustedform.js";
        tf.onload = () => {
            if (window.xxTrustedForm) {
                window.xxTrustedForm.Initialize_submitting_page_2();
            }
        };
        const s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(tf, s);
    }
  }, []);

  useEffect(() => {
    // Track page views on route change for Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);


  return (
    <>
      <Helmet>
        <title>Life Insurance Quote - Get Covered in 2 Minutes | Free Quote</title>
        <meta name="description" content="Get your personalized life insurance quote in just 2 minutes. Compare rates from top providers and protect your family's future today. No obligations, 100% free." />
        <script>
          {`
            (function() {
              var field = 'xxTrustedFormCertUrl';
              var provideReferrer = false;
              var tf = document.createElement('script');
              tf.type = 'text/javascript';
              tf.async = true;
              tf.src = 'http' + ('https:' == document.location.protocol ? 's' : '') +
              '://api.trustedform.com/trustedform.js?provide_referrer=' + escape(provideReferrer) + '&field=' + escape(field) + '&l=' + new Date().getTime() + Math.random();
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(tf, s);
            })();
          `}
        </script>
      </Helmet>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <main className="flex-grow flex flex-col items-center justify-center">
          <Routes>
            <Route path="/" element={<QuizFunnel />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;