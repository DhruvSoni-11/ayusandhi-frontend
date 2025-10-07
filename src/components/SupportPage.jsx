import React, { useState, useEffect} from 'react';
import { HelpCircle, MessageCircle, Book, Video, Search, ChevronDown, ChevronRight, Phone, Mail, Clock } from 'lucide-react';
import MotionDiv from './MotionDiv';

const SupportPage = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      category: "API & Technical",
      questions: [
        {
          question: "What are the API rate limits?",
          answer: "Public API allows 1000 requests per hour per IP address. Search endpoint is limited to 100 requests per minute, while lookup endpoint allows 200 requests per minute."
        },
        {
          question: "Is there offline access available?",
          answer: "Currently, we don't offer offline access. However, institutional partners can request bulk data exports for internal use. Contact our partnerships team for more information."
        },
        {
          question: "How do I report API issues or bugs?",
          answer: "Please report technical issues to api-support@ayusandhi.gov.in with detailed information about the error, including request/response data and timestamps."
        }
      ]
    },
  ];

  const supportChannels = [
    {
      icon: MessageCircle,
      title: "Live Chat Support",
      description: "Get instant help from our support team",
      availability: "Mon-Fri, 9 AM - 6 PM IST",
      action: "Start Chat",
      color: "bg-blue-500"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions or feedback",
      availability: "Response within 24 hours",
      action: "Send Email",
      color: "bg-green-500"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our technical team",
      availability: "Mon-Fri, 10 AM - 5 PM IST",
      action: "Call Now",
      color: "bg-purple-500"
    },
    {
      icon: Video,
      title: "Video Consultation",
      description: "Schedule a one-on-one session",
      availability: "By appointment only",
      action: "Book Session",
      color: "bg-orange-500"
    }
  ];

  const resources = [
    {
      title: "API Documentation",
      description: "Complete guide to using our APIs",
      icon: Book,
      link: "#api-docs"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      icon: Video,
      link: "#tutorials"
    },
    {
      title: "Integration Examples",
      description: "Sample code and implementations",
      icon: MessageCircle,
      link: "#examples"
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 ayur-pattern pt-24">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <MotionDiv
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full mb-8">
            <HelpCircle className="w-5 h-5" />
            <span className="font-semibold">Support Center</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 ayur-title">
            How Can We <span className="text-green-700">Help You</span>?
          </h1>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Find answers, get support, and learn how to make the most of AyuSandhi's 
            comprehensive Ayurvedic terminology database.
          </p>

          {/* Search Bar
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help topics, APIs, features..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-full text-lg focus:border-green-500 focus:outline-none transition-all bg-white shadow-sm"
            />
          </div> */}
        </MotionDiv>

        {/* Support Channels */}
        <MotionDiv
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 ayur-title">
              Get Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the support channel that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group hover:scale-105"
              >
                <div className={`w-16 h-16 ${channel.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <channel.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {channel.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {channel.description}
                </p>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4" />
                  {channel.availability}
                </div>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors">
                  {channel.action}
                </button>
              </div>
            ))}
          </div>
        </MotionDiv>

        {/* FAQ Section */}
        <MotionDiv
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 ayur-title">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions about AyuSandhi
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {filteredFaqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 ayur-title">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const faqId = `${categoryIndex}-${faqIndex}`;
                    const isOpen = openFaq === faqId;
                    
                    return (
                      <div
                        key={faqIndex}
                        className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : faqId)}
                          className="w-full flex items-center justify-between p-6 text-left"
                        >
                          <span className="font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </span>
                          {isOpen ? (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </MotionDiv>

        {/* Resources */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 ayur-title">
              Helpful Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Additional resources to help you get the most out of AyuSandhi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <resource.icon className="w-12 h-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {resource.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </MotionDiv>

        {/* Contact CTA
        <MotionDiv
          className="bg-gradient-to-r from-green-600 via-green-700 to-blue-600 rounded-3xl p-12 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6 ayur-title">
            Still Need Help?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Our dedicated support team is here to help you succeed with AyuSandhi. 
            Don't hesitate to reach out with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-700 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors">
              Contact Support Team
            </button>
            <button className="bg-green-800 text-white font-bold py-4 px-8 rounded-full hover:bg-green-900 transition-colors border border-green-500">
              Schedule Technical Call
            </button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-green-400/30">
            <p className="text-green-200 text-sm">
              For urgent technical issues, call our 24/7 helpline at{" "}
              <span className="font-semibold text-white">+91-1800-11-AYUSH</span>
            </p>
          </div>
        </MotionDiv> */}
      </div>
    </div>
  );
};

export default SupportPage;
