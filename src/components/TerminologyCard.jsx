import { ArrowLeft, Award, Book, Clock, FileText, Globe, Heart, Shield, Tag, TreePine } from 'lucide-react';
import React from 'react';
import MotionDiv from './MotionDiv';

const TerminologyCard = ({ terminology, onBack }) => {
  if (!terminology) return null;

  const InfoSection = ({ title, children, icon: Icon, bgColor = "bg-gray-50" }) => (
    <MotionDiv
      className="mb-8"
      initial="initial"
      animate="animate"
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center mb-4">
        {Icon && <Icon className="w-6 h-6 text-orange-600 mr-3" />}
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <div className={`${bgColor} rounded-lg p-5 border border-gray-200`}>
        {children}
      </div>
    </MotionDiv>
  );

  const formatArray = (arr) => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) return 'Not specified';
    return arr.join(', ');
  };

  const formatDoshaInvolvement = (dosha) => {
    if (!dosha) return 'Not specified';
    if (typeof dosha === 'string') return dosha;

    let result = '';
    if (dosha.primary) result += `Primary: ${dosha.primary}`;
    if (dosha.secondary && dosha.secondary.length > 0) {
      if (result) result += ', ';
      result += `Secondary: ${dosha.secondary.join(', ')}`;
    }
    return result || 'Not specified';
  };

  const formatICD11Mappings = (mappings) => {
    if (!mappings) return null;

    return (
      <div className="space-y-4">
        {mappings.tm2_code && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="font-bold text-blue-900 mb-2">TM2 Classification</div>
            <div className="text-sm space-y-1">
              <div><span className="font-medium">Code:</span> {mappings.tm2_code}</div>
              {mappings.tm2_display && <div><span className="font-medium">Display:</span> {mappings.tm2_display}</div>}
            </div>
          </div>
        )}
        {mappings.biomedicine_code && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="font-bold text-green-900 mb-2">Biomedicine Mapping</div>
            <div className="text-sm space-y-1">
              <div><span className="font-medium">Code:</span> {mappings.biomedicine_code}</div>
              {mappings.biomedicine_display && <div><span className="font-medium">Display:</span> {mappings.biomedicine_display}</div>}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4">
        <MotionDiv
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={onBack}
            className="flex -ml-40 text-orange-600 hover:text-orange-800 mb-8 transition-colors font-medium"
            aria-label="Back to search"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Search
          </button>

          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8">
            <div className="mb-10 border-b pb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {terminology.display_name || 'No display name available'}
                  </h1>
                  <div className="grid md:grid-cols-3 gap-6">
                    {terminology.english_name && (
                      <div>
                        <span className="font-semibold text-blue-600 block mb-1">English Name:</span>
                        <p className="text-gray-900 text-lg">{terminology.english_name}</p>
                      </div>
                    )}
                    {terminology.hindi_name && (
                      <div>
                        <span className="font-semibold text-green-600 block mb-1">हिंदी नाम:</span>
                        <p className="text-gray-900 text-lg">{terminology.hindi_name}</p>
                      </div>
                    )}
                    {terminology.namaste_code && (
                      <div>
                        <span className="font-semibold text-orange-600 block mb-1">NAMASTE Code:</span>
                        <p className="text-gray-900 font-mono text-lg bg-gray-100 px-3 py-2 rounded">{terminology.namaste_code}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-8">
                  <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 text-center">
                    <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-orange-800">Government</p>
                    <p className="text-sm text-orange-700">Verified</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid xl:grid-cols-2 gap-10">
              <div className="space-y-8">
                <InfoSection title="Medical Classification" icon={Tag} bgColor="bg-orange-50">
                  <div className="space-y-3">
                    {terminology.medical_system && (
                      <p className="flex justify-between"><span className="font-semibold">Medical System:</span> <span>{terminology.medical_system}</span></p>
                    )}
                    {terminology.category && (
                      <p className="flex justify-between"><span className="font-semibold">Category:</span> <span>{terminology.category}</span></p>
                    )}
                    {terminology.subcategory && (
                      <p className="flex justify-between"><span className="font-semibold">Subcategory:</span> <span>{terminology.subcategory}</span></p>
                    )}
                  </div>
                </InfoSection>

                {terminology.definition && (
                  <InfoSection title="Clinical Definition" icon={FileText} bgColor="bg-blue-50">
                    <p className="leading-relaxed text-gray-800 text-lg">{terminology.definition}</p>
                  </InfoSection>
                )}

                {terminology.synonyms && terminology.synonyms.length > 0 && (
                  <InfoSection title="Alternative Names" icon={Book} bgColor="bg-green-50">
                    <div className="flex flex-wrap gap-2">
                      {terminology.synonyms.map((synonym, index) => (
                        <span key={index} className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {synonym}
                        </span>
                      ))}
                    </div>
                  </InfoSection>
                )}
              </div>

              <div className="space-y-8">
                {terminology.clinical_features && terminology.clinical_features.length > 0 && (
                  <InfoSection title="Clinical Features" icon={Heart} bgColor="bg-red-50">
                    <ul className="space-y-3">
                      {terminology.clinical_features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                          <span className="text-gray-800 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </InfoSection>
                )}

                {terminology.traditional_symptoms && terminology.traditional_symptoms.length > 0 && (
                  <InfoSection title="Traditional Symptoms" icon={TreePine} bgColor="bg-emerald-50">
                    <ul className="space-y-3">
                      {terminology.traditional_symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-3 h-3 bg-emerald-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                          <span className="text-gray-800 font-medium">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </InfoSection>
                )}

                {terminology.dosha_involvement && (
                  <InfoSection title="Ayurvedic Analysis" icon={Globe} bgColor="bg-purple-50">
                    <div className="text-gray-800 font-medium text-lg">
                      {formatDoshaInvolvement(terminology.dosha_involvement)}
                    </div>
                  </InfoSection>
                )}
              </div>
            </div>

            {terminology.icd11_mappings && (
              <div className="mt-10 pt-8 border-t border-gray-200">
                <InfoSection title="International Classification (ICD-11)" icon={Globe} bgColor="bg-indigo-50">
                  {formatICD11Mappings(terminology.icd11_mappings)}
                </InfoSection>
              </div>
            )}

            {terminology.who_international_terminology && (
              <div className="mt-8">
                <InfoSection title="WHO International Terminology" icon={Award} bgColor="bg-yellow-50">
                  <div className="space-y-3">
                    {terminology.who_international_terminology.code && (
                      <p className="font-mono text-sm bg-white p-3 rounded border">
                        <span className="font-semibold">Code:</span> {terminology.who_international_terminology.code}
                      </p>
                    )}
                    {terminology.who_international_terminology.display && (
                      <p className="font-medium text-lg">{terminology.who_international_terminology.display}</p>
                    )}
                    {terminology.who_international_terminology.definition && (
                      <p className="text-gray-700">{terminology.who_international_terminology.definition}</p>
                    )}
                  </div>
                </InfoSection>
              </div>
            )}

            <div className="mt-10 pt-8 border-t border-gray-200 flex justify-between items-center">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-medium">Last Updated: {terminology.last_updated ? new Date(terminology.last_updated).toLocaleDateString() : 'Not specified'}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${terminology.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                  {terminology.status === 'active' ? '✓ Active' : terminology.status || 'Unknown'}
                </span>
                <div className="flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="text-sm font-bold">Government Verified</span>
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default TerminologyCard;
