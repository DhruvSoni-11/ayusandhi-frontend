// Footer.jsx
import React from 'react';

const Footer = ({ navigateToPage }) => (
  <footer className="bg-gradient-to-r from-green-900 via-green-800 to-yellow-900 text-white relative overflow-hidden pt-8">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div 
        className="h-full w-full"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="%23ffffff" fill-opacity="0.2"><circle cx="30" cy="30" r="2"/></g></svg>')`,
          backgroundSize: '30px 30px'
        }}
      />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {/* Brand Column */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-green-900 font-bold text-xl">🌿</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold ayur-title">AyuSandhi</h3>
              <p className="text-green-200 text-sm">Traditional Wisdom Meets Modern Medicine</p>
            </div>
          </div>

          <p className="text-green-100 leading-relaxed mb-6 max-w-md">
            Bridging ancient Ayurvedic knowledge with contemporary healthcare through 
            comprehensive terminology mapping and international standards compliance.
          </p>

          <div className="flex gap-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm border border-white/30">
              Ministry of AYUSH
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm border border-white/30">
              WHO Compliant
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-yellow-300">Quick Links</h4>
          <ul className="space-y-2 text-green-200">
            <li><button onClick={() => navigateToPage('home')} className="hover:text-white transition-colors text-left">Search Terms</button></li>
            <li><button onClick={() => navigateToPage('api-docs')} className="hover:text-white transition-colors text-left">API Documentation</button></li>
            <li><button onClick={() => navigateToPage('about-ayurveda')} className="hover:text-white transition-colors text-left">About Ayurveda</button></li>
            <li><button onClick={() => navigateToPage('benefits')} className="hover:text-white transition-colors text-left">Benefits & Use Cases</button></li>
          </ul>
        </div>

        {/* Additional Resources */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-yellow-300">Resources</h4>
          <ul className="space-y-2 text-green-200">
            <li><button onClick={() => navigateToPage('contact')} className="hover:text-white transition-colors text-left">Contact Us</button></li>
            <li><button onClick={() => navigateToPage('research')} className="hover:text-white transition-colors text-left">Research Papers</button></li>
            <li><button onClick={() => navigateToPage('collaboration')} className="hover:text-white transition-colors text-left">Institutional Access</button></li>
            <li><button onClick={() => navigateToPage('support')} className="hover:text-white transition-colors text-left">Support Center</button></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-yellow-300">Contact</h4>
          <ul className="space-y-2 text-green-200 text-sm">
            <li>Ministry of AYUSH</li>
            <li>Government of India</li>
            <li>ayusandhi@gov.in</li>
            <li>+91-11-2345-6789</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-white/20 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-200 mb-4 md:mb-0">
            © {new Date().getFullYear()} Ministry of AYUSH — National Digital Health Mission
          </p>
          <p className="text-sm text-green-300">
            Empowering healthcare through traditional wisdom and modern technology
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
