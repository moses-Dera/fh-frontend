"use client";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Role-specific layouts (client/freelancer) handle the full dashboard structure
    return <>{children}</>;
}
