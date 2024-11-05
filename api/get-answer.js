// api/get-answer.js

const fetch = require('node-fetch');

export default async function handler(req, res) {
  const { question } = req.body;

  if (!question) {
    res.status(400).json({ error: 'Question is required' });
    return;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: question,
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    res.status(200).json({ answer: data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to OpenAI' });
  }
}
