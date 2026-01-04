"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { apiRequest } from "@/lib/api";

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const password = data.password as string;
            const confirmPassword = data.confirmPassword as string;

            if (password !== confirmPassword) {
                setError("Passwords do not match");
                setIsLoading(false);
                return;
            }

            const payload = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: password,
                role: data.role === 'Hire Talent' ? 'CLIENT' : 'FREELANCER'
            };
            // console.log("Registering with payload:", payload);

            const res = await apiRequest<{ token: string }>('/api/auth/register', {
                method: 'POST',
                body: payload
            });

            // Store token
            document.cookie = `auth_token=${res.token}; path=/; max-age=86400; SameSite=Strict`;

            // Redirect
            window.location.href = data.role === 'Hire Talent' ? "/dashboard/client" : "/dashboard/freelancer";

        } catch (err: any) {
            setError(err.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8">
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-slate-900">Create an account</h1>
                <p className="mt-2 text-sm text-slate-500">
                    Join thousands of freelancers and clients
                </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                        {error}
                    </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            required
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/10 transition-all"
                            placeholder="John"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/10 transition-all"
                            placeholder="Doe"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Email address
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/10 transition-all"
                        placeholder="name@company.com"
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/10 transition-all"
                        placeholder="••••••••"
                    />
                    <p className="mt-1 text-xs text-slate-500">Must be at least 8 characters</p>
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/10 transition-all"
                        placeholder="••••••••"
                    />
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-700">I want to:</label>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="cursor-pointer">
                            <input type="radio" name="role" value="Hire Talent" className="peer sr-only" defaultChecked />
                            <div className="rounded-xl border border-slate-200 p-3 text-center transition-all peer-checked:border-primary-600 peer-checked:bg-primary-50 peer-checked:text-primary-700 hover:border-slate-300">
                                <span className="block text-sm font-semibold">Hire Talent</span>
                            </div>
                        </label>
                        <label className="cursor-pointer">
                            <input type="radio" name="role" value="Find Work" className="peer sr-only" />
                            <div className="rounded-xl border border-slate-200 p-3 text-center transition-all peer-checked:border-primary-600 peer-checked:bg-primary-50 peer-checked:text-primary-700 hover:border-slate-300">
                                <span className="block text-sm font-semibold">Find Work</span>
                            </div>
                        </label>
                    </div>
                </div>

                <Button fullWidth size="lg" isLoading={isLoading}>Create Account</Button>
            </form>



            <p className="mt-8 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-700">
                    Sign in
                </Link>
            </p>
        </div>
    );
}
