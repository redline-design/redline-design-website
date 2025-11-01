import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle2, MessageSquare } from "lucide-react";

export default function BookDemo() {
  return (
    <div className="pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8" data-testid="section-book-demo">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
              Let's Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to take your digital marketing to the next level? Fill out the form below and we'll get back to you within 24 business hours.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="text-center rounded-2xl h-full">
                <CardContent className="p-6">
                  <div className="inline-flex p-4 rounded-xl bg-primary/10 mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Quick Response</h3>
                  <p className="text-sm text-muted-foreground">
                    Average response in &lt;24 business hours
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="text-center rounded-2xl h-full">
                <CardContent className="p-6">
                  <div className="inline-flex p-4 rounded-xl bg-primary/10 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">No Obligation</h3>
                  <p className="text-sm text-muted-foreground">
                    Free consultation with no strings attached
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="text-center rounded-2xl h-full">
                <CardContent className="p-6">
                  <div className="inline-flex p-4 rounded-xl bg-primary/10 mb-4">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Custom Solutions</h3>
                  <p className="text-sm text-muted-foreground">
                    Tailored strategies for your unique needs
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="rounded-2xl">
              <CardContent className="p-8 md:p-12">
                <ContactForm />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <p className="text-sm text-muted-foreground mb-4">
              Or schedule a time directly on our calendar:
            </p>
            <div className="p-8 bg-card rounded-2xl border border-border">
              <p className="text-muted-foreground italic">
                Calendly embed would go here
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
