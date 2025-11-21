import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "@assets/Asset 1_1762033090173.png";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm here to help you learn about Redline Design's digital marketing services. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: messages })
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I'm having trouble connecting right now. Please try booking a demo directly or contact us at hello@redlinedesignllc.com"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" data-testid="chat-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-96 h-[500px] rounded-2xl flex flex-col overflow-hidden"
            style={{
              background: 'rgba(15, 15, 15, 0.95)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
              transform: 'translateZ(0)',
              willChange: 'transform'
            }}
          >
            {/* Header */}
            <div className="p-4 bg-primary/10 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-white/10">
                  <img src={logoImage} alt="Redline Design" loading="lazy" className="w-full h-full object-contain p-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Redline Design</h3>
                  <p className="text-xs text-foreground">Ask me anything!</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover-elevate active-elevate-2 rounded-lg transition-all"
                data-testid="button-close-chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-white"
                        : "bg-card border border-white/10"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-card border border-white/10 rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  disabled={isLoading}
                  data-testid="input-chat-message"
                />
                <Button
                  size="icon"
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="button-recessed"
                  data-testid="button-send-message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full flex items-center justify-center transition-all overflow-hidden p-2 hover-elevate active-elevate-2 relative"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        style={{
          background: 'rgba(255, 0, 0, 0.9)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)',
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
        data-testid="button-toggle-chat"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white relative z-10" />
        ) : (
          <div className="w-full h-full relative flex items-center justify-center">
            <style>{`
              @keyframes logoShimmer {
                0% {
                  clip-path: inset(100% 0 0 0);
                }
                50% {
                  clip-path: inset(0 0 0 0);
                }
                100% {
                  clip-path: inset(0 0 100% 0);
                }
              }
            `}</style>
            {/* Base logo */}
            <img src={logoImage} alt="Chat" loading="lazy" className="w-9 h-9 object-contain" />
            {/* Brightened logo overlay */}
            <img 
              src={logoImage} 
              alt="" 
              loading="lazy" 
              className="w-9 h-9 object-contain absolute"
              style={{
                filter: 'brightness(2) saturate(1.5)',
                animation: 'logoShimmer 3s ease-in-out infinite'
              }}
            />
          </div>
        )}
      </motion.button>
    </div>
  );
}
