"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { apiRequest } from "@/lib/api";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    return (
        <div className="p-8">
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
                <p className="mt-2 text-sm text-slate-500">
                    Enter your credentials to access your account
                </p>
            </div>

            <form className="space-y-5" onSubmit={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                setError("");

                try {
                    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
                    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;

                    const data = await apiRequest<{ token: string, user: { role: string } }>('/api/auth/login', {
                        method: 'POST',
                        body: { email, password }
                    });

                    // console.log('Login Response Data:', data);

                    if (data && typeof data.token === 'string' && data.token.length > 0) {
                        // Store token in cookie
                        document.cookie = `auth_token=${data.token}; path=/; max-age=86400; SameSite=Strict`;

                        // Redirect based on user's actual role
                        const userRole = data.user?.role?.toLowerCase();
                        if (userRole === 'freelancer') {
                            window.location.href = "/dashboard/freelancer";
                        } else {
                            window.location.href = "/dashboard/client";
                        }
                    } else {
                        // console.error("Login failed: Invalid token received", data);
                        setError("Login failed: Server response invalid.");
                    }
                } catch (err: unknown) {
                    // console.error("Login error object:", err);
                    setError(err instanceof Error ? err.message : "Login failed");
                } finally {
                    setIsLoading(false);
                }
            }}>
                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                        {error}
                    </div>
                )}
                <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/10 transition-all"
                        placeholder="name@company.com"
                    />
                </div>

                <div>
                    <div className="mb-1.5 flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                            Password
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-primary-600 hover:text-primary-700"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/10 transition-all"
                        placeholder="••••••••"
                    />
                </div>

                <Button fullWidth size="lg" isLoading={isLoading}>Sign in</Button>
            </form>



            <p className="mt-8 text-center text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-semibold text-primary-600 hover:text-primary-700">
                    Sign up
                </Link>
            </p>
        </div>
    );
}
