import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Head, usePage } from '@inertiajs/react';
import { User, MapPin, Shield, Check } from 'lucide-react';

export default function Profile() {
    const { auth } = usePage().props as any;
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1000);
    };

    return (
        <DashboardLayout title="Account Settings">
            <Head title="Profile Settings" />

            <div className="space-y-8">
                {/* Personal Information */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-2xl text-emerald-600 dark:text-emerald-400">
                            <User className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
                    </div>

                    <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                            <input 
                                type="text" 
                                defaultValue={auth.user.name}
                                className="w-full bg-gray-50 dark:bg-gray-800 border-0 rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                            <input 
                                type="email" 
                                defaultValue={auth.user.email}
                                disabled
                                className="w-full bg-gray-50 dark:bg-gray-800 border-0 rounded-2xl py-4 px-6 text-sm opacity-60 cursor-not-allowed dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Phone Number</label>
                            <input 
                                type="tel" 
                                placeholder="+234 ..."
                                className="w-full bg-gray-50 dark:bg-gray-800 border-0 rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white"
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end pt-4">
                            <button className="bg-emerald-600 text-white font-bold px-10 py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 dark:shadow-none uppercase tracking-widest text-xs flex items-center gap-2">
                                {isSaving ? 'Saving...' : <><Check className="w-4 h-4" /> Save Changes</>}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Delivery Addresses */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-2xl text-blue-600 dark:text-blue-400">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Delivery Addresses</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="border-2 border-emerald-600 bg-emerald-50/10 dark:bg-emerald-900/5 p-6 rounded-3xl space-y-3 relative">
                            <span className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg uppercase">Default</span>
                            <p className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs">Home</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">69 Umuola Road By Stainless Ogbor-hill<br />Aba, Abia State, Nigeria</p>
                            <button className="text-emerald-600 font-bold text-xs uppercase tracking-widest hover:underline pt-2">Edit</button>
                        </div>
                        <button className="border-2 border-dashed border-gray-100 dark:border-white/5 p-6 rounded-3xl flex flex-col items-center justify-center space-y-2 text-gray-400 hover:border-emerald-300 hover:text-emerald-600 transition-colors">
                            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-full">
                                <Plus className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-xs uppercase tracking-widest">Add New Address</span>
                        </button>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-rose-50 dark:bg-rose-900/20 p-3 rounded-2xl text-rose-600 dark:text-rose-400">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Security Settings</h2>
                    </div>

                    <div className="space-y-4 max-w-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                            <div className="space-y-1">
                                <p className="font-bold text-gray-900 dark:text-white text-sm">Two-Factor Authentication</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Add an extra layer of security to your account.</p>
                            </div>
                            <button className="bg-gray-200 dark:bg-gray-700 w-12 h-6 rounded-full relative transition-colors">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                            </button>
                        </div>
                        <button className="w-full text-center py-4 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-widest border border-emerald-100 dark:border-emerald-800/20 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all">
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)
