"use client";

import { useRef, useState } from "react";
import PaywallModal from "@/components/PaywallModal";
import AdGate from "@/components/AdGate";
import { exportElementAsPdf } from "@/lib/exportPdf";

interface Line {
  id: number;
  desc: string;
  qty: number;
  rate: string;
}

let lineId = 0;

export default function InvoiceGenerator() {
  const [business, setBusiness] = useState("Acme Studio");
  const [businessInfo, setBusinessInfo] = useState("123 Market Street\nNew York, NY 10001\nacme@example.com");
  const [logo, setLogo] = useState<string | null>(null);
  const [client, setClient] = useState("Jane Doe");
  const [clientInfo, setClientInfo] = useState("Acme Client Co.\n456 Oak Avenue");
  const [invoiceNo, setInvoiceNo] = useState("INV-2026-001");
  const [issueDate, setIssueDate] = useState("Aug 4, 2026");
  const [dueDate, setDueDate] = useState("Sep 4, 2026");
  const [currency, setCurrency] = useState("$");
  const [taxRate, setTaxRate] = useState("8.5");
  const [notes, setNotes] = useState("Thank you for your business!");
  const [lines, setLines] = useState<Line[]>([
    { id: lineId++, desc: "Web design - home page", qty: 1, rate: "850" },
    { id: lineId++, desc: "Logo & brand kit", qty: 1, rate: "400" },
  ]);
  const [newDesc, setNewDesc] = useState("");
  const [newQty, setNewQty] = useState(1);
  const [newRate, setNewRate] = useState("");
  const renderRef = useRef<HTMLDivElement>(null);

  const readLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setLogo(r.result as string);
    r.readAsDataURL(f);
  };

  const addLine = () => {
    const rate = parseFloat(newRate);
    if (!newDesc.trim() || isNaN(rate)) return;
    setLines((l) => [...l, { id: lineId++, desc: newDesc.trim(), qty: Math.max(1, newQty), rate: newRate }]);
    setNewDesc("");
    setNewQty(1);
    setNewRate("");
  };

  const subtotal = lines.reduce((s, l) => s + (parseFloat(l.rate) || 0) * l.qty, 0);
  const tax = subtotal * (parseFloat(taxRate) || 0) / 100;
  const total = subtotal + tax;
  const fmt = (n: number) => n.toFixed(2);

  const download = () => exportElementAsPdf(renderRef.current, "invoice.pdf", 2);

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Business & client</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Your business name</label>
            <input value={business} onChange={(e) => setBusiness(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Logo</label>
            <input type="file" accept="image/*" onChange={readLogo} className="text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Business details</label>
            <textarea value={businessInfo} onChange={(e) => setBusinessInfo(e.target.value)} rows={3} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Client name</label>
            <input value={client} onChange={(e) => setClient(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Client details</label>
            <textarea value={clientInfo} onChange={(e) => setClientInfo(e.target.value)} rows={3} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Invoice number</label>
            <input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Issue date</label>
            <input value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Due date</label>
            <input value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Currency</label>
            <input value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tax rate (%)</label>
            <input value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Notes</label>
            <input value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Line items</h2>
        <div className="mb-3 flex flex-col gap-2 sm:flex-row">
          <input value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Description" className="w-full flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          <input type="number" value={newQty} onChange={(e) => setNewQty(parseInt(e.target.value) || 1)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm sm:w-20" />
          <input value={newRate} onChange={(e) => setNewRate(e.target.value)} placeholder="Rate" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm sm:w-28" />
          <button type="button" onClick={addLine} className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-700">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {lines.map((l) => (
            <button key={l.id} type="button" onClick={() => setLines((list) => list.filter((x) => x.id !== l.id))} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-red-100 hover:text-red-600">
              {l.desc} ×{l.qty} — {currency}{fmt(parseFloat(l.rate) || 0)} ✕
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-xl border border-gray-200 bg-gray-100 p-4">
        <div ref={renderRef} className="mx-auto w-full max-w-[800px] rounded-lg bg-white p-10 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo} alt="logo" className="h-14 w-14 object-contain" />
              )}
              <div>
                <p className="text-xl font-bold text-gray-900">{business}</p>
                <p className="whitespace-pre-line text-xs text-gray-500">{businessInfo}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">INVOICE</p>
              <p className="text-xs text-gray-500">#{invoiceNo}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400">Bill to</p>
              <p className="font-semibold text-gray-800">{client}</p>
              <p className="whitespace-pre-line text-gray-500">{clientInfo}</p>
            </div>
            <div className="text-right text-gray-500">
              <p className="text-xs font-semibold uppercase text-gray-400">Details</p>
              <p>Issue date: {issueDate}</p>
              <p>Due date: {dueDate}</p>
            </div>
          </div>

          <table className="mt-8 w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 text-left text-xs text-gray-500">
                <th className="pb-2">Description</th>
                <th className="pb-2 text-center">Qty</th>
                <th className="pb-2 text-right">Rate</th>
                <th className="pb-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l) => (
                <tr key={l.id} className="border-b border-gray-100">
                  <td className="py-2 text-gray-800">{l.desc}</td>
                  <td className="py-2 text-center text-gray-600">{l.qty}</td>
                  <td className="py-2 text-right text-gray-600">{currency}{(parseFloat(l.rate) || 0).toFixed(2)}</td>
                  <td className="py-2 text-right text-gray-800">{currency}{((parseFloat(l.rate) || 0) * l.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 ml-auto w-64 space-y-1 text-sm">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{currency}{fmt(subtotal)}</span></div>
            <div className="flex justify-between text-gray-600"><span>Tax ({taxRate}%)</span><span>{currency}{fmt(tax)}</span></div>
            <div className="flex justify-between border-t border-gray-300 pt-1 text-base font-bold text-gray-900"><span>Total</span><span>{currency}{fmt(total)}</span></div>
          </div>

          {notes && (
            <div className="mt-8 border-t border-gray-200 pt-3 text-xs text-gray-500">
              <p className="font-semibold text-gray-400">Notes</p>
              <p>{notes}</p>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Everything runs locally in your browser. Nothing is uploaded or stored.
      </p>

      <AdGate
        onAction={download}
        buttonLabel="Download PDF"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
      >
        Download PDF
      </AdGate>
    </div>
  );
}