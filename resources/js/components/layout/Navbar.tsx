import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { useCart } from '@/hooks/use-cart';
import { Toaster } from '@/components/ui/toaster';

export default function Navbar() {
  const { auth } = usePage().props as any;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { itemCount, isLoaded } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.get('/products', { search: search.trim() });
    }
  };

  const categories = [
    'Prescription', 
    'Vitamins & Supplements', 
    'Skincare', 
    'Baby & Mother', 
    'Sexual Health', 
    'Daily Needs'
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/60 dark:bg-gray-950/60 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 shadow-sm transition-all duration-300">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
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
            <div >
              <img src="/logo.png" alt="logo" className="w-8 h-8 md:w-12 md:h-12" />
            </div>
            <span className="text-base sm:text-xl md:text-2xl font-bold font-logo text-gray-900 dark:text-white tracking-tight uppercase ml-2">
              Nonsoemeka <span className="text-emerald-600 dark:text-emerald-400 font-normal">Pharmacy</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for medications, wellness, skincare..."
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-base outline-none dark:text-white dark:placeholder-gray-400"
              />
              <svg className="w-5 h-5 text-gray-400 dark:text-white absolute left-4 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-6">
            <div className="hidden lg:flex items-center space-x-1 text-gray-500 dark:text-white">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
               </svg>
               <span className="text-sm font-bold">+234 704 547 5153</span>
            </div>

            <div className="flex items-center space-x-4">
                <Link href="/cart" className="relative p-2 text-gray-600 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="absolute top-1 right-1 bg-emerald-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900 shadow-sm animate-in zoom-in duration-300">
                        {isLoaded ? itemCount : '0'}
                    </span>
                </Link>

                <Link 
                    href={auth.user ? "/dashboard" : "/login"}
                    className="hidden sm:flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-bold text-base hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 dark:shadow-none"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{auth.user ? "Account" : "Login"}</span>
                </Link>
            </div>
          </div>
        </div>

        {/* Desktop Categories Toolbar */}
        <div className="hidden md:flex items-center justify-center space-x-12 mt-4 border-t border-gray-50 dark:border-white/10 pt-4 px-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
                <Link 
                  key={cat} 
                  href={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
                  className="text-sm font-bold text-gray-600 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 uppercase tracking-widest whitespace-nowrap transition-colors py-1"
                >
                    {cat}
                </Link>
            ))}
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 animate-in slide-in-from-top duration-300">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="px-2 mb-6">
              <div className="relative w-full">
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-base outline-none dark:text-white dark:placeholder-gray-400"
                />
                <svg className="w-5 h-5 text-gray-400 dark:text-gray-300 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            {/* Mobile Categories */}
            <div className="flex flex-col space-y-1">
                {categories.map((cat) => (
                    <Link 
                        key={cat} 
                        href={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="px-4 py-4 text-base font-bold text-gray-800 dark:text-white hover:bg-emerald-50 dark:hover:bg-white/5 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition-all"
                    >
                        {cat}
                    </Link>
                ))}
            </div>

            {/* Mobile Footer Actions */}
            <div className="p-4 mt-6 bg-gray-50 dark:bg-white/5 rounded-2xl space-y-4 border border-transparent dark:border-white/5">
                <Link href={auth.user ? "/dashboard" : "/login"} className="w-full btn-primary block text-center py-4 text-base">
                    {auth.user ? "My Account" : "Login / Create Account"}
                </Link>
                <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-white/60 text-sm">
                     <span>Need Help?</span>
                     <span className="font-bold text-gray-900 dark:text-white">+234 704 547 5153</span>
                </div>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </nav>
  );
}
