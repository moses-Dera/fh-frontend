"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Settings,
    LogOut,
    X,
    DollarSign,
    Sparkles
} from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { apiRequest } from "@/lib/api";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const pathname = usePathname();
    const { user, updateUser } = useAuthStore();

    const isClient = pathname.includes("/client");

    // Fetch user profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await apiRequest<{ id: string; email: string; firstName: string; lastName: string; companyName?: string; role: string }>('/api/users/profile');
                updateUser({
                    id: String(profile.id),
                    email: profile.email,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    companyName: profile.companyName,
                    name: `${profile.firstName} ${profile.lastName}`,
                    role: profile.role.toLowerCase() as 'client' | 'freelancer'
                });
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };

        fetchProfile();
    }, [updateUser]);

    const clientNavigation = [
        { name: "Overview", href: "/dashboard/client", icon: LayoutDashboard },
        { name: "My Jobs", href: "/dashboard/client/jobs", icon: Briefcase },
        { name: "Proposals", href: "/dashboard/client/proposals", icon: FileText },
        { name: "Contracts", href: "/dashboard/client/contracts", icon: FileText },
        { name: "Financials", href: "/dashboard/client/payments", icon: DollarSign },
        { name: "Settings", href: "/dashboard/client/settings", icon: Settings },
    ];

    const freelancerNavigation = [
        { name: "Overview", href: "/dashboard/freelancer", icon: LayoutDashboard },
        { name: "Browse Jobs", href: "/dashboard/freelancer/jobs", icon: Briefcase },
        { name: "Internships", href: "/dashboard/freelancer/internships", icon: Sparkles },
        { name: "My Proposals", href: "/dashboard/freelancer/proposals", icon: FileText },
        { name: "My Contracts", href: "/dashboard/freelancer/contracts", icon: FileText },
        { name: "Earnings", href: "/dashboard/freelancer/payments", icon: DollarSign },
        { name: "Settings", href: "/dashboard/freelancer/settings", icon: Settings },
    ];

    const navigation = isClient ? clientNavigation : freelancerNavigation;

    // Display name logic
    const displayName = user?.companyName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User';

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r border-slate-200 transition-transform duration-200 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-xl">
                                F
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900">
                                FreelanceHub
                            </span>
                        </Link>
                        <button
                            onClick={onClose}
                            className="md:hidden text-slate-500 hover:text-slate-700"
                        >
                            <X size={20} />
                        </button>
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
                                        ? "bg-primary-50 text-primary-700"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        }`}
                                >
                                    <item.icon
                                        className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? "text-primary-600" : "text-slate-400 group-hover:text-slate-500"
                                            }`}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer Logout Button */}
                    <div className="border-t border-slate-100 p-4">
                        <button
                            onClick={async () => {
                                try {
                                    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                    window.location.href = '/login';
                                } catch (e) {
                                    console.error("Logout failed", e);
                                }
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-xl p-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};
