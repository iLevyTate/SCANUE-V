"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Menu, Brain, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatContainer } from "./ChatContainer";
import { LoadingSpinner } from "./LoadingSpinner";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/utils/ui";
import { v4 as uuidv4 } from 'uuid';
import { ChatService } from "@/services/ChatService";
import { CHAT_CONSTANTS } from "@/constants/chat";
import type { Message, AgentType, SubmitEvent } from "@/types/chat";

export function ChatInterfaceClient() {
  const chatService = new ChatService();

  const chatServiceRef = useRef(chatService);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [agentType, setAgentType] = useState<AgentType>(CHAT_CONSTANTS.DEFAULT_AGENT as AgentType);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: Date.now().toString(),
        content: "Hi there! I am your AI assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (messages.length > chatServiceRef.current.MAX_MESSAGES) {
      setMessages((prevMessages) => chatServiceRef.current.trimMessages(prevMessages));
    }
  }, [messages]);

  const handleSubmit = useCallback(
    async (e: SubmitEvent) => {
      e.preventDefault();

      if (!input.trim()) {
        setError("Please enter a message");
        return;
      }

      setIsTyping(true);
      setError(null);

      try {
        const newMessage: Message = {
          id: uuidv4(),
          content: input,
          isUser: true,
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInput("");

        const response = await chatServiceRef.current.sendMessage(newMessage.content, agentType);
        setMessages((prev) => [...prev, response]);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to send message");
      } finally {
        setIsTyping(false);
      }
    },
    [input, agentType],
  );

  const handleAgentChange = useCallback((type: AgentType) => {
    setAgentType(type);
    setMessages([]);
    setIsMenuOpen(false);
  }, []);

  const handleDeleteMessage = useCallback((messageId: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== messageId));
  }, []);

  return (
    <TooltipProvider>
      <div
        className="flex flex-col h-screen overflow-hidden text-gray-800 transition-colors duration-300 bg-gradient-to-br from-blue-100 to-purple-200 dark:from-blue-900 dark:to-purple-900 dark:text-gray-100"
        data-testid="chat-interface"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between p-3 transition-colors duration-300 shadow-md rounded-b-2xl bg-white/70 backdrop-blur-md dark:bg-gray-900/70 sm:p-4">
          <h1 className="text-lg font-semibold xs:text-xl gradient-text sm:text-2xl">
            SCANUEV Chat
          </h1>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-20 p-3 rounded-lg shadow-lg xs:w-48 xs:p-4 xs:top-16 xs:right-4 right-2 top-14 w-44 bg-white/90 backdrop-blur-md dark:bg-gray-900/90"
                >
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant={agentType === "PFC" ? "gradient" : "ghost"}
                      onClick={() => handleAgentChange("PFC")}
                      className="justify-start text-sm xs:text-base"
                    >
                      <Brain className="w-5 h-5 mr-2" /> PFC
                    </Button>
                    <Button
                      variant={agentType === "General" ? "gradient" : "ghost"}
                      onClick={() => handleAgentChange("General")}
                      className="justify-start text-sm xs:text-base"
                    >
                      <Globe className="w-5 h-5 mr-2" /> General
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="hidden overflow-hidden rounded-lg lg:flex">
              <Button
                variant={agentType === "PFC" ? "gradient" : "secondary"}
                onClick={() => handleAgentChange("PFC")}
                className="rounded-r-none"
              >
                <Brain className="w-5 h-5 mr-2" /> PFC
              </Button>
              <Button
                variant={agentType === "General" ? "gradient" : "secondary"}
                onClick={() => handleAgentChange("General")}
                className="rounded-l-none"
              >
                <Globe className="w-5 h-5 mr-2" /> General
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <ChatContainer messages={messages} onDelete={handleDeleteMessage} />
        </main>
        <div className="fixed bottom-0 left-0 right-0 p-2 border-t bg-background/95 backdrop-blur-sm sm:p-4">
          <div className="w-full px-2 sm:px-4">
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="chat-form">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={`Message ${agentType} agent...`}
                      className={cn(
                        "w-full rounded-lg p-2 pr-10",
                        "border bg-muted/50 focus:border-primary",
                        "placeholder:text-muted-foreground/70",
                        "focus:outline-none focus:ring-2 focus:ring-primary/20",
                        "text-base sm:text-lg",
                        "h-10 sm:h-12",
                      )}
                      disabled={isTyping}
                      aria-label={`Message ${agentType} agent`}
                    />
                    {isTyping && (
                      <div className="absolute -translate-y-1/2 right-3 top-1/2">
                        <LoadingSpinner size={20} />
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  data-testid="chat-submit"
                  className={cn(
                    "inline-flex items-center justify-center",
                    "h-10 w-10 sm:h-12 sm:w-12",
                    "rounded-full",
                    "shadow-lg hover:shadow-xl",
                    "transition-all duration-200",
                  )}
                  disabled={isTyping}
                >
                  <Send className="w-5 h-5 sm:h-6 sm:w-6" />
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="h-[60px] sm:h-[72px]" /> {/* Spacer to prevent overlap */}
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </TooltipProvider>
  );
}
