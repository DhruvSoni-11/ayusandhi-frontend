import React from 'react';
import MotionDiv from './MotionDiv';

const StatsSection = () => (
  <div className="bg-white py-16 border-t border-gray-100 relative">
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-10"
      style={{ backgroundImage: "url('./public/ayurveda_image.png')" ,
            backgroundPosition: 'center top 86%',
}}
    />

    <div className="max-w-6xl mx-auto px-4 relative z-10">
      <MotionDiv
        className="text-center mb-12"
        initial="initial"
        animate="animate"
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Comprehensive Medical Database</h2>
        <p className="text-gray-600 text-lg">Trusted by healthcare professionals across India</p>
      </MotionDiv>

      <MotionDiv
        className="grid md:grid-cols-4 gap-8"
        initial="initial"
        animate="animate"
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {[
          { number: "10,000+", label: "Medical Terms", color: "text-blue-600" },
          { number: "500+", label: "Ayurvedic Concepts", color: "text-green-600" },
          { number: "1,200+", label: "ICD-11 Mappings", color: "text-orange-600" },
          { number: "3", label: "Languages", color: "text-red-600" }
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </MotionDiv>
    </div>
  </div>
);

export default StatsSection;