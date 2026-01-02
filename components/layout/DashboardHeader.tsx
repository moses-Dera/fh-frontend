"use client";

import { Bell, Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";

interface DashboardHeaderProps {
    onMenuClick: () => void;
}

export const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
    const pathname = usePathname();

    // Simple breadcrumb logic
    const getPageTitle = () => {
        const parts = pathname.split("/").filter(Boolean);
        const lastPart = parts[parts.length - 1];
        if (!lastPart || lastPart === "client") return "Overview";
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

                <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors">
                    <Bell size={20} />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>
            </div>
        </header>
    );
};
