import { NextResponse } from 'next/server';

export async function GET() {
    const key = process.env.INTERNAL_API_KEY;
    return NextResponse.json({
        status: 'debug',
        hasKey: !!key,
        keyLength: key ? key.length : 0,
        preview: key ? `${key.substring(0, 3)}...` : 'N/A'
    });
}
