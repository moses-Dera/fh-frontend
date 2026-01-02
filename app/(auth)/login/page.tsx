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

                    const data = await apiRequest<{ token: string, user: any }>('/api/auth/login', {
                        method: 'POST',
                        body: { email, password }
                    });

                    console.log('Login Response Data:', data);

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
                        console.error("Login failed: Invalid token received", data);
                        setError("Login failed: Server response invalid.");
                    }
                } catch (err: any) {
                    console.error("Login error object:", err);
                    setError(err.message || "Login failed");
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

            <div className="relative mt-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-slate-500">Or continue with</span>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Google
                </button>
                <button className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                    <svg className="mr-2 h-5 w-5 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.65 10c0 1.25.9 2.05 1.95 2.05 1 0 1.95-.8 1.95-2.05V6.75h1.8v10.5h-1.8v-1.1c-.6.8-1.7 1.35-2.85 1.35-2.3 0-3.9-1.85-3.9-4.05 0-2.2 1.6-4.05 3.9-4.05 1.15 0 2.25.55 2.85 1.35V6.75h-.15c-1.05 0-1.95.8-1.95 2.05zm4.8 7.25h1.8v-10.5h-1.8v10.5zM12 0L1.7 6.15V17.9L12 24l10.3-6.1V6.15L12 0z" />
                    </svg>
                    Apple
                </button>
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link href="/register" className="font-semibold text-primary-600 hover:text-primary-700">
                    Sign up
                </Link>
            </p>
        </div>
    );
}
