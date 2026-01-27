"use client";

import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { apiRequest } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";

export default function NewJobPage() {
    const router = useRouter();
    const { addToast } = useToast();

    const [skills, setSkills] = useState<string[]>([]);
    const [currentSkill, setCurrentSkill] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        budgetMin: "",
        budgetMax: "",
        deadline: "",
        status: "OPEN"
    });

    const handleAddSkill = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && currentSkill.trim()) {
            e.preventDefault();
            if (!skills.includes(currentSkill.trim())) {
                setSkills([...skills, currentSkill.trim()]);
            }
            setCurrentSkill("");
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            ...formData,
            skills,
        };

        try {
            await apiRequest('/api/jobs', {
                method: 'POST',
                body: payload
            });
            addToast("Job posted successfully!", "success");
            // Redirect back to job list
            setTimeout(() => {
                router.push('/dashboard/client/jobs');
            }, 1000);

        } catch (err) {
            console.error("Failed to post job", err);
            addToast("Failed to post job: " + (err as Error).message, "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div>
                <Link
                    href="/dashboard/client/jobs"
                    className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center mb-4 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to My Jobs
                </Link>
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-slate-900">Post a New Job</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
                    <h2 className="text-xl font-bold text-slate-900">Basic Information</h2>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900">
                            Job Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                            placeholder="e.g. Senior Product Designer"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 bg-white"
                        >
                            <option value="">Select a category</option>
                            <option value="design">Design & Creative</option>
                            <option value="development">Development & IT</option>
                            <option value="marketing">Sales & Marketing</option>
                            <option value="writing">Writing & Translation</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none"
                            placeholder="Describe the job requirements, responsibilities, and any other important details..."
                        />
                    </div>
                </div>

                {/* Skills & Budget Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
                    <h2 className="text-xl font-bold text-slate-900">Details & Budget</h2>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900">
                            Required Skills
                        </label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {skills.map(skill => (
                                <span key={skill} className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(skill)}
                                        className="ml-2 rounded-full hover:bg-primary-100 p-0.5"
                                    >
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                value={currentSkill}
                                onChange={(e) => setCurrentSkill(e.target.value)}
                                onKeyDown={handleAddSkill}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                placeholder="Type a skill and press Enter..."
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-900">
                                Minimum Budget ($)
                            </label>
                            <input
                                type="number"
                                name="budgetMin"
                                value={formData.budgetMin}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                placeholder="0"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-900">
                                Maximum Budget ($)
                            </label>
                            <input
                                type="number"
                                name="budgetMax"
                                value={formData.budgetMax}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                placeholder="1000"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-slate-900">
                                Project Deadline
                            </label>
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4">
                    <Link href="/dashboard/client/jobs">
                        <Button variant="ghost" type="button" size="lg">Cancel</Button>
                    </Link>
                    <Button type="submit" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? 'Posting...' : 'Post Job'}
                    </Button>
                </div>
            </form>
        </div>
    );
}