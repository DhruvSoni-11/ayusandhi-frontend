import React, { useState } from 'react';
import { Book, Code, Globe, Search, FileText, Download, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import MotionDiv from './MotionDiv';

const ApiDocs = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedCode, setCopiedCode] = useState('');

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const CodeBlock = ({ code, language = 'javascript', id }) => (
    <div className="relative bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-400 uppercase">{language}</span>
        <button
          onClick={() => copyToClipboard(code, id)}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
        >
          {copiedCode === id ? (
            <>
              <CheckCircle className="w-3 h-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="text-green-300">
        <code>{code}</code>
      </pre>
    </div>
  );

  const sections = {
    overview: {
      title: 'API Overview',
      icon: Book,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-3">AyuSandhi Terminology API</h3>
            <p className="text-gray-700 leading-relaxed">
              The AyuSandhi API provides comprehensive access to Ayurvedic medical terminology, 
              ICD-11 mappings, and traditional healthcare classifications. Our RESTful API enables 
              seamless integration of authentic Ayurvedic knowledge into modern healthcare systems.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3">Base URL</h4>
              <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                https://ayusandhi-backend.vercel.app/api/v1
              </code>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3">Response Format</h4>
              <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                application/json
              </code>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <h4 className="font-bold text-yellow-800 mb-2">🔄 API Status</h4>
            <p className="text-yellow-700">
              This API is actively maintained by the Ministry of AYUSH in collaboration with the 
              National Digital Health Mission. All terminology is government-verified and follows 
              international healthcare standards.
            </p>
          </div>
        </div>
      )
    },
    endpoints: {
      title: 'API Endpoints',
      icon: Code,
      content: (
        <div className="space-y-8">
          {/* Search Endpoint */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">GET</span>
              <h3 className="text-xl font-bold text-gray-800">/terminology/search</h3>
            </div>
            <p className="text-gray-600 mb-4">Search for medical terminology using natural language queries.</p>
            
            <h4 className="font-bold text-gray-800 mb-2">Parameters</h4>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-semibold">Parameter</th>
                    <th className="text-left py-2 font-semibold">Type</th>
                    <th className="text-left py-2 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-mono">query</td>
                    <td className="py-2">string</td>
                    <td className="py-2">Search term (minimum 2 characters)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-bold text-gray-800 mb-2">Example Request</h4>
            <CodeBlock
              id="search-example"
              code={`GET /api/v1/terminology/search?query=fever

// Using JavaScript fetch
const response = await fetch(
  'https://ayusandhi-backend.vercel.app/api/v1/terminology/search?query=fever'
);
const data = await response.json();
console.log(data.results);`}
            />

            <h4 className="font-bold text-gray-800 mb-2 mt-4">Example Response</h4>
            <CodeBlock
              id="search-response"
              language="json"
              code={`{
  "results": [
    {
      "namaste_code": "AYUR001",
      "display_name": "Jwara (Fever)",
      "english_name": "Fever",
      "hindi_name": "ज्वर",
      "category": "Symptoms",
      "medical_system": "Ayurveda"
    }
  ],
  "total_count": 1,
  "query": "fever"
}`}
            />
          </div>

          {/* Lookup Endpoint */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">GET</span>
              <h3 className="text-xl font-bold text-gray-800">/terminology/lookup/{`{code}`}</h3>
            </div>
            <p className="text-gray-600 mb-4">Get detailed information for a specific NAMASTE code.</p>
            
            <h4 className="font-bold text-gray-800 mb-2">Parameters</h4>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-semibold">Parameter</th>
                    <th className="text-left py-2 font-semibold">Type</th>
                    <th className="text-left py-2 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-mono">code</td>
                    <td className="py-2">string</td>
                    <td className="py-2">NAMASTE terminology code</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-bold text-gray-800 mb-2">Example Request</h4>
            <CodeBlock
              id="lookup-example"
              code={`GET /api/v1/terminology/lookup/AYUR001

// Using JavaScript fetch
const response = await fetch(
  'https://ayusandhi-backend.vercel.app/api/v1/terminology/lookup/AYUR001'
);
const terminologyData = await response.json();`}
            />

            <h4 className="font-bold text-gray-800 mb-2 mt-4">Example Response</h4>
            <CodeBlock
              id="lookup-response"
              language="json"
              code={`{
  "namaste_code": "AYUR001",
  "display_name": "Jwara (Fever)",
  "english_name": "Fever",
  "hindi_name": "ज्वर",
  "definition": "Elevated body temperature due to dosha imbalance",
  "clinical_features": [
    "Increased body temperature",
    "Fatigue and weakness",
    "Loss of appetite"
  ],
  "dosha_involvement": {
    "primary": "Pitta",
    "secondary": ["Vata"]
  },
  "icd11_mappings": {
    "tm2_code": "TM2.001",
    "biomedicine_code": "R50.9"
  },
  "status": "active",
  "last_updated": "2024-01-15T10:30:00Z"
}`}
            />
          </div>
        </div>
      )
    },
    authentication: {
      title: 'Authentication',
      icon: Globe,
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-green-800 mb-3">🔓 Open Access API</h3>
            <p className="text-green-700 leading-relaxed">
              The AyuSandhi API is currently open access and does not require authentication. 
              This aligns with our mission to make traditional healthcare knowledge freely accessible 
              to researchers, healthcare providers, and developers worldwide.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-3">Rate Limiting</h4>
            <ul className="text-blue-700 space-y-2">
              <li>• <strong>Public API:</strong> 1000 requests per hour per IP</li>
              <li>• <strong>Search endpoint:</strong> 100 requests per minute</li>
              <li>• <strong>Lookup endpoint:</strong> 200 requests per minute</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <h4 className="font-bold text-yellow-800 mb-3">Future Authentication</h4>
            <p className="text-yellow-700">
              We're planning to introduce API keys for enhanced features like bulk data export, 
              real-time updates, and advanced analytics. Healthcare institutions can 
              <a href="mailto:api@ayusandhi.gov.in" className="underline font-semibold">contact us</a> 
              for early access to these features.
            </p>
          </div>
        </div>
      )
    },
    examples: {
      title: 'Code Examples',
      icon: FileText,
      content: (
        <div className="space-y-8">
          {/* JavaScript Example */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-yellow-500">⚡</span>
              JavaScript / Node.js
            </h3>
            <CodeBlock
              id="js-example"
              code={`// AyuSandhi API Client
class AyuSandhiAPI {
  constructor() {
    this.baseURL = 'https://ayusandhi-backend.vercel.app/api/v1';
  }

  async search(query) {
    try {
      const response = await fetch(
        \`\${this.baseURL}/terminology/search?query=\${encodeURIComponent(query)}\`
      );
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  async lookup(code) {
    try {
      const response = await fetch(
        \`\${this.baseURL}/terminology/lookup/\${encodeURIComponent(code)}\`
      );
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Lookup error:', error);
      throw error;
    }
  }
}

// Usage Example
const api = new AyuSandhiAPI();

// Search for fever-related terms
const feverTerms = await api.search('fever');
console.log(feverTerms);

// Get detailed information
const details = await api.lookup('AYUR001');
console.log(details);`}
            />
          </div>

          {/* Python Example */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-blue-500">🐍</span>
              Python
            </h3>
            <CodeBlock
              id="python-example"
              language="python"
              code={`import requests
import json
from urllib.parse import quote

class AyuSandhiAPI:
    def __init__(self):
        self.base_url = 'https://ayusandhi-backend.vercel.app/api/v1'
    
    def search(self, query):
        """Search for medical terminology"""
        try:
            url = f"{self.base_url}/terminology/search"
            params = {'query': query}
            
            response = requests.get(url, params=params)
            response.raise_for_status()
            
            data = response.json()
            return data.get('results', [])
            
        except requests.exceptions.RequestException as e:
            print(f"Search error: {e}")
            raise
    
    def lookup(self, code):
        """Get detailed terminology information"""
        try:
            url = f"{self.base_url}/terminology/lookup/{quote(code)}"
            
            response = requests.get(url)
            response.raise_for_status()
            
            return response.json()
            
        except requests.exceptions.RequestException as e:
            print(f"Lookup error: {e}")
            raise

# Usage Example
api = AyuSandhiAPI()

# Search for fever-related terms
fever_terms = api.search('fever')
print(json.dumps(fever_terms, indent=2))

# Get detailed information
details = api.lookup('AYUR001')
print(json.dumps(details, indent=2))`}
            />
          </div>

          {/* cURL Example */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-green-500">🔧</span>
              cURL
            </h3>
            <CodeBlock
              id="curl-example"
              language="bash"
              code={`# Search for terminology
curl -X GET "https://ayusandhi-backend.vercel.app/api/v1/terminology/search?query=fever" \\
  -H "Accept: application/json"

# Lookup specific code
curl -X GET "https://ayusandhi-backend.vercel.app/api/v1/terminology/lookup/AYUR001" \\
  -H "Accept: application/json"

# Search with special characters (URL encoded)
curl -X GET "https://ayusandhi-backend.vercel.app/api/v1/terminology/search?query=ज्वर" \\
  -H "Accept: application/json"`}
            />
          </div>
        </div>
      )
    }
  };

  const sectionItems = [
    { key: 'overview', label: 'Overview', icon: Book },
    { key: 'endpoints', label: 'Endpoints', icon: Code },
    { key: 'authentication', label: 'Authentication', icon: Globe },
    { key: 'examples', label: 'Examples', icon: FileText }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-full max-h-[90vh] flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-green-50 to-green-100 border-r border-green-200 p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-green-800 ayur-title">API Documentation</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              ✕
            </button>
          </div>
          
          <nav className="space-y-2">
            {sectionItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === key
                    ? 'bg-green-200 text-green-800 font-semibold'
                    : 'text-green-700 hover:bg-green-150'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </nav>

          <div className="mt-8 p-4 bg-white rounded-lg border border-green-200">
            <h4 className="font-bold text-green-800 mb-2">Need Help?</h4>
            <p className="text-sm text-green-600 mb-3">
              Contact our API support team for assistance.
            </p>
            <a
              href="mailto:api@ayusandhi.gov.in"
              className="inline-flex items-center gap-1 text-sm text-green-700 hover:text-green-800 font-semibold"
            >
              <ExternalLink className="w-4 h-4" />
              api@ayusandhi.gov.in
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <MotionDiv
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              {React.createElement(sections[activeSection].icon, {
                className: "w-8 h-8 text-green-600"
              })}
              <h1 className="text-3xl font-bold text-gray-900">
                {sections[activeSection].title}
              </h1>
            </div>
            
            {sections[activeSection].content}
          </MotionDiv>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;

