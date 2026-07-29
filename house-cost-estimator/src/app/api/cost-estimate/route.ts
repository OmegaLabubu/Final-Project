import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { homePrice, downPayment, interestRate, loanTerm, propertyTaxRate, insurance, hoa } = await req.json();

    const prompt = `Analyze this home purchase and provide a detailed cost breakdown:
- Home Price: $${homePrice?.toLocaleString() || "N/A"}
- Down Payment: $${downPayment?.toLocaleString() || "0"} (${homePrice ? ((downPayment / homePrice) * 100).toFixed(1) : "0"}%)
- Interest Rate: ${interestRate || "N/A"}%
- Loan Term: ${loanTerm || 30} years
- Property Tax Rate: ${propertyTaxRate || "N/A"}%
- Home Insurance: $${insurance || "N/A"}/year
- HOA Fees: $${hoa || "0"}/month

Provide:
1. Monthly mortgage payment (principal + interest)
2. Monthly property tax
3. Monthly insurance
4. Monthly HOA
5. Total monthly payment
6. Total cost over loan term
7. Total interest paid
8. Brief analysis and tips

Format the response clearly with sections.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a mortgage and home cost expert. Provide accurate calculations and helpful financial advice. Always show your math." },
        { role: "user", content: prompt },
      ],
      max_tokens: 800,
    });

    const price = Number(homePrice) || 0;
    const down = Number(downPayment) || 0;
    const rate = (Number(interestRate) || 6.5) / 100 / 12;
    const n = (Number(loanTerm) || 30) * 12;
    const principal = price - down;

    let monthlyMortgage = 0;
    if (principal > 0 && rate > 0) {
      monthlyMortgage = principal * (rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    } else if (principal > 0) {
      monthlyMortgage = principal / n;
    }

    const monthlyTax = (price * (Number(propertyTaxRate) || 1.2) / 100) / 12;
    const monthlyInsurance = (Number(insurance) || 1200) / 12;
    const monthlyHoa = Number(hoa) || 0;
    const totalMonthly = monthlyMortgage + monthlyTax + monthlyInsurance + monthlyHoa;
    const totalInterest = (monthlyMortgage * n) - principal;

    return NextResponse.json({
      ai: completion.choices[0].message.content,
      calculations: {
        monthlyMortgage: Math.round(monthlyMortgage),
        monthlyTax: Math.round(monthlyTax),
        monthlyInsurance: Math.round(monthlyInsurance),
        monthlyHoa: Math.round(monthlyHoa),
        totalMonthly: Math.round(totalMonthly),
        totalInterest: Math.round(totalInterest),
        totalCost: Math.round(totalMonthly * n),
      },
    });
  } catch (error: any) {
    console.error("Cost estimate error:", error);
    return NextResponse.json({ error: "Failed to calculate costs" }, { status: 500 });
  }
}
