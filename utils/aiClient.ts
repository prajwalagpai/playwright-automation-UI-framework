
import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeFailure(params: {
  testName: string;
  error: string;
  url?: string;
  extraContext?: string;
}): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return "AI analysis skipped: No API key found.";
  }

  const { testName, error, url, extraContext } = params;

  const prompt = `
You are an expert QA automation engineer. Analyze the following Playwright test failure and explain:

1. What likely went wrong
2. Possible root causes (test issue vs application issue)
3. What the QA engineer should check next

---
Test name: ${testName}
Page URL: ${url ?? "Unknown"}
Error / Stack trace:
${error}

Extra Context:
${extraContext ?? "None"}
---

Give a short, clear explanation.
`;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0]?.message?.content ?? "No analysis generated.";
}