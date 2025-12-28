"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  options?: string[];
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm here to help you find the right insurance. What brings you here today?",
      sender: "bot",
      timestamp: new Date(),
      options: [
        "Get a quote",
        "Compare products",
        "Talk to an agent",
        "Check my policy",
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(text);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (userText: string): Message => {
    const lowerText = userText.toLowerCase();

    if (lowerText.includes("quote") || lowerText.includes("get a quote")) {
      return {
        id: Date.now().toString(),
        text: "Great! I can help you get a quote. Which type of insurance are you interested in?",
        sender: "bot",
        timestamp: new Date(),
        options: ["Life Insurance", "Health Insurance", "Auto Insurance", "Home Insurance", "Business Insurance"],
      };
    }

    if (lowerText.includes("life insurance")) {
      return {
        id: Date.now().toString(),
        text: "Perfect! Life insurance protects your family's financial future. Would you like to start a quote or learn more about our options?",
        sender: "bot",
        timestamp: new Date(),
        options: ["Start Quote", "Learn More", "Talk to Agent"],
      };
    }

    if (lowerText.includes("compare") || lowerText.includes("products")) {
      return {
        id: Date.now().toString(),
        text: "I can help you compare our insurance products. We offer Life, Health, Auto, Home, and Business insurance. Which would you like to explore?",
        sender: "bot",
        timestamp: new Date(),
        options: ["Life vs Health", "Auto vs Home", "All Products", "Talk to Agent"],
      };
    }

    if (lowerText.includes("agent") || lowerText.includes("talk")) {
      return {
        id: Date.now().toString(),
        text: "I'd be happy to connect you with one of our licensed agents! They're available via phone, chat, or video call. How would you prefer to connect?",
        sender: "bot",
        timestamp: new Date(),
        options: ["Schedule Call", "Live Chat", "Video Call", "Continue Here"],
      };
    }

    if (lowerText.includes("policy") || lowerText.includes("check")) {
      return {
        id: Date.now().toString(),
        text: "To check your policy details, please log in to your customer portal. Would you like me to direct you there?",
        sender: "bot",
        timestamp: new Date(),
        options: ["Go to Portal", "Reset Password", "Talk to Agent"],
      };
    }

    if (lowerText.includes("start quote") || lowerText.includes("begin")) {
      return {
        id: Date.now().toString(),
        text: "Excellent! I'll redirect you to our quote builder where you can get an instant estimate. Ready to proceed?",
        sender: "bot",
        timestamp: new Date(),
        options: ["Yes, Start Quote", "Not Yet", "More Questions"],
      };
    }

    return {
      id: Date.now().toString(),
      text: "I'm here to help! You can ask me about getting quotes, comparing products, talking to an agent, or checking your policy. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      options: ["Get a quote", "Compare products", "Talk to an agent", "Check my policy"],
    };
  };

  const handleOptionClick = (option: string) => {
    const lowerOption = option.toLowerCase();

    // Handle Schedule Call - redirect to appointment page
    if (lowerOption.includes("schedule call") || lowerOption.includes("schedule")) {
      window.location.href = "/schedule-appointment";
      return;
    }

    // Handle Video Call - send request to admin panel
    if (lowerOption.includes("video call")) {
      const videoCallRequest = {
        id: `VID-${Date.now()}`,
        type: "Video Call",
        timestamp: new Date().toISOString(),
        status: "Pending",
        customerInfo: {
          sessionId: Date.now().toString(),
          requestedAt: new Date().toLocaleString(),
        },
      };

      const existingRequests = JSON.parse(localStorage.getItem("chatRequests") || "[]");
      existingRequests.push(videoCallRequest);
      localStorage.setItem("chatRequests", JSON.stringify(existingRequests));

      handleSend("I'd like to schedule a video call");
      return;
    }

    // Handle Live Chat - send request to admin panel
    if (lowerOption.includes("live chat")) {
      const liveChatRequest = {
        id: `CHAT-${Date.now()}`,
        type: "Live Chat",
        timestamp: new Date().toISOString(),
        status: "Pending",
        customerInfo: {
          sessionId: Date.now().toString(),
          requestedAt: new Date().toLocaleString(),
        },
      };

      const existingRequests = JSON.parse(localStorage.getItem("chatRequests") || "[]");
      existingRequests.push(liveChatRequest);
      localStorage.setItem("chatRequests", JSON.stringify(existingRequests));

      handleSend("I'd like to start a live chat with an agent");
      return;
    }

    // Default behavior for other options
    handleSend(option);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--blue)] text-3xl shadow-2xl transition-all hover:scale-110 hover:shadow-[0_20px_60px_rgba(255,208,87,0.4)]"
          aria-label="Open chat"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[400px] flex-col overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] shadow-2xl">
          <div className="relative overflow-hidden bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--blue)] p-6">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white opacity-10 blur-2xl"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-white">Life Evolutions X</div>
                <div className="text-xs text-white/80">Always here to help</div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/30"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${message.sender === "user"
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                      : "bg-gray-800 text-white"
                      }`}
                  >
                    <div className="text-sm leading-relaxed">{message.text}</div>
                  </div>
                  {message.options && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(option)}
                          className="rounded-full border-2 border-yellow-400 bg-transparent px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white transition-all hover:bg-yellow-400 hover:text-gray-900 hover:scale-105 shadow-sm"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="mt-1 text-xs text-[color:var(--text-tertiary)]">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-gray-100 dark:bg-[#0f1419] px-4 py-3">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-[color:var(--text-tertiary)]" style={{ animationDelay: "0ms" }}></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-[color:var(--text-tertiary)]" style={{ animationDelay: "150ms" }}></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-[color:var(--text-tertiary)]" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-[color:var(--border)] p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] px-4 py-2 text-sm text-[color:var(--text-primary)] outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--blue)] text-white transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Send message"
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
