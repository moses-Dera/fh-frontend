"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Briefcase,
    Settings,
    LogOut,
    Menu,
    X,
    Shield
} from "lucide-react";
import { useState } from "react";

export const AdminSidebar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navigation = [
        { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
        { name: "Manage Jobs", href: "/dashboard/admin/jobs", icon: Briefcase },
        { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white font-bold">
                        A
                    </div>
                    <span className="font-bold text-slate-900">Admin Panel</span>
                </div>
                <button onClick={toggleSidebar} className="text-slate-600">
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-slate-900 text-white transition-transform duration-200 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex h-16 items-center px-6 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white font-bold">
                                <Shield size={18} />
                            </div>
                            <span className="text-lg font-bold tracking-tight">
                                Admin Portal
                            </span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-3 py-6">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-colors ${isActive
                                        ? "bg-red-600 text-white"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                        }`}
                                >
                                    <item.icon
                                        className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                                            }`}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer / Logout */}
                    <div className="border-t border-slate-800 p-4">
                        <button
                            onClick={() => {
                                document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                window.location.href = '/login';
                            }}
                            className="flex w-full items-center gap-2 rounded-xl p-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};
