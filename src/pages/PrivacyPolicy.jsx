import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <Helmet>
        <title>Privacy Policy - Family Guards</title>
        <meta name="description" content="Read the privacy policy for Family Guards. We are committed to protecting your personal information and privacy." />
      </Helmet>
      <div className="mb-6">
        <Button variant="ghost" asChild className="-ml-2 text-gray-600 hover:text-gray-900">
          <Link to="/">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </Button>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">
        This Privacy Policy describes how Family Guards ("we," "us," or "our") collects, uses, and shares your personal information when you use our website.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Information We Collect</h2>
      <p className="text-gray-700 mb-4">
        We collect information you provide directly to us when you use our services, such as your name, email address, phone number, and demographic information related to life insurance quotes (e.g., zip code, health status).
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">How We Use Your Information</h2>
      <p className="text-gray-700 mb-4">
        We use the information we collect to:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
        <li>Provide, maintain, and improve our services.</li>
        <li>Process your requests for life insurance quotes.</li>
        <li>Communicate with you about your quotes and related services.</li>
        <li>Send you marketing and promotional communications (with your consent).</li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Sharing Your Information</h2>
      <p className="text-gray-700 mb-4">
        We may share your personal information with third-party insurance providers to generate quotes, as well as with service providers who assist us in operating our website and conducting our business. We do not sell your personal information to third parties.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Security</h2>
      <p className="text-gray-700 mb-4">
        We implement reasonable security measures to protect your information from unauthorized access, disclosure, alteration, and destruction.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Changes to This Policy</h2>
      <p className="text-gray-700 mb-4">
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Contact Us</h2>
      <p className="text-gray-700">
        If you have any questions about this Privacy Policy, please contact us.
      </p>
    </div>
  );
};

export default PrivacyPolicy;