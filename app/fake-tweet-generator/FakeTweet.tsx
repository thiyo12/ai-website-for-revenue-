"use client";

import { useRef, useState } from "react";
import PaywallModal from "@/components/PaywallModal";
import AdGate from "@/components/AdGate";
import { exportElementAsPng } from "@/lib/exportImage";

export default function FakeTweet() {
  const [name, setName] = useState("Alex Carter");
  const [handle, setHandle] = useState("@alexcarter");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [text, setText] = useState("Coding all night on a new tool. The future is in your browser. 🚀");
  const [verified, setVerified] = useState(true);
  const [time, setTime] = useState("9:41 AM");
  const [date, setDate] = useState("Aug 4, 2026");
  const [replies, setReplies] = useState("128");
  const [retweets, setRetweets] = useState("1.4K");
  const [likes, setLikes] = useState("8.2K");
  const [views, setViews] = useState("342K");
  const renderRef = useRef<HTMLDivElement>(null);

  const readFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setAvatar(r.result as string);
    r.readAsDataURL(f);
  };

  const download = () => exportElementAsPng(renderRef.current, "tweet.png", 2);

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Tweet details</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">@handle</label>
            <input value={handle} onChange={(e) => setHandle(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Tweet text</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Avatar <span className="text-gray-400">(optional)</span>
            </label>
            <input type="file" accept="image/*" onChange={readFile} className="text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <input id="verified" type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} className="h-4 w-4 accent-accent-600" />
            <label htmlFor="verified" className="text-sm text-gray-700">Verified checkmark</label>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Engagement & time</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Time</label>
            <input value={time} onChange={(e) => setTime(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Date</label>
            <input value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Replies</label>
            <input value={replies} onChange={(e) => setReplies(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Retweets</label>
            <input value={retweets} onChange={(e) => setRetweets(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Likes</label>
            <input value={likes} onChange={(e) => setLikes(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div className="col-span-2 sm:col-span-5">
            <label className="mb-1 block text-sm font-medium text-gray-700">Views</label>
            <input value={views} onChange={(e) => setViews(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div ref={renderRef} className="mx-auto w-full max-w-md rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-blue-600 text-white">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-lg font-bold">{name.charAt(0).toUpperCase()}</div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="truncate font-bold text-gray-900">{name}</span>
                {verified && (
                  <svg viewBox="0 0 22 22" className="h-4 w-4 fill-sky-500" aria-label="Verified">
                    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816z" />
                  </svg>
                )}
                <span className="truncate text-gray-500">{handle}</span>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-[15px] leading-snug text-gray-900">{text}</p>
              <p className="mt-2 text-sm text-gray-500">
                {time} · {date} · <span className="font-medium">Views: {views}</span>
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3 text-sm text-gray-500">
                <span className="font-medium">{replies}</span>
                <span className="font-medium">{retweets}</span>
                <span className="font-medium">{likes}</span>
                <span className="font-medium">Share</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        This is a simulated social media post for entertainment purposes only. See our{" "}
        <a href="/terms-of-service" className="font-medium text-accent-600 underline">Terms of Service</a>.
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