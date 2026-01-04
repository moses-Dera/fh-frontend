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
        // Use gemini-1.5-flash as it is the current standard and widely available
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
        const mockInternships = Array.from({ length: 15 }).map((_, i) => ({
            id: `mock-${i}`,
            title: i % 2 === 0 ? "Software Engineer Intern" : "Product Design Intern",
            company: ["Tech Global", "StartupX", "InnovateOne", "Future Systems", "Design Corp"][i % 5],
            location: ["Remote", "New York", "London", "Berlin", "San Francisco"][i % 5],
            type: i % 3 === 0 ? "Remote" : "Hybrid",
            stipend: i % 4 === 0 ? "Unpaid" : "$25-$35/hr",
            duration: "3-6 months",
            platform: ["LinkedIn", "Indeed", "Glassdoor"][i % 3],
            applyLink: "#",
            tags: ["React", "Node.js", "Design", "Figma"].slice(0, 2),
            postedAt: `${i + 1} days ago`
        }));

        return NextResponse.json({ internships: mockInternships });
    }
}
