// ─────────────────────────────────────────────
//  Anthropic API helper for Sentiment Analysis
// ─────────────────────────────────────────────
//  IMPORTANT: Replace the proxy below with your
//  own backend if you deploy to production.
//  Never expose API keys in front-end code.
// ─────────────────────────────────────────────

const tweetCache = {};

export async function analyzeTweet(text) {
  // Return cached result if available
  if (tweetCache[text]) return tweetCache[text];

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // When running locally via Create React App, set
      // REACT_APP_ANTHROPIC_API_KEY in your .env file
      // and uncomment the line below:
      // "x-api-key": process.env.REACT_APP_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `Analyze the sentiment of this tweet and respond ONLY with valid JSON (no markdown, no explanation):

Tweet: "${text}"

Respond with exactly this JSON structure:
{
  "sentiment": "positive" | "negative" | "neutral",
  "score": <number between -1.0 and 1.0>,
  "confidence": <number between 0 and 100>,
  "emotions": [<up to 3 emotion strings: "joy","anger","surprise","sadness","fear","disgust","anticipation","trust">],
  "keywords": [<up to 4 key words or phrases that drove the sentiment>],
  "summary": "<one sentence explanation>"
}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  const raw = data.content.map((i) => i.text || "").join("");
  const clean = raw.replace(/```json|```/g, "").trim();
  const result = JSON.parse(clean);

  tweetCache[text] = result;
  return result;
}
