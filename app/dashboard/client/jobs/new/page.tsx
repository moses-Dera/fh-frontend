"use client";

import { PageHeader } from "@/components/ui/Shared";

export default function NewJobPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Post New Job"
                description="Create a new job posting to find the perfect freelancer."
            />
            
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-slate-600">Job posting form coming soon...</p>
            </div>
        </div>
    );
}