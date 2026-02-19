import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-between text-center md:flex-row md:text-left">
        <div className="mb-4 md:mb-0">
          <p className="text-lg font-semibold">Family Guards</p>
          <span className="text-sm">Your Trusted Partner For Life Insurance</span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <Link to="/privacy-policy" className="text-gray-400 hover:underline hover:text-gray-300">Privacy Policy</Link>
          <Link to="/terms-of-use" className="text-gray-400 hover:underline hover:text-gray-300">Terms of Use</Link>
        </div>
        <div className="mt-4 md:mt-0 text-sm text-gray-400">
          <span>&copy; {new Date().getFullYear()} Family Guards. All rights reserved.</span>
        </div>
      </div>
    </footer>;
};
export default Footer;