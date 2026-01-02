"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useAPI, apiRequest } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import { useParams, useRouter } from "next/navigation";

// Define Job interface locally or import it. 
// For editing, we need existing data.
interface Job {
    id: number; // or string, backend seems to use Int for ID but frontend often handles as string in params
    title: string;
    description: string;
    category: string;
    skills: string[];
    budgetMin: string;
    budgetMax: string;
    deadline: string;
    status: string;
}

export default function EditJobPage() {
    const params = useParams();
    const router = useRouter();
    const { addToast } = useToast();
    const id = params.id;

    const [skills, setSkills] = useState<string[]>([]);
    const [currentSkill, setCurrentSkill] = useState("");
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        budgetMin: "",
        budgetMax: "",
        deadline: "",
        status: "OPEN"
    });

    // Fetch existing job data
    useEffect(() => {
        if (!id) return;

        const fetchJob = async () => {
            try {
                // Assuming GET /api/jobs/:id returns the job object
                const job: Job = await apiRequest(`/api/jobs/${id}`);
                setFormData({
                    title: job.title,
                    category: job.category || "",
                    description: job.description,
                    budgetMin: job.budgetMin,
                    budgetMax: job.budgetMax,
                    deadline: job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : "",
                    status: job.status
                });
                setSkills(job.skills || []);
            } catch (error) {
                console.error("Failed to fetch job", error);
                addToast("Failed to load job details", "error");
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchJob();
    }, [id, addToast]);

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

        const payload = {
            ...formData,
            skills,
            // Ensure numbers are sent if backend expects them, or strings if schema is String
            // Backend schema says budget is String in DB, but let's consistency check.
            // Backend updateJob expects just body.
        };

        try {
            await apiRequest(`/api/jobs/${id}`, {
                method: 'PUT',
                body: payload
            });
            addToast("Job updated successfully!", "success");
            // Redirect back to job list
            setTimeout(() => {
                router.push('/dashboard/client/jobs');
            }, 1000);

        } catch (err) {
            console.error("Failed to update job", err);
            addToast("Failed to update job: " + (err as Error).message, "error");
        }
    };

    if (isLoadingData) return <div className="p-8">Loading job details...</div>;

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
                    <h1 className="text-3xl font-bold text-slate-900">Edit Job Post</h1>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${formData.status === 'OPEN' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                        {formData.status}
                    </span>
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

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-slate-900">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 bg-white"
                            >
                                <option value="OPEN">Open</option>
                                <option value="ASSIGNED">Assigned</option>
                                <option value="COMPLETED">Completed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4">
                    <Link href="/dashboard/client/jobs">
                        <Button variant="ghost" type="button" size="lg">Cancel</Button>
                    </Link>
                    <Button type="submit" size="lg">
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
}
