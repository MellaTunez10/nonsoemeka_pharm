import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { ShoppingBag, Search, Filter, ExternalLink } from 'lucide-react';

export default function Orders() {
    // Mock orders
    const orders = [
        { id: '#ORD-7829', date: 'Oct 12, 2023', total: '₦12,500', status: 'Delivered', items: 'Paracetamol, Vitamin C', payment: 'Paid' },
        { id: '#ORD-7830', date: 'Oct 15, 2023', total: '₦4,200', status: 'In Transit', items: 'Facial Cleanser', payment: 'Paid' },
        { id: '#ORD-7831', date: 'Oct 18, 2023', total: '₦8,900', status: 'Processing', items: 'Baby Wipes, Diapers', payment: 'Pending' },
    ];

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400';
            case 'In Transit': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
            case 'Processing': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
            case 'Cancelled': return 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400';
            default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
        }
    };

    return (
        <DashboardLayout title="Order History">
            <Head title="Order History" />

            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
                {/* Search and Filter */}
                <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <input 
                            type="text" 
                            placeholder="Search orders..."
                            className="w-full bg-gray-50 dark:bg-gray-800 border-0 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3" />
                    </div>
                    <button className="flex items-center justify-center space-x-2 bg-gray-50 dark:bg-gray-800 px-6 py-3 rounded-2xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-white/5 transition-all">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                </div>

                {/* Orders List */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-white/5 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Items</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-6 font-bold text-gray-900 dark:text-white text-sm">{order.id}</td>
                                    <td className="px-6 py-6 text-xs text-gray-500 dark:text-gray-400">{order.date}</td>
                                    <td className="px-6 py-6 text-xs text-gray-900 dark:text-gray-300 truncate max-w-[150px]">{order.items}</td>
                                    <td className="px-6 py-6 font-bold text-gray-900 dark:text-white text-sm">{order.total}</td>
                                    <td className="px-6 py-6">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6">
                                        <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors flex items-center gap-1 font-bold text-xs uppercase tracking-widest">
                                            Details <ExternalLink className="w-3 h-3" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State Simulated */}
                {orders.length === 0 && (
                    <div className="p-20 text-center space-y-4">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto text-gray-300">
                            <ShoppingBag className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-bold text-gray-900 dark:text-white">No orders yet</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">When you place an order, it will appear here.</p>
                        </div>
                        <Link href="/products" className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold text-sm tracking-widest uppercase shadow-lg shadow-emerald-100 dark:shadow-none hover:bg-emerald-700 transition-all">
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
