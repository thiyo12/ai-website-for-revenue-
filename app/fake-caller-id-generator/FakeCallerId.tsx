"use client";

import { useRef, useState } from "react";
import PaywallModal from "@/components/PaywallModal";
import AdGate from "@/components/AdGate";
import { exportElementAsPng } from "@/lib/exportImage";

export default function FakeCallerId() {
  const [name, setName] = useState("Alex Carter");
  const [number, setNumber] = useState("+1 (555) 010-2030");
  const [carrier, setCarrier] = useState("Mobile — United States");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [accent, setAccent] = useState("#22c55e");
  const renderRef = useRef<HTMLDivElement>(null);

  const readFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setAvatar(r.result as string);
    r.readAsDataURL(f);
  };

  const download = () => exportElementAsPng(renderRef.current, "caller-id.png", 2);

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Call details</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Caller name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Phone number</label>
            <input value={number} onChange={(e) => setNumber(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Carrier / region</label>
            <input value={carrier} onChange={(e) => setCarrier(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Avatar <span className="text-gray-400">(optional)</span>
            </label>
            <input type="file" accept="image/*" onChange={readFile} className="text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Accent color</label>
            <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="h-9 w-full rounded-lg border border-gray-300" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div ref={renderRef} className="mx-auto w-full max-w-[300px] overflow-hidden rounded-3xl bg-gray-900 p-2 shadow-lg">
          <div className="flex flex-col items-center rounded-[22px] bg-gradient-to-b from-gray-800 to-gray-900 px-4 pb-6 pt-8">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white/20 bg-gray-700 text-white">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-4xl font-bold">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <p className="mt-4 text-center text-xl font-bold text-white">{name}</p>
            <p className="mt-1 text-sm text-gray-400">{number}</p>
            <p className="mt-3 text-xs uppercase tracking-widest text-gray-500">Incoming call</p>
            <p className="text-xs text-gray-500">{carrier}</p>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex flex-col items-center text-gray-400">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
                  <span className="text-lg">✕</span>
                </div>
                <span className="mt-1 text-[10px]">Decline</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full text-white" style={{ background: accent }}>
                  <span className="text-2xl">☏</span>
                </div>
                <span className="mt-1 text-[10px] text-gray-400">Answer</span>
              </div>
            </div>
            <p className="mt-6 text-center text-[9px] uppercase tracking-wide text-gray-600">
              For entertainment purposes only
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        This is a simulated caller ID screen for entertainment purposes only. It
        is not an authentic call and does not represent any phone number,
        carrier, or provider. See our{" "}
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