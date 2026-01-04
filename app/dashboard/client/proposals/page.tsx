"use client";

import { PageHeader, StatusBadge } from "@/components/ui/Shared";
import { ProposalCard } from "@/components/ui/Cards";
import { PageLoader } from "@/components/ui/PageLoader";
import { useAPI } from "@/lib/api";
import { useSearchParams } from "next/navigation";

// Interface matching backend response
interface Proposal {
    id: string;
    jobId: number;
    userId: string;
    coverLetter: string;
    expectedSalary: number;
    status: string;
    createdAt: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        rating?: number;
    };
    job?: {
        id: number;
        title: string;
    };
}

export default function ClientProposalsPage() {
    const searchParams = useSearchParams();
    const jobId = searchParams?.get('jobId');

    // Determine endpoint based on jobId presence
    const endpoint = jobId
        ? `/api/jobs/${jobId}/proposals`
        : '/api/proposals';

    const { data: proposals, isLoading, error } = useAPI<Proposal[]>(endpoint, { autoFetch: true });

    return (
        <div className="space-y-6">
            <PageHeader
                title={jobId ? "Job Proposals" : "All Proposals"}
                description={jobId ? "Viewing proposals for specific job." : "Manage proposals received for your job postings."}
            />

            {isLoading ? (
                <PageLoader message="Loading proposals..." />
            ) : error ? (
                <div className="text-red-500">Error loading proposals</div>
            ) : (
                <div className="grid gap-6">
                    {proposals?.map((proposal) => (
                        <div key={proposal.id} className="block relative">
                            {/* Overlay status badge */}
                            <div className="absolute top-6 right-6 z-10">
                                <StatusBadge status={proposal.status} />
                            </div>

                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                <div className="mb-4 text-sm text-slate-500 font-medium">
                                    For Job: <span className="text-primary-600 ml-1">{proposal.job?.title || "Unknown Job"}</span>
                                </div>

                                <ProposalCard
                                    freelancerName={`${proposal.user.firstName} ${proposal.user.lastName}`}
                                    coverLetterSnippet={proposal.coverLetter}
                                    amount={`$${proposal.expectedSalary}`}
                                    duration="Duration in cover letter" // Duration is embedded in coverLetter
                                    skills={[]} // Skills not in proposal model yet
                                    rating={proposal.user.rating || 0}
                                    onView={() => window.location.href = `/dashboard/client/proposals/${proposal.id}`}
                                />
                            </div>
                        </div>
                    ))}

                    {(!proposals || proposals.length === 0) && (
                        <div className="text-center py-12 text-slate-500">
                            No proposals received yet.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
