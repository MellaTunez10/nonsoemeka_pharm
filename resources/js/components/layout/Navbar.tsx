import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
  const { auth } = usePage().props as any;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    'Prescription', 
    'Vitamins & Supplements', 
    'Skincare', 
    'Baby & Mother', 
    'Sexual Health', 
    'Daily Needs'
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-100">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-emerald-600 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <div className="rounded-lg">
              <img src="/logo.png" alt="logo" className="w-8 h-8 md:w-12 md:h-12" />
            </div>
            <span className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 tracking-tight uppercase ml-2">
              Nonsoemeka <span className="text-emerald-600 font-normal">Pharmacy</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search for medications, wellness, skincare..."
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm outline-none"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-6">
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Need help?</span>
              <span className="text-sm font-semibold text-emerald-700">+234 800 NONSO PHARM</span>
            </div>
            
            <Link href={auth?.user ? "/settings/profile" : "/login"} className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-100 animate-in slide-in-from-top duration-300">
            {/* Mobile Search */}
            <div className="px-2 mb-6">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Search products..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm outline-none"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Mobile Categories */}
            <div className="flex flex-col space-y-1">
              {categories.map((cat) => (
                <Link 
                  key={cat} 
                  href={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all flex items-center justify-between group"
                >
                  <span>{cat}</span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            {/* Mobile Help Link */}
            <div className="mt-6 pt-6 border-t border-gray-50 px-4 pb-4">
              <div className="flex items-center space-x-3 text-emerald-700">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Need help?</p>
                  <p className="text-sm font-bold">+234 800 NONSO PHARM</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories Nav - Desktop */}
        <div className="hidden md:flex items-center space-x-8 mt-4 pt-4 border-t border-gray-50">
          {categories.map((cat) => (
            <Link 
              key={cat} 
              href={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} 
              className="text-xs font-semibold text-gray-600 hover:text-emerald-600 transition-colors uppercase tracking-wider"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
