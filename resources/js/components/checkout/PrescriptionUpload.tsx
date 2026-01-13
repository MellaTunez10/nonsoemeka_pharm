'use client';

import React, { useState } from 'react';
import { uploadPrescription } from '@/lib/axios';

interface Props {
  orderId: string;
  onSuccess: (path: string) => void;
  onCancel: () => void;
}

export default function PrescriptionUpload({ orderId, onSuccess, onCancel }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const response = await uploadPrescription(orderId, file, (p) => setProgress(p));
      onSuccess(response.data.path);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload prescription. Please try again.');
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Prescription Required</h2>
      <p className="text-gray-500 mb-6 text-sm">
        To comply with PCN and NAFDAC regulations, a valid doctor's prescription is required for one or more items in your cart.
      </p>

      {!file ? (
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
          }}
          className="border-2 border-dashed border-blue-200 rounded-xl p-10 text-center hover:border-blue-400 transition-colors cursor-pointer bg-blue-50/50"
        >
          <input 
            type="file" 
            id="prescription-file" 
            className="hidden" 
            accept="image/*,.pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <label htmlFor="prescription-file" className="cursor-pointer">
            <div className="text-blue-600 mb-4 flex justify-center">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <p className="text-blue-700 font-medium">Click to upload or drag & drop</p>
            <p className="text-gray-400 text-xs mt-1">PNG, JPG or PDF up to 10MB</p>
          </label>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between border border-gray-200">
          <div className="flex items-center space-x-3 overflow-hidden">
             <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
             </div>
             <div className="truncate">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
             </div>
          </div>
          <button 
            onClick={() => setFile(null)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {uploading && (
        <div className="mt-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-red-600 font-medium">{error}</p>}

      <div className="mt-8 flex space-x-3">
        <button 
          onClick={onCancel}
          disabled={uploading}
          className="flex-1 py-3 px-4 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all disabled:opacity-50"
        >
          Cancel
        </button>
        <button 
          onClick={handleUpload}
          disabled={!file || uploading}
          className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg shadow-blue-200 transition-all disabled:opacity-50 disabled:shadow-none"
        >
          Confirm & Pay
        </button>
      </div>
    </div>
  );
}
