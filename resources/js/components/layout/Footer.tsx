import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-20 pb-10 w-full">
      <div className="container-custom grid md:grid-cols-4 gap-12 mb-20">
         <div className="space-y-6">
            <span className="text-white font-bold text-xl uppercase tracking-widest">Nonsoemeka</span>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium healthcare and stores services providing authentic medications across Nigeria. PCN and NAFDAC compliant.
            </p>
            <div className="flex space-x-4">
               {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-all cursor-pointer">
                     <span className="w-4 h-4 bg-white/30 rounded-sm" />
                  </div>
               ))}
            </div>
         </div>
         <div>
            <h5 className="text-white font-bold mb-6">Company</h5>
            <ul className="space-y-4 text-sm text-gray-400">
               <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
               <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
               <li><Link href="/careers" className="hover:text-emerald-400 transition-colors">Careers</Link></li>
               <li><Link href="/locations" className="hover:text-emerald-400 transition-colors">Branch Locations</Link></li>
            </ul>
         </div>
         <div>
            <h5 className="text-white font-bold mb-6">Services</h5>
            <ul className="space-y-4 text-sm text-gray-400">
               <li><Link href="/prescriptions" className="hover:text-emerald-400 transition-colors">Refill Prescription</Link></li>
               <li><Link href="/consultation" className="hover:text-emerald-400 transition-colors">Professional Consultation</Link></li>
               <li><Link href="/delivery" className="hover:text-emerald-400 transition-colors">Home Delivery</Link></li>
               <li><Link href="/rewards" className="hover:text-emerald-400 transition-colors">Health Rewards</Link></li>
            </ul>
         </div>
         <div>
            <h5 className="text-white font-bold mb-6">Newsletter</h5>
            <p className="text-sm text-gray-400 mb-6">Stay updated with health tips and offers.</p>
            <div className="flex">
               <input type="email" placeholder="Email address" className="bg-gray-800 border-none rounded-l-xl px-4 py-3 w-full text-white text-sm focus:ring-1 focus:ring-emerald-500" />
               <button className="bg-emerald-600 text-white px-6 py-3 rounded-r-xl hover:bg-emerald-700 transition-all">&rarr;</button>
            </div>
         </div>
      </div>
      <div className="container-custom pt-8 border-t border-gray-800 flex flex-col md:row items-center justify-between text-[10px] text-gray-500 uppercase tracking-widest font-bold">
         <span>&copy; 2026 Nonsoemeka Pharmacy. All Rights Reserved.</span>
         <div className="flex space-x-8 mt-4 md:mt-0">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
         </div>
      </div>
    </footer>
  );
}
