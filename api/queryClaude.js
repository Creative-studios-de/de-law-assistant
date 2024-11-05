// api/queryClaude.js
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { question } = await req.json();

    const response = await fetch('https://api.anthropic.com/v1/claude', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.ANTHROPIC_API_KEY}`, // Reference the environment variable
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: question,
            // Include any other necessary parameters
        }),
    });

    const data = await response.json();

    return NextResponse.json(data);
}
