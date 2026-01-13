import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-emerald-900 overflow-hidden px-6 py-8">
            {/* Background patterns from Hero section */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-800/30 skew-x-12 translate-x-12 md:translate-x-24" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />

            <div className="relative z-10 w-full max-w-sm">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-center gap-2">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 group transition-transform hover:scale-105"
                        >
                            <div className="flex items-center justify-center">
                                <img src="/logo.png" alt="logo" className="w-32 h-32 md:w-48 md:h-48" />
                            </div>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-3xl font-bold text-white">{title}</h1>
                            <p className="text-emerald-100/70 text-sm">
                                {description}
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                        {/* Subtle internal decoration */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/50 rounded-full -translate-y-12 translate-x-12" />
                        
                        <div className="relative z-10">
                            {children}
                        </div>
                    </div>

                    <div className="text-center text-xs text-emerald-100/50 uppercase tracking-widest font-bold">
                        &copy; 2026 Nonsoemeka Pharmacy. All Rights Reserved.
                    </div>
                </div>
            </div>
        </div>
    );
}
