import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    id: "services",
    question: "What services does Redline Design offer?",
    answer:
      "We provide a full suite of digital marketing services including SEO, PPC advertising, web design & development, social media marketing, email marketing, AI automation, CRM setup & management, analytics & reporting, and branding & graphic design. Whether you need one service or a complete marketing overhaul, we tailor solutions to fit your business goals.",
  },
  {
    id: "results-timeline",
    question: "How long does it take to see results?",
    answer:
      "Timelines vary by channel. PPC campaigns can generate leads within days of launch. Social media marketing typically shows meaningful engagement growth in 1\u20133 months. SEO is a longer-term investment, with most clients seeing significant organic traffic gains in 3\u20136 months. We set realistic expectations upfront and provide transparent progress reports throughout.",
  },
  {
    id: "contracts",
    question: "Do you require long-term contracts?",
    answer:
      "No. We operate on a month-to-month basis with no long-term commitments. We believe our results should earn your business every month\u2014not a contract. You\u2019re free to adjust, scale, or pause services whenever you need to.",
  },
  {
    id: "pricing",
    question: "How much do your services cost?",
    answer:
      "Our plans start at $500 per month, with custom pricing based on the scope and goals of your project. Every business is different, so we build tailored packages rather than one-size-fits-all plans. Schedule a free consultation and we\u2019ll provide a transparent quote with no hidden fees.",
  },
  {
    id: "difference",
    question: "What makes Redline Design different?",
    answer:
      "Our clients see an average 7x return on their marketing investment. We\u2019re data-driven, transparent, and fast. Every account gets a dedicated account manager, real-time reporting dashboards, and a team that treats your budget like our own. Most campaign updates are delivered within 24 business hours.",
  },
  {
    id: "location",
    question: "Do you work with businesses outside your area?",
    answer:
      "Absolutely. While we love working with local businesses, we serve clients nationwide. Our team collaborates remotely with companies across the country, delivering the same hands-on service regardless of location.",
  },
  {
    id: "get-started",
    question: "How do I get started?",
    answer:
      "Getting started is simple. Book a free consultation and we\u2019ll conduct an audit of your current marketing, discuss your goals, and put together a custom strategy proposal\u2014all at no cost. From there, we can hit the ground running as soon as you\u2019re ready.",
  },
];

export default function FAQ() {
  return (
    <section
      className="py-16 md:py-24 px-4 md:px-8"
      data-testid="section-faq"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-xs font-medium text-white/60 uppercase tracking-widest">
              FAQ
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 mb-4 tracking-tight section-heading-glow">
            Frequently Asked Questions
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto">
            Everything you need to know about working with Redline Design
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion
            type="single"
            collapsible
            className="w-full"
            data-testid="accordion-faq"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-white/10"
                data-testid={`faq-item-${item.id}`}
              >
                <AccordionTrigger
                  className="text-left text-white hover:text-red-400 hover:no-underline py-5 text-base md:text-lg"
                  data-testid={`faq-trigger-${item.id}`}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-white/60 text-sm md:text-base leading-relaxed"
                  data-testid={`faq-content-${item.id}`}
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
