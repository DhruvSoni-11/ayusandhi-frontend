import React, { useState, useEffect, useCallback } from 'react';
import { Upload, Download, History, Loader, FileScan, RotateCw, FileText, CheckCircle } from 'lucide-react';
import MotionDiv from './MotionDiv';

const ScanReport = () => {
  const [file, setFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('scanHistory');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading scan history:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('scanHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving scan history:', error);
    }
  }, [history]);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  };

  const handleUpload = async (selectedFile) => {
    setScanning(true);
    setError(null);
    setScanResult(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('https://namaste-te4u.onrender.com/api/v2/scan/report', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
        <p>Refresh the page</p>
      }

      const result = await response.json();

      // Create history entry
      const historyEntry = {
        id: Date.now(),
        fileName: selectedFile.name,
        timestamp: new Date().toISOString(),
        downloadUrl: result.downloadUrl,
        result: result
      };

      // Update history state with new entry
      setHistory(prevHistory => {
        const newHistory = [historyEntry, ...prevHistory.slice(0, 9)]; // Keep last 10 entries
        return newHistory;
      });

      setScanResult({
        ...result,
        fileName: selectedFile.name,
        downloadUrl: result.downloadUrl
      });

    } catch (err) {
      console.error('Scan error:', err);
      setError(err.message || 'Failed to scan document. Please try again.');
    } finally {
      setScanning(false);
    }
  };

  const handleAnotherScan = () => {
    setFile(null);
    setScanResult(null);
    setError(null);
  };

  const handleDownload = async () => {
    if (!scanResult?.downloadUrl) {
      setError('Download URL is not available');
      return;
    }

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = scanResult.downloadUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Use the simplified file name
      canvas.toBlob((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `EMR-Report_${scanResult.fileName}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 'image/png');

    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to download file. Please try again.');
    }
  };

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('scanHistory');
  }, []);

  const renderInitialState = () => (
    <div className="text-center flex flex-col items-center justify-center h-full">
      <div className="mb-8">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-200">
          <Upload className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Upload Your Document</h3>
        <p className="text-gray-600">Select a PDF, DOCX, or image file to begin analysis.</p>
      </div>
      <label className="inline-block">
        <input
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
        />
        <span className="bg-green-600 text-white px-8 py-4 rounded-full cursor-pointer hover:bg-green-700 transition-all duration-300 inline-flex items-center gap-3 text-lg font-semibold shadow-lg hover:shadow-xl">
          <FileScan className="w-6 h-6" />
          Choose File
        </span>
      </label>
    </div>
  );

  const renderScanningState = () => (
    <div className="text-center flex flex-col items-center justify-center h-full">
      <div className="relative w-48 h-48 mx-auto mb-8">
        <Loader className="w-24 h-24 text-green-600 animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 border-8 border-green-100 rounded-full"></div>
        <div className="absolute inset-0 border-t-8 border-t-green-500 rounded-full animate-spin"></div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Scanning Document...</h3>
      <p className="text-gray-600">Please wait while we analyze your document.</p>
    </div>
  );

  const renderResultState = () => (
    <div className="text-center flex flex-col items-center justify-center h-full">
      <div className="mb-8">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-200">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Scan Complete!</h3>
        <p className="text-gray-600">Your document has been successfully analyzed.</p>
        {scanResult?.fileName && (
          <p className="text-sm text-gray-600 mt-2">
            File: <span className="font-medium">{scanResult.fileName}</span>
          </p>
        )}
      </div>
      <div className="space-y-4 w-full max-w-sm">
        <button
          onClick={handleDownload}
          className="w-full bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition-all duration-300 inline-flex items-center justify-center gap-3 text-lg font-semibold shadow-lg hover:shadow-xl"
          disabled={!scanResult?.downloadUrl}
        >
          <Download className="w-6 h-6" />
          Download Processed File
        </button>
        <button
          onClick={handleAnotherScan}
          className="w-full bg-gray-100 text-gray-800 px-8 py-4 rounded-full hover:bg-gray-200 transition-colors font-semibold"
        >
          Scan Another Document
        </button>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <div className="flex items-center gap-3">
          <History className="w-6 h-6 text-gray-700" />
          <h3 className="text-2xl font-bold text-gray-800">Scan History</h3>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          No scan history available.
        </div>
      ) : (
        <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-200 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 truncate pr-4">
                  {item.fileName}
                </span>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setScanResult(item.result);
                    setFile({ name: item.fileName });
                    setScanning(false);
                    setError(null);
                  }}
                  className="text-green-600 text-sm font-semibold hover:text-green-800 hover:scale-105 transition-colors"
                >
                  View Result
                </button>
                {item.downloadUrl && (
                  <button
                    onClick={() => handleDownload(item)}
                    className="text-blue-600 text-sm font-semibold hover:text-blue-800 hover:scale-105 transition-colors"
                  >
                    Download
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 pt-30 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <MotionDiv className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 ayur-title">Document Analysis</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload medical reports or prescriptions to extract and map key terminologies automatically.
          </p>
        </MotionDiv>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Scan Section */}
          <MotionDiv className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border border-gray-200 min-h-[500px] flex flex-col">
            {!file && !scanning && !scanResult ? renderInitialState() : null}
            {scanning ? renderScanningState() : null}
            {scanResult ? renderResultState() : null}

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
                <strong>Error:</strong> {error}
              </div>
            )}
          </MotionDiv>

          {/* History Section */}
          <MotionDiv className="lg:col-span-1">
            {renderHistory()}
          </MotionDiv>
        </div>
      </div>
    </div>
  );
};

export default ScanReport;
