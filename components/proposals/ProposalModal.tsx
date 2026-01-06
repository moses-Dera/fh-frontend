"use client";

import { Button } from "@/components/ui/Button";
import { X, DollarSign, Clock } from "lucide-react";
import { useAPI } from "@/lib/api";

interface ProposalModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
    budget: string;
    jobId: string;
}

export const ProposalModal = ({ isOpen, onClose, jobTitle, budget, jobId }: ProposalModalProps) => {
    const { execute: submitProposal, isLoading, error } = useAPI(`/api/jobs/${jobId}/proposals`, { method: 'POST' });

    // Example of using global store interaction if needed, though props work fine here
    // const { closeModal } = useUIStore(); 

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const data = {
            expectedSalary: Number(formData.get('amount')), // Map 'amount' input to 'expectedSalary'
            // duration: formData.get('duration'), // Not in schema yet, ignore or add to coverLetter?
            coverLetter: formData.get('coverLetter') + `\n\nProposed Duration: ${formData.get('duration')}`, // Append duration to cover letter for now
            // API might expect jobID in body too, or just in URL
            jobId: jobId
        };

        try {
            await submitProposal(data);
            alert("Proposal submitted successfully!");
            onClose();
        } catch (err) {
            console.error("Failed to submit proposal", err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
                >
                    <X size={20} />
                </button>

                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Submit a Proposal</h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Applying for: <span className="font-semibold text-slate-700">{jobTitle}</span>
                    </p>
                    <div className="mt-2 inline-flex items-center rounded-lg bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        Client&apos;s Budget: {budget}
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                        Failed to submit proposal. Please try again.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-900">
                                Bid Amount
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="number"
                                    name="amount"
                                    required
                                    className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-900">
                                Duration
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <select
                                    name="duration"
                                    className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 bg-white"
                                >
                                    <option value="1 week">Less than 1 week</option>
                                    <option value="1 month">1 to 4 weeks</option>
                                    <option value="3 months">1 to 3 months</option>
                                    <option value="6 months">3 to 6 months</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900">
                            Cover Letter
                        </label>
                        <textarea
                            name="coverLetter"
                            required
                            rows={5}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none"
                            placeholder="Explain why you are the right fit for this job..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={isLoading}>
                            Submit Proposal
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
