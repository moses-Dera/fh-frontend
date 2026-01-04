"use client";

import { LockKeyhole } from "lucide-react";

export function Verifying({ message = "Verifying identity..." }: { message?: string }) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="relative flex flex-col items-center">
                {/* Animated Outer Ring */}
                <div className="absolute h-24 w-24 animate-ping rounded-full bg-primary-100 opacity-75"></div>

                {/* Icon Container */}
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl ring-1 ring-slate-100">
                    <LockKeyhole className="h-8 w-8 text-primary-600 animate-pulse" />
                </div>

                {/* Text and Status */}
                <div className="mt-8 space-y-2 text-center">
                    <h3 className="text-lg font-semibold text-slate-900">{message}</h3>
                    <div className="flex items-center justify-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-600 animate-[bounce_1s_infinite_100ms]"></span>
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-600 animate-[bounce_1s_infinite_200ms]"></span>
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-600 animate-[bounce_1s_infinite_300ms]"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
