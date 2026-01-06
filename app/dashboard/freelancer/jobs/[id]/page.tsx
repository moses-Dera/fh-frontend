"use client";

import { useAPI, apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { PageLoader } from "@/components/ui/PageLoader";
import { useToast } from "@/components/ui/Toast";
import { Clock, DollarSign, Calendar, Briefcase, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Job {
    id: number;
    title: string;
    description: string;
    category?: string;
    skills?: string[];
    budgetMin: string;
    budgetMax: string;
    deadline: string;
    status: string;
    createdAt: string;
    client?: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    _count?: {
        proposal: number;
    };
}

export default function JobDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const jobId = params.id as string;
    const { data: job, isLoading, error } = useAPI<Job>(`/api/jobs/${jobId}`, { autoFetch: true });
    const { addToast } = useToast();

    const [showProposalModal, setShowProposalModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [proposalData, setProposalData] = useState({
        coverLetter: "",
        expectedSalary: "",
        portfolioLinks: [""],
        attachments: [""]
    });

    const handleSubmitProposal = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await apiRequest(`/api/jobs/${jobId}/proposals`, {
                method: 'POST',
                body: {
                    coverLetter: proposalData.coverLetter,
                    expectedSalary: proposalData.expectedSalary ? parseInt(proposalData.expectedSalary) : undefined,
                    portfolioLinks: proposalData.portfolioLinks.filter(link => link.trim() !== ""),
                    attachments: proposalData.attachments.filter(att => att.trim() !== "")
                }
            });

            addToast("Proposal submitted successfully!", "success");
            setShowProposalModal(false);
            router.push("/dashboard/freelancer/proposals");
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Failed to submit proposal";
            addToast(errorMessage, "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const addPortfolioLink = () => {
        setProposalData(prev => ({
            ...prev,
            portfolioLinks: [...prev.portfolioLinks, ""]
        }));
    };

    const updatePortfolioLink = (index: number, value: string) => {
        setProposalData(prev => ({
            ...prev,
            portfolioLinks: prev.portfolioLinks.map((link, i) => i === index ? value : link)
        }));
    };

    if (isLoading) {
        return (
            <PageLoader message="Loading job details..." />
        );
    }

    if (error || !job) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                <p className="font-medium">Error loading job</p>
                <p className="text-sm">{error?.message || "Job not found"}</p>
            </div>
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

            {/* Job Header */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
                        <p className="mt-2 text-slate-600">
                            Posted by {job.client ? `${job.client.firstName} ${job.client.lastName}` : "Anonymous Client"}
                        </p>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${job.status === 'OPEN' ? 'bg-green-50 text-green-700' :
                        job.status === 'ASSIGNED' ? 'bg-blue-50 text-blue-700' :
                            'bg-slate-50 text-slate-700'
                        }`}>
                        {job.status}
                    </span>
                </div>

                {/* Job Meta */}
                <div className="mt-6 flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-slate-400" />
                        <span className="font-semibold text-slate-900">${job.budgetMin} - ${job.budgetMax}/hr</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-slate-400" />
                        <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-slate-400" />
                        <span>{job._count?.proposal || 0} Proposals</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-slate-400" />
                        <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Apply Button */}
                {job.status === 'OPEN' && (
                    <div className="mt-6">
                        <Button onClick={() => setShowProposalModal(true)} size="lg">
                            Apply for this Job
                        </Button>
                    </div>
                )}
            </div>

            {/* Job Description */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-bold text-slate-900">Job Description</h2>
                <p className="mt-4 whitespace-pre-wrap text-slate-600">{job.description}</p>
            </div>

            {/* Skills Required */}
            {job.skills && job.skills.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h2 className="text-xl font-bold text-slate-900">Skills Required</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center rounded-md bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-700"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Proposal Modal */}
            {showProposalModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6">
                        <h2 className="text-2xl font-bold text-slate-900">Submit Proposal</h2>
                        <p className="mt-2 text-slate-600">Apply for: {job.title}</p>

                        <form onSubmit={handleSubmitProposal} className="mt-6 space-y-4">
                            {/* Cover Letter */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Cover Letter *
                                </label>
                                <textarea
                                    required
                                    value={proposalData.coverLetter}
                                    onChange={(e) => setProposalData(prev => ({ ...prev, coverLetter: e.target.value }))}
                                    rows={6}
                                    className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                    placeholder="Explain why you're the best fit for this job..."
                                />
                            </div>

                            {/* Expected Salary */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Expected Hourly Rate ($)
                                </label>
                                <input
                                    type="number"
                                    value={proposalData.expectedSalary}
                                    onChange={(e) => setProposalData(prev => ({ ...prev, expectedSalary: e.target.value }))}
                                    className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                    placeholder={`${job.budgetMin} - ${job.budgetMax}`}
                                />
                            </div>

                            {/* Portfolio Links */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Portfolio Links
                                </label>
                                {proposalData.portfolioLinks.map((link, index) => (
                                    <input
                                        key={index}
                                        type="url"
                                        value={link}
                                        onChange={(e) => updatePortfolioLink(index, e.target.value)}
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                        placeholder="https://..."
                                    />
                                ))}
                                <button
                                    type="button"
                                    onClick={addPortfolioLink}
                                    className="mt-2 text-sm text-primary-600 hover:text-primary-700"
                                >
                                    + Add another link
                                </button>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowProposalModal(false)}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit Proposal"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
