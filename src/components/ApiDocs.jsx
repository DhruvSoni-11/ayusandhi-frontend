import React, { useState, useEffect } from "react";
import {
  Book,
  Code,
  Globe,
  FileText,
  ExternalLink,
  Copy,
  CheckCircle,
} from "lucide-react";
import MotionDiv from "./MotionDiv";

const ApiDocs = ({ onClose, initialSection = "overview", onNavigate }) => {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [copiedCode, setCopiedCode] = useState("");

  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  const handleClose = () => {
    if (typeof onClose === "function") onClose();
    else if (typeof onNavigate === "function") onNavigate("search");
  };

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(""), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const CodeBlock = ({ code, language = "javascript", id }) => (
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
      title: "API Overview",
      icon: Book,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-3">
              AYUSandhi Backend API
            </h3>
            <p className="text-gray-700 leading-relaxed">
              The AYUSandhi Backend API bridges traditional Ayurvedic wisdom
              with modern healthcare standards through OCR, terminology mapping,
              and ICD-11 compliance. It offers endpoints for terminology
              management, document scanning, and image regeneration.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3">Base URLs</h4>
              <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono block">
                Development: http://localhost:5000
              </code>
              <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono block mt-2">
                Production: https://ayusandhi-backend.vercel.app
              </code>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3">Response Format</h4>
              <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                application/json
              </code>
            </div>
          </div>
        </div>
      ),
    },

    endpoints: {
      title: "API Endpoints",
      icon: Code,
      content: (
        <div className="space-y-8">
          {/* Health Check */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                GET
              </span>
              <h3 className="text-xl font-bold text-gray-800">/ & /health</h3>
            </div>
            <p className="text-gray-600 mb-3">
              Simple health and status check for the backend server.
            </p>
            <CodeBlock
              id="health"
              language="json"
              code={`{
  "status": "ok"
}`}
            />
          </div>

          {/* Terminology Search */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                GET
              </span>
              <h3 className="text-xl font-bold text-gray-800">
                /api/v1/terminology/search?query=
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Search for medical terminology using natural language queries.
            </p>
            <CodeBlock
              id="search"
              code={`GET /api/v1/terminology/search?query=fever`}
            />
            <CodeBlock
              id="search-resp"
              language="json"
              code={`{
  "query": "fever",
  "total_results": 1,
  "results": [
    {
      "namaste_code": "AYUR001",
      "display_name": "Jwara (Fever)",
      "english_name": "Fever",
      "hindi_name": "ज्वर",
      "category": "Symptoms",
      "medical_system": "Ayurveda"
    }
  ]
}`}
            />
          </div>

          {/* Terminology Lookup */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                GET
              </span>
              <h3 className="text-xl font-bold text-gray-800">
                /api/v1/terminology/lookup/&#123;code&#125;
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Retrieve detailed information for a specific NAMASTE code.
            </p>
            <CodeBlock
              id="lookup"
              language="json"
              code={`{
  "namaste_code": "AYUR001",
  "display_name": "Jwara (Fever)",
  "definition": "Elevated body temperature due to dosha imbalance",
  "icd11_mappings": {
    "tm2_code": "TM2.001",
    "biomedicine_code": "R50.9"
  }
}`}
            />
          </div>

          {/* Data Seeding */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                POST
              </span>
              <h3 className="text-xl font-bold text-gray-800">
                /api/v1/terminology/seed
              </h3>
            </div>
            <p className="text-gray-600">
              Insert bulk terminology data for database initialization.
            </p>
          </div>

          {/* Delete All */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                DELETE
              </span>
              <h3 className="text-xl font-bold text-gray-800">
                /api/v1/terminology/deleteAll
              </h3>
            </div>
            <p className="text-gray-600">
              Deletes all terminology records from the database.
            </p>
          </div>

          {/* Scan Report */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-bold">
                POST
              </span>
              <h3 className="text-xl font-bold text-gray-800">
                /api/v2/scan/report
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Upload and analyze medical documents using OCR and terminology
              extraction. Requires API key.
            </p>
            <CodeBlock
              id="scan-resp"
              language="json"
              code={`{
  "success": true,
  "fileName": "report.pdf",
  "detectedCondition": "Past Jwara",
  "namasteCode": "AYUR001",
  "icdCode": "R50.9",
  "updatedImageUrl": "https://res.cloudinary.com/...",
  "processingTime": "2.3s"
}`}
            />
          </div>

          {/* Regenerate Image */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-bold">
                POST
              </span>
              <h3 className="text-xl font-bold text-gray-800">
                /api/v2/regenerate-image
              </h3>
            </div>
            <p className="text-gray-600">
              Adds NAMASTE and ICD codes as overlays to existing images via
              Cloudinary.
            </p>
          </div>
        </div>
      ),
    },

    authentication: {
      title: "Authentication",
      icon: Globe,
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-green-800 mb-3">
              API Key Authentication
            </h3>
            <p className="text-green-700">
              Public endpoints (like terminology search) are open access.
              Secure routes such as <code>/api/v2/scan/report</code> and{" "}
              <code>/api/v2/regenerate-image</code> require an API key passed in
              the header:
            </p>
            <CodeBlock
              id="auth-header"
              language="http"
              code={`apikey: your_api_key_here`}
            />
          </div>
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <h4 className="font-bold text-yellow-800 mb-2">
              Future Enhancements
            </h4>
            <p className="text-yellow-700">
              Additional authentication tiers will be introduced for bulk data
              export and advanced analytics.
            </p>
          </div>
        </div>
      ),
    },

    examples: {
      title: "Code Examples",
      icon: FileText,
      content: (
        <div className="space-y-6">
          <CodeBlock
            id="js"
            language="javascript"
            code={`// Search Example
fetch('https://ayusandhi-backend.vercel.app/api/v1/terminology/search?query=fever')
  .then(res => res.json())
  .then(console.log);`}
          />
          <CodeBlock
            id="curl"
            language="bash"
            code={`# Lookup Code
curl -X GET "https://ayusandhi-backend.vercel.app/api/v1/terminology/lookup/AYUR001" \\
  -H "Accept: application/json"`}
          />
        </div>
      ),
    },
  };

  const sectionItems = [
    { key: "overview", label: "Overview", icon: Book },
    { key: "endpoints", label: "Endpoints", icon: Code },
    { key: "authentication", label: "Authentication", icon: Globe },
    { key: "examples", label: "Examples", icon: FileText },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-full max-h-[90vh] flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-green-50 to-green-100 border-r border-green-200 p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-green-800 ayur-title">
              API Documentation
            </h2>
            <button
              onClick={handleClose}
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
                    ? "bg-green-200 text-green-800 font-semibold"
                    : "text-green-700 hover:bg-green-150"
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
              Contact our API support team.
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
                className: "w-8 h-8 text-green-600",
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
