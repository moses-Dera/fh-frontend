"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button"; // Assuming Button component exists
import Link from "next/link";
import { apiRequest } from "@/lib/api";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);
        setError(null);

        try {
            const data = await apiRequest('/api/auth/forgot-password', {
                method: 'POST',
                body: { email }
            });
            setMessage(data.message);
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                        Forgot your password?
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full rounded-xl border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 pl-4"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {message && (
                        <div className="rounded-md bg-green-50 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">
                                        {message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        Error
                                    </h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <p>{error}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full"
                        >
                            {isLoading ? "Sending..." : "Send Reset Link"}
                        </Button>
                    </div>

                    <div className="text-center text-sm">
                        <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
