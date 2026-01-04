"use client";

import { useAPI, apiRequest } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { PageHeader, StatusBadge } from "@/components/ui/Shared";
import { Button } from "@/components/ui/Button";
import { PageLoader } from "@/components/ui/PageLoader";
import { ArrowLeft, Clock, DollarSign, Star, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";

interface ProposalDisplay {
    id: string;
    jobId: number;
    userId: string;
    coverLetter: string;
    expectedSalary: number;
    resumeUrl: string | null;
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
    job: {
        id: number;
        title: string;
        deadline: string;
        clientId: string;
    };
}

export default function ProposalDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { addToast } = useToast();
    const id = params?.id as string;
    const [isHiring, setIsHiring] = useState(false);

    const { data: proposal, isLoading, error } = useAPI<ProposalDisplay>(`/api/proposals/${id}`, { autoFetch: true });

    const handleHire = async () => {
        if (!confirm("Are you sure you want to hire this freelancer? This will create a contract.")) return;

        setIsHiring(true);
        try {
            // Default contract duration: 1 month from now for MVP
            const startDate = new Date();
            const endDate = new Date();
            endDate.setMonth(endDate.getMonth() + 1);

            await apiRequest('/api/contracts', {
                method: 'POST',
                body: JSON.stringify({
                    proposalId: proposal!.id,
                    jobId: proposal!.job.id,
                    freelancerId: proposal!.userId,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString()
                })
            });

            addToast("Contract created successfully!", "success");
            router.push('/dashboard/client/contracts');

        } catch (err: any) {
            console.error("Failed to hire:", err);
            addToast(err.message || "Failed to create contract", "error");
        } finally {
            setIsHiring(false);
        }
    };

    if (isLoading) return <PageLoader message="Loading proposal details..." />;
    if (error) return <div className="p-8 text-red-500">Error: {error.message}</div>;
    if (!proposal) return <div className="p-8">Proposal not found</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12">
            <Link
                href={`/dashboard/client/proposals?jobId=${proposal.job.id}`}
                className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Proposals
            </Link>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl font-bold text-slate-900">
                                {proposal.user.firstName} {proposal.user.lastName}
                            </h1>
                            <StatusBadge status={proposal.status} />
                        </div>
                        <p className="text-slate-500">
                            Applying for <span className="font-medium text-slate-900">{proposal.job.title}</span>
                        </p>

                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                                <DollarSign className="h-4 w-4 text-emerald-600" />
                                <span className="font-medium text-slate-900">${proposal.expectedSalary}</span> Bid Amount
                            </span>
                            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                Posted {new Date(proposal.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                {proposal.user.rating || "No ratings"}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => window.open(`mailto:${proposal.user.email}`)}>
                            Message
                        </Button>
                        {proposal.status !== 'ACCEPTED' && (
                            <Button onClick={handleHire} isLoading={isHiring}>
                                Hire Freelancer
                            </Button>
                        )}
                        {proposal.status === 'ACCEPTED' && (
                            <Button variant="secondary" disabled>
                                Hired
                            </Button>
                        )}
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Cover Letter</h3>
                        <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-wrap leading-relaxed bg-slate-50 p-6 rounded-xl border border-slate-100">
                            {proposal.coverLetter}
                        </div>
                    </div>

                    {proposal.portfolioLinks && proposal.portfolioLinks.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Portfolio Links</h3>
                            <ul className="space-y-2">
                                {proposal.portfolioLinks.map((link, i) => (
                                    <li key={i}>
                                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline flex items-center gap-2">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
