'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Menu, Brain, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatContainer } from './ChatContainer'
import { ChatMessage } from './ChatMessage'
import { LoadingSpinner } from './LoadingSpinner'
import { AgentResponse } from './AgentResponse'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from "@/lib/utils"

interface Feedback {
  comment: string;
  type: 'positive' | 'negative';
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  feedback?: Feedback;
  agentResponse?: string;
  timestamp: string;
}

type AgentType = 'PFC' | 'General'

type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
type KeyboardSubmitEvent = React.KeyboardEvent<HTMLInputElement>;
type SubmitEvent = FormSubmitEvent | KeyboardSubmitEvent;

export function ChatInterfaceClient() {
  const MAX_MESSAGES = 50

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [agentType, setAgentType] = useState<AgentType>('General')
  const [activeFeedback, setActiveFeedback] = useState<string | null>(null)
  const [feedbackComment, setFeedbackComment] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isMobile = useMediaQuery('(max-width: 640px)')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMessages([
      { 
        id: Date.now().toString(),
        content: 'Hi there! I am your AI assistant. How can I help you today?',
        isUser: false,
        timestamp: new Date().toISOString(),
      }
    ])
  }, [])

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), 5000)
      return () => clearTimeout(timeout)
    }
  }, [error])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (messages.length > MAX_MESSAGES) {
      setMessages(prevMessages => prevMessages.slice(-MAX_MESSAGES))
    }
  }, [messages])

  const handleSubmit = useCallback(async (e: SubmitEvent) => {
    e.preventDefault()

    if (!input.trim()) {
      setError('Please enter a message');
      return;
    }

    setIsTyping(true);
    setError(null);

    try {
      const newMessage: Message = {
        id: crypto.randomUUID(),
        content: input,
        isUser: true,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, newMessage])
      setInput('')

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: newMessage.content,
          agent: agentType
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json()
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: data.message,
        isUser: false,
        agentResponse: data.agentResponse,
        timestamp: new Date().toISOString(),
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsTyping(false)
    }
  }, [input, agentType])

  const handleAgentChange = useCallback((type: AgentType) => {
    setAgentType(type)
    setMessages([])
    setIsMenuOpen(false)
  }, [])

  const handleFeedback = useCallback((messageId: string, feedbackType: 'positive' | 'negative') => {
    setActiveFeedback(messageId)
    setMessages(prev => prev.map(message => 
      message.id === messageId ? { ...message, feedback: { type: feedbackType, comment: '' } } : message
    ))
  }, [])

  const handleFeedbackComment = (messageId: string) => {
    setMessages(prev => prev.map(message => 
      message.id === messageId && message.feedback 
        ? { ...message, feedback: { ...message.feedback, comment: feedbackComment } } 
        : message
    ))
    setActiveFeedback(null)
    setFeedbackComment('')
  }

  const handleDeleteMessage = useCallback((messageId: string) => {
    setMessages(prev => prev.filter(message => message.id !== messageId))
  }, [])

  return (
    <TooltipProvider>
      <div 
        className="flex flex-col h-screen overflow-hidden text-gray-800 transition-colors duration-300 bg-gradient-to-br from-blue-100 to-purple-200 dark:from-blue-900 dark:to-purple-900 dark:text-gray-100"
        data-testid="chat-interface"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between p-3 transition-colors duration-300 shadow-md sm:p-4 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 rounded-b-2xl">
          <h1 className="text-lg font-semibold xs:text-xl sm:text-2xl gradient-text">SCANUEV Chat</h1>
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
                  className="absolute z-20 p-3 rounded-lg shadow-lg w-44 xs:w-48 xs:p-4 top-14 xs:top-16 right-2 xs:right-4 backdrop-blur-md bg-white/90 dark:bg-gray-900/90"
                >
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant={agentType === 'PFC' ? 'gradient' : 'ghost'}
                      onClick={() => handleAgentChange('PFC')}
                      className="justify-start text-sm xs:text-base"
                    >
                      <Brain className="w-5 h-5 mr-2" /> PFC
                    </Button>
                    <Button
                      variant={agentType === 'General' ? 'gradient' : 'ghost'}
                      onClick={() => handleAgentChange('General')}
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
                variant={agentType === 'PFC' ? 'gradient' : 'secondary'}
                onClick={() => handleAgentChange('PFC')}
                className="rounded-r-none"
              >
                <Brain className="w-5 h-5 mr-2" /> PFC
              </Button>
              <Button
                variant={agentType === 'General' ? 'gradient' : 'secondary'}
                onClick={() => handleAgentChange('General')}
                className="rounded-l-none"
              >
                <Globe className="w-5 h-5 mr-2" /> General
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <ChatContainer 
            messages={messages}
            onDelete={handleDeleteMessage}
          />
        </main>
        <div className="fixed bottom-0 left-0 right-0 p-2 border-t sm:p-4 bg-background/95 backdrop-blur-sm">
          <div className="w-full px-2 sm:px-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={`Message ${agentType} agent...`}
                      className={cn(
                        "w-full p-2 pr-10 rounded-lg",
                        "bg-muted/50 border focus:border-primary",
                        "placeholder:text-muted-foreground/70",
                        "focus:outline-none focus:ring-2 focus:ring-primary/20",
                        "text-base sm:text-lg",
                        "h-10 sm:h-12"
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
                  disabled={isTyping || !input.trim()}
                  variant="gradient"
                  size="icon"
                  className={cn(
                    "w-10 h-10 sm:w-12 sm:h-12",
                    "rounded-full",
                    "shadow-lg hover:shadow-xl",
                    "transition-all duration-200"
                  )}
                >
                  <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="h-[60px] sm:h-[72px]" /> {/* Spacer to prevent overlap */}
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </TooltipProvider>
  )
}

