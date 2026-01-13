'use client';

import React from 'react';
import { Link } from '@inertiajs/react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
  badge?: string;
  requires_prescription: boolean;
}

const mockProducts: Product[] = [
  { id: '1', name: 'Panadol Advance 500mg', category: 'Pain Relief', price: 1200, requires_prescription: false, badge: 'Popular' },
  { id: '2', name: 'Centrum Men Multivitamin', category: 'Vitamins', price: 15500, requires_prescription: false },
  { id: '3', name: 'Amoxicillin 500mg', category: 'Antibiotics', price: 3400, requires_prescription: true, badge: 'Prescription' },
  { id: '4', name: 'CeraVe Hydrating Cleanser', category: 'Skincare', price: 18000, requires_prescription: false },
];

export default function FeaturedProducts() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 max-w-sm">Handpicked selections to help you feel your best every day.</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center space-x-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors uppercase tracking-widest text-xs">
            <span>View All Products</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockProducts.map((product) => (
            <div key={product.id} className="product-card group bg-white shadow-sm hover:shadow-xl transition-all">
              <div className="relative aspect-square rounded-xl bg-gray-100 mb-4 overflow-hidden">
                {product.badge && (
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-10 ${
                    product.badge === 'Prescription' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {product.badge}
                  </span>
                )}
                
                {/* Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                  <svg className="w-16 h-16 group-hover:scale-110 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.08-.33.12-.51.12s-.35-.04-.51-.12l-7.9-4.44c-.32-.17-.53-.5-.53-.88V7.5c0-.38.21-.71.53-.88l7.9-4.44c.16-.08.33-.12.51-.12s.35.04.51.12l7.9 4.44c.32.17.53.5.53.88v9z" />
                  </svg>
                </div>

                <button 
                  onClick={() => alert('Shopping functionality is being finalized. You will be able to add products to your cart very soon!')}
                  className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:bg-emerald-600 hover:text-white transition-all transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{product.category}</p>
                <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold text-gray-900">₦{product.price.toLocaleString()}</span>
                  {product.requires_prescription && (
                    <div className="flex items-center text-[10px] text-amber-600 font-bold uppercase">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Rx Required
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
