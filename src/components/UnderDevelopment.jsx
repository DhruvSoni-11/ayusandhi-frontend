import React from 'react';
import { Construction, Clock, ArrowRight } from 'lucide-react';
import MotionDiv from './MotionDiv';

const logoPlaceholderUrl = "./logo.png";
const UnderDevelopment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex items-center justify-center px-4">
      <MotionDiv className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
          {/* Icon */}
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <img
                src={logoPlaceholderUrl}
                alt="AyuSandhi Logo"
                className="relative h-17 w-17 object-contain "
                onError={(e) => { e.target.onerror = null; e.target.src = logoPlaceholderUrl; }}
              />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Website Under Development
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8">
            We're working hard to bring you an amazing experience. Our team is building something special that will be worth the wait.
          </p>

          {/* Features Coming Soon */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              Features Coming Soon
            </h2>
            <ul className="space-y-3 text-left max-w-md mx-auto">
              {[
                'Advanced terminology search',
                'Multi-language support',
                'Interactive visualizations',
                'Mobile application',
                'API integration tools'
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <ArrowRight className="w-4 h-4 text-green-600 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-sm text-gray-600">
            <p>For inquiries, please contact:</p>
            <a 
              href="mailto:contact@ayusandhi.com" 
              className="text-green-600 hover:text-green-700 font-medium"
            >
              contact@ayusandhi.com
            </a>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
};

export default UnderDevelopment;