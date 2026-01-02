"use client";

import { useState, Suspense } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { useSearchParams, useRouter } from "next/navigation";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (!token) {
            setError("Invalid or missing reset token");
            setIsLoading(false);
            return;
        }

        try {
            await apiRequest('/api/auth/reset-password', {
                method: 'POST',
                body: { token, newPassword: password }
            });
            setMessage("Password reset successfully! You can now login with your new password.");
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err: any) {
            setError(err.message || "Failed to reset password. Token may be invalid or expired.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold text-red-600">Invalid Link</h2>
                <p className="mt-2 text-slate-600">This password reset link is invalid or missing a token.</p>
                <Link href="/forgot-password" className="mt-4 inline-block text-primary-600 hover:text-primary-500">
                    Request a new one
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                    Reset Password
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                    Enter your new password below.
                </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="password" className="sr-only">New Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="relative block w-full rounded-xl border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 pl-4"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            required
                            className="relative block w-full rounded-xl border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 pl-4"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
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
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
}
