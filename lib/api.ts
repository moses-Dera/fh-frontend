const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

import { useState, useEffect, useCallback, useRef } from 'react';

type RequestOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    autoFetch?: boolean; // If true, fetches on mount (GET mostly)
};

// Legacy raw helper - still useful for one-off calls outside components
export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', headers = {}, body } = options;

    let token = '';
    if (typeof document !== 'undefined') {
        const match = document.cookie.match(/(^|;)\s*auth_token=([^;]+)/);
        if (match) token = match[2];
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        if (res.status === 401 && typeof window !== 'undefined') {
            // Optional: redirect or dispatch logout
        }
        const text = await res.text();
        console.error(`API Error (${res.status} to ${endpoint}):`, text);

        let errorData;
        try {
            errorData = JSON.parse(text);
        } catch {
            errorData = { error: `API Error: ${res.statusText} (${res.status})` };
        }

        // Extract the actual error message from backend
        const errorMessage = errorData.error || errorData.message || `API Error: ${res.statusText}`;
        throw new Error(errorMessage);
    }

    return res.json();
}

// Hook Pattern
export function useAPI<T>(endpoint: string, options: RequestOptions = {}) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(!!options.autoFetch);
    const [error, setError] = useState<Error | null>(null);

    const optionsRef = useRef(options);

    useEffect(() => {
        optionsRef.current = options;
    });

    const execute = useCallback(async (overrideBody?: any, overrideOptions?: RequestOptions) => {
        setIsLoading(true);
        setError(null);
        try {
            const currentOptions = optionsRef.current;
            const mergedOptions = { ...currentOptions, ...overrideOptions };
            if (overrideBody) mergedOptions.body = overrideBody;

            const result = await apiRequest<T>(endpoint, mergedOptions);
            setData(result);
            return result;
        } catch (err: any) {
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [endpoint]);

    useEffect(() => {
        if (options.autoFetch) {
            execute();
        }
    }, [execute, options.autoFetch]);

    return {
        data,
        isLoading,
        error,
        execute,    // For manual triggering (mutations)
        mutate: execute // Alias
    };
}

