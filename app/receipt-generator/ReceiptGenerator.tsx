"use client";

import { useRef, useState } from "react";
import PaywallModal from "@/components/PaywallModal";
import AdGate from "@/components/AdGate";
import { exportElementAsPng } from "@/lib/exportImage";

interface Item {
  id: number;
  name: string;
  qty: number;
  price: string;
}

let itemId = 0;

export default function ReceiptGenerator() {
  const [store, setStore] = useState("Corner Mart");
  const [address, setAddress] = useState("123 Main Street, Springfield");
  const [date, setDate] = useState("Aug 4, 2026 9:41 AM");
  const [receiptNo, setReceiptNo] = useState("R-1042");
  const [payment, setPayment] = useState("VISA •••• 4242");
  const [taxRate, setTaxRate] = useState("7.25");
  const [items, setItems] = useState<Item[]>([
    { id: itemId++, name: "Coffee", qty: 2, price: "3.50" },
    { id: itemId++, name: "Sandwich", qty: 1, price: "8.99" },
  ]);
  const [newName, setNewName] = useState("");
  const [newQty, setNewQty] = useState(1);
  const [newPrice, setNewPrice] = useState("");
  const renderRef = useRef<HTMLDivElement>(null);

  const addItem = () => {
    const p = parseFloat(newPrice);
    if (!newName.trim() || isNaN(p)) return;
    setItems((list) => [...list, { id: itemId++, name: newName.trim(), qty: Math.max(1, newQty), price: newPrice }]);
    setNewName("");
    setNewQty(1);
    setNewPrice("");
  };

  const subtotal = items.reduce((s, it) => s + (parseFloat(it.price) || 0) * it.qty, 0);
  const tax = subtotal * (parseFloat(taxRate) || 0) / 100;
  const total = subtotal + tax;

  const fmt = (n: number) => n.toFixed(2);

  const download = () => exportElementAsPng(renderRef.current, "receipt.png", 2);

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Store & receipt</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Store name</label>
            <input value={store} onChange={(e) => setStore(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Date</label>
            <input value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Receipt no.</label>
            <input value={receiptNo} onChange={(e) => setReceiptNo(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Payment method</label>
            <input value={payment} onChange={(e) => setPayment(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tax rate (%)</label>
            <input value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Line items</h2>
        <div className="mb-3 flex flex-col gap-2 sm:flex-row">
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Item name" className="w-full flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          <input type="number" value={newQty} onChange={(e) => setNewQty(parseInt(e.target.value) || 1)} placeholder="Qty" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm sm:w-20" />
          <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="Price" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm sm:w-28" />
          <button type="button" onClick={addItem} className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-700">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((it) => (
            <button key={it.id} type="button" onClick={() => setItems((list) => list.filter((x) => x.id !== it.id))} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-red-100 hover:text-red-600">
              {it.name} ×{it.qty} — ${fmt(parseFloat(it.price) || 0)} ✕
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div ref={renderRef} className="mx-auto w-full max-w-sm rounded-sm bg-white p-5 shadow-sm">
          {/* thermal receipt look */}
          <div className="mx-auto w-full text-center">
            <p className="text-base font-bold text-gray-900">{store}</p>
            <p className="text-xs text-gray-500">{address}</p>
            <p className="mt-1 text-xs text-gray-500">{date}</p>
            <p className="text-xs text-gray-500">RECEIPT #{receiptNo}</p>
          </div>
          <div className="mt-3 border-t border-dashed border-gray-300 pt-2" />
          {items.map((it) => {
            const p = parseFloat(it.price) || 0;
            return (
              <div key={it.id} className="flex justify-between text-sm text-gray-800">
                <span>{it.name} ×{it.qty}</span>
                <span>${fmt(p * it.qty)}</span>
              </div>
            );
          })}
          <div className="mt-2 border-t border-dashed border-gray-300 pt-2" />
          <div className="flex justify-between text-sm text-gray-700">
            <span>Subtotal</span>
            <span>${fmt(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Tax ({taxRate}%)</span>
            <span>${fmt(tax)}</span>
          </div>
          <div className="flex justify-between border-t border-gray-300 pt-1 text-base font-bold text-gray-900">
            <span>TOTAL</span>
            <span>${fmt(total)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>Paid by</span>
            <span>{payment}</span>
          </div>
          <div className="mt-4 border-t border-dashed border-gray-300 pt-2 text-center text-xs text-gray-500">
            <p>Thank you for your visit!</p>
            <p className="mt-1 text-[10px] uppercase tracking-wide">
              Sample — not a valid receipt
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        This is a sample receipt and{" "}
        <strong>is not a valid receipt or proof of purchase</strong>. It must
        not be used for reimbursement, tax, warranty, or refund claims. See our{" "}
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