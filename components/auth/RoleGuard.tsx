"use client";

import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/lib/store";
import { apiRequest } from "@/lib/api";
import { Verifying } from "@/components/ui/Verifying";

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
                const profile = await apiRequest<{ id: string; role: string; email: string; firstName: string; lastName: string; companyName?: string }>('/api/users/profile');

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
    }, [requiredRole, updateUser]);

    // Show loading state while checking
    if (isChecking) {
        return <Verifying message="Verifying access..." />;
    }

    // Only render children if authorized
    return isAuthorized ? <>{children}</> : null;
}
