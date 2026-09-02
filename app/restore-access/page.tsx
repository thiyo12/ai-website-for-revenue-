"use client";

import { useState } from "react";

export default function RestoreAccess() {
  const [email, setEmail] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, licenseKey }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        setMessage("Access restored! Unlimited tool use is now active.");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Could not restore access. Please check your details.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Restore Access
      </h1>
      <p className="mt-3 text-[15px] text-gray-600">
        Enter the email and license key from your receipt to restore unlimited
        access on this device.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="ra-email" className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="ra-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
          />
        </div>

        <div>
          <label htmlFor="ra-license" className="mb-2 block text-sm font-medium text-gray-700">
            License key
          </label>
          <input
            id="ra-license"
            type="text"
            required
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            placeholder="e.g. abcdef-123456-..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
          />
        </div>

        {message && (
          <p
            className={`rounded-lg px-4 py-3 text-sm ${
              status === "success"
                ? "bg-green-50 text-green-700"
                : status === "error"
                ? "bg-red-50 text-red-700"
                : ""
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700 disabled:opacity-50"
        >
          {status === "loading" ? "Restoring…" : "Restore access"}
        </button>
      </form>
    </div>
  );
}
