import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Head, Link } from '@inertiajs/react';

export default function Cart() {
  const [shippingMethod, setShippingMethod] = useState<'delivery' | 'pickup'>('delivery');
  
  // Mock cart items for demonstration
  const cartItems = [
    { id: 1, name: 'Vitamin C 1000mg', price: 2500, quantity: 2, image: 'https://images.unsplash.com/photo-1550572018-b29c99684120?auto=format&fit=crop&q=80&w=200' },
    { id: 2, name: 'Paracetamol 500mg', price: 500, quantity: 1, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200' },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = shippingMethod === 'delivery' ? 500 : 0;
  const total = subtotal + deliveryFee;

  return (
    <main className="min-h-screen bg-gray-50/50">
      <Head title="Your Cart" />
      <Navbar />

      <section className="container-custom py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <span className="text-gray-500 font-medium">{cartItems.length} Items</span>
            </div>

            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                    <div className="flex-1 space-y-1">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">₦{item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-4 mt-2">
                         <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button className="px-3 py-1 hover:bg-gray-50 border-r border-gray-200 text-gray-500">-</button>
                            <span className="px-4 py-1 text-sm font-bold">{item.quantity}</span>
                            <button className="px-3 py-1 hover:bg-gray-50 border-l border-gray-200 text-gray-500">+</button>
                         </div>
                         <button className="text-rose-500 text-sm font-bold hover:text-rose-600">Remove</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <p className="text-gray-500">Your cart is empty.</p>
                <Link href="/" className="mt-4 inline-block text-emerald-600 font-bold hover:text-emerald-700">Continue Shopping</Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6 sticky top-28">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-50 pb-4">Order Summary</h2>
              
              {/* Shipping Method Selection */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Fulfillment Method</p>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setShippingMethod('delivery')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${shippingMethod === 'delivery' ? 'border-emerald-600 bg-emerald-50/50 text-emerald-700' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
                  >
                    <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span className="text-[10px] font-bold uppercase">Delivery</span>
                  </button>
                  <button 
                    onClick={() => setShippingMethod('pickup')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${shippingMethod === 'pickup' ? 'border-emerald-600 bg-emerald-50/50 text-emerald-700' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
                  >
                    <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    <span className="text-[10px] font-bold uppercase">Pickup</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-50">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-50 pt-3 flex justify-between text-gray-900 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-emerald-600">₦{total.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 group">
                <span>Secure Checkout</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <div className="flex items-center justify-center gap-2 grayscale opacity-50 pt-4">
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
