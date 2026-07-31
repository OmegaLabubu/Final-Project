import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { homePrice, downPayment, interestRate, loanTerm, propertyTaxRate, insurance, hoa, paymentFrequency } = await req.json();

    const price = Number(homePrice) || 0;
    const down = Number(downPayment) || 0;
    const annualRate = (Number(interestRate) || 6.5) / 100;
    const years = Number(loanTerm) || 30;
    const principal = price - down;

    const frequencyConfig: Record<string, { periodsPerYear: number; label: string }> = {
      weekly: { periodsPerYear: 52, label: "Weekly" },
      biweekly: { periodsPerYear: 26, label: "Bi-Weekly" },
      bimonthly: { periodsPerYear: 6, label: "Bi-Monthly" },
      monthly: { periodsPerYear: 12, label: "Monthly" },
    };

    const frequency = frequencyConfig[paymentFrequency] || frequencyConfig.monthly;
    const periodsPerYear = frequency.periodsPerYear;
    const totalPeriods = years * periodsPerYear;
    const periodRate = annualRate / periodsPerYear;

    let paymentAmount = 0;
    if (principal > 0 && periodRate > 0) {
      paymentAmount = principal * (periodRate * Math.pow(1 + periodRate, totalPeriods)) / (Math.pow(1 + periodRate, totalPeriods) - 1);
    } else if (principal > 0) {
      paymentAmount = principal / totalPeriods;
    }

    const monthlyTax = (price * (Number(propertyTaxRate) || 1.2) / 100) / 12;
    const monthlyInsurance = (Number(insurance) || 1200) / 12;
    const monthlyHoa = Number(hoa) || 0;
    
    const monthlyMortgage = paymentAmount * (periodsPerYear / 12);
    const totalMonthly = monthlyMortgage + monthlyTax + monthlyInsurance + monthlyHoa;
    const totalInterest = (paymentAmount * totalPeriods) - principal;
    const totalCost = totalMonthly * 12 * years;

    const prompt = `You are presenting a home purchase cost analysis to a buyer. Format your response clearly using markdown.

### Property Summary

- **Home Price:** $${price.toLocaleString()}
- **Down Payment:** $${down.toLocaleString()} (${price > 0 ? ((down / price) * 100).toFixed(1) : "0"}%)
- **Loan Amount:** $${principal.toLocaleString()}
- **Interest Rate:** ${(annualRate * 100).toFixed(1)}%
- **Loan Term:** ${years} years
- **Payment Frequency:** ${frequency.label}

### Cost Breakdown (${frequency.label} Payment: $${Math.round(paymentAmount).toLocaleString()})

| Category | ${frequency.label} Cost | Monthly Equivalent |
|---|---|---|
| Mortgage (P&I) | $${Math.round(paymentAmount).toLocaleString()} | $${Math.round(monthlyMortgage).toLocaleString()} |
| Property Tax | - | $${Math.round(monthlyTax).toLocaleString()} |
| Insurance | - | $${Math.round(monthlyInsurance).toLocaleString()} |
| HOA | - | $${Math.round(monthlyHoa).toLocaleString()} |
| **Total** | - | **$${Math.round(totalMonthly).toLocaleString()}** |

### Long-Term Costs

- **Total Cost Over Loan Term:** $${Math.round(totalCost).toLocaleString()}
- **Total Interest Paid:** $${Math.round(totalInterest).toLocaleString()}

### Key Takeaways

Provide 4 bullet points covering:
- Affordability assessment (general guidance based on the numbers)
- How the interest rate affects total cost
- Practical tips to reduce costs
- One notable observation about this specific purchase

Use proper markdown. Start each section with ### headers. Use bullet points and bold for key numbers. Add blank lines between sections for readability. Do NOT use any LaTeX or math notation.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a mortgage and home cost expert. Provide helpful financial advice based on the provided calculations. Be concise and practical." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
    });

    return NextResponse.json({
      ai: completion.choices[0].message.content,
      calculations: {
        paymentAmount: Math.round(paymentAmount),
        paymentFrequency: frequency.label,
        monthlyMortgage: Math.round(monthlyMortgage),
        monthlyTax: Math.round(monthlyTax),
        monthlyInsurance: Math.round(monthlyInsurance),
        monthlyHoa: Math.round(monthlyHoa),
        totalMonthly: Math.round(totalMonthly),
        totalInterest: Math.round(totalInterest),
        totalCost: Math.round(totalCost),
      },
    });
  } catch (error: any) {
    console.error("Cost estimate error:", error);
    return NextResponse.json({ error: "Failed to calculate costs" }, { status: 500 });
  }
}
