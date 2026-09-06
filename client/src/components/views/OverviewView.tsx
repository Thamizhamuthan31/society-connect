import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, BarChart3, Building2, ChevronRight, MoreHorizontal, Plus, ScanLine, Settings2, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { Avatar, Button, StatusTag } from "@/components/primitives";
import { announcements, chartData, type ViewKey } from "@/lib/societyData";

const greetingForHour = (hour: number) => (hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening");

export function OverviewView({ onNavigate, onCreateRequest }: { onNavigate: (key: ViewKey) => void; onCreateRequest: () => void }) {
  const [selectedQuickAction, setSelectedQuickAction] = useState<string | null>(null);
  const now = new Date();
  const dateLabel = now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">{dateLabel}</p>
          <h1 className="display-font mt-2 text-[clamp(32px,4vw,54px)] font-semibold leading-none tracking-[-.05em] text-[#121722]">{greetingForHour(now.getHours())}, Thamizhamuthan.</h1>
          <p className="mt-3 text-sm leading-6 text-[#667184]">Here’s what is moving in <span className="font-semibold text-[#344054]">Willow Creek Society</span> today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => toast("Your household profile is already up to date.")}><Settings2 size={16} />Profile</Button>
          <Button onClick={onCreateRequest}><Plus size={17} />New request</Button>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.3fr_.7fr]">
        <div className="surface-dark grain overflow-hidden p-6 text-white md:p-8">
          <div className="relative z-10 flex min-h-[270px] flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <div>
                <StatusTag tone="blue"><Sparkles size={13} />Community pulse</StatusTag>
                <h2 className="display-font mt-5 max-w-[540px] text-3xl font-semibold leading-[1.06] tracking-[-.035em] md:text-[42px]">Keep the neighborhood in step.</h2>
                <p className="mt-4 max-w-[510px] text-sm leading-6 text-white/60">The committee has kept the basics moving. You have three actions waiting for your attention this week.</p>
              </div>
              <div className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5 sm:grid"><ShieldCheck size={25} className="text-[#8ba5ff]" /></div>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <div><p className="text-3xl font-semibold tracking-[-.04em]">84%</p><p className="mt-1 text-xs text-white/50">requests resolved this month</p></div>
              <div className="h-10 w-px bg-white/10" />
              <div><p className="text-3xl font-semibold tracking-[-.04em]">18</p><p className="mt-1 text-xs text-white/50">neighbors attending events</p></div>
              <button onClick={() => onNavigate("requests")} className="group ml-auto inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white">View activity <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></button>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-20 -top-20 hidden h-72 w-72 rounded-full border border-[#295CFF]/40 sm:block" />
          <div className="pointer-events-none absolute -right-10 top-2 hidden h-56 w-56 rounded-full border border-[#F4B24F]/20 sm:block" />
        </div>
        <div className="surface flex flex-col justify-between p-6">
          <div className="flex items-start justify-between"><div><p className="eyebrow">Your next step</p><h2 className="display-font mt-2 text-2xl font-semibold tracking-[-.03em]">Cast your vote</h2></div><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff2da] text-[#9a681d]"><BarChart3 size={19} /></div></div>
          <p className="mt-7 text-sm leading-6 text-[#667184]">Which community workshop should we host next? Your vote helps the committee plan the next shared session.</p>
          <div className="mt-6 flex items-center justify-between border-t border-[#edf0f4] pt-5"><div className="flex -space-x-2"><Avatar initials="MN" color="amber" size="sm" /><Avatar initials="SI" color="blue" size="sm" /><Avatar initials="RK" color="mint" size="sm" /><span className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#eef1f6] text-[10px] font-bold text-[#667184]">+65</span></div><Button variant="quiet" onClick={() => onNavigate("polls")}>Open poll <ChevronRight size={15} /></Button></div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {[
          { label: "Report an issue", detail: "Something needs attention?", icon: Wrench, tone: "blue", key: "request" },
          { label: "Invite a visitor", detail: "Create a temporary pass", icon: ScanLine, tone: "mint", key: "visitor" },
          { label: "Book a facility", detail: "Find an open time slot", icon: Building2, tone: "amber", key: "facility" },
        ].map((item) => {
          const IconComponent = item.icon;
          const isSelected = selectedQuickAction === item.key;
          return <button key={item.key} onClick={() => { setSelectedQuickAction(item.key); if (item.key === "request") onCreateRequest(); else if (item.key === "visitor") onNavigate("visitors"); else onNavigate("facilities"); }} className={`surface group flex items-center gap-4 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(18,23,34,.08)] ${isSelected ? "ring-2 ring-[#295CFF]/20" : ""}`}><span className={`tone-${item.tone} grid h-11 w-11 shrink-0 place-items-center rounded-xl`}><IconComponent size={20} /></span><span className="min-w-0"><span className="block text-sm font-bold text-[#121722]">{item.label}</span><span className="mt-1 block text-xs text-[#667184]">{item.detail}</span></span><ChevronRight size={17} className="ml-auto text-[#9da7b7] transition group-hover:translate-x-0.5 group-hover:text-[#295CFF]" /></button>;
        })}
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.18fr_.82fr]">
        <div className="surface overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#edf0f4] px-6 py-5"><div><p className="eyebrow">Notice board</p><h2 className="display-font mt-1 text-2xl font-semibold tracking-[-.03em]">The latest from around here</h2></div><button onClick={() => onNavigate("announcements")} className="text-sm font-bold text-[#295CFF] hover:text-[#1e4be5]">See all</button></div>
          <div className="divide-y divide-[#edf0f4]">{announcements.slice(0, 3).map((item) => <button key={item.id} onClick={() => onNavigate("announcements")} className="group flex w-full gap-4 p-6 text-left transition hover:bg-[#fafbfc]"><span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.tone === "amber" ? "bg-[#E8A23A]" : item.tone === "mint" ? "bg-[#4BAF86]" : "bg-[#295CFF]"}`} /><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><span className="text-sm font-bold text-[#121722] group-hover:text-[#295CFF]">{item.title}</span>{item.pinned && <StatusTag tone="amber">Pinned</StatusTag>}</span><span className="mt-1 block line-clamp-2 text-sm leading-6 text-[#667184]">{item.detail}</span><span className="mt-3 block text-xs font-semibold text-[#9aa4b2]">{item.category} · {item.date}</span></span><ArrowUpRight size={16} className="mt-1 shrink-0 text-[#b0b8c5] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#295CFF]" /></button>)}</div>
        </div>
        <div className="surface p-6">
          <div className="flex items-start justify-between"><div><p className="eyebrow">Community activity</p><h2 className="display-font mt-1 text-2xl font-semibold tracking-[-.03em]">A steady week</h2></div><button onClick={() => onNavigate("requests")} className="text-[#8d97a7] hover:text-[#295CFF]"><MoreHorizontal size={20} /></button></div>
          <div className="mt-7 flex h-28 items-end gap-2">{chartData.map((value, index) => <div key={value + index} className="flex h-full flex-1 items-end"><div className="chart-bar w-full rounded-t-[5px] bg-gradient-to-t from-[#295CFF] to-[#86a0ff]" style={{ height: `${value}%`, animationDelay: `${index * 35}ms` }} /></div>)}</div>
          <div className="mt-3 flex justify-between text-[10px] font-semibold uppercase tracking-[.12em] text-[#a0a9b7]"><span>Jun 01</span><span>Jun 18</span></div>
          <div className="mt-6 border-t border-[#edf0f4] pt-5"><div className="flex items-center gap-2 text-sm font-semibold text-[#344054]"><span className="status-dot blue" /> 26 activities this month</div><p className="mt-2 text-xs leading-5 text-[#8893a3]">Most activity is happening in service requests and events.</p></div>
        </div>
      </div>
    </div>
  );
}
