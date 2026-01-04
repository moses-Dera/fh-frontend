import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="h-12 w-12 rounded-xl bg-primary-600/10 animate-pulse"></div>
                    <Loader2 className="absolute inset-0 m-auto h-6 w-6 animate-spin text-primary-600" />
                </div>
                <p className="text-sm font-medium text-slate-500 animate-pulse">Loading FreelanceHub...</p>
            </div>
        </div>
    );
}
