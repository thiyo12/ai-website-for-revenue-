"use client";

import { useRef, useState } from "react";
import PaywallModal from "@/components/PaywallModal";
import AdGate from "@/components/AdGate";
import { exportElementAsPng } from "@/lib/exportImage";

export default function FakeNotification() {
  const [appName, setAppName] = useState("Messages");
  const [header, setHeader] = useState("Text Message");
  const [body, setBody] = useState("Hey! Want to grab coffee this afternoon?");
  const [time, setTime] = useState("9:15 PM");
  const [icon, setIcon] = useState<string | null>(null);
  const [iconBg, setIconBg] = useState("#34d399");
  const renderRef = useRef<HTMLDivElement>(null);

  const readFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setIcon(r.result as string);
    r.readAsDataURL(f);
  };

  const download = () => exportElementAsPng(renderRef.current, "notification.png", 2);

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Notification details</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">App name</label>
            <input value={appName} onChange={(e) => setAppName(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Header</label>
            <input value={header} onChange={(e) => setHeader(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Notification body</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={2} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Timestamp</label>
            <input value={time} onChange={(e) => setTime(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              App icon <span className="text-gray-400">(optional)</span>
            </label>
            <input type="file" accept="image/*" onChange={readFile} className="text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Icon background color</label>
            <input type="color" value={iconBg} onChange={(e) => setIconBg(e.target.value)} className="h-9 w-full rounded-lg border border-gray-300" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div ref={renderRef} className="mx-auto w-full max-w-md rounded-xl bg-white px-4 py-3 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full" style={{ background: iconBg }}>
              {icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={icon} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-white text-lg font-bold">
                  {appName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="truncate text-sm font-semibold text-gray-900">{appName}</p>
                <span className="shrink-0 text-xs text-gray-400">{time}</span>
              </div>
              <p className="truncate text-sm text-gray-600">{header}</p>
              <p className="mt-0.5 text-sm leading-snug text-gray-500">{body}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        This is a simulated notification for entertainment purposes only. See our{" "}
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