import { useState } from "react";
const AITutor = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: "user", content: input, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${proccess.env.API_KEY}`, // ✅ Correct authentication header
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // ✅ Ensure correct model
          messages: [
            { role: "system", content: "You are a helpful AI tutor." },
            { role: "user", content: input },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = {
        type: "assistant",
        content: data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { type: "system", content: `Error: ${error.message}`, timestamp: new Date().toISOString() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
        🎓 AI Learning Assistant
      </h1>
      
      <div className="h-96 overflow-y-auto p-4 bg-slate-700 rounded-lg shadow-inner scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`mb-4 p-4 rounded-xl transition-all duration-200 ${
              msg.type === "user" 
                ? "bg-blue-600/90 text-white ml-6" 
                : "bg-slate-600/90 text-white mr-6"
            }`}
          >
            <div className="flex items-start gap-3">
              {msg.type === "assistant" && (
                <span className="text-2xl">🤖</span>
              )}
              <div className="flex-1">
                <p className="text-sm leading-relaxed font-medium">
                  {msg.content}
                </p>
                <p className="text-xs mt-2 opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              {msg.type === "user" && (
                <span className="text-2xl">👤</span>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center items-center p-4">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-600 h-3 w-3"></div>
              <div className="rounded-full bg-slate-600 h-3 w-3"></div>
              <div className="rounded-full bg-slate-600 h-3 w-3"></div>
            </div>
          </div>
        )}
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="mt-6 flex gap-2 relative"
      >
        <input
          type="text"
          className="flex-1 p-4 bg-slate-700 text-white rounded-xl border border-slate-600 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   placeholder-slate-400 disabled:opacity-50"
          placeholder="Ask me anything about the lesson..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl
                    transition-all duration-200 focus:outline-none focus:ring-2 
                    focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800
                    disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>

      {/* Accessibility enhancements */}
      <style jsx global>{`
        /* Custom scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thumb-slate-600::-webkit-scrollbar-thumb {
          background-color: #475569;
          border-radius: 3px;
        }
        .scrollbar-track-slate-800::-webkit-scrollbar-track {
          background-color: #1e293b;
        }
      `}</style>
    </div>
  );
};

export default AITutor;