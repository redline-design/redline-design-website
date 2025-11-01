import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface PolicyPageProps {
  title: string;
  content: React.ReactNode;
}

export default function PolicyPage({ title, content }: PolicyPageProps) {
  return (
    <div className="pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-black text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="rounded-2xl backdrop-blur-md bg-card/40 border-white/10">
              <CardContent className="p-8 md:p-12 prose prose-lg max-w-none">
                {content}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
