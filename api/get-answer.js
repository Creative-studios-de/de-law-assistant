export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'POST'); // Allow only POST requests
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow only Content-Type header

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    res.status(200).end();
    return;
  }

  // The rest of your function logic goes here
  const { question } = req.body;

  // Call OpenAI API here and return the response
  const openAiResponse = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: question,
      max_tokens: 100
    })
  });

  const answerData = await openAiResponse.json();
  res.status(200).json({ answer: answerData.choices[0].text.trim() });
}
