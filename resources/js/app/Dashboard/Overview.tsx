import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    ShoppingBag, 
    Clock, 
    CheckCircle2, 
    AlertCircle,
    ArrowRight
} from 'lucide-react';

export default function Overview() {
    // Mock data for demonstration - in real app this comes from props
    const stats = [
        { name: 'Total Orders', value: '12', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { name: 'Active Prescriptions', value: '2', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        { name: 'Completed Orders', value: '10', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    ];

    const recentOrders = [
        { id: '#ORD-7829', date: 'Oct 12, 2023', total: '₦12,500', status: 'Delivered' },
        { id: '#ORD-7830', date: 'Oct 15, 2023', total: '₦4,200', status: 'In Transit' },
    ];

    return (
        <DashboardLayout title="Welcome back!">
            <Head title="User Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm flex items-center space-x-6">
                        <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{stat.name}</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 dark:text-white">Recent Orders</h3>
                        <Link href="/dashboard/orders" className="text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center hover:underline">
                            View All <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-50 dark:divide-gray-800">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <div className="space-y-1">
                                    <p className="font-bold text-gray-900 dark:text-white text-sm">{order.id}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{order.date}</p>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="font-bold text-gray-900 dark:text-white text-sm">{order.total}</p>
                                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.status === 'Delivered' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Account Security Banner */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm p-8 flex flex-col justify-center items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <AlertCircle className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Keep your account secure</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">Make sure to update your password regularly and enable two-factor authentication.</p>
                    </div>
                    <Link href="/dashboard/profile" className="bg-emerald-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-emerald-700 transition-all text-sm uppercase tracking-widest shadow-lg shadow-emerald-100 dark:shadow-none">
                        Security Settings
                    </Link>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl p-8 border border-emerald-100 dark:border-emerald-800/20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-400">Prescription Upload</h3>
                        <p className="text-emerald-700/70 dark:text-emerald-200/50 text-sm">Need to refill a medication? Upload your prescription now for rapid review.</p>
                    </div>
                    <Link href="/prescription-upload" className="bg-emerald-600 text-white font-bold px-10 py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 dark:shadow-none whitespace-nowrap uppercase tracking-widest text-sm">
                        Upload New
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}
