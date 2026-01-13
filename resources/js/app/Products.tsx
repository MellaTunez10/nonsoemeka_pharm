import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Head, Link, router } from '@inertiajs/react';

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

interface PaginatedProducts {
    data: Product[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
}

interface ProductsByCategory {
    [key: string]: PaginatedProducts;
}

interface ProductsProps {
    productsByCategory: ProductsByCategory;
    filters: { search?: string };
}

const CATEGORY_LABELS: { [key: string]: string } = {
    'prescription': 'Prescription',
    'vitamins-supplements': 'Vitamins & Supplements',
    'skincare': 'Skincare',
    'baby-mother': 'Baby & Mother',
    'sexual-health': 'Sexual Health',
    'daily-needs': 'Daily Needs',
};

export default function Products({ productsByCategory, filters }: ProductsProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/products', { search }, { preserveState: true, replace: true });
    };

    return (
        <main className="min-h-screen bg-gray-50/50">
            <Head title="Products Catalog" />
            <Navbar />

            {/* Catalog Hero/Search Area */}
            <section className="bg-emerald-900 pt-12 pb-16 md:pt-20 md:pb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-800/20 skew-x-12 translate-x-12" />
                <div className="container-custom relative z-10 text-center space-y-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Full Product Catalog</h1>
                    <p className="text-emerald-100/80 max-w-2xl mx-auto">
                        Browse through our wide range of authentic pharmaceutical and wellness products.
                    </p>

                    <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex gap-4">
                        <div className="relative flex-1">
                            <input 
                                type="text" 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search for medications, wellness, skincare..."
                                className="w-full bg-white border-0 rounded-2xl py-5 pl-14 pr-4 shadow-2xl focus:ring-2 focus:ring-emerald-400 text-gray-900 outline-none"
                            />
                            <svg className="w-6 h-6 text-gray-400 absolute left-5 top-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <button type="submit" className="bg-emerald-400 text-emerald-950 font-bold px-8 rounded-2xl hover:bg-emerald-300 transition-all shadow-lg">
                            Search
                        </button>
                        <button type="button" className="bg-emerald-800/50 text-white border border-emerald-700/50 p-5 rounded-2xl hover:bg-emerald-800 transition-all">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </section>

            {/* Categorized Products */}
            <section className="container-custom py-16 space-y-24">
                {Object.entries(productsByCategory).map(([category, paginated]) => (
                    <div key={category} id={category} className="space-y-8">
                        <div className="flex items-end justify-between border-b border-gray-100 pb-6">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">{CATEGORY_LABELS[category]}</h2>
                                <p className="text-gray-500 text-sm">Showing {paginated.data.length} products in this category</p>
                            </div>
                            
                            {/* Simple Pagination Controls for Category */}
                            <div className="flex gap-2">
                                {paginated.links.map((link, i) => (
                                    link.url ? (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            preserveScroll
                                            className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${link.active ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span 
                                            key={i}
                                            className="px-4 py-2 rounded-lg text-sm font-bold border border-gray-50 text-gray-300 pointer-events-none"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {paginated.data.length > 0 ? paginated.data.map((product) => (
                                <div key={product.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                                    <div className="aspect-square rounded-xl bg-gray-50 overflow-hidden mb-4 relative">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-emerald-700 shadow-sm uppercase">
                                            New
                                        </div>
                                    </div>
                                    <div className="space-y-1 flex-1">
                                        <h3 className="font-bold text-sm text-gray-900 truncate">{product.name}</h3>
                                        <p className="text-emerald-600 font-bold text-sm">₦{product.price.toLocaleString()}</p>
                                    </div>
                                    <button className="mt-4 w-full bg-emerald-50 text-emerald-700 font-bold py-2 rounded-xl text-xs hover:bg-emerald-600 hover:text-white transition-all">
                                        Add to Cart
                                    </button>
                                </div>
                            )) : (
                                <div className="col-span-full py-12 text-center text-gray-400 italic">
                                    No products found matching your search in this category.
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </section>

            <Footer />
        </main>
    );
}
