"use client";

import { useRef, useState } from "react";
import PaywallModal from "@/components/PaywallModal";
import AdGate from "@/components/AdGate";
import { exportElementAsPng } from "@/lib/exportImage";

interface Msg {
  id: number;
  text: string;
  mine: boolean;
  time: string;
}

let msgId = 0;

export default function FakeWhatsappChat() {
  const [myName, setMyName] = useState("You");
  const [contactName, setContactName] = useState("Alex");
  const [myAvatar, setMyAvatar] = useState<string | null>(null);
  const [contactAvatar, setContactAvatar] = useState<string | null>(null);
  const [bubble, setBubble] = useState("#d9fdd3");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { id: msgId++, text: "Hey! How have you been?", mine: false, time: "9:41" },
    { id: msgId++, text: "Great, let's catch up soon!", mine: true, time: "9:42" },
  ]);
  const renderRef = useRef<HTMLDivElement>(null);

  const addMessage = (mine: boolean) => {
    const text = input.trim();
    if (!text) return;
    const now = new Date();
    const t = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setMessages((m) => [...m, { id: msgId++, text, mine, time: t }]);
    setInput("");
  };

  const readFile = (e: React.ChangeEvent<HTMLInputElement>, set: (v: string | null) => void) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => set(r.result as string);
    r.readAsDataURL(f);
  };

  const download = () => exportElementAsPng(renderRef.current, "whatsapp-chat.png", 2);

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Chat details
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Your name</label>
            <input
              value={myName}
              onChange={(e) => setMyName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Contact name</label>
            <input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Bubble color</label>
            <input
              type="color"
              value={bubble}
              onChange={(e) => setBubble(e.target.value)}
              className="h-9 w-full rounded-lg border border-gray-300"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Your avatar</label>
            <input type="file" accept="image/*" onChange={(e) => readFile(e, setMyAvatar)} className="text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Contact avatar</label>
            <input type="file" accept="image/*" onChange={(e) => readFile(e, setContactAvatar)} className="text-sm" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Add messages
        </h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addMessage(true);
            }}
            placeholder="Type a message…"
            className="w-full flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => addMessage(false)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Incoming
            </button>
            <button
              type="button"
              onClick={() => addMessage(true)}
              className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-700"
            >
              Send
            </button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {messages.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMessages((list) => list.filter((x) => x.id !== m.id))}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-red-100 hover:text-red-600"
            >
              {m.mine ? "You" : contactName}: {m.text.length > 20 ? m.text.slice(0, 20) + "…" : m.text} ✕
            </button>
          ))}
        </div>
      </div>

      {/* Render target */}
      <div className="rounded-xl border border-gray-200 bg-gray-900 p-4">
        <div
          ref={renderRef}
          className="mx-auto w-full max-w-sm overflow-hidden rounded-xl bg-gray-100"
        >
          {/* header */}
          <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
            <div className="h-9 w-9 overflow-hidden rounded-full bg-white/20">
              {contactAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={contactAvatar} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-bold">
                  {contactName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold">{contactName}</p>
              <p className="text-xs text-white/70">online</p>
            </div>
          </div>

          {/* bubble background subtle pattern */}
          <div className="px-3 py-4" style={{ background: "#e5ddd5" }}>
            {messages.map((m) => (
              <div key={m.id} className={`mb-2 flex ${m.mine ? "justify-end" : "justify-start"}`}>
                <div
                  className="relative max-w-[80%] rounded-lg px-3 py-2 text-sm text-gray-800 shadow-sm"
                  style={{
                    background: m.mine ? bubble : "#ffffff",
                    borderTopLeftRadius: m.mine ? "8px" : "2px",
                    borderTopRightRadius: m.mine ? "2px" : "8px",
                  }}
                >
                  <p className="break-words whitespace-pre-wrap">{m.text}</p>
                  <p className="mt-1 text-right text-[10px] text-gray-500">
                    {m.time}
                    <span className="ml-1 text-accent-600">
                      {m.mine && <span aria-hidden="true">✓✓</span>}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        This is a simulated conversation for entertainment purposes only. It is
        not an authentic chat log. See our{" "}
        <a href="/terms-of-service" className="font-medium text-accent-600 underline">
          Terms of Service
        </a>
        .
      </p>

      <AdGate
        onAction={download}
        buttonLabel="Download PNG"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
      >
        Download PNG
      </AdGate>
    </div>
  );
}