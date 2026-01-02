"use client";

import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/lib/store";
import { apiRequest } from "@/lib/api";

export function RoleGuard({ children, requiredRole }: { children: React.ReactNode, requiredRole: 'client' | 'freelancer' }) {
    const { updateUser } = useAuthStore();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const hasChecked = useRef(false);

    useEffect(() => {
        // Prevent multiple checks
        if (hasChecked.current) return;
        hasChecked.current = true;

        const checkRole = async () => {
            try {
                // Fetch user profile to get their actual role
                const profile = await apiRequest<any>('/api/users/profile');

                const userRole = profile.role.toLowerCase();

                // Update store with user data
                updateUser({
                    id: String(profile.id),
                    email: profile.email,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    companyName: profile.companyName,
                    name: `${profile.firstName} ${profile.lastName}`,
                    role: userRole as 'client' | 'freelancer'
                });

                // Check if user's role matches required role
                if (userRole !== requiredRole) {
                    // Redirect to correct dashboard
                    const correctDashboard = userRole === 'freelancer' ? '/dashboard/freelancer' : '/dashboard/client';
                    window.location.href = correctDashboard;
                } else {
                    setIsAuthorized(true);
                    setIsChecking(false);
                }
            } catch (error) {
                console.error("Role check failed:", error);
                // If auth fails, redirect to login
                window.location.href = '/login';
            }
        };

        checkRole();
    }, [requiredRole]); // Remove updateUser from dependencies

    // Show loading state while checking
    if (isChecking) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-slate-600">Verifying access...</div>
            </div>
        );
    }

    // Only render children if authorized
    return isAuthorized ? <>{children}</> : null;
}
