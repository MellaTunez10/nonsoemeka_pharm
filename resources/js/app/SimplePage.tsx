import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Head } from '@inertiajs/react';

interface SimplePageProps {
    title: string;
    content: string;
}

export default function SimplePage({ title, content }: SimplePageProps) {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
            <Head title={title} />
            <Navbar />
            
            <section className="container-custom py-24 md:py-32">
                <div className="max-w-4xl space-y-12">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">{title}</h1>
                        <div className="h-1.5 w-24 bg-emerald-500 rounded-full" />
                    </div>
                    
                    <div 
                        className="prose prose-lg prose-emerald dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed space-y-6"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />

                    <div className="pt-12 border-t border-gray-100 dark:border-gray-800 flex items-center gap-4">
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-2xl text-emerald-600 dark:text-emerald-400">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                             </svg>
                        </div>
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                            Last Updated: January 2026 • Professional Pharmacy Care
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
