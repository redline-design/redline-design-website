import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle2, MessageSquare } from "lucide-react";

export default function BookDemo() {
  return (
    <div className="pt-20">
      <div style={{ position: 'relative', minHeight: '100vh' }}>
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
            <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto">
              Ready to take your digital marketing to the next level? Fill out the form below and we'll get back to you within 24 business hours.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="text-center rounded-2xl h-full backdrop-blur-md bg-card/40 border-white/10 card-float">
                <CardContent className="p-6">
                  <div className="inline-flex p-4 rounded-xl bg-primary/10 mb-4 icon-glow">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Quick Response</h3>
                  <p className="text-sm text-foreground">
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
              <Card className="text-center rounded-2xl h-full backdrop-blur-md bg-card/40 border-white/10 card-float">
                <CardContent className="p-6">
                  <div className="inline-flex p-4 rounded-xl bg-primary/10 mb-4 icon-glow">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">No Obligation</h3>
                  <p className="text-sm text-foreground">
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
              <Card className="text-center rounded-2xl h-full backdrop-blur-md bg-card/40 border-white/10 card-float">
                <CardContent className="p-6">
                  <div className="inline-flex p-4 rounded-xl bg-primary/10 mb-4 icon-glow">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Custom Solutions</h3>
                  <p className="text-sm text-foreground">
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
            className="group"
          >
            <Card className="rounded-2xl backdrop-blur-md bg-card/40 border-white/10 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,0,0,0.15),0_0_60px_rgba(255,0,0,0.1),inset_0_0_30px_rgba(255,0,0,0.05)] hover:border-primary/30">
              <CardContent className="p-8 md:p-12">
                <ContactForm />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
        <div className="layout">
          <div className="layout-box">
            High-end, full-service<br />digital marketing<br />for growing brands.
          </div>
        </div>
      </div>
    </div>
  );
}
