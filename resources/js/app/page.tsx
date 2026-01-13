import React from 'react';
import { Link } from '@inertiajs/react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Dynamic Hero Section */}
      <Hero />

      {/* Trust & Features Banner */}
      <div className="bg-white py-12 border-b border-gray-100">
        <div className="container-custom grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: '🛡️', title: 'NAFDAC Certified', desc: '100% genuine products' },
            { icon: '🚚', title: 'Fast Delivery', desc: 'Within Abia State in 30 mins' },
            { icon: '👨‍⚕️', title: 'Doc Advice', desc: 'Professional Consultation' },
            { icon: '💳', title: 'Secure Payment', desc: 'Encrypted transactions' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-4">
              <span className="text-3xl grayscale hover:grayscale-0 transition-all cursor-default">{item.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Categories */}
      <section className="py-16 container-custom">
        <div className="flex items-center space-x-4 mb-10">
           <div className="h-1 w-12 bg-emerald-600 rounded-full" />
           <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Shop by Concerns</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Pain Relief', emoji: '💊', slug: 'daily-needs', color: 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100' },
            { name: 'Skin Care', emoji: '✨', slug: 'skincare', color: 'bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100' },
            { name: 'Multivitamins', emoji: '🍎', slug: 'vitamins-supplements', color: 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100' },
            { name: 'Baby Care', emoji: '👶', slug: 'baby-mother', color: 'bg-pink-50 text-pink-700 border-pink-100 hover:bg-pink-100' },
            { name: 'Sexual Health', emoji: '❤️', slug: 'sexual-health', color: 'bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100' },
            { name: 'First Aid', emoji: '🩹', slug: 'daily-needs', color: 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100' },
          ].map((cat) => (
            <Link 
              key={cat.name} 
              href={`/category/${cat.slug}`}
              className={`flex flex-col items-center justify-center p-8 rounded-2xl border transition-all group ${cat.color}`}
            >
               <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">{cat.emoji}</span>
               <span className="text-[10px] font-bold uppercase tracking-widest">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>
      
      <FeaturedProducts />

      {/* Promotional Banner */}
      <section className="container-custom py-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-12 relative overflow-hidden shadow-2xl shadow-blue-200">
           <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-white text-center md:text-left">
                 <h2 className="text-4xl font-bold leading-tight">Professional Pharmacy <br />in your pocket.</h2>
                 <p className="text-blue-100/80">Download our app for exclusive discounts and live order tracking.</p>
                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <button className="bg-white text-blue-700 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all shadow-xl">App Store</button>
                    <button className="bg-blue-500/30 text-white font-bold border border-white/20 px-8 py-4 rounded-2xl hover:bg-white/10 transition-all">Play Store</button>
                 </div>
              </div>
              <div className="hidden md:flex justify-end">
                  <div className="w-64 h-96 bg-blue-500/50 rounded-3xl border-4 border-white/20 rotate-12 relative">
                     <div className="absolute top-8 left-4 right-4 h-1 bg-white/20 rounded-full" />
                     <div className="absolute inset-4 mt-8 rounded-2xl bg-blue-400/20" />
                  </div>
              </div>
           </div>
           
           {/* Abstract shapes */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
