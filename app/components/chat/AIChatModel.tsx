'use client';

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  Feather,
  History,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Message, SUGGESTIONS } from "./AIAssistant";
import Lenis from "lenis";

export default function AIChatModal({
  isOpen,
  setIsOpen,
  messages,
  setMessages,
  input,
  setInput,
  isLoading,
  handleSend,
  handleCopy,
  copiedIndex,
  scrollRef,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  handleSend: (text: string) => void;
  handleCopy: (text: string, index: number) => void;
  copiedIndex: number | null;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const lenis = new Lenis({
  autoRaf: true,
  lerp: 0.1,
  smoothWheel: true,

  prevent: (node) => {
    return node.closest("[data-lenis-prevent]") !== null;
  },
});
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-end justify-center p-3 sm:items-center sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
              absolute
              inset-0
              bg-black/45
              backdrop-blur-[3px]
            "
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 25,
              scale: 0.98,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              z-10
              flex
              h-[min(560px,calc(100svh-24px))]
              w-full
              max-w-[520px]
              flex-col
              overflow-hidden

              border
              border-black/15

              bg-[#f5f3ee]
              text-[#111]

              shadow-[12px_18px_60px_rgba(0,0,0,0.2)]

              sm:h-[540px]
              sm:max-h-[calc(100svh-48px)]
            "
          >
            {/* Editorial top line */}
            <div
              aria-hidden="true"
              className="
                absolute
                left-0
                top-0
                h-[3px]
                w-full
                bg-[#e53935]
              "
            />

            {/* Header */}
            <header
              className="
                flex
                shrink-0
                items-center
                justify-between
                border-b
                border-black/10
                px-4
                py-4
                sm:px-5
              "
            >
              <div className="flex items-center gap-3">
                {/* AI indicator */}
                <div
                  className="
                    relative
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    border
                    border-black/15
                    bg-white/50
                  "
                >
                  <Sparkles
                    size={15}
                    strokeWidth={1.4}
                    className="text-[#e53935]"
                  />

                  <motion.span
                    className="
                      absolute
                      -right-1
                      -top-1
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[#e53935]
                    "
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-sm italic">
                      Daniyal's AI
                    </span>

                    <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-[#e53935]">
                      Online
                    </span>
                  </div>

                  <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-black/35">
                    Personal assistant / 01
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Clear conversation */}
                <motion.button
                  type="button"
                  onClick={() => {
                    setMessages([]);
                    localStorage.removeItem("vintage_chat_v2");
                  }}
                  whileHover={{
                    rotate: 180,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  aria-label="Clear conversation"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    text-black/35
                    transition-colors
                    hover:text-[#e53935]
                  "
                >
                  <History size={16} strokeWidth={1.5} />
                </motion.button>

                {/* Close */}
                <motion.button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  whileHover={{
                    rotate: 90,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  aria-label="Close chatbot"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    text-black/45
                    transition-colors
                    hover:text-black
                  "
                >
                  <X size={19} strokeWidth={1.5} />
                </motion.button>
              </div>
            </header>

            {/* Conversation */}
            <div
              ref={scrollRef}
  data-lenis-prevent
              className="
                flex-1
                overflow-y-auto
                px-4
                py-6
                sm:px-6
                sm:py-7
              "
            >
              {/* Empty state */}
              {messages.length === 0 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    flex
                    h-full
                    flex-col
                    items-center
                    justify-center
                  "
                >
                  <div className="mb-8 text-center">
                    <motion.div
                      animate={{
                        y: [0, -4, 0],
                        rotate: [0, -2, 0, 2, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="
                        mx-auto
                        mb-5
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        border
                        border-black/10
                        bg-white/50
                      "
                    >
                      <Feather
                        size={22}
                        strokeWidth={1}
                        className="text-[#e53935]"
                      />
                    </motion.div>

                    <p className="font-serif text-lg italic text-black/65">
                      Ask me anything.
                    </p>

                    <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-black/30">
                      About Daniyal, his work & projects
                    </p>
                  </div>

                  <div className="w-full max-w-[360px]">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-[#e53935]">
                        Try asking
                      </span>

                      <span className="h-px flex-1 bg-black/10" />
                    </div>

                    <div className="space-y-2">
                      {SUGGESTIONS.map((suggestion, index) => (
                        <motion.button
                          key={suggestion.label}
                          type="button"
                          onClick={() =>
                            handleSend(suggestion.query)
                          }
                          initial={{
                            opacity: 0,
                            x: -10,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: index * 0.08,
                          }}
                          whileHover={{
                            x: 5,
                          }}
                          whileTap={{
                            scale: 0.98,
                          }}
                          className="
                            group
                            flex
                            w-full
                            items-center
                            justify-between
                            border
                            border-black/10
                            bg-white/30
                            px-4
                            py-3
                            text-left
                            transition-colors
                            hover:border-[#e53935]/40
                            hover:bg-white/70
                          "
                        >
                          <span className="font-serif text-xs italic text-black/65">
                            {suggestion.label}
                          </span>

                          <span
                            className="
                              font-mono
                              text-[10px]
                              text-[#e53935]
                              opacity-40
                              transition-all
                              group-hover:translate-x-1
                              group-hover:opacity-100
                            "
                          >
                            →
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Messages */}
              <div className="space-y-7">
                {messages.map((message, index) => {
                  const isUser = message.role === "user";

                  return (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className={`flex ${
                        isUser
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`group relative max-w-[90%] ${
                          isUser ? "sm:max-w-[80%]" : ""
                        }`}
                      >
                        {!isUser && (
                          <div className="mb-2 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 bg-[#e53935]" />

                            <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-black/30">
                              Daniyal's AI
                            </span>
                          </div>
                        )}

                        <div
                          className={`
                            relative
                            border
                            p-3.5
                            sm:p-4
                            ${
                              isUser
                                ? "border-black/10 bg-white/45"
                                : "border-black/10 bg-transparent"
                            }
                          `}
                        >
                          <div
                            className={`
                              prose
                              prose-sm
                              max-w-none
                              font-serif
                              leading-relaxed
                              ${
                                isUser
                                  ? "italic text-black/70"
                                  : "text-black/80"
                              }
                            `}
                          >
                            <ReactMarkdown>
                              {message.content}
                            </ReactMarkdown>
                          </div>

                          {/* Copy */}
                          {!isUser && (
                            <button
                              type="button"
                              onClick={() =>
                                handleCopy(
                                  message.content,
                                  index,
                                )
                              }
                              aria-label="Copy response"
                              className="
                                absolute
                                bottom-2
                                right-2
                                p-1.5
                                text-black/25
                                opacity-0
                                transition-all
                                group-hover:opacity-100
                                hover:text-[#e53935]
                              "
                            >
                              {copiedIndex === index ? (
                                <Check size={13} />
                              ) : (
                                <Copy size={13} />
                              )}
                            </button>
                          )}
                        </div>

                        <div
                          className={`
                            mt-1.5
                            px-1
                            font-mono
                            text-[7px]
                            uppercase
                            tracking-[0.15em]
                            text-black/25
                            ${
                              isUser
                                ? "text-right"
                                : "text-left"
                            }
                          `}
                        >
                          {new Date(
                            message.createdAt,
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Loading */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      animate={{
                        opacity: [0.2, 1, 0.2],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                      }}
                      className="h-1.5 w-1.5 bg-[#e53935]"
                    />

                    <span className="font-serif text-xs italic text-black/35">
                      Thinking...
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="
                shrink-0
                border-t
                border-black/10
                bg-white/25
                p-4
                sm:p-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  border
                  border-black/10
                  bg-[#f5f3ee]
                  px-3
                  py-2
                  transition-colors
                  focus-within:border-[#e53935]/50
                "
              >
                <input
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  disabled={isLoading}
                  placeholder="Ask about my work..."
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    px-1
                    font-serif
                    text-sm
                    italic
                    text-black
                    outline-none
                    placeholder:text-black/25
                  "
                />

                <motion.button
                  type="submit"
                  disabled={
                    isLoading || !input.trim()
                  }
                  whileHover={{
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    bg-[#e53935]
                    text-white
                    transition-opacity
                    disabled:cursor-not-allowed
                    disabled:opacity-25
                  "
                >
                  <Send
                    size={15}
                    strokeWidth={1.5}
                  />
                </motion.button>
              </div>

              <div className="mt-2 flex items-center justify-between px-1">
                <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-black/25">
                  AI assistant
                </span>

                <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-black/20">
                  Enter ↵
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
