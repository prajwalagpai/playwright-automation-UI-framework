
import "dotenv/config";
import OpenAI from "openai";


export async function analyzeFailure(params: {
  testName: string;
  error: string;
  url?: string;
  extraContext?: string;
}): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  //In CI no kety this will run and return
  //no test pass and AI step is just skipped
  if (!apiKey) {
    console.log("[AI] skipping analysis - no OPENAI_API_KEY configured");
    return "AI analysis skipped. No API key found.";
  }
  // only create the clent when we actually have the key
  const client = new OpenAI ({apiKey});
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