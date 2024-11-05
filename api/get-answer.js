const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "No question provided" });
  }

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 100,
    });

    // Check if choices exist and contain at least one element
    if (response.data.choices && response.data.choices.length > 0) {
      res.status(200).json({ answer: response.data.choices[0].text });
    } else {
      res.status(500).json({ error: "No answer found in response" });
    }
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).json({ error: "Failed to fetch answer from OpenAI API" });
  }
};
