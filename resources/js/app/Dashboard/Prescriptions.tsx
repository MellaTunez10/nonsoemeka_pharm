import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { FileText, Plus, ExternalLink, ChevronRight } from 'lucide-react';

export default function Prescriptions() {
    // Mock prescriptions
    const prescriptions = [
        { id: '#RX-9201', date: 'Oct 10, 2023', status: 'Approved', doctor: 'Dr. Smith', note: 'Validated for 3 refills.' },
        { id: '#RX-9255', date: 'Oct 14, 2023', status: 'Pending', doctor: 'Dr. Okoro', note: 'Under review by our pharmacist.' },
    ];

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400';
            case 'Pending': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
            case 'Rejected': return 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400';
            default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
        }
    };

    return (
        <DashboardLayout title="Prescription History">
            <Head title="My Prescriptions" />

            <div className="space-y-6">
                {/* Upload CTA */}
                <div className="bg-emerald-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-100 dark:shadow-none">
                    <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-2xl font-bold">New Prescription?</h3>
                        <p className="text-emerald-50 text-sm opacity-80">Upload it now to have it reviewed by our licensed pharmacists.</p>
                    </div>
                    <Link href="/prescription-upload" className="bg-white text-emerald-600 font-bold px-8 py-4 rounded-2xl flex items-center gap-2 hover:bg-emerald-50 transition-all uppercase tracking-widest text-sm">
                        <Plus className="w-5 h-5" />
                        <span>Upload Now</span>
                    </Link>
                </div>

                {/* Prescription List */}
                <div className="grid gap-4">
                    {prescriptions.map((rx) => (
                        <div key={rx.id} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl text-gray-400">
                                        <FileText className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h4 className="font-bold text-gray-900 dark:text-white text-lg">{rx.id}</h4>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(rx.status)}`}>
                                                {rx.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">Doctor: {rx.doctor}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">"{rx.note}"</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{rx.date}</p>
                                    <button className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest hover:underline">
                                        View details <ExternalLink className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {prescriptions.length === 0 && (
                    <div className="py-20 bg-white dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-100 dark:border-white/5 text-center flex flex-col items-center space-y-4">
                        <FileText className="w-12 h-12 text-gray-300" />
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No prescriptions found</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
