import { useState } from "react";
import { toast } from "sonner";
import { ChevronRight, Plus } from "lucide-react";
import { Button, SectionHeading, StatusTag } from "@/components/primitives";
import type { ServiceRequest } from "@/lib/societyData";

export function RequestsView({ requests, onAdd }: { requests: ServiceRequest[]; onAdd: () => void }) {
  const [filter, setFilter] = useState<"All" | ServiceRequest["status"]>("All");
  const visible = filter === "All" ? requests : requests.filter((item) => item.status === filter);

  return (
    <div>
      <SectionHeading
        eyebrow="Service desk"
        title="Requests, without the chasing"
        detail="Track the small fixes that keep a shared home working well. Every request has an owner, a status, and a next step."
        action={<Button onClick={onAdd}><Plus size={16} />New request</Button>}
      />
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {["All", "Open", "In progress", "Resolved"].map((item) => (
            <button key={item} onClick={() => setFilter(item as typeof filter)} className={`rounded-lg px-3 py-2 text-xs font-bold transition ${filter === item ? "bg-[#121722] text-white" : "bg-white text-[#667184] hover:bg-[#e9edf3]"}`}>{item}</button>
          ))}
        </div>
        <p className="text-xs font-semibold text-[#8d97a7]">{visible.length} of {requests.length} requests</p>
      </div>
      <div className="surface overflow-hidden">
        <div className="hidden grid-cols-[1.3fr_.8fr_.8fr_.7fr_.2fr] gap-4 border-b border-[#edf0f4] bg-[#fafbfc] px-6 py-4 text-[10px] font-bold uppercase tracking-[.12em] text-[#8d97a7] md:grid">
          <span>Request</span><span>Location</span><span>Created</span><span>Status</span><span />
        </div>
        <div className="divide-y divide-[#edf0f4]">
          {visible.map((item) => (
            <div key={item.id} className="grid gap-3 px-6 py-5 md:grid-cols-[1.3fr_.8fr_.8fr_.7fr_.2fr] md:items-center md:gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-[#121722]">{item.title}</p>
                  <span className={`status-dot ${item.priority === "High" ? "rose" : "blue"}`} />
                </div>
                <p className="mt-1 text-xs text-[#8d97a7]">{item.id} · {item.category} · {item.priority} priority</p>
              </div>
              <p className="text-sm text-[#667184]">{item.location}</p>
              <p className="text-sm text-[#667184]">{item.created}</p>
              <div><StatusTag tone={item.status === "Resolved" ? "mint" : item.status === "In progress" ? "amber" : "blue"}>{item.status}</StatusTag></div>
              <button onClick={() => toast(`${item.id} is selected. A production app would open its detail timeline.`)} className="text-[#9da7b7] hover:text-[#295CFF]"><ChevronRight size={18} /></button>
            </div>
          ))}
          {visible.length === 0 && (
            <div className="p-12 text-center text-sm text-[#8d97a7]">No requests in this status yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
