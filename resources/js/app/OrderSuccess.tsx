import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, ShoppingBag, ArrowRight, MessageSquare } from 'lucide-react';

interface OrderSuccessProps {
    orderId: string;
}

export default function OrderSuccess({ orderId }: OrderSuccessProps) {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
            <Head title="Order Successful" />
            <Navbar />

            <div className="container-custom py-20">
                <div className="max-w-2xl mx-auto text-center space-y-8">
                    <div className="relative inline-block">
                        <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 animate-bounce-slow">
                            <CheckCircle className="w-12 h-12" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white dark:border-gray-950 animate-ping" />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Order Successful!</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            Thank you for your order. We've received your medical essentials and our pharmacists are already preparing them for you.
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 space-y-4">
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Order Reference</p>
                        <p className="text-2xl font-mono font-bold text-emerald-700 dark:text-emerald-400">{orderId}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <Link 
                            href="/products" 
                            className="flex items-center justify-center gap-3 p-6 rounded-3xl border-2 border-gray-100 dark:border-gray-800 font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group"
                        >
                            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>Continue Shopping</span>
                        </Link>
                        <button 
                            onClick={() => window.open('https://wa.me/2347045475153', '_blank')}
                            className="flex items-center justify-center gap-3 p-6 rounded-3xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 dark:shadow-none group"
                        >
                            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>Order via WhatsApp</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="pt-12 text-gray-400 dark:text-gray-500 text-sm">
                        <p>Need help with your order? Call us at <span className="text-emerald-600 dark:text-emerald-400 font-bold">+234 704 547 5153</span></p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
