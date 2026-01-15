import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Head, Link, router } from '@inertiajs/react';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { Skeleton, ProductSkeleton } from '@/components/ui/Skeleton';

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
    const [sortBy, setSortBy] = useState('newest');
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const { addItem } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = (product: Product) => {
        addItem({
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            category: product.category,
            image: product.image
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/products', { search }, { preserveState: true, replace: true });
    };

    return (
        <main className="min-h-screen bg-gray-50/50 dark:bg-gray-950 transition-colors">
            <Head title="Products Catalog" />
            <Navbar />

            {/* Catalog Hero/Search Area */}
            <section className="bg-emerald-900 pt-12 pb-16 md:pt-20 md:pb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-800/20 skew-x-12 translate-x-12" />
                <div className="container-custom relative z-10 text-center space-y-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Full Product Catalog</h1>
                    <p className="text-emerald-100/80 max-w-2xl mx-auto">
                        Browse through our wide range of authentic pharmaceutical and wellness products.
                    </p>

                    <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 px-4">
                        <div className="relative flex-1">
                            <input 
                                type="text" 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search for medications, wellness, skincare..."
                                className="w-full bg-white dark:bg-emerald-800 border-0 rounded-2xl py-5 pl-14 pr-4 shadow-2xl focus:ring-2 focus:ring-emerald-400 text-gray-900 dark:text-white dark:placeholder-emerald-200/50 outline-none"
                            />
                            <svg className="w-6 h-6 text-gray-400 dark:text-emerald-300/50 absolute left-5 top-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <button type="submit" className="bg-emerald-400 text-emerald-950 font-extrabold px-10 py-5 sm:py-0 rounded-2xl hover:bg-emerald-300 transition-all shadow-lg active:scale-95">
                            Search
                        </button>
                    </form>
                </div>
            </section>

            {/* Filters and Sorting Toolbar */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-white/5 py-4 shadow-sm relative z-10">
                <div className="container-custom flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                        <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">Jump to:</span>
                        {Object.keys(productsByCategory).map((cat) => (
                            <a 
                                key={cat} 
                                href={`#${cat}`}
                                className="text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 whitespace-nowrap transition-colors"
                            >
                                {CATEGORY_LABELS[cat]}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-gray-50 dark:bg-gray-800 border-0 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500/20 outline-none cursor-pointer"
                        >
                            <option value="newest">Newest Arrivals</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="popular">Most Popular</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Categorized Products */}
            <section className="container-custom py-12 space-y-20">
                {Object.entries(productsByCategory).map(([category, paginated]) => {
                    // Apply sorting to the current data set
                    const sortedData = [...paginated.data].sort((a, b) => {
                        if (sortBy === 'price-low') return a.price - b.price;
                        if (sortBy === 'price-high') return b.price - a.price;
                        return 0; // Default: newest (assuming API order)
                    });

                    return (
                        <div key={category} id={category} className="space-y-8 scroll-mt-32">
                            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 dark:border-gray-800 pb-6 gap-4">
                                <div className="space-y-2 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start space-x-3">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">{CATEGORY_LABELS[category]}</h2>
                                        <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                                            {paginated.data.length} Items
                                        </span>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm italic">Quality medications you can trust.</p>
                                </div>
                                
                                {/* Simple Pagination Controls for Category */}
                                <div className="flex justify-center gap-2">
                                    {paginated.links.map((link, i) => (
                                        link.url ? (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                preserveScroll
                                                className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${link.active ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100 dark:shadow-none' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-emerald-300'}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span 
                                                key={i}
                                                className="px-4 py-2 rounded-lg text-sm font-bold border border-gray-50 dark:border-gray-800 text-gray-300 dark:text-gray-700 pointer-events-none"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                                {isLoading ? (
                                    Array(6).fill(0).map((_, i) => <ProductSkeleton key={i} />)
                                ) : sortedData.length > 0 ? sortedData.map((product) => (
                                    <div key={product.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm hover:shadow-xl transition-all group flex flex-col hover:-translate-y-1 relative">
                                        {/* Wishlist Button */}
                                        <button 
                                            onClick={() => toggleWishlist(product.id)}
                                            className={`absolute top-6 right-6 z-20 p-2 rounded-full backdrop-blur-md transition-all ${isInWishlist(product.id) ? 'bg-rose-500 text-white shadow-lg' : 'bg-white/80 dark:bg-gray-800/80 text-gray-400 hover:text-rose-500'}`}
                                        >
                                            <svg className="w-4 h-4" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>

                                        <Link href={`/product/${product.slug}`} className="aspect-square rounded-xl bg-gray-50 dark:bg-gray-800 overflow-hidden mb-4 relative block">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-emerald-700 dark:text-emerald-400 shadow-sm uppercase">
                                                Authentic
                                            </div>
                                        </Link>
                                        <div className="space-y-1 flex-1">
                                            <Link href={`/product/${product.slug}`} className="block">
                                                <h3 className="font-bold text-sm text-gray-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{product.name}</h3>
                                            </Link>
                                            <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">₦{product.price.toLocaleString()}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleAddToCart(product)}
                                            className="mt-4 w-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold py-2.5 rounded-xl text-xs hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 transition-all active:scale-95"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                )) : (
                                    <div className="col-span-full py-20 bg-gray-50/50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-100 dark:border-white/5 flex flex-col items-center text-center space-y-4">
                                        <div className="p-4 bg-white dark:bg-gray-900 rounded-full shadow-sm text-gray-300 dark:text-gray-700">
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white">No products found</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto mt-1">We couldn't find any products in {CATEGORY_LABELS[category]} matching your criteria.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </section>


            <Footer />
        </main>
    );
}
