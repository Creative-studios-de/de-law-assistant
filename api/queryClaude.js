import { createClient } from '@anthropic-ai/sdk'; // Updated import statement

const client = createClient(process.env.ANTHROPIC_API_KEY);

export async function POST(req) {
    try {
        // Extract the question from the request body
        const { question } = await req.json();
        console.log('Received question:', question);

        // Validate the question
        if (!question?.trim()) {
            return new Response(
                JSON.stringify({ 
                    error: 'Question is required' 
                }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Call the Anthropic API
        const response = await client.messages.create({
            model: 'claude-3-opus-20240229', // Use specific model version
            max_tokens: 1024, // Set maximum tokens
            messages: [{ 
                role: 'user', 
                content: question 
            }],
            temperature: 0.7, // Add temperature for response variability
        });

        // Return the response
        return new Response(
            JSON.stringify({ 
                answer: response.content[0].text 
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                },
            }
        );

    } catch (error) {
        console.error('Error:', error);
        
        // Handle specific error types
        if (error.status === 401) {
            return new Response(
                JSON.stringify({ 
                    error: 'Authentication failed' 
                }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        return new Response(
            JSON.stringify({ 
                error: 'Internal Server Error',
                message: error.message 
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
