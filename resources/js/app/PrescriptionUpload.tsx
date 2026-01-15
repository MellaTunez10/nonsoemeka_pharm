import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Head, Link } from '@inertiajs/react';

export default function PrescriptionUpload() {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false); 
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const removeFile = () => setSelectedFile(null);

    return (
        <main className="min-h-screen bg-gray-50/50">
            <Head title="Upload Prescription" />
            <Navbar />

            <section className="container-custom py-16 md:py-24">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Info Side */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 py-1.5 px-4 rounded-full text-xs font-bold uppercase tracking-widest">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Official Healthcare Portal</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Quick & Secure <br />
                            <span className="text-emerald-600">Prescription Refill.</span>
                        </h1>
                        
                        <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
                            Upload a photo or PDF of your doctor's prescription. Our licensed pharmacists will review it and contact you within 15 minutes to confirm your order.
                        </p>

                        <div className="space-y-6">
                            {[
                                { title: 'Authenticity Check', desc: 'Verified by PCN licensed pharmacists.', icon: '🛡️' },
                                { title: 'Fast Processing', desc: 'Reviewed and confirmed in 15-20 mins.', icon: '⚡' },
                                { title: 'Doorstep Delivery', desc: 'Nationwide delivery with priority tracking.', icon: '🏠' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <span className="text-2xl">{item.icon}</span>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upload Side */}
                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-2xl relative">
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
                        
                        <div className="space-y-8 relative z-10">
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-bold text-gray-900">Upload Document</h3>
                                <p className="text-gray-400 text-sm">JPG, PNG, or PDF files accepted (Max 10MB)</p>
                            </div>

                            <form 
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                className={`relative group border-2 border-dashed rounded-3xl p-12 transition-all flex flex-col items-center justify-center gap-6 ${dragActive ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-200 hover:border-emerald-300'}`}
                            >
                                {selectedFile ? (
                                    <div className="flex flex-col items-center gap-4 animate-in zoom-in duration-300">
                                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-gray-900 font-bold">{selectedFile.name}</p>
                                            <p className="text-gray-400 text-xs mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={removeFile}
                                            className="text-rose-500 text-xs font-bold uppercase tracking-widest hover:text-rose-600 transition-colors"
                                        >
                                            Remove File
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                        </div>
                                        
                                        <div className="text-center">
                                            <p className="text-gray-900 font-bold">Click to upload or drag & drop</p>
                                            <p className="text-gray-400 text-xs mt-1">Place your prescription clearly on a flat surface</p>
                                        </div>
                                    </>
                                )}

                                <input 
                                    type="file" 
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                />
                            </form>

                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">Phone Number</label>
                                    <input type="tel" placeholder="e.g. 0801 234 5678" className="w-full bg-gray-50 border-gray-100 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                                </div>
                                <button className="w-full bg-emerald-600 text-white font-bold py-5 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-2 group">
                                    <span>Submit for Review</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>

                            <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">
                                Confidential & Secure Privacy Guaranteed
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
