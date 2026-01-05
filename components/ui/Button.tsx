"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "white" | "glass";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    isLoading?: boolean;
}

export const Button = ({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    isLoading = false,
    className = "",
    disabled,
    ...props
}: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl";

    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md",
        secondary: "bg-primary-50 text-primary-700 hover:bg-primary-100",
        outline: "border-2 border-slate-200 text-slate-700 hover:border-primary-600 hover:text-primary-600 bg-transparent",
        ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        white: "bg-white text-slate-900 hover:bg-slate-50 border-none shadow-sm",
        glass: "bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-sm font-semibold",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3.5 text-base",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : null}
            {children}
        </button>
    );
};
