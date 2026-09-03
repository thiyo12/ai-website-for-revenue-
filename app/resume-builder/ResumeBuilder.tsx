"use client";

import { useRef, useState } from "react";
import PaywallModal from "@/components/PaywallModal";
import AdGate from "@/components/AdGate";
import { exportElementAsPdf } from "@/lib/exportPdf";

interface Job {
  id: number;
  title: string;
  company: string;
  period: string;
  desc: string;
}
interface Edu {
  id: number;
  school: string;
  degree: string;
  period: string;
}

let jobId = 0;
let eduId = 0;

export default function ResumeBuilder() {
  const [name, setName] = useState("Alex Carter");
  const [title, setTitle] = useState("Frontend Developer");
  const [email, setEmail] = useState("alex@example.com");
  const [phone, setPhone] = useState("+1 (555) 010-2030");
  const [location, setLocation] = useState("Austin, TX");
  const [summary, setSummary] = useState("Creative frontend developer with 5+ years of experience building fast, accessible web applications. Passionate about clean code and great user experiences.");
  const [theme, setTheme] = useState("#2563eb");
  const [skills, setSkills] = useState("JavaScript, TypeScript, React, Next.js, Tailwind CSS, Git");
  const [jobs, setJobs] = useState<Job[]>([
    { id: jobId++, title: "Frontend Developer", company: "Acme Studio", period: "2022 — Present", desc: "Built and shipped React/Next.js interfaces used by 100k+ users." },
  ]);
  const [edus, setEdus] = useState<Edu[]>([
    { id: eduId++, school: "State University", degree: "BSc Computer Science", period: "2015 — 2019" },
  ]);

  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobCompany, setNewJobCompany] = useState("");
  const [newJobPeriod, setNewJobPeriod] = useState("");
  const [newJobDesc, setNewJobDesc] = useState("");
  const [newSchool, setNewSchool] = useState("");
  const [newDegree, setNewDegree] = useState("");
  const [newEduPeriod, setNewEduPeriod] = useState("");

  const renderRef = useRef<HTMLDivElement>(null);

  const addJob = () => {
    if (!newJobTitle.trim()) return;
    setJobs((l) => [...l, { id: jobId++, title: newJobTitle, company: newJobCompany, period: newJobPeriod, desc: newJobDesc }]);
    setNewJobTitle(""); setNewJobCompany(""); setNewJobPeriod(""); setNewJobDesc("");
  };
  const addEdu = () => {
    if (!newDegree.trim()) return;
    setEdus((l) => [...l, { id: eduId++, school: newSchool, degree: newDegree, period: newEduPeriod }]);
    setNewSchool(""); setNewDegree(""); setNewEduPeriod("");
  };

  const download = () => exportElementAsPdf(renderRef.current, "resume.pdf", 2);

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Personal & summary</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div><label className="mb-1 block text-sm font-medium text-gray-700">Full name</label><input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-sm font-medium text-gray-700">Job title</label><input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-sm font-medium text-gray-700">Email</label><input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-sm font-medium text-gray-700">Phone</label><input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-sm font-medium text-gray-700">Location</label><input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-sm font-medium text-gray-700">Accent color</label><input type="color" value={theme} onChange={(e) => setTheme(e.target.value)} className="h-9 w-full rounded-lg border border-gray-300" /></div>
          <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium text-gray-700">Professional summary</label><textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={2} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" /></div>
          <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium text-gray-700">Skills (comma separated)</label><input value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" /></div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Work experience</h2>
        <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-4">
          <input value={newJobTitle} onChange={(e) => setNewJobTitle(e.target.value)} placeholder="Title" className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          <input value={newJobCompany} onChange={(e) => setNewJobCompany(e.target.value)} placeholder="Company" className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          <input value={newJobPeriod} onChange={(e) => setNewJobPeriod(e.target.value)} placeholder="Period" className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          <button type="button" onClick={addJob} className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-700">Add</button>
        </div>
        <input value={newJobDesc} onChange={(e) => setNewJobDesc(e.target.value)} placeholder="Description" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
        <div className="mt-3 flex flex-wrap gap-2">
          {jobs.map((j) => (
            <button key={j.id} type="button" onClick={() => setJobs((l) => l.filter((x) => x.id !== j.id))} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-red-100 hover:text-red-600">
              {j.title} @ {j.company} ✕
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Education</h2>
        <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-4">
          <input value={newDegree} onChange={(e) => setNewDegree(e.target.value)} placeholder="Degree" className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          <input value={newSchool} onChange={(e) => setNewSchool(e.target.value)} placeholder="School" className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          <input value={newEduPeriod} onChange={(e) => setNewEduPeriod(e.target.value)} placeholder="Period" className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          <button type="button" onClick={addEdu} className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-700">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {edus.map((e) => (
            <button key={e.id} type="button" onClick={() => setEdus((l) => l.filter((x) => x.id !== e.id))} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-red-100 hover:text-red-600">
              {e.degree} @ {e.school} ✕
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-xl border border-gray-200 bg-gray-100 p-4">
        <div ref={renderRef} className="mx-auto w-full max-w-[800px] rounded-lg bg-white p-10 shadow-sm">
          <div className="border-b-4 pb-3" style={{ borderColor: theme }}>
            <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
            <p className="text-sm" style={{ color: theme }}>{title}</p>
            <p className="mt-1 text-xs text-gray-500">{email} · {phone} · {location}</p>
          </div>
          <div className="mt-4 text-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide" style={{ color: theme }}>Summary</h2>
            <p className="mt-1 text-gray-700">{summary}</p>
          </div>
          <div className="mt-4 text-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide" style={{ color: theme }}>Experience</h2>
            {jobs.map((j) => (
              <div key={j.id} className="mt-2">
                <p className="font-semibold text-gray-800">{j.title} — <span className="font-normal">{j.company}</span></p>
                <p className="text-xs text-gray-500">{j.period}</p>
                {j.desc && <p className="mt-0.5 text-gray-600">{j.desc}</p>}
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide" style={{ color: theme }}>Education</h2>
            {edus.map((e) => (
              <div key={e.id} className="mt-2">
                <p className="font-semibold text-gray-800">{e.degree} — <span className="font-normal">{e.school}</span></p>
                <p className="text-xs text-gray-500">{e.period}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide" style={{ color: theme }}>Skills</h2>
            <p className="mt-1 text-gray-700">{skills}</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Everything runs locally in your browser. Your personal information never
        leaves your device.
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