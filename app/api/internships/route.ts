import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const serperKey = process.env.SERPER_API_KEY?.trim();

    console.log(`[Internship API] Searching for: "${query}" using Serper.dev`);
    console.log(`[Internship API] Serper Key Loaded: ${!!serperKey}, Length: ${serperKey?.length}, FirstChar: ${serperKey?.substring(0, 1)}`);

    if (!query) {
        return NextResponse.json({ internships: [] });
    }

    try {
        const response = await fetch('https://google.serper.dev/search', {
            method: 'POST',
            headers: {
                'X-API-KEY': serperKey || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q: `${query} internships 2024`,
                num: 20 // Request 20 results
            })
        });

        if (!response.ok) {
            throw new Error(`Serper API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Map organic results to Internship interface
        const internships = (data.organic || []).map((item: any, index: number) => {
            const domain = new URL(item.link).hostname.replace('www.', '');
            return {
                id: `serp-${index}-${Date.now()}`,
                title: item.title,
                company: item.source || domain.split('.')[0] || "Unknown", // Best effort company extraction
                location: "Various/Remote", // Serper often puts location in snippet, hard to extract reliably without specific engine
                type: "Remote/Hybrid", // Hard to know from generic search
                stipend: "Competitive", // Not usually in meta title
                duration: "Various",
                platform: domain,
                applyLink: item.link,
                tags: [query || "Internship", "External"],
                postedAt: item.date || "Recently"
            };
        });

        // If no organic results found (unlikely), fall back to empty or mock
        if (internships.length === 0) {
            console.log("No organic results found via Serper");
        }

        return NextResponse.json({ internships });

    } catch (error) {
        console.error("Serper Search Error:", error);

        console.error("Serper Search Error:", error);
        return NextResponse.json({ error: "Failed to fetch internships" }, { status: 500 });
    }
}
