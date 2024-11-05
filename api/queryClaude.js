import { createClient } from 'anthropic'; // Ensure you have the Anthropic client library installed

const client = createClient({ apiKey: process.env.ANTHROPIC_API_KEY }); // Use your environment variable

export async function POST(req) {
    try {
        // Extract the question from the request body
        const { question } = await req.json();
        console.log('Received question:', question); // Log the question for debugging

        // Call the Anthropic API with the question
        const response = await client.chat({
            model: 'claude', // Specify the model you are using
            messages: [{ role: 'user', content: question }], // Structure the message correctly
        });

        // Return the response in the expected format
        return new Response(JSON.stringify({ answer: response.choices[0].message.content }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error in API function:', error); // Log any errors for debugging
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

