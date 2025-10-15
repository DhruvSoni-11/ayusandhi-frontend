import React from 'react';
import { Leaf, Heart, Globe, Book, Users, Award, TrendingUp, Shield } from 'lucide-react';
import MotionDiv from './MotionDiv';

const StatsSection = () => (
  <div className="relative py-20 bg-gradient-to-b from-white via-green-50 to-yellow-50 ayur-pattern">
    <div className="max-w-7xl mx-auto px-4">
      <MotionDiv
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-2 rounded-full mb-6">
          <Shield className="w-5 h-5" />
          <span className="font-semibold">Government Verified Database</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 ayur-title">
          Preserving <span className="text-green-700">Ancient Wisdom</span>
          <br />
          for <span className="text-yellow-600">Modern Healthcare</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Our comprehensive database bridges the gap between traditional Ayurvedic knowledge 
          and contemporary medical standards, serving healthcare professionals worldwide.
        </p>
      </MotionDiv>

      {/* Main Stats Grid */}
      <MotionDiv
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {[
          { 
            number: "15,000+", 
            label: "Ayurvedic Terms", 
            icon: Leaf, 
            color: "text-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            description: "Authentic Sanskrit terminology with precise translations"
          },
          { 
            number: "2,500+", 
            label: "Clinical Mappings", 
            icon: Heart, 
            color: "text-red-600",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
            description: "Direct correlations with modern medical conditions"
          },
          { 
            number: "1,800+", 
            label: "ICD-11 Classifications", 
            icon: Globe, 
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
            description: "WHO-compliant international standard codes"
          },
          { 
            number: "5", 
            label: "Language Support", 
            icon: Book, 
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
            description: "Sanskrit, Hindi, English, Tamil, and Telugu"
          }
        ].map((stat, index) => (
          <MotionDiv
            key={index}
            className={`ayur-card ${stat.bgColor} ${stat.borderColor} border-2 rounded-2xl p-8 text-center group hover:scale-105`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          >
            <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-3 ayur-title`}>
              {stat.number}
            </div>
            <div className="text-gray-800 font-bold text-lg mb-3">
              {stat.label}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {stat.description}
            </p>
          </MotionDiv>
        ))}
      </MotionDiv>

      {/* Additional Metrics */}
      <MotionDiv
        className="grid md:grid-cols-3 gap-8 mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {[
          {
            icon: Users,
            title: "Healthcare Professionals",
            number: "50,000+",
            subtitle: "Across India & globally",
            color: "text-green-600"
          },
          {
            icon: TrendingUp,
            title: "Research Publications",
            number: "200+",
            subtitle: "Peer-reviewed studies",
            color: "text-blue-600"
          },
          {
            icon: Award,
            title: "Government Recognition",
            number: "Ministry",
            subtitle: "AYUSH certified",
            color: "text-yellow-600"
          }
        ].map((metric, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg text-center group hover:shadow-xl transition-all"
          >
            <metric.icon className={`w-12 h-12 ${metric.color} mx-auto mb-4`} />
            <div className={`text-3xl font-bold ${metric.color} mb-2`}>
              {metric.number}
            </div>
            <div className="text-gray-800 font-semibold mb-1">
              {metric.title}
            </div>
            <div className="text-gray-500 text-sm">
              {metric.subtitle}
            </div>
          </div>
        ))}
      </MotionDiv>

      {/* Trust Indicators */}
      <MotionDiv
        className="bg-gradient-to-r from-green-100 via-yellow-50 to-orange-100 rounded-2xl p-8 text-center border border-green-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-6 h-6 text-green-600" />
          <h3 className="text-2xl font-bold text-gray-800">Trusted by Leading Institutions</h3>
        </div>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our database is the result of collaboration between the Ministry of AYUSH, 
          leading Ayurvedic colleges, and the National Digital Health Mission.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <span className="bg-white px-4 py-2 rounded-full border">All India Institute of Ayurveda</span>
          <span className="bg-white px-4 py-2 rounded-full border">NDHM</span>
          <span className="bg-white px-4 py-2 rounded-full border">Ministry of AYUSH</span>
          <span className="bg-white px-4 py-2 rounded-full border">WHO Collaborating Centers</span>
        </div>
      </MotionDiv>
    </div>
  </div>
);

export default StatsSection;