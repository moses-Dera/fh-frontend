import { DollarSign, Clock } from "lucide-react";

// --- Search Bar ---
// Simple search bar with filter toggle placeholder
interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    // filters implementation would be complex, keeping minimal as per request
}

export function SearchBar({ placeholder = "Search...", onSearch }: SearchBarProps) {
    return (
        <div className="relative">
            <input
                type="text"
                className="w-full rounded-xl border border-slate-200 bg-white pl-4 pr-12 py-3 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder={placeholder}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSearch(e.currentTarget.value);
                    }
                }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>
    );
}

// --- Proposal Card ---
interface ProposalCardProps {
    freelancerName: string;
    coverLetterSnippet: string;
    amount: string;
    duration: string;
    rating?: number;
    skills?: string[];
    onView?: () => void;
}

export function ProposalCard({ freelancerName, coverLetterSnippet, amount, duration, rating, skills, onView }: ProposalCardProps) {
    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary-200 hover:shadow-md">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600">
                            {freelancerName}
                        </h3>
                        {rating && (
                            <span className="flex items-center text-sm font-medium text-slate-900">
                                <span className="mr-1 text-yellow-400">★</span>
                                {rating}
                            </span>
                        )}
                    </div>

                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                            <DollarSign size={14} />
                            {amount}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {duration}
                        </span>
                    </div>

                    <p className="mt-4 text-sm text-slate-600 line-clamp-2">
                        {coverLetterSnippet}
                    </p>

                    {skills && skills.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {skills.slice(0, 3).map(skill => (
                                <span key={skill} className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                                    {skill}
                                </span>
                            ))}
                            {skills.length > 3 && (
                                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                                    +{skills.length - 3}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-4 sm:mt-0">
                    <button
                        onClick={onView}
                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                        View Proposal
                    </button>
                </div>
            </div>
        </div>
    );
}
