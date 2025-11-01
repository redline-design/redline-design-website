import type { Request, Response } from "express";

const SYSTEM_PROMPT = `You are a helpful AI assistant for Redline Design LLC, a digital marketing agency. Your role is to:

1. Answer questions about Redline Design's services:
   - SEO & SEM (Search Engine Optimization and Marketing)
   - Paid Advertising (PPC, Google Ads, Facebook Ads)
   - Web Design & Development
   - Social Media Marketing & Management
   - Email Marketing Campaigns
   - Content Marketing & Strategy

2. Highlight key benefits:
   - Data-driven approach with measurable results
   - Average 14x ROI for clients
   - 350% traffic growth on average
   - 95% client retention rate
   - Expert team with proven track record
   - Custom strategies tailored to each business

3. ALWAYS encourage users to book a free consultation to learn more about how Redline Design can help their specific business.

4. Be friendly, professional, and concise. Keep responses under 3 sentences when possible.

5. If asked about pricing, explain that it varies based on needs and encourage them to book a demo for a custom quote.

6. When appropriate, mention that they can book a demo at /book-a-demo or visit /onboarding to get started.

Remember: Your goal is to be helpful AND guide users toward booking a consultation.`;

export async function handleChat(req: Request, res: Response) {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return res.status(503).json({ 
        message: "I'd love to help! Please book a free consultation at /book-a-demo or email us at hello@redlinedesignllc.com to discuss your digital marketing needs."
      });
    }

    // Build messages array for OpenAI
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(history || []).slice(-10), // Keep last 10 messages for context
      { role: "user", content: message }
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API error:", response.status, errorData);
      
      // Handle rate limits gracefully
      if (response.status === 429) {
        return res.json({
          message: "I'd be happy to help you learn about our services! We offer SEO, paid advertising, web design, social media marketing, and more. Book a free consultation at /book-a-demo to discuss your specific needs, or email us at hello@redlinedesignllc.com"
        });
      }
      
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || 
      "I'd be happy to help! Please book a free consultation at /book-a-demo to discuss your needs.";

    res.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat error:", error);
    res.json({ 
      message: "Thanks for reaching out! I'm here to answer questions about our digital marketing services. We specialize in SEO, PPC advertising, web design, and social media marketing with proven results - 14x average ROI and 95% client retention. Book a free consultation at /book-a-demo or email hello@redlinedesignllc.com to learn how we can help your business grow!"
    });
  }
}
