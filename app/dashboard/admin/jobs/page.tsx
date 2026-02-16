"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { Search, Loader2, Trash2, Briefcase, Filter } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

interface Job {
    id: number;
    title: string;
    description: string;
    budgetMin: string;
    budgetMax: string;
    jobType: string;
    status: string;
    createdAt: string;
    client: {
        firstName: string;
        lastName: string;
        email: string;
    };
    _count?: {
        proposal: number;
    };
}

export default function ManageJobsPage() {
    const { addToast } = useToast();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState<string>("ALL");
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [jobToDelete, setJobToDelete] = useState<number | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Fetch all jobs. Admin should see all.
                // We might need to handle pagination in a real app, 
                // but for now fetch all is fine for the scale.
                const data = await apiRequest<Job[]>('/api/jobs');
                if (Array.isArray(data)) {
                    setJobs(data);
                } else {
                    setJobs([]);
                    addToast("Failed to load jobs data", "error");
                }
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
                addToast("Failed to fetch jobs", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [addToast]);

    const confirmDelete = (jobId: number) => {
        setJobToDelete(jobId);
    };

    const handleDelete = async () => {
        if (!jobToDelete) return;

        setIsDeleting(jobToDelete);
        try {
            await apiRequest(`/api/jobs/${jobToDelete}`, { method: 'DELETE' });
            setJobs(jobs.filter(j => j.id !== jobToDelete));
            addToast("Job deleted successfully", "success");
        } catch (error) {
            console.error("Failed to delete job:", error);
            addToast("Failed to delete job", "error");
        } finally {
            setIsDeleting(null);
            setJobToDelete(null);
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch =
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.description.toLowerCase().includes(search.toLowerCase()) ||
            job.client?.email.toLowerCase().includes(search.toLowerCase());

        const matchesType = filterType === "ALL" || job.jobType === filterType;

        return matchesSearch && matchesType;
    });

    if (loading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-primary-600" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-slate-900">Manage Jobs</h1>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <select
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white w-full sm:w-auto"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="ALL">All Types</option>
                            <option value="FULL_TIME">Full Time</option>
                            <option value="PART_TIME">Part Time</option>
                            <option value="CONTRACT">Contract</option>
                            <option value="INTERNSHIP">Internship</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Job Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Posted</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {filteredJobs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        No jobs found
                                    </td>
                                </tr>
                            ) : (
                                filteredJobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                                    <Briefcase className="h-5 w-5" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-slate-900 truncate max-w-xs" title={job.title}>
                                                        {job.title}
                                                    </div>
                                                    <div className="text-xs text-slate-500">
                                                        ${Number(job.budgetMin).toLocaleString()} - ${Number(job.budgetMax).toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-900">{job.client?.firstName} {job.client?.lastName}</div>
                                            <div className="text-xs text-slate-500">{job.client?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.jobType === 'INTERNSHIP' ? 'bg-purple-100 text-purple-800' :
                                                job.jobType === 'FULL_TIME' ? 'bg-green-100 text-green-800' :
                                                    'bg-blue-100 text-blue-800'
                                                }`}>
                                                {job.jobType || 'CONTRACT'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.status === 'OPEN' ? 'bg-green-100 text-green-800' :
                                                'bg-slate-100 text-slate-800'
                                                }`}>
                                                {job.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {new Date(job.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => confirmDelete(job.id)}
                                                disabled={isDeleting === job.id}
                                                className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
                                                title="Delete Job"
                                            >
                                                {isDeleting === job.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmationModal
                isOpen={!!jobToDelete}
                onClose={() => setJobToDelete(null)}
                onConfirm={handleDelete}
                title="Delete Job"
                description="Are you sure you want to delete this job? This action cannot be undone."
                confirmLabel="Delete Job"
                confirmVariant="danger"
                isLoading={!!isDeleting}
            />
        </div>
    );
}
