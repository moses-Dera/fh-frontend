"use client";

import { Bell, Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAPI } from "@/lib/api";

interface DashboardHeaderProps {
    onMenuClick: () => void;
}

interface Notification {
    id: number;
    type: string;
    payload: Record<string, unknown>;
    read: boolean;
    createdAt: string;
}

export const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
    const pathname = usePathname();
    const { data: notifications } = useAPI<Notification[]>('/api/notifications', { autoFetch: true });

    // Simple breadcrumb logic
    const getPageTitle = () => {
        const parts = pathname.split("/").filter(Boolean);

        // If last part is a number (ID), use the second-to-last part with "Details" suffix
        const lastPart = parts[parts.length - 1];
        const secondLast = parts[parts.length - 2];

        // Check if it's an ID (numeric or UUID-like) OR if secondLast is a known collection
        const collectionPaths = ['jobs', 'contracts', 'proposals', 'payments', 'internships', 'users'];
        const isDetailPage = secondLast && collectionPaths.includes(secondLast.toLowerCase());

        if (isDetailPage) {
            // Format: "Jobs" -> "Job Details", "contracts" -> "Contract Details"
            const singular = secondLast.endsWith('s') ? secondLast.slice(0, -1) : secondLast;
            return singular.charAt(0).toUpperCase() + singular.slice(1) + " Details";
        }

        if (!lastPart || lastPart === "client" || lastPart === "freelancer") return "Overview";

        // Handle special named routes
        if (lastPart === "new") return "New " + (secondLast?.slice(0, -1).charAt(0).toUpperCase() + secondLast?.slice(0, -1).slice(1) || "Item");
        if (lastPart === "edit") return "Edit";

        return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
    };

    return (
        <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="text-slate-500 hover:text-slate-700 md:hidden"
                >
                    <Menu size={24} />
                </button>
                <h1 className="text-lg font-semibold text-slate-900">{getPageTitle()}</h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="h-10 w-64 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                </div>

                <div className="relative group">
                    <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors">
                        <Bell size={20} />
                        {(notifications?.filter(n => !n.read).length || 0) > 0 && (
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    <div className="absolute right-0 mt-2 w-80 translate-y-2 opacity-0 invisible group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50">
                        <div className="rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-slate-50/50">
                                <h3 className="font-semibold text-slate-900">Notifications</h3>
                                <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                                    Mark all as read
                                </button>
                            </div>
                            <div className="max-h-[300px] overflow-y-auto">
                                {!notifications || notifications.length === 0 ? (
                                    <div className="p-4 text-center text-sm text-slate-500">
                                        No notifications yet
                                    </div>
                                ) : (
                                    notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`border-b border-slate-100 p-4 last:border-0 hover:bg-slate-50 transition-colors ${!notification.read ? 'bg-blue-50/30' : ''}`}
                                        >
                                            <div className="mb-1 flex items-start gap-3">
                                                <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${!notification.read ? 'bg-blue-500' : 'bg-transparent'}`} />
                                                <div>
                                                    <p className="text-sm text-slate-900 font-medium">
                                                        {notification.type === 'PROPOSAL_RECEIVED' && 'New Proposal Received'}
                                                        {notification.type === 'CONTRACT_CREATED' && 'Contract Created'}
                                                        {notification.type === 'PAYMENT_RECEIVED' && 'Payment Received'}
                                                    </p>
                                                    <p className="text-xs text-slate-500 mt-0.5 max-w-[220px] truncate">
                                                        {notification.type === 'PROPOSAL_RECEIVED' && `Proposal for ${notification.payload.jobTitle}`}
                                                        {notification.type === 'CONTRACT_CREATED' && `New contract with ${notification.payload.clientName}`}
                                                    </p>
                                                    <span className="text-[10px] text-slate-400 mt-1 block">
                                                        {new Date(notification.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
