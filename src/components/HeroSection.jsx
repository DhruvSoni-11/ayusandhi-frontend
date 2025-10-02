import React from 'react';
import MotionDiv from './MotionDiv';

const HeroSection = () => (
  <div className="relative">
    {/* Background image */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-100"
      style={{ backgroundImage: "url('/ayurveda_image.png')" }}
    ></div>

    {/* Overlay (optional for better text readability) */}
    <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/60"></div>

    {/* Content */}
    <div className="relative py-24">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <MotionDiv
          className="mb-12"
          initial="initial"
          animate="animate"
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            The Best <span className="text-green-700">Ayurvedic & Medical Services</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
            Trusted Healthcare Terminology Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Bridging traditional Ayurvedic wisdom with modern medical standards
            through comprehensive terminology mapping and ICD-11 compliance.
          </p>
        </MotionDiv>

        <MotionDiv
          className="mt-10"
          initial="initial"
          animate="animate"
          transition={{ duration: 1, delay: 0.3 }}
        >

        </MotionDiv>
      </div>
    </div>
  </div>
);

export default HeroSection;