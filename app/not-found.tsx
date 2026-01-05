"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Search, Briefcase } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">

            {/* Visual Icon/Graphic using CSS/SVG */}
            <div className="mb-8 relative">
                <div className="h-32 w-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Search className="h-16 w-16 text-primary-500 opacity-50" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold text-9xl text-slate-900 opacity-10 tracking-widest">
                    404
                </div>
            </div>

            <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-4">
                Page not found
            </h1>

            <p className="max-w-md mx-auto text-lg text-slate-600 mb-8">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been removed or the link might be broken.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Link href="/">
                    <Button size="lg" className="min-w-[160px]">
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Go Home
                    </Button>
                </Link>
                <Link href="/jobs">
                    <Button variant="outline" size="lg" className="min-w-[160px]">
                        <Briefcase className="mr-2 h-5 w-5" />
                        Browse Jobs
                    </Button>
                </Link>
            </div>

            <div className="mt-12 text-sm text-slate-500">
                Looking for internships? <Link href="/internships" className="text-primary-600 hover:underline font-medium">Click here</Link>
            </div>
        </div>
    );
}
