"use client";

import { PageHeader } from "@/components/ui/Shared";
import { Button } from "@/components/ui/Button";
import { useAPI } from "@/lib/api";
import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Code } from "lucide-react";
import { PageLoader } from "@/components/ui/PageLoader";

interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    title?: string; // Job title for freelancer
    skills?: string[];
    phone?: string;
    location?: string;
}

export default function FreelancerSettingsPage() {
    const { data: profile, isLoading } = useAPI<UserProfile>('/api/users/profile', { autoFetch: true });
    const { execute: updateProfile, isLoading: isUpdating } = useAPI('/api/users/profile', { method: 'PUT' });

    // Initialize form data with profile when available
    const [formData, setFormData] = useState<UserProfile>(() => ({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        title: "",
        skills: [],
        phone: "",
        location: ""
    }));

    // Update form data when profile loads
    useEffect(() => {
        if (profile) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData(profile);
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProfile(formData);
            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Failed to update profile", err);
        }
    };

    if (isLoading) return <PageLoader message="Loading profile..." />;

    const displayProfile = formData || profile || {
        id: "2",
        firstName: "Freelancer",
        lastName: "User",
        email: "freelancer@example.com",
        role: "freelancer",
        title: "Senior Full Stack Developer",
        skills: ["React", "Node.js", "TypeScript"],
        phone: "+1 555 9876",
        location: "New York, NY"
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Settings"
                description="Manage your profile, skills, and account settings."
            />

            <div className="max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Public Profile Card */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <User size={20} className="text-slate-400" />
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={displayProfile.firstName}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={displayProfile.lastName}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={displayProfile.email}
                                    disabled
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm text-slate-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Professional Info */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Code size={20} className="text-slate-400" />
                            Professional Details
                        </h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Professional Title</label>
                            <input
                                type="text"
                                name="title"
                                value={displayProfile.title || ''}
                                onChange={handleChange}
                                placeholder="e.g. Senior Frontend Developer"
                                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={displayProfile.phone || ''}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        name="location"
                                        value={displayProfile.location || ''}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" isLoading={isUpdating}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
