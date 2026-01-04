"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar"; // Assuming user is not logged in? Or Dashboard? Let's check path. It's dashboard/freelancer. So Sidebar/Header is likely used.
import { PageHeader } from "@/components/ui/Shared"; // Or similar dashboard header
import { Search, Filter, Sparkles, Globe, ExternalLink } from "lucide-react";
import { InternshipCard, Internship } from "@/components/ui/InternshipCard";
import { PageLoader } from "@/components/ui/PageLoader";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/store";

export default function InternshipFinderPage() {
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [internships, setInternships] = useState<Internship[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    // Mock for initial development, will replace with API call
    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!query.trim()) return;

        setIsSearching(true);
        setHasSearched(true);
        setInternships([]); // Clear previous

        try {
            const res = await fetch(`/api/internships?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            if (data.internships) {
                setInternships(data.internships);
            }
        } catch (error) {
            // Silently log for developer debugging if needed, but don't expose to UI
            // console.error("Search failed", error); 
            // In a real app, send to Sentry/LogRocket
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                    Internship Finder
                </h1>
                <p className="text-slate-500">
                    Find the best internship opportunities from across the web, powered by AI.
                </p>
            </div>

            {/* Search Section */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-purple-50 to-blue-50 p-8">
                <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl mx-auto">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g. React Developer, UI Designer, Data Science..."
                            className="w-full rounded-xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-base shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all placeholder:text-slate-400"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSearching}
                        className="bg-slate-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-800 disabled:opacity-70 transition-colors flex items-center gap-2"
                    >
                        {isSearching ? 'Scanning...' : 'Find Internships'}
                    </button>
                </form>

                {/* Quick Tags */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {["Remote", "Frontend", "Backend", "Marketing", "Design", "Machine Learning"].map(tag => (
                        <button
                            key={tag}
                            onClick={() => { setQuery(tag); }}
                            className="bg-white/60 border border-slate-200/60 px-3 py-1 rounded-full text-xs font-medium text-slate-600 hover:bg-white hover:text-purple-600 hover:border-purple-200 transition-all cursor-pointer"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Grid */}
            <div className="min-h-[300px]">
                {isSearching ? (
                    <PageLoader message="Scanning global opportunities..." />
                ) : internships.length > 0 ? (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {internships.map(internship => (
                                <InternshipCard key={internship.id} internship={internship} />
                            ))}
                        </div>
                    </div>
                ) : hasSearched ? (
                    <div className="text-center py-12">
                        <div className="bg-slate-50 inline-flex rounded-full p-4 mb-4">
                            <Search className="h-8 w-8 text-slate-300" />
                        </div>
                        <h3 className="text-slate-900 font-medium text-lg">No internships found</h3>
                        <p className="text-slate-500">Try adjusting your search terms or check back later.</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Empty State / Intro */}
                        <div className="text-center py-8 opacity-70">
                            <div className="max-w-md mx-auto">
                                <h3 className="text-slate-400 font-medium text-lg">Ready to search</h3>
                                <p className="text-sm text-slate-400 mt-1">
                                    Our AI will scan multiple platforms to find the most relevant roles for you from across the globe.
                                </p>
                            </div>
                        </div>

                        {/* Top Resources Section */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Globe className="h-5 w-5 text-blue-500" />
                                Top Websites for Global Internships
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { name: "LinkedIn", url: "https://www.linkedin.com/jobs/internships", desc: "Global network for professionals", color: "bg-blue-600" },
                                    { name: "Glassdoor", url: "https://www.glassdoor.com/Job/internship-jobs", desc: "Salaries & Company Reviews", color: "bg-green-600" },
                                    { name: "Wellfound", url: "https://wellfound.com/jobs?role_types=Internship", desc: "Best for Startup Internships", color: "bg-slate-900" },
                                    { name: "Y Combinator", url: "https://www.workatastartup.com/internships", desc: "Top Tier Startup Roles", color: "bg-orange-500" },
                                    { name: "Chegg Internships", url: "https://www.chegg.com/internships", desc: "Student Focused", color: "bg-orange-400" },
                                    { name: "Idealist", url: "https://www.idealist.org/en/internships", desc: "Non-profit & Social Impact", color: "bg-teal-600" },
                                    { name: "WayUp", url: "https://www.wayup.com/", desc: "Entry-level & Internships", color: "bg-purple-600" },
                                    { name: "Indeed", url: "https://www.indeed.com/q-Internship-jobs.html", desc: "Massive Job Aggregator", color: "bg-blue-700" },
                                ].map((site) => (
                                    <a
                                        key={site.name}
                                        href={site.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-md transition-all"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className={`h-10 w-10 rounded-lg ${site.color} text-white flex items-center justify-center font-bold text-lg`}>
                                                {site.name[0]}
                                            </div>
                                            <ExternalLink className="h-4 w-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{site.name}</h3>
                                        <p className="text-xs text-slate-500 mt-1">{site.desc}</p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
