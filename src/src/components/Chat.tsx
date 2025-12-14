import { useState } from "react";
import { useChat, fetchServerSentEvents } from "@tanstack/ai-react";
import { Plus, Mic } from "lucide-react";

export function Chat() {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const { messages, sendMessage, isLoading } = useChat({
    connection: fetchServerSentEvents("/api/chat"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  const displayMessages =
    messages.length > 0
      ? messages
      : [
          {
            id: "1",
            role: "user" as const,
            parts: [{ type: "text" as const, content: "Hello, how are you?" }],
          },
          {
            id: "2",
            role: "assistant" as const,
            parts: [
              {
                type: "text" as const,
                content: "Test received! Everything's working.",
              },
            ],
          },
        ];

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] text-white relative">
      <div className="flex-1 overflow-y-auto p-24">
        {displayMessages.map((message) => (
          <div key={message.id} className="mb-6 gap-y-4">
            {/* Assistant */}
            {message.role === "assistant" && (
              <div className="text-white mb-3">
                {message.parts.map((part, idx) => {
                  if (part.type === "thinking") {
                    return (
                      <div
                        key={idx}
                        className="text-sm text-gray-400 italic mb-2"
                      >
                        Thinking: {part.content}
                      </div>
                    );
                  }
                  if (part.type === "text") {
                    return (
                      <div key={idx} className="leading-relaxed">
                        {part.content}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
            {/* User */}
            {message.role === "user" && (
              <div className="flex justify-end">
                <div className="text-white bg-blue-500 p-2 rounded-xl justify-end">
                  {message.parts.map((part, idx) => {
                    if (part.type === "text") {
                      return (
                        <div key={idx} className="leading-relaxed">
                          {part.content}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 right-0 p-4 bg-[#0a0a0a] border-t border-gray-800"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-center bg-[#1a1a1a] rounded-2xl px-4 py-3">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-300 mr-3 shrink-0"
            >
              <Plus className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything"
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
              disabled={isLoading}
            />
            <div className="flex items-center gap-2 ml-3">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-300 shrink-0"
                onClick={() => setIsRecording(!isRecording)}
              >
                <Mic className="w-5 h-5" />
              </button>
              {isRecording && (
                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-end justify-center gap-0.5 px-1.5 py-1">
                    <div
                      className="w-0.5 bg-white rounded-full"
                      style={{
                        height: "0.25rem",
                        animation: "sound-wave 0.6s ease-in-out infinite",
                        animationDelay: "0ms",
                      }}
                    />
                    <div
                      className="w-0.5 bg-white rounded-full"
                      style={{
                        height: "0.5rem",
                        animation: "sound-wave 0.6s ease-in-out infinite",
                        animationDelay: "0.15s",
                      }}
                    />
                    <div
                      className="w-0.5 bg-white rounded-full"
                      style={{
                        height: "0.375rem",
                        animation: "sound-wave 0.6s ease-in-out infinite",
                        animationDelay: "0.3s",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
