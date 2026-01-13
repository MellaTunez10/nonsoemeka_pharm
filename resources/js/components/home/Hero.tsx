import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-emerald-900 section-padding">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-800/30 skew-x-12 translate-x-12 md:translate-x-24" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center space-x-2 bg-emerald-800/50 border border-emerald-700/50 py-1.5 px-4 rounded-full text-emerald-100 text-xs font-bold uppercase tracking-widest">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>24/7 Professional Pharmacy Care</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1]">
            Your Health, <br />
            <span className="text-emerald-400">Our Priority.</span>
          </h1>

          <p className="text-emerald-100/80 text-lg max-w-lg leading-relaxed">
            Order your medications, wellness essentials, and care products with local delivery. Authentic products verified by NAFDAC and PCN.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="btn-primary flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Upload Prescription</span>
            </button>
            <button className="py-3 px-8 rounded-xl border-2 border-emerald-700/50 text-white font-semibold hover:bg-emerald-800 transition-all">
              Browse E-Store
            </button>
          </div>

          <div className="flex items-center space-x-8 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest">Authentic</div>
            </div>
            <div className="w-px h-10 bg-emerald-800" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">20 Min</div>
              <div className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest">Delivery</div>
            </div>
            <div className="w-px h-10 bg-emerald-800" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest">Support</div>
            </div>
          </div>
        </div>

        {/* Hero Image Slider */}
        <div className="relative group">
          <div className="aspect-[4/5] rounded-[2.5rem] bg-emerald-800/50 border border-emerald-700/50 overflow-hidden relative shadow-2xl">
            {[
              '/images/hero/slide_1.png',
              '/images/hero/slide_2.png',
              '/images/hero/slide_3.png'
            ].map((img, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent" />
              </div>
            ))}
            
            {/* Slider Controls */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-20">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-emerald-400' : 'w-2 bg-white/40'}`}
                />
              ))}
            </div>
          </div>
          
          {/* Floating Trust Card */}
          <div className="absolute -bottom-6 -left-6 glass-dark p-6 rounded-2xl border border-white/10 shadow-2xl max-w-xs animate-bounce-slow z-30">
             <div className="flex items-center space-x-4">
                <div className="bg-emerald-500 p-2 rounded-full">
                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                   </svg>
                </div>
                <div>
                   <p className="text-white font-bold text-sm">PCN Licensed</p>
                   <p className="text-white/60 text-[10px] uppercase font-bold">Registration No: PHM-4921</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
