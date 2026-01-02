"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-xl">
                                F
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900">
                                FreelanceHub
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-8">
                        <Link
                            href="/jobs"
                            className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                        >
                            Find Work
                        </Link>
                        <Link
                            href="/talent"
                            className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                        >
                            Hire Talent
                        </Link>
                        <Link
                            href="/why-us"
                            className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                        >
                            Why FreelanceHub
                        </Link>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="ghost" size="sm">
                                Log In
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button size="sm">Sign Up</Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 shadow-lg">
                    <nav className="flex flex-col space-y-4">
                        <Link
                            href="/jobs"
                            className="text-base font-medium text-slate-600 hover:text-primary-600"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Find Work
                        </Link>
                        <Link
                            href="/talent"
                            className="text-base font-medium text-slate-600 hover:text-primary-600"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Hire Talent
                        </Link>
                        <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="ghost" fullWidth>Log In</Button>
                            </Link>
                            <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                                <Button fullWidth>Sign Up</Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};
