import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Head, Link } from '@inertiajs/react';
import { useCart } from '@/hooks/use-cart';

export default function Cart() {
  const [shippingMethod, setShippingMethod] = useState<'delivery' | 'pickup'>('delivery');
  const { items, removeItem, updateQuantity, subtotal, isLoaded } = useCart();

  const deliveryFee = shippingMethod === 'delivery' ? 500 : 0;
  const total = subtotal + deliveryFee;

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-gray-950 transition-colors">
      <Head title="Your Cart" />
      <Navbar />

      <section className="container-custom py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
              <span className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-[10px]">{isLoaded ? items.length : 0} Items</span>
            </div>

            {!isLoaded ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 h-32 animate-pulse" />
                ))}
              </div>
            ) : items.length > 0 ? (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-6 shadow-sm hover:shadow-md transition-all">
                    <Link href={`/product/${item.slug}`} className="block flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                    </Link>
                    <div className="flex-1 space-y-1">
                      <Link href={`/product/${item.slug}`} className="block">
                        <h3 className="font-bold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400">₦{item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-4 mt-2">
                         <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 border-r border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                            >-</button>
                            <span className="px-4 py-1 text-sm font-bold dark:text-white">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 border-l border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                            >+</button>
                         </div>
                         <button 
                          onClick={() => removeItem(item.id)}
                          className="text-rose-500 dark:text-rose-400 text-xs font-bold hover:text-rose-600 uppercase tracking-widest"
                        >Remove</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 bg-white dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-100 dark:border-white/5 flex flex-col items-center text-center space-y-6">
                <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-emerald-600 dark:text-emerald-400">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your cart is feeling lonely</h2>
                  <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Explore our wide range of authentic medications and wellness products to fill it up!</p>
                </div>
                <Link href="/products" className="bg-emerald-600 text-white font-bold px-10 py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 dark:shadow-none uppercase tracking-widest text-sm">
                  Start Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl space-y-6 sticky top-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-800 pb-4">Order Summary</h2>
              
              {/* Shipping Method Selection */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Fulfillment Method</p>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setShippingMethod('delivery')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${shippingMethod === 'delivery' ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400' : 'border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-500 hover:border-gray-200 dark:hover:border-gray-700'}`}
                  >
                    <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span className="text-xs font-bold uppercase tracking-tight">Delivery</span>
                  </button>
                  <button 
                    onClick={() => setShippingMethod('pickup')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${shippingMethod === 'pickup' ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400' : 'border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-500 hover:border-gray-200 dark:hover:border-gray-700'}`}
                  >
                    <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    <span className="text-xs font-bold uppercase tracking-tight">Pickup</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-50 dark:border-gray-800">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-semibold dark:text-white">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Delivery Fee</span>
                  <span className="font-semibold dark:text-white">₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-50 dark:border-gray-800 pt-3 flex justify-between text-gray-900 dark:text-white text-lg font-bold">
                  <span>Total</span>
                  <span className="text-emerald-600 dark:text-emerald-400">₦{total.toLocaleString()}</span>
                </div>
              </div>

              <Link href="/checkout" className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 dark:shadow-none flex items-center justify-center gap-2 group">
                <span>Secure Checkout</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <div className="flex items-center justify-center gap-2 grayscale dark:invert opacity-50 pt-4">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="paypal" className="h-4" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png" alt="visa" className="h-4" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="mastercard" className="h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
