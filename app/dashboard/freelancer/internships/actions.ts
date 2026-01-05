"use server";

import axios from "axios";

export async function searchInternships(query?: string) {
    const defaultQuery =
        "software engineering internship remote Nigeria OR Lagos site:linkedin.com/jobs OR site:indeed.com";
    // If user provides a query, append "internship" to ensure relevant results
    const searchQuery = query ? `${query} internship` : defaultQuery;

    // Use the new Serper API Key
    if (!process.env.SERPAPI_KEY) {
        console.error("Missing SERPER_API_KEY");
        throw new Error("Server configuration error: Missing API Key");
    }

    const url = "https://google.serper.dev/search";
    const data = JSON.stringify({
        q: searchQuery,
    });

    const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: url,
        headers: {
            "X-API-KEY": process.env.SERPAPI_KEY,
            "Content-Type": "application/json",
        },
        data: data,
    };

    try {
        const response = await axios.request(config);
        const resultData = response.data;

        if (resultData.error) {
            console.error("Serper API Error:", resultData.error);
            throw new Error(resultData.error);
        }

        // Map Serper "organic" results to our Internship structure
        // Serper returns { organic: [ ... ] }
        const internships = resultData.organic?.map((job: any) => ({
            id: job.link || Math.random().toString(36).substr(2, 9),
            title: job.title,
            company: job.source || "Unknown",
            location: job.snippet?.substring(0, 50) || "Remote", // Use snippet or fallback
            type: "Internship",
            platform: job.source || "Web", // Map source to platform
            applyLink: job.link, // Map link to applyLink
            postedAt: job.date || "Recently",
            tags: [], // Initialize empty tags array to prevent map error
            logoUrl: job.imageUrl, // Optional
            description: job.snippet,
        })) || [];

        return { internships };
    } catch (error) {
        console.error("Serper Action Error:", error);
        return { internships: [], error: "Failed to fetch internships" };
    }
}
