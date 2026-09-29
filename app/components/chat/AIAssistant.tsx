
"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  Send,
  Feather,
  X,
  History,
  Sparkles,
  Copy,
  Check,
  Bot,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingAIButton from "./FloatingAIButton";
import AIChatModal from "./AIChatModel";


export const SUGGESTIONS = [
  { label: "About Me", query: "Tell me about Daniyal." },
  { label: "Best Project", query: "Tell me about Greenova." },
  { label: "Why Hire?", query: "Why should I hire Daniyal?" },
];

export interface Message {
  role: string;
  content: string;
  createdAt: string;
}

interface Props {
  variant?: "desktop-hero" | "mobile-persistent";
}

export function AIAssistant({
  variant = "desktop-hero",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  // const { stop, start } = useLenisControl();

  useEffect(() => {
    setMounted(true);

    const saved = localStorage.getItem("vintage_chat_v2");

    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);


  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(
        "vintage_chat_v2",
        JSON.stringify(messages),
      );
    }

    if (scrollRef.current) {
      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);



  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };

    const newMessages = [...messages, userMsg];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages = newMessages.map(
        ({ role, content }) => ({
          role,
          content,
        }),
      );

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: apiMessages,
        }),
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;

        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch {}

        throw new Error(
          `${response.status}:${errorMessage}`,
        );
      }

      if (!response.body) {
        throw new Error("NO_RESPONSE_BODY");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let assistantContent = "";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "",
          createdAt: new Date().toISOString(),
        },
      ]);

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        assistantContent += decoder.decode(value, {
          stream: true,
        });

        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1].content =
            assistantContent;

          return updated;
        });
      }
    } catch (err: any) {
      console.error(err);

      let message =
        "The AI assistant couldn't process your request. Please try again later.";

      if (err.message.startsWith("429")) {
        message =
          "The AI assistant is temporarily unavailable because the usage limit has been reached. Please try again later.";
      } else if (err.message.startsWith("401")) {
        message =
          "The AI assistant is currently unavailable due to a configuration issue.";
      } else if (err.message.startsWith("403")) {
        message =
          "Access to the AI assistant is currently restricted.";
      } else if (err.message.startsWith("404")) {
        message =
          "The AI assistant service could not be found. Please contact the site owner.";
      } else if (err.message.startsWith("500")) {
        message =
          "The AI assistant encountered an internal server error. Please try again in a few moments.";
      } else if (
        err.message === "Failed to fetch" ||
        err.name === "TypeError"
      ) {
        message =
          "Unable to connect to the AI assistant. Please check your internet connection and try again.";
      } else if (err.message === "NO_RESPONSE_BODY") {
        message =
          "The AI assistant returned an empty response. Please try again.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: message,
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (
    text: string,
    index: number,
  ) => {
    await navigator.clipboard.writeText(text);

    setCopiedIndex(index);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  if (!mounted) return null;

  return (
    <>
      {/* ALWAYS VISIBLE */}
      <FloatingAIButton
        onClick={() => setIsOpen(true)}
      />

      {/* ONLY VISIBLE WHEN OPEN */}
      <AIChatModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        messages={messages}
        setMessages={setMessages}
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        handleSend={handleSend}
        handleCopy={handleCopy}
        copiedIndex={copiedIndex}
        scrollRef={scrollRef}
      />
    </>
  );
}
