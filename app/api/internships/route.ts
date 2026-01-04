import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
// Moved initialization inside handler to ensure env vars are loaded
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ internships: [] });
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        console.log(`[Gemini API] Key present: ${!!apiKey}, Length: ${apiKey?.length}`);

        const genAI = new GoogleGenerativeAI(apiKey || '');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
            Act as an internship aggregator. Find me 15-20 diverse and realistic, recent internship opportunities related to "${query}" for 2024/2025.
            Focus on GLOBAL opportunities if the location isn't specified, otherwise focus on the specific location.
            Return ONLY a valid JSON object with a key "internships" which is an array of objects.
            Each object must have:
            - id: string (unique)
            - title: string (e.g. "Frontend Intern")
            - company: string (company name)
            - location: string (e.g. "Remote", "Berlin, Germany", "New York, USA")
            - type: string ("Remote", "On-site", "Hybrid")
            - stipend: string (e.g. "$25/hr", "Unpaid", "Competitive")
            - duration: string (e.g. "3 months", "Summer 2024")
            - platform: string (e.g. "LinkedIn", "Wellfound", "Glassdoor")
            - applyLink: string (a valid looking url)
            - tags: string[] (e.g. ["React", "Entry Level"])
            - postedAt: string (e.g. "2 days ago")
            
            Make the data look extremely realistic and varied. Do not include markdown code blocks. Just the JSON string.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown if Gemini adds it
        const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const data = JSON.parse(cleanJson);

        return NextResponse.json(data);

    } catch (error) {
        console.error("Gemini Search Error:", error);

        // Fallback Mock Data if API fails or key missing
        const mockInternships = [
            {
                id: "mock-1",
                title: `${query} Intern`,
                company: "Tech Solutions Inc",
                location: "Remote",
                type: "Remote",
                stipend: "$20/hr",
                duration: "3 months",
                platform: "LinkedIn",
                applyLink: "https://linkedin.com",
                tags: ["React", "TypeScript"],
                postedAt: "1 day ago"
            },
            {
                id: "mock-2",
                title: "Junior Developer",
                company: "StartUp Flow",
                location: "Hybrid",
                type: "Hybrid",
                stipend: "$1500/mo",
                duration: "6 months",
                platform: "Indeed",
                applyLink: "https://indeed.com",
                tags: ["Frontend", "Design"],
                postedAt: "3 days ago"
            }
        ];

        return NextResponse.json({ internships: mockInternships });
    }
}
