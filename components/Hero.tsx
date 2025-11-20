"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DynamicPlaceholder from "@/components/DynamicPlaceholder";
import LogoCarousel from "@/components/LogoCarousel";
import AnimatedSwitchingText from "@/components/AnimatedSwitchingText";

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
    <section className="relative flex flex-col">
      {/* Hero Title - Fades out in chat mode */}
      <AnimatePresence>
        {!isChatMode && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-24 pb-12 px-6"
          >
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight text-black inline-flex items-baseline flex-nowrap whitespace-nowrap">
                  <span>Find your ideal&nbsp;</span>
                  <AnimatedSwitchingText />
                </h1>
              </div>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
                Just say where and when
              </p>

              {/* Search bar in normal hero position */}
              <div className="relative max-w-2xl mx-auto mt-12 sm:mt-16">
                <div
                  className="absolute inset-0 -z-10 rounded-full opacity-60 blur-2xl"
                  style={{
                    background:
                      "linear-gradient(90deg, #FF8BCF 0%, #FF8BCF 45%, #F3B0FF 70%, #D3B7FF 100%)",
                  }}
                />
                <div
                  className="relative rounded-full p-[2px] shadow-[0_25px_60px_rgba(243,176,255,0.35)]"
                  style={{
                    background:
                      "linear-gradient(90deg, #FF8BCF 0%, #FF8BCF 45%, #F3B0FF 70%, #D3B7FF 100%)",
                  }}
                >
                  <form onSubmit={handleSendMessage}>
                    <div className="relative flex items-center bg-white rounded-full pl-6 pr-2 py-2">
                      <Search className="w-5 h-5 text-text-secondary shrink-0" />
                      <DynamicPlaceholder
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-0 focus-visible:ring-0 shadow-none h-12 px-4 bg-transparent w-full"
                      />
                      <button 
                        type="submit"
                        className="shrink-0 rounded-full px-8 py-2 bg-[#D3B7FF] text-gray-900 font-semibold hover:bg-[#BDA0EC] transition-colors"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Logo Carousel */}
              <div className="max-w-3xl mx-auto mt-10">
                <LogoCarousel />
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
            <form onSubmit={handleSendMessage} className="relative">
              <div
                className="absolute inset-0 -z-10 rounded-full opacity-60 blur-2xl"
                style={{
                  background:
                    "linear-gradient(90deg, #FF8BCF 0%, #FF8BCF 45%, #F3B0FF 70%, #D3B7FF 100%)",
                }}
              />
              <div
                className="relative rounded-full p-[2px] shadow-[0_25px_60px_rgba(243,176,255,0.35)]"
                style={{
                  background:
                    "linear-gradient(90deg, #FF8BCF 0%, #FF8BCF 45%, #F3B0FF 70%, #D3B7FF 100%)",
                }}
              >
                <div className="relative flex items-center bg-white rounded-full pl-6 pr-2 py-2">
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
                    className="shrink-0 rounded-full px-6 py-2 bg-[#D3B7FF] text-gray-900 font-semibold hover:bg-[#BDA0EC] transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </section>
  );
}

