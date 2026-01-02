"use client";

import {
    Search,
    MapPin,
    Star,
    ShieldCheck,
    Filter
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { useState } from "react";

export default function TalentPage() {
    const freelancers = [
        {
            id: 1,
            name: "Sarah Jenkins",
            title: "Senior Product Designer",
            rating: 5.0,
            hourlyRate: "$85/hr",
            skills: ["UI/UX", "Figma", "Prototyping", "Mobile Design"],
            verified: true,
            description: "I help startups and established companies create beautiful, intuitive, and profitable products. 8+ years of experience."
        },
        {
            id: 2,
            name: "David Chen",
            title: "Full Stack Developer",
            rating: 4.9,
            hourlyRate: "$95/hr",
            skills: ["React", "Node.js", "TypeScript", "AWS"],
            verified: true,
            description: "Specialized in building scalable web applications. ex-Google engineer with a passion for clean code and performance."
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            title: "Digital Marketing Specialist",
            rating: 4.8,
            hourlyRate: "$60/hr",
            skills: ["SEO", "Content Strategy", "Social Media"],
            verified: false,
            description: "Helping brands tell their story and grow their audience through data-driven marketing strategies."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold text-slate-900">Hire Top Talent</h1>
                    <p className="text-lg text-slate-600 max-w-2xl">
                        Find the perfect professional for your next project. Browse portfolios, reviews, and detailed profiles to make the right choice.
                    </p>

                    {/* Search Bar */}
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search for skills (e.g. React, Design, Writing)..."
                                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                            />
                        </div>
                        <Button variant="outline" className="hidden sm:inline-flex">
                            <Filter className="mr-2 h-4 w-4" />
                            Filters
                        </Button>
                        <Button>
                            Search
                        </Button>
                    </div>
                </div>

                {/* Talent Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {freelancers.map((freelancer) => (
                        <div
                            key={freelancer.id}
                            className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary-200 hover:shadow-lg hover:shadow-primary-900/5 cursor-pointer"
                            onClick={() => {
                                const isLoggedIn = document.cookie.includes('auth_token');
                                if (!isLoggedIn) {
                                    window.location.href = '/login?redirect=/talent';
                                }
                            }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-500">
                                        {freelancer.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{freelancer.name}</h3>
                                        <p className="text-sm text-slate-500">{freelancer.title}</p>
                                    </div>
                                </div>
                                {freelancer.verified && (
                                    <ShieldCheck className="text-emerald-500 h-5 w-5" />
                                )}
                            </div>

                            <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                                {freelancer.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {freelancer.skills.map(skill => (
                                    <span key={skill} className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                                <div className="font-bold text-slate-900">
                                    {freelancer.hourlyRate}
                                </div>
                                <div className="flex items-center text-sm font-medium text-slate-900">
                                    <Star className="text-yellow-400 fill-current h-4 w-4 mr-1" />
                                    {freelancer.rating}
                                </div>
                            </div>

                            <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-primary-600/10 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
