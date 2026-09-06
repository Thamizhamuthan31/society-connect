import { useState } from "react";
import { toast } from "sonner";
import { Check, Plus, ScanLine, ShieldCheck } from "lucide-react";
import { Button, SectionHeading } from "@/components/primitives";

export function VisitorsView() {
  const [submitted, setSubmitted] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [visitDate, setVisitDate] = useState(() => new Date().toISOString().slice(0, 10));

  return (
    <div>
      <SectionHeading eyebrow="Visitor management" title="Make arrivals easier" detail="Create a clear, time-bound visitor pass that the security desk can recognize without a long call chain." />
      <div className="grid gap-5 lg:grid-cols-[1fr_.78fr]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!visitorName.trim()) { toast("Enter the visitor’s name first."); return; }
            setSubmitted(true);
            toast("Visitor pass created for this demo.");
          }}
          className="surface p-6 md:p-8"
        >
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e4f5ee] text-[#28785a]"><ScanLine size={22} /></div>
          <h2 className="display-font mt-6 text-3xl font-semibold tracking-[-.04em]">Create a visitor pass</h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-[#667184]">Share only what the security desk needs. The pass expires after the selected visit date.</p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="eyebrow">Visitor name</span>
              <input value={visitorName} onChange={(event) => setVisitorName(event.target.value)} className="mt-2 w-full rounded-lg border border-[#d8dee8] bg-white px-3.5 py-3 text-sm outline-none transition focus:border-[#295CFF]" placeholder="e.g. Priya Shah" />
            </label>
            <label>
              <span className="eyebrow">Visit date</span>
              <input type="date" value={visitDate} onChange={(event) => setVisitDate(event.target.value)} className="mt-2 w-full rounded-lg border border-[#d8dee8] bg-white px-3.5 py-3 text-sm outline-none transition focus:border-[#295CFF]" />
            </label>
            <label>
              <span className="eyebrow">Purpose</span>
              <select className="mt-2 w-full rounded-lg border border-[#d8dee8] bg-white px-3.5 py-3 text-sm outline-none transition focus:border-[#295CFF]">
                <option>Personal visit</option>
                <option>Delivery</option>
                <option>Home service</option>
              </select>
            </label>
          </div>
          <div className="mt-7 flex items-center justify-between border-t border-[#edf0f4] pt-5">
            <p className="max-w-[240px] text-xs leading-5 text-[#8d97a7]">A real app would securely sync this pass with the security role.</p>
            <Button type="submit">{submitted ? <><Check size={15} />Pass created</> : <><Plus size={16} />Create pass</>}</Button>
          </div>
        </form>
        <div className="surface-dark grain p-6 text-white">
          <p className="eyebrow text-white/45">Pass preview</p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[.06] p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.12em] text-white/45">Willow Creek</p>
                <p className="display-font mt-2 text-2xl font-semibold">{visitorName || "Visitor name"}</p>
              </div>
              <ShieldCheck className="text-[#8ba5ff]" size={23} />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-5 border-t border-white/10 pt-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.1em] text-white/40">Valid on</p>
                <p className="mt-1 text-sm font-semibold text-white/85">{visitDate || "Select date"}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.1em] text-white/40">Host</p>
                <p className="mt-1 text-sm font-semibold text-white/85">Thamizhamuthan · A-204</p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm leading-6 text-white/55">Good visitor management is less about friction and more about confidence at the gate.</p>
        </div>
      </div>
    </div>
  );
}
