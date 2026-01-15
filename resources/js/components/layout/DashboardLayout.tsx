import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    ShoppingBag, 
    FileText, 
    User, 
    LogOut,
    ChevronRight
} from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactNode;
    title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
    const { auth } = usePage().props as any;

    const menuItems = [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Order History', href: '/dashboard/orders', icon: ShoppingBag },
        { name: 'My Prescriptions', href: '/dashboard/prescriptions', icon: FileText },
        { name: 'Profile Settings', href: '/dashboard/profile', icon: User },
    ];

    const currentPath = window.location.pathname;

    return (
        <main className="min-h-screen bg-gray-50/50 dark:bg-gray-950 transition-colors">
            <Navbar />
            
            <div className="container-custom py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Side Navigation */}
                    <aside className="w-full lg:w-72 space-y-6">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm">
                            <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-50 dark:border-gray-800">
                                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xl uppercase">
                                    {auth.user?.name?.charAt(0) || 'U'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="font-bold text-gray-900 dark:text-white truncate">{auth.user?.name}</h2>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{auth.user?.email}</p>
                                </div>
                            </div>

                            <nav className="space-y-1">
                                {menuItems.map((item) => {
                                    const isActive = currentPath === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center justify-between p-3 rounded-2xl transition-all group ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100 dark:shadow-none' : 'text-gray-600 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-white/5 hover:text-emerald-600 dark:hover:text-emerald-400'}`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <item.icon className="w-5 h-5" />
                                                <span className="text-sm font-bold uppercase tracking-wide">{item.name}</span>
                                            </div>
                                            {!isActive && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                        </Link>
                                    );
                                })}
                                
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="w-full flex items-center space-x-3 p-3 rounded-2xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all mt-4"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="text-sm font-bold uppercase tracking-wide">Logout</span>
                                </Link>
                            </nav>
                        </div>

                        {/* Help Card */}
                        <div className="bg-emerald-900 rounded-3xl p-6 text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-800/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                            <h3 className="font-bold mb-2 relative z-10">Need Assistance?</h3>
                            <p className="text-xs text-emerald-100/70 mb-4 relative z-10 leading-relaxed">Our pharmacists are available for consultations 24/7.</p>
                            <a href="tel:+2347045475153" className="block w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl text-center text-xs font-bold backdrop-blur-md transition-all relative z-10">+234 704 547 5153</a>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1 space-y-8">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{title}</h1>
                        </div>
                        {children}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
