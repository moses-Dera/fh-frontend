"use client";

import { useEffect, useState } from "react";
import { Users, Briefcase, FileText, DollarSign, Loader2, Activity } from "lucide-react";
import { apiRequest } from "@/lib/api";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalJobs: 0,
        activeContracts: 0,
        totalRevenue: 0
    });
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, activityData] = await Promise.all([
                    apiRequest<any>('/api/admin/stats'),
                    apiRequest<any[]>('/api/admin/activity')
                ]);

                if (statsData) setStats(statsData);
                if (Array.isArray(activityData)) setActivities(activityData);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const cards = [
        { name: "Total Users", value: stats.totalUsers, icon: Users, color: "bg-blue-500" },
        { name: "Total Jobs", value: stats.totalJobs, icon: Briefcase, color: "bg-green-500" },
        { name: "Active Contracts", value: stats.activeContracts, icon: FileText, color: "bg-purple-500" },
        { name: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "bg-yellow-500" },
    ];

    if (loading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-primary-600" /></div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((card) => (
                    <div key={card.name} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
                        <div className="p-4 flex items-center">
                            <div className={`flex-shrink-0 rounded-lg p-3 ${card.color}`}>
                                <card.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">{card.name}</dt>
                                    <dd>
                                        <div className="text-lg font-bold text-gray-900">{card.value}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-slate-500" />
                    Recent Activity
                </h2>
                <div className="flow-root">
                    <ul role="list" className="-mb-8">
                        {activities.length === 0 ? (
                            <div className="text-sm text-gray-500 py-4">No recent activity to display.</div>
                        ) : (
                            activities.map((activity, activityIdx) => (
                                <li key={activity.id}>
                                    <div className="relative pb-8">
                                        {activityIdx !== activities.length - 1 ? (
                                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                        ) : null}
                                        <div className="relative flex space-x-3">
                                            <div>
                                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${activity.type === 'USER_JOINED' ? 'bg-blue-500' : 'bg-green-500'
                                                    }`}>
                                                    {activity.type === 'USER_JOINED' ? (
                                                        <Users className="h-4 w-4 text-white" aria-hidden="true" />
                                                    ) : (
                                                        <Briefcase className="h-4 w-4 text-white" aria-hidden="true" />
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        {activity.message}
                                                    </p>
                                                </div>
                                                <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                                    {new Date(activity.date).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
