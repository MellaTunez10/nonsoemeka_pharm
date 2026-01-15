import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Head, Link } from '@inertiajs/react';
import { useCart } from '@/hooks/use-cart';
import { ChevronLeft, ShoppingCart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    image: string;
    stock: number;
}

interface ProductShowProps {
    product: Product;
}

export default function ProductShow({ product }: ProductShowProps) {
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'usage' | 'ingredients'>('description');
    const { addItem } = useCart();

    const handleAddToCart = () => {
        addItem(product, quantity);
        // We could add a toast here
    };

    return (
        <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
            <Head>
                <title>{`${product.name} | Nonsoemeka Pharmacy`}</title>
                <meta name="description" content={product.description.substring(0, 160)} />
                <meta property="og:title" content={product.name} />
                <meta property="og:description" content={product.description.substring(0, 160)} />
                <meta property="og:image" content={product.image} />
                <meta property="og:type" content="product" />
                <meta property="og:price:amount" content={product.price.toString()} />
                <meta property="og:price:currency" content="NGN" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Navbar />

            <div className="container-custom py-8 md:py-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
                    <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-bold uppercase tracking-widest">Home</Link>
                    <ChevronLeft className="w-3 h-3" />
                    <Link href="/products" className="hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-bold uppercase tracking-widest">Products</Link>
                    <ChevronLeft className="w-3 h-3" />
                    <span className="text-gray-900 dark:text-gray-300 font-bold uppercase tracking-widest text-[10px] truncate">{product.name}</span>
                </nav>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Product Image */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-3xl bg-gray-50 dark:bg-gray-900 overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm relative group">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                            {product.stock < 10 && product.stock > 0 && (
                                <span className="absolute top-6 left-6 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                    Low Stock: {product.stock} left
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="space-y-6 flex-1">
                            <div className="space-y-2">
                                <p className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-xs">{product.category.replace('-', ' ')}</p>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                                    {product.name}
                                </h1>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">₦{product.price.toLocaleString()}</span>
                                <div className="h-6 w-px bg-gray-200 dark:bg-gray-800" />
                                <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                                    <ShieldCheck className="w-5 h-5 mr-1.5" />
                                    <span className="text-sm font-bold uppercase tracking-wide">NAFDAC Certified</span>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                                {product.description}
                            </p>

                            <div className="pt-6 space-y-6">
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <div className="flex items-center border-2 border-gray-100 dark:border-gray-800 rounded-2xl p-1 bg-gray-50/50 dark:bg-gray-900/50">
                                        <button 
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm text-gray-500 dark:text-gray-400 transition-all font-bold text-xl"
                                        >-</button>
                                        <span className="w-12 text-center font-bold text-gray-900 dark:text-white text-lg">{quantity}</span>
                                        <button 
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm text-gray-500 dark:text-gray-400 transition-all font-bold text-xl"
                                        >+</button>
                                    </div>

                                    <button 
                                        onClick={handleAddToCart}
                                        disabled={product.stock === 0}
                                        className="w-full sm:flex-1 bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 dark:shadow-none flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                        <span>Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-12 pt-12 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-16">
                            <div className="flex items-start gap-4">
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-2xl text-emerald-600 dark:text-emerald-400">
                                    <Truck className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-gray-900 dark:text-white">Fast Delivery</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">To your doorstep</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-2xl text-emerald-600 dark:text-emerald-400">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-gray-900 dark:text-white">Secure Payment</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">100% encrypted</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Details (Mock Content) */}
                <div className="mt-24 space-y-12">
                    <div className="border-b border-gray-100 dark:border-gray-800">
                        <div className="flex space-x-12">
                            {['description', 'usage', 'ingredients'].map((tab) => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`pb-4 border-b-2 font-bold uppercase tracking-widest text-[10px] transition-colors ${
                                        activeTab === tab 
                                        ? 'border-emerald-600 text-gray-900 dark:text-white' 
                                        : 'border-transparent text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400'
                                    }`}
                                >
                                    {tab === 'usage' ? 'How to Use' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="max-w-3xl space-y-8 min-h-[300px]">
                        {activeTab === 'description' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <section className="space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Product Overview</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {product.description}. This product is carefully selected by our pharmaceutical experts to ensure maximum efficacy and safety. Each batch is verified for authenticity and stored in temperature-controlled environments.
                                    </p>
                                </section>
                                
                                <section className="space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Safety Information</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                                        <li>Keep out of reach of children.</li>
                                        <li>Store in a cool, dry place away from direct sunlight.</li>
                                        <li>Consult your doctor if symptoms persist.</li>
                                        <li>Check expiry date before use.</li>
                                    </ul>
                                </section>
                            </div>
                        )}

                        {activeTab === 'usage' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <section className="space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Directions for Use</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        For optimal results, follow these professional guidelines:
                                    </p>
                                    <ul className="list-decimal list-inside space-y-4 text-gray-600 dark:text-gray-400">
                                        <li>Clean and dry the affected area before application.</li>
                                        <li>Apply a small amount as directed by your healthcare provider.</li>
                                        <li>Massage gently until fully absorbed into the skin or as directed.</li>
                                        <li>Wash hands thoroughly after each use unless treating hands.</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recommended Dosage</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Apply 2-3 times daily or according to your doctor's specific prescription. Do not exceed the recommended daily dose.
                                    </p>
                                </section>
                            </div>
                        )}

                        {activeTab === 'ingredients' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <section className="space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Active Ingredients</h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            { name: 'Pharmaceutical Grade Base', amount: '85%' },
                                            { name: 'Active Wellness Complex', amount: '10%' },
                                            { name: 'Stability Matrix', amount: '5%' },
                                        ].map((ing, i) => (
                                            <div key={i} className="flex justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-white/5">
                                                <span className="font-bold text-gray-900 dark:text-white text-sm">{ing.name}</span>
                                                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{ing.amount}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Full Ingredient List</h3>
                                    <p className="text-xs text-gray-500 underline dark:text-gray-400 leading-relaxed tracking-wide">
                                        Water (Aqua), Glycerin, Cetearyl Alcohol, Stearic Acid, Dimethicone, Phenoxyethanol, Ethylhexylglycerin, Tocopherol (Vitamin E), Lecithin, Xanthan Gum, Pure Essential Oils (Natural Fragrance).
                                    </p>
                                    <p className="text-[10px] text-gray-400 italic">
                                        *Refer to the physical packaging for the most up-to-date ingredient list.
                                    </p>
                                </section>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
