"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "¡Hola! Soy el Asistente Virtual de Hospitales MAC. Puedo ayudarte con información sobre ubicaciones, servicios, especialidades y más. ¿En qué puedo asistirte?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Error al conectar con el asistente");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content:
          "Disculpa, tuve un problema procesando tu pregunta. Por favor, intenta de nuevo o llama al Call Center 800 622 0800.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-mac-primary text-white shadow-[0_4px_20px_rgba(26,107,60,0.4)] hover:shadow-[0_6px_28px_rgba(26,107,60,0.55)] hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
        title="Abrir chat con asistente virtual"
        aria-label="Chat Asistente Virtual"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6 group-hover:animate-pulse" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-8 z-40 w-96 max-h-[600px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.16)] border border-gray-200 flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300"
          style={{ maxWidth: "calc(100vw - 48px)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-mac-primary to-mac-primary-dark rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="text-white">
                <h3 className="text-body font-medium">Asistente Virtual MAC</h3>
                <p className="text-caption text-mac-primary-light">En línea</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2.5 rounded-xl text-body leading-relaxed break-words ${
                    msg.role === "user"
                      ? "bg-mac-primary text-white rounded-br-none"
                      : "bg-white text-mac-carbon border border-gray-200 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-xl rounded-bl-none px-4 py-2.5 flex items-center gap-2 text-gray-500">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-caption">Escribiendo...</span>
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-start">
                <div className="bg-red-50 border border-red-200 rounded-xl rounded-bl-none px-4 py-2.5 flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="text-caption">{error}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Disclaimer */}
          <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-100 text-[11px] text-yellow-700 leading-tight">
            <strong>Nota:</strong> Este es un asistente de información. No brinda diagnósticos ni atención médica. Para emergencias, llama al 911.
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-gray-100 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu pregunta..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 text-caption border border-gray-200 rounded-lg focus:outline-none focus:border-mac-primary bg-white disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="w-10 h-10 bg-mac-primary text-white rounded-lg hover:bg-mac-primary-dark active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
