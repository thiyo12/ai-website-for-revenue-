"use client";

import { useState } from "react";
import PaywallModal from "@/components/PaywallModal";

const TEMPLATES = [
  "Just dropped {topic} — and it\'s a game-changer. {hook}",
  "Everything you need to know about {topic}, explained simply. {hook}",
  "New on {topic}: {hook}",
  "Here\'s why {topic} matters right now. {hook}",
  "Going deep on {topic}. Spoiler: {hook}",
];
const HOOKS = [
  "Let me know your thoughts in the comments.",
  "Save this for later.",
  "Tag someone who needs to see this.",
  "More coming soon — follow for updates.",
  "What\'s your take? Drop it below.",
];

function rand<T>(a: T, b: T): T {
  return Math.random() < 0.5 ? a : b;
}

export default function CaptionGenerator() {
  const [topic, setTopic] = useState("");
  const [captions, setCaptions] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState("");

  const generate = () => {
    const words = topic.trim().split(/\s+/).filter(Boolean);
    const tags = words.map((w) => `#${w}`).join(" ");
    const caps: string[] = [];
    for (let i = 0; i < 3; i++) {
      const tpl = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
      const hook = HOOKS[Math.floor(Math.random() * HOOKS.length)];
      caps.push(tpl.replace("{topic}", topic.trim()).replace("{hook}", hook));
    }
    setCaptions(caps);
    setHashtags(tags);
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text + "\n\n" + hashtags).catch(() => {});
  };

  return (
    <div className="space-y-6">
      <PaywallModal />
      <p className="text-sm text-gray-500">
        Enter a topic or keyword and we&apos;ll craft captions + ready-to-use hashtags for you.
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. productivity tips"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
        />
        <button
          onClick={generate}
          className="rounded-lg bg-accent-600 px-5 py-2 text-sm font-semibold text-white hover:bg-accent-700"
        >
          Generate
        </button>
      </div>

      {captions.length > 0 && (
        <div className="space-y-4">
          {captions.map((c, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="whitespace-pre-line text-sm text-gray-800">{c}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-gray-400">{hashtags}</span>
                <button
                  onClick={() => copy(c)}
                  className="rounded bg-accent-50 px-2 py-1 text-xs font-medium text-accent-600 hover:bg-accent-100"
                >
                  Copy all
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
