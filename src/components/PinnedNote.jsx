// src/components/PinnedNote.jsx
import { Download } from "lucide-react";
import { motion } from "framer-motion";

const PinnedNote = ({ imageSrc, downloadName }) => {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = imageSrc;
    a.download = downloadName || "note-image.png";
    a.click();
  };

  return (
    <motion.div
      className="fixed top-28 left-5 z-50"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Pin circle
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-4 h-4 bg-red-600 rounded-full border border-red-800 shadow-md"></div>
      </div> */}

      {/* Sticky Note Card */}
      <div className="bg-yellow-100 text-gray-800 rounded-lg shadow-lg border border-yellow-300 p-4 w-72 transform rotate-1 hover:rotate-0 transition-transform duration-300">
        <p className="font-semibold mb-3 text-center text-yellow-900">Download Sample Image</p>
        <img
          src={imageSrc}
          alt="Notification"
          className="rounded-md shadow mb-3 w-full h-25"
        />
        <button
          onClick={handleDownload}
          className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold px-4 py-2 rounded-md w-full transition-all flex items-center justify-center gap-2 shadow"
        >
          <Download className="w-4 h-4" />
          Download Image
        </button>
      </div>
    </motion.div>
  );
};

export default PinnedNote;
