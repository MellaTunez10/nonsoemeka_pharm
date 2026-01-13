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
        <main className="min-h-screen bg-white">
            <Head title={title} />
            <Navbar />
            
            <section className="container-custom py-24 md:py-32">
                <div className="max-w-3xl space-y-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">{title}</h1>
                    <div className="h-1.5 w-20 bg-emerald-500 rounded-full" />
                    <p className="text-xl text-gray-500 leading-relaxed">
                        {content}
                    </p>
                    <div className="pt-10 border-t border-gray-100 mt-12">
                        <p className="text-sm text-gray-400">
                            Our team is currently working hard to bring you detailed information on this topic. Please check back soon or contact support for immediate assistance.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
