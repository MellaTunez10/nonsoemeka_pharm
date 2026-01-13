import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Head } from '@inertiajs/react';

interface CategoryLayoutProps {
    title: string;
    description: string;
    icon: string;
    colorClass?: string;
    children?: React.ReactNode;
}

export default function CategoryLayout({ 
    title, 
    description, 
    icon, 
    colorClass = "bg-emerald-600",
    children 
}: CategoryLayoutProps) {
  return (
    <main className="min-h-screen bg-gray-50/50">
      <Head title={title} />
      <Navbar />
      
      {/* Category Hero */}
      <section className={`relative overflow-hidden py-16 md:py-24 ${colorClass}`}>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/10 skew-x-12 translate-x-12" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 text-white">
            <div className="bg-white/20 p-8 rounded-[2.5rem] backdrop-blur-md border border-white/20 shadow-2xl">
                <span className="text-7xl">{icon}</span>
            </div>
            <div className="text-center md:text-left space-y-4">
               <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{title}</h1>
               <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                 {description}
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container-custom py-16">
         {children || (
             <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl">
                 <div className="bg-emerald-50 p-6 rounded-full mb-6">
                    <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                 </div>
                 <h2 className="text-2xl font-bold text-gray-900 mb-2">Inventory Loading...</h2>
                 <p className="text-gray-500">We're updating our stock for {title}. Please check back in a moment.</p>
                 <button className="mt-8 bg-emerald-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                    Refresh Catalog
                 </button>
             </div>
         )}
      </section>

      <Footer />
    </main>
  );
}
