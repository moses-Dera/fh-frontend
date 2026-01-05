"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Zap, Users, Trophy } from "lucide-react";
import Link from "next/link";

export default function WhyUsPage() {
    const features = [
        {
            icon: ShieldCheck,
            title: "Secure Payments",
            description: "We hold payments in escrow until you're 100% satisfied with the work. No surprises."
        },
        {
            icon: Users,
            title: "Vetted Talent",
            description: "Access a global pool of proven professionals. We verify skills and identity so you can hire with confidence."
        },
        {
            icon: Zap,
            title: "Fast Hiring",
            description: "Post a job and get proposals in minutes. Our matching algorithm connects you with the right people fast."
        },
        {
            icon: Trophy,
            title: "Quality Work",
            description: "Our rating system and portfolio reviews ensure you get high-quality deliverables every time."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="bg-white py-20 px-4">
                    <div className="container mx-auto max-w-5xl text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Why Choose FreelanceHub?
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                            We're building the most trusted workplace for the world. Whether you're a startup or a Fortune 500, we make it easy to find and hire top talent.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/register">
                                <Button size="lg">Get Started</Button>
                            </Link>
                            <Link href="/talent">
                                <Button variant="outline" size="lg">Browse Talent</Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-5xl">
                        <div className="grid md:grid-cols-2 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="h-12 w-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-6">
                                        <feature.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-primary-900 py-20 px-4 text-center">
                    <div className="container mx-auto max-w-3xl">
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Ready to work differently?
                        </h2>
                        <p className="text-primary-100 text-lg mb-10">
                            Join thousands of businesses who use FreelanceHub to get work done.
                        </p>
                        <Link href="/register">
                            <Button size="lg" className="bg-white/10 text-primary-900 hover:bg-slate-100 border-transparent">
                                Join Now
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
