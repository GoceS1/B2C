"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DynamicPlaceholder from "@/components/DynamicPlaceholder";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isChatMode, setIsChatMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getMockBotResponse = (userMessage: string): string => {
    // Mock responses based on user input
    const responses = [
      "Great! Let me help you find the perfect guide. Which city are you interested in?",
      "Perfect! What date are you planning your tour?",
      "I'm checking our available guides for your requirements...",
      "Unfortunately, we don't have guides available for these specific requirements at the moment. Would you like to try different dates or locations?",
      "Let me search for the best guides in that area for you!",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!searchQuery.trim()) return;

    // Enter chat mode if not already
    if (!isChatMode) {
      setIsChatMode(true);
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: searchQuery,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setSearchQuery("");
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getMockBotResponse(searchQuery),
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Hero Title - Fades out in chat mode */}
      <AnimatePresence>
        {!isChatMode && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-32 px-6"
          >
            <div className="text-center mb-12 max-w-5xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-black">
                Find your ideal tour
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-20">
                Just say where and when
              </p>

              {/* Search bar in normal hero position */}
              <div className="relative max-w-2xl mx-auto">
                <form onSubmit={handleSendMessage}>
                  <div className="relative flex items-center bg-white rounded-full shadow-lg border border-gray-200 pl-6 pr-2 py-2 hover:shadow-xl transition-shadow">
                    <Search className="w-5 h-5 text-text-secondary shrink-0" />
                    <DynamicPlaceholder
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-0 focus-visible:ring-0 shadow-none h-12 px-4 bg-transparent w-full"
                    />
                    <button 
                      type="submit"
                      className="shrink-0 rounded-full px-8 py-2 bg-[#EBC8EB] text-gray-900 font-semibold hover:bg-[#DEB8DE] transition-colors"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Mode - Messages and Input at bottom */}
      {isChatMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col justify-end px-6 pb-16"
        >
          <div className="max-w-4xl mx-auto w-full flex flex-col" style={{ maxHeight: 'calc(100vh - 8rem)' }}>
            {/* Messages - scrollable */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] px-6 py-3 rounded-3xl ${
                        message.sender === 'user'
                          ? 'bg-[#EBC8EB] text-gray-900'
                          : 'bg-white text-gray-900 shadow-md'
                      }`}
                    >
                      <p className="text-base">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white px-6 py-3 rounded-3xl shadow-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input - fixed at bottom */}
            <form onSubmit={handleSendMessage}>
              <div className="relative flex items-center bg-white rounded-full shadow-lg border border-gray-200 pl-6 pr-2 py-2 hover:shadow-xl transition-shadow">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type your message..."
                  className="border-0 focus-visible:ring-0 focus:outline-none shadow-none h-12 px-4 bg-transparent w-full"
                  autoFocus
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full px-6 py-2 bg-[#EBC8EB] text-gray-900 font-semibold hover:bg-[#DEB8DE] transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </section>
  );
}

