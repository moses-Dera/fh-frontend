import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
            {/* Back to Home Link */}
            <Link
                href="/"
                className="absolute top-8 left-8 flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
            </Link>

            <div className="w-full max-w-md">
                {/* Logo Header */}
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white font-bold text-2xl shadow-lg shadow-primary-900/10">
                            F
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-900">
                            FreelanceHub
                        </span>
                    </Link>
                </div>

                {/* Main Content Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100">
                    {children}
                </div>

                {/* Footer */}
                <p className="mt-8 text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} FreelanceHub Inc.
                </p>
            </div>
        </div>
    );
}
