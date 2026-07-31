import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `You are a helpful home buying and cost estimation assistant. You help users understand:
- Home buying costs (down payment, closing costs, property taxes, insurance, HOA fees)
- Mortgage calculations and options
- How to estimate total cost of homeownership
- Tips for finding the right home
- Market trends and neighborhood considerations

Be concise, friendly, and practical. Always provide actionable advice. When discussing costs, reference as of 2026 costs. If asked about specific properties or real-time data, let the user know they should use the House Finder tool.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      max_tokens: 500,
    });

    return NextResponse.json({ reply: completion.choices[0].message.content });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "Sorry, I couldn't process your request. Please check your API key configuration." },
      { status: 500 }
    );
  }
}
