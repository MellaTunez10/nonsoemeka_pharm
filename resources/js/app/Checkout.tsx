import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Head, useForm, Link } from '@inertiajs/react';
import { useCart } from '@/hooks/use-cart';
import { ChevronRight, MapPin, CreditCard, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function Checkout() {
    const { items, subtotal, itemCount, clearCart } = useCart();
    const [step, setStep] = useState(1);
    
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        city: 'Aba',
        state: 'Abia',
        payment_method: 'card',
    });

    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const validateField = (name: string, value: string) => {
        let error = '';
        if (!value.trim()) {
            error = 'This field is required';
        } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            error = 'Please enter a valid email address';
        } else if (name === 'phone' && value.length < 10) {
            error = 'Please enter a valid phone number';
        }
        setValidationErrors(prev => ({ ...prev, [name]: error }));
        return !error;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Final validation check
        const fieldsToValidate = ['first_name', 'last_name', 'email', 'phone', 'address'];
        const isValid = fieldsToValidate.every(field => validateField(field, (data as any)[field]));
        
        if (!isValid) return;

        if (step < 2) {
            setStep(2);
            return;
        }
        
        post('/checkout', {
            onSuccess: () => {
                clearCart();
            },
        });
    };

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-gray-50/50">
                <Navbar />
                <div className="container-custom py-20 text-center space-y-6">
                    <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 inline-block">
                        <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                        <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
                        <p className="text-gray-500 max-w-xs mx-auto mt-2">Add some wellness products to your cart before checking out.</p>
                        <Link href="/products" className="mt-8 inline-block btn-primary">Start Shopping</Link>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50/50 dark:bg-gray-950 transition-colors">
            <Head title="Checkout" />
            <Navbar />

            <div className="container-custom py-12 md:py-20">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Checkout Form */}
                    <div className="flex-1 space-y-8">
                        {/* Stepper */}
                        <div className="flex items-center justify-between max-w-md">
                            <div className={`flex items-center space-x-3 ${step >= 1 ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-600'}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 1 ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-gray-800'}`}>1</div>
                                <span className="text-sm font-bold uppercase tracking-wider">Shipping</span>
                            </div>
                            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800 mx-4" />
                            <div className={`flex items-center space-x-3 ${step >= 2 ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-600'}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 2 ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-gray-800'}`}>2</div>
                                <span className="text-sm font-bold uppercase tracking-wider">Payment</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {step === 1 ? (
                                <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
                                    <div className="flex items-center space-x-4 border-b border-gray-50 dark:border-gray-800 pb-6">
                                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-2xl text-emerald-600 dark:text-emerald-400">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shipping Details</h2>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">First Name</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={data.first_name}
                                                onChange={e => {
                                                    setData('first_name', e.target.value);
                                                    if (validationErrors.first_name) validateField('first_name', e.target.value);
                                                }}
                                                onBlur={e => validateField('first_name', e.target.value)}
                                                className={`w-full bg-gray-50 dark:bg-gray-800 border ${validationErrors.first_name ? 'border-rose-500' : 'border-gray-100 dark:border-gray-700'} rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-gray-900 dark:text-white transition-all outline-none`} 
                                            />
                                            {validationErrors.first_name && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest ml-1 mt-1">{validationErrors.first_name}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Last Name</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={data.last_name}
                                                onChange={e => {
                                                    setData('last_name', e.target.value);
                                                    if (validationErrors.last_name) validateField('last_name', e.target.value);
                                                }}
                                                onBlur={e => validateField('last_name', e.target.value)}
                                                className={`w-full bg-gray-50 dark:bg-gray-800 border ${validationErrors.last_name ? 'border-rose-500' : 'border-gray-100 dark:border-gray-700'} rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-gray-900 dark:text-white transition-all outline-none`} 
                                            />
                                            {validationErrors.last_name && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest ml-1 mt-1">{validationErrors.last_name}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                                            <input 
                                                type="email" 
                                                required
                                                value={data.email}
                                                onChange={e => {
                                                    setData('email', e.target.value);
                                                    if (validationErrors.email) validateField('email', e.target.value);
                                                }}
                                                onBlur={e => validateField('email', e.target.value)}
                                                className={`w-full bg-gray-50 dark:bg-gray-800 border ${validationErrors.email ? 'border-rose-500' : 'border-gray-100 dark:border-gray-700'} rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-gray-900 dark:text-white transition-all outline-none`} 
                                            />
                                            {validationErrors.email && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest ml-1 mt-1">{validationErrors.email}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
                                            <input 
                                                type="tel" 
                                                required
                                                value={data.phone}
                                                onChange={e => {
                                                    setData('phone', e.target.value);
                                                    if (validationErrors.phone) validateField('phone', e.target.value);
                                                }}
                                                onBlur={e => validateField('phone', e.target.value)}
                                                className={`w-full bg-gray-50 dark:bg-gray-800 border ${validationErrors.phone ? 'border-rose-500' : 'border-gray-100 dark:border-gray-700'} rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-gray-900 dark:text-white transition-all outline-none`} 
                                            />
                                            {validationErrors.phone && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest ml-1 mt-1">{validationErrors.phone}</p>}
                                        </div>
                                        <div className="col-span-full space-y-2">
                                            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Delivery Address</label>
                                            <textarea 
                                                required
                                                rows={3}
                                                value={data.address}
                                                onChange={e => {
                                                    setData('address', e.target.value);
                                                    if (validationErrors.address) validateField('address', e.target.value);
                                                }}
                                                onBlur={e => validateField('address', e.target.value)}
                                                className={`w-full bg-gray-50 dark:bg-gray-800 border ${validationErrors.address ? 'border-rose-500' : 'border-gray-100 dark:border-gray-700'} rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-gray-900 dark:text-white transition-all outline-none resize-none`} 
                                            />
                                            {validationErrors.address && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest ml-1 mt-1">{validationErrors.address}</p>}
                                        </div>
                                    </div>
                                    
                                    <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-5 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 dark:shadow-none flex items-center justify-center gap-2 group">
                                        <span>Continue to Payment</span>
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
                                    <div className="flex items-center space-x-4 border-b border-gray-50 dark:border-gray-800 pb-6">
                                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-2xl text-emerald-600 dark:text-emerald-400">
                                            <CreditCard className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Method</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <label className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all cursor-pointer ${data.payment_method === 'card' ? 'border-emerald-600 bg-emerald-50/30 dark:bg-emerald-900/10' : 'border-gray-100 dark:border-gray-800'}`}>
                                            <div className="flex items-center gap-4">
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${data.payment_method === 'card' ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300 dark:border-gray-700'}`}>
                                                    {data.payment_method === 'card' && <div className="w-2 h-2 bg-white rounded-full" />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white">Pay with Card</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Securely via Paystack/Flutterwave</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 grayscale dark:invert opacity-50">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png" alt="visa" className="h-4" />
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="mastercard" className="h-4" />
                                            </div>
                                            <input type="radio" value="card" className="hidden" onChange={() => setData('payment_method', 'card')} checked={data.payment_method === 'card'} />
                                        </label>

                                        <label className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all cursor-pointer ${data.payment_method === 'cash' ? 'border-emerald-600 bg-emerald-50/30 dark:bg-emerald-900/10' : 'border-gray-100 dark:border-gray-800'}`}>
                                            <div className="flex items-center gap-4">
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${data.payment_method === 'cash' ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300 dark:border-gray-700'}`}>
                                                    {data.payment_method === 'cash' && <div className="w-2 h-2 bg-white rounded-full" />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white">Pay on Delivery</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Cash or POS on arrival</p>
                                                </div>
                                            </div>
                                            <input type="radio" value="cash" className="hidden" onChange={() => setData('payment_method', 'cash')} checked={data.payment_method === 'cash'} />
                                        </label>
                                    </div>

                                    <div className="pt-6 flex gap-4">
                                        <button type="button" onClick={() => setStep(1)} className="px-8 py-4 rounded-2xl border border-gray-200 dark:border-gray-800 font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">Back</button>
                                        <button type="submit" disabled={processing} className="flex-1 bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 dark:shadow-none flex items-center justify-center gap-2 group">
                                            <ShieldCheck className="w-5 h-5" />
                                            <span>{processing ? 'Processing...' : `Pay ₦${(subtotal + 500).toLocaleString()}`}</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="w-full lg:w-96">
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 sticky top-28 space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-800 pb-4">Order Summary</h2>
                            
                            <div className="max-h-64 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex-shrink-0 overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm text-gray-900 dark:text-white truncate">{item.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{item.quantity} × ₦{item.price.toLocaleString()}</p>
                                        </div>
                                        <p className="font-bold text-sm text-gray-900 dark:text-white">₦{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-gray-50 dark:border-gray-800">
                                <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                                    <span>Subtotal</span>
                                    <span className="font-bold dark:text-white">₦{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                                    <span>Delivery Fee</span>
                                    <span className="font-bold dark:text-white">₦500</span>
                                </div>
                                <div className="pt-3 flex justify-between text-gray-900 dark:text-white text-lg font-extrabold">
                                    <span>Total</span>
                                    <span className="text-emerald-600 dark:text-emerald-400">₦{(subtotal + 500).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/50 flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                                <p className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400/80 leading-relaxed uppercase tracking-widest">
                                    Your order includes authentic products verified by our licensed pharmacists.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

function ShieldCheck(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}
