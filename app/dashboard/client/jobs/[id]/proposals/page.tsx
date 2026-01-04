"use client";

import { useAPI, apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { PageLoader } from "@/components/ui/PageLoader";
import { ArrowLeft, User, DollarSign, Calendar, FileText } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface Proposal {
    id: string;
    userId: string;
    coverLetter: string;
    expectedSalary?: number;
    portfolioLinks: string[];
    status: string;
    createdAt: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        rating?: number;
    };
}

interface Job {
    id: number;
    title: string;
    description: string;
    budgetMin: string;
    budgetMax: string;
    status: string;
    _count?: {
        proposal: number;
    };
}

export default function JobProposalsPage() {
    const params = useParams();
    const router = useRouter();
    const jobId = params.id as string;
    const { addToast } = useToast();

    const { data: job, isLoading: jobLoading } = useAPI<Job>(`/api/jobs/${jobId}`, { autoFetch: true });
    const { data: proposals, isLoading: proposalsLoading, execute: refreshProposals } = useAPI<Proposal[]>(
        `/api/jobs/${jobId}/proposals`,
        { autoFetch: true }
    );

    const [processingId, setProcessingId] = useState<string | null>(null);

    const handleApprove = async (proposalId: string) => {
        setProcessingId(proposalId);
        try {
            await apiRequest(`/api/proposals/${proposalId}/approve`, { method: 'PUT' });
            addToast("Proposal approved! Contract has been created.", "success");
            refreshProposals();
        } catch (err: any) {
            addToast(err.message || "Failed to approve proposal", "error");
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async (proposalId: string) => {
        setProcessingId(proposalId);
        try {
            await apiRequest(`/api/proposals/${proposalId}/reject`, { method: 'PUT' });
            addToast("Proposal rejected", "success");
            refreshProposals();
        } catch (err: any) {
            addToast(err.message || "Failed to reject proposal", "error");
        } finally {
            setProcessingId(null);
        }
    };

    if (jobLoading || proposalsLoading) {
        return (
            <PageLoader message="Loading proposals..." />
        );
    }

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Jobs
            </button>

            {/* Job Info */}
            {job && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
                    <p className="mt-2 text-slate-600">
                        Budget: ${job.budgetMin} - ${job.budgetMax}/hr
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                        {proposals?.length || 0} Proposal{proposals?.length !== 1 ? 's' : ''} Received
                    </p>
                </div>
            )}

            {/* Proposals List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Proposals</h2>

                {!proposals || proposals.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
                        <p className="text-slate-500">No proposals yet</p>
                    </div>
                ) : (
                    proposals.map((proposal) => (
                        <div
                            key={proposal.id}
                            className="rounded-2xl border border-slate-200 bg-white p-6"
                        >
                            {/* Freelancer Info */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                                        <User className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">
                                            {proposal.user.firstName} {proposal.user.lastName}
                                        </h3>
                                        <p className="text-sm text-slate-500">{proposal.user.email}</p>
                                        {proposal.user.rating !== undefined && (
                                            <p className="mt-1 text-sm text-slate-600">
                                                ⭐ Rating: {proposal.user.rating}/5
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${proposal.status === 'ACCEPTED' ? 'bg-green-50 text-green-700' :
                                    proposal.status === 'REJECTED' ? 'bg-red-50 text-red-700' :
                                        proposal.status === 'SHORTLISTED' ? 'bg-blue-50 text-blue-700' :
                                            'bg-yellow-50 text-yellow-700'
                                    }`}>
                                    {proposal.status}
                                </span>
                            </div>

                            {/* Proposal Details */}
                            <div className="mt-6 space-y-4">
                                {/* Expected Salary */}
                                {proposal.expectedSalary && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <DollarSign className="h-4 w-4 text-slate-400" />
                                        <span className="font-semibold text-slate-900">
                                            ${proposal.expectedSalary}/hr
                                        </span>
                                        <span className="text-slate-500">Expected Rate</span>
                                    </div>
                                )}

                                {/* Cover Letter */}
                                <div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                        <FileText className="h-4 w-4" />
                                        Cover Letter
                                    </div>
                                    <p className="mt-2 whitespace-pre-wrap text-slate-600">
                                        {proposal.coverLetter}
                                    </p>
                                </div>

                                {/* Portfolio Links */}
                                {proposal.portfolioLinks && proposal.portfolioLinks.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">Portfolio Links:</p>
                                        <div className="mt-2 space-y-1">
                                            {proposal.portfolioLinks.map((link, index) => (
                                                <a
                                                    key={index}
                                                    href={link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block text-sm text-primary-600 hover:text-primary-700"
                                                >
                                                    {link}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Submitted Date */}
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Calendar className="h-4 w-4" />
                                    Submitted {new Date(proposal.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            {/* Actions */}
                            {proposal.status === 'PENDING' && (
                                <div className="mt-6 flex gap-3">
                                    <Button
                                        onClick={() => handleApprove(proposal.id)}
                                        disabled={processingId === proposal.id}
                                    >
                                        {processingId === proposal.id ? "Processing..." : "Approve & Create Contract"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleReject(proposal.id)}
                                        disabled={processingId === proposal.id}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
