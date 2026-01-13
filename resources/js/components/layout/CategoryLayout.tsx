import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Link, Head } from '@inertiajs/react';

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    image: string;
    stock: number;
}

export interface PaginatedProducts {
    data: Product[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
}

interface CategoryLayoutProps {
    title: string;
    description: string;
    icon: string;
    colorClass?: string;
    products?: PaginatedProducts;
    children?: React.ReactNode;
}

export default function CategoryLayout({ 
    title, 
    description, 
    icon, 
    colorClass = "bg-emerald-600",
    products,
    children 
}: CategoryLayoutProps) {
  return (
    <main className="min-h-screen bg-gray-50/50">
      <Head title={title} />
      <Navbar />
      
      {/* Category Hero */}
      <section className={`relative overflow-hidden py-16 md:py-24 ${colorClass}`}>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/10 skew-x-12 translate-x-12" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 text-white">
            <div className="bg-white/20 p-8 rounded-[2.5rem] backdrop-blur-md border border-white/20 shadow-2xl">
                <span className="text-7xl">{icon}</span>
            </div>
            <div className="text-center md:text-left space-y-4 flex-1">
               <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{title}</h1>
               <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                 {description}
               </p>
            </div>
            
            {/* Quick Stats or Action */}
            <div className="hidden lg:block bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
                <div className="text-sm font-bold uppercase tracking-widest text-white/60 mb-1">Available Items</div>
                <div className="text-3xl font-bold text-white">{products?.data.length || 0} Products</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container-custom py-16">
         {children || (
             <div className="space-y-12">
                {products && products.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                            {products.data.map((product) => (
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
                                    <button 
                                        onClick={() => alert('Shopping functionality is being finalized. You will be able to add products to your cart very soon!')}
                                        className="mt-4 w-full bg-emerald-50 text-emerald-700 font-bold py-2 rounded-xl text-xs hover:bg-emerald-600 hover:text-white transition-all"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center gap-2 pt-8">
                            {products.links.map((link, i) => (
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
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
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl">
                        <div className="bg-emerald-50 p-6 rounded-full mb-6">
                           <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                           </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Inventory Loading...</h2>
                        <p className="text-gray-500">We're updating our stock for {title}. Please check back in a moment.</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="mt-8 bg-emerald-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                        >
                           Refresh Catalog
                        </button>
                    </div>
                )}
             </div>
         )}
      </section>

      <Footer />
    </main>
  );
}
