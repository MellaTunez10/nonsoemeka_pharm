import { Link } from '@inertiajs/react';
import { Facebook, MessageCircle } from 'lucide-react';
import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 pb-10 pt-20">
            <div className="container-custom mb-20 grid md:grid-cols-4 gap-12">
                <div className="space-y-6">
                    <span className="text-2xl font-bold font-logo uppercase tracking-tight text-white">Nonsoemeka</span>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Premium healthcare and stores services providing authentic medications across Nigeria. Fully PCN and NAFDAC compliant.
                    </p>
                    
                    {/* Unified Branding & Social Row */}
                    <div className="flex items-center gap-3 pt-2">
                        <div className="bg-white rounded-xl p-2 w-12 h-12 flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                            <img src="/images/nafdac.png" alt="NAFDAC" className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="bg-white rounded-xl p-2 w-12 h-12 flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                            <img src="/images/pcn.png" alt="PCN" className="max-w-full max-h-full object-contain" />
                        </div>
                        <a
                            href="https://wa.me/2347045475153"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 shadow-lg transition-all hover:bg-emerald-700 hover:scale-105"
                        >
                            <MessageCircle className="h-6 w-6 text-white" />
                        </a>
                        <a
                            href="https://facebook.com/nonsoemekapharmacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg transition-all hover:bg-blue-700 hover:scale-105"
                        >
                            <Facebook className="h-6 w-6 text-white" />
                        </a>
                    </div>
                </div>
                <div>
                    <h5 className="mb-6 font-bold text-white">Company</h5>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><Link href="/about" className="transition-colors hover:text-emerald-400">About Us</Link></li>
                        <li><Link href="/contact" className="transition-colors hover:text-emerald-400">Contact</Link></li>
                        <li><Link href="/careers" className="transition-colors hover:text-emerald-400">Careers</Link></li>
                        <li><Link href="/locations" className="transition-colors hover:text-emerald-400">Branch Locations</Link></li>
                    </ul>
                </div>
                <div>
                    <h5 className="mb-6 font-bold text-white">Services</h5>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><Link href="/prescription-upload" className="transition-colors hover:text-emerald-400">Refill Prescription</Link></li>
                        <li><Link href="/consultation" className="transition-colors hover:text-emerald-400">Professional Consultation</Link></li>
                        <li><Link href="/delivery" className="transition-colors hover:text-emerald-400">Home Delivery</Link></li>
                        <li><Link href="/rewards" className="transition-colors hover:text-emerald-400">Health Rewards</Link></li>
                    </ul>
                </div>
                <div>
                    <h5 className="mb-6 font-bold text-white">Newsletter</h5>
                    <p className="mb-6 text-sm text-gray-400">Get health tips and offers delivered to you. Your inquiries also go to nonsoemekapharmacy@gmail.com.</p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-gray-800 border-none rounded-l-xl px-4 py-3 w-full text-white text-sm focus:ring-1 focus:ring-emerald-500"
                        />
                        <button className="bg-emerald-600 text-white px-6 py-3 rounded-r-xl hover:bg-emerald-700 transition-all">&rarr;</button>
                    </div>
                </div>
            </div>
            <div className="container-custom flex flex-col items-center justify-between border-t border-gray-800 pt-8 text-[10px] font-bold uppercase tracking-widest text-gray-500 md:row">
                <span>&copy; 2026 Nonsoemeka Pharmacy. All Rights Reserved.</span>
                <div className="mt-4 flex space-x-8 md:mt-0">
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/terms">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
