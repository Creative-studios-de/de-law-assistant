export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://creative-studios-de.github.io");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const question = req.body.question;

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    res.status(200).json({ answer: data.choices[0].text.trim() });
  } catch (error) {
    console.error("Error fetching answer:", error);
    res.status(500).json({ error: "Error fetching answer" });
  }
}
