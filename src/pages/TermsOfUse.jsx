import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const TermsOfUse = () => {
  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <Helmet>
        <title>Terms of Use - Quick Life Rates</title>
        <meta name="description" content="Read the terms of use for Quick Life Rates. By using our website, you agree to these terms and conditions." />
      </Helmet>
      <div className="mb-6">
        <Button variant="ghost" asChild className="-ml-2 text-gray-600 hover:text-gray-900">
          <Link to="/">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </Button>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Use</h1>
      <p className="text-gray-700 mb-4">
        Welcome to Quick Life Rates. By accessing or using our website, you agree to be bound by these Terms of Use and our Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Acceptance of Terms</h2>
      <p className="text-gray-700 mb-4">
        These Terms of Use govern your access to and use of Quick Life Rates' website and services. If you do not agree to these terms, please do not use our services.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Use of Services</h2>
      <p className="text-gray-700 mb-4">
        Quick Life Rates provides an online platform to help users compare life insurance quotes. You agree to use our services only for lawful purposes and in accordance with these Terms.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">User Conduct</h2>
      <p className="text-gray-700 mb-4">
        You agree not to:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
        <li>Use our services for any illegal or unauthorized purpose.</li>
        <li>Transmit any viruses or other malicious code.</li>
        <li>Interfere with or disrupt the integrity or performance of our services.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Disclaimer of Warranties</h2>
      <p className="text-gray-700 mb-4">
        Our services are provided "as is" and "as available" without any warranties of any kind, either express or implied. Quick Life Rates does not warrant that the service will be uninterrupted, error-free, or secure.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Limitation of Liability</h2>
      <p className="text-gray-700 mb-4">
        In no event shall Quick Life Rates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Changes to Terms</h2>
      <p className="text-gray-700 mb-4">
        We reserve the right to modify or replace these Terms at any time. Your continued use of the service after any such changes constitutes your acceptance of the new Terms of Use.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Contact Information</h2>
      <p className="text-gray-700">
        If you have any questions about these Terms, please contact us.
      </p>
    </div>
  );
};

export default TermsOfUse;