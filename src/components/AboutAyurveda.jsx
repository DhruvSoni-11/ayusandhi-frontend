import React from "react";
import "./AboutAyurveda.css";

const AboutAyurveda = ({ onClose }) => (
  <div className="about-ayurveda-modal fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
    <div className="about-ayurveda-content bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative text-gray-900">
      <button
        className="close-btn absolute top-4 right-4 text-2xl text-green-900 hover:text-yellow-600"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
      <h2 className="text-2xl font-bold mb-4 text-green-900">About Ayurveda</h2>
      <p className="mb-4">
        <strong>Ayurveda</strong> is an ancient Indian system of medicine that emphasizes holistic health and harmony between body, mind, and spirit. It is based on balancing three fundamental energies (doshas): <strong>Vata</strong>, <strong>Pitta</strong>, and <strong>Kapha</strong>. Ayurveda uses natural remedies, diet, lifestyle, and therapies to prevent and treat illness, focusing on personalized care for each individual.
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Holistic approach: Treats the root cause, not just symptoms.</li>
        <li>Personalized care: Recommendations based on your unique constitution.</li>
        <li>Natural remedies: Herbs, oils, and therapies from nature.</li>
        <li>Lifestyle guidance: Diet, exercise, and daily routines for optimal health.</li>
      </ul>
      <p>
        Ayurveda is recognized globally for its preventive approach and natural healing methods. By understanding your dosha and following Ayurvedic principles, you can achieve balance, prevent disease, and promote longevity.
      </p>
    </div>
  </div>
);

export default AboutAyurveda;