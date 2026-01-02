"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { RoleGuard } from "@/components/auth/RoleGuard";

export default function ClientDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <RoleGuard requiredRole="client">
            <div className="flex min-h-screen bg-slate-50">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                <div className="flex flex-1 flex-col">
                    <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

                    <main className="flex-1 p-4 md:p-8">
                        <div className="mx-auto max-w-7xl">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </RoleGuard>
    );
}
