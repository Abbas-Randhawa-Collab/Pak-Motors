"use client";

import { useState } from "react";

type Msg = { from: "bot" | "me"; text: string };

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: "Assalam-o-Alaikum! Looking for a specific car, budget, or import? Tell me and I'll point you to the right listing.",
    },
  ]);

  function send() {
    const q = input.trim();
    if (!q) return;
    setMessages((m) => [...m, { from: "me", text: q }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: `Thanks! Based on "${q}", I'd suggest browsing our SUV or Imported categories, or call 0300-5019149 to talk to Nasir directly.`,
        },
      ]);
    }, 700);
  }

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
      {open && (
        <div className="w-[320px] max-w-[90vw] bg-white rounded-xl shadow-2xl overflow-hidden mb-2 border border-line">
          <div className="bg-black text-white px-4 py-3 flex justify-between items-center">
            <div>
              <b className="block text-sm">Pak Motors AI Assistant</b>
              <span className="text-[11px] text-green-400">● Online now</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">✕</button>
          </div>
          <div className="p-4 h-[260px] overflow-y-auto flex flex-col gap-2.5 bg-off">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm px-3 py-2 rounded-lg max-w-[85%] ${
                  m.from === "me" ? "bg-red text-white self-end" : "bg-white border border-line self-start"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex border-t border-line">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2.5 text-sm outline-none"
            />
            <button onClick={send} className="px-4 bg-black text-white text-sm font-semibold">
              Send
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2.5">
        <button
          onClick={() => setOpen(!open)}
          className="w-12 h-12 rounded-full bg-red text-white flex items-center justify-center text-xl shadow-lg relative"
          title="AI Assistant"
        >
          🤖
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
        </button>
        <a
          href="https://wa.me/923005019149"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center text-xl shadow-lg"
          title="WhatsApp"
        >
          💬
        </a>
        <a
          href="tel:03005019149"
          className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl shadow-lg"
          title="Call Now"
        >
          📞
        </a>
      </div>
    </div>
  );
}
