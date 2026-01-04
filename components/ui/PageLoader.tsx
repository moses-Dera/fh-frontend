"use client";

import { Loader2 } from "lucide-react";

export function PageLoader({ message = "Loading..." }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 min-h-[300px]">
            <div className="relative mb-4">
                <div className="h-12 w-12 rounded-xl bg-primary-600/10 animate-pulse"></div>
                <Loader2 className="absolute inset-0 m-auto h-6 w-6 animate-spin text-primary-600" />
            </div>
            <p className="text-sm font-medium text-slate-500 animate-pulse">{message}</p>
        </div>
    );
}
