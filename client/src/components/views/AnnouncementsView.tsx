import { useState } from "react";
import { toast } from "sonner";
import { CircleHelp, Plus, Search } from "lucide-react";
import { Button, SectionHeading, StatusTag } from "@/components/primitives";
import { announcements } from "@/lib/societyData";

export function AnnouncementsView() {
  const [query, setQuery] = useState("");
  const filtered = announcements.filter((item) => `${item.title} ${item.detail} ${item.category}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <SectionHeading
        eyebrow="Digital notice board"
        title="What’s happening nearby"
        detail="One calm, searchable place for the notices that affect your home and the community around it."
        action={<Button onClick={() => toast("Demo mode: committee publishing is connected to this frontend flow.")}><Plus size={16} />Post notice</Button>}
      />
      <div className="surface mb-5 flex items-center gap-3 px-4 py-3">
        <Search size={18} className="text-[#9ba5b4]" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notices, topics, or categories" className="w-full bg-transparent text-sm outline-none placeholder:text-[#9ba5b4]" />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {filtered.map((item) => (
          <article key={item.id} className="surface flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between gap-3">
                <StatusTag tone={item.tone}>{item.category}</StatusTag>
                {item.pinned && <span className="text-xs font-bold text-[#a07122]">Pinned</span>}
              </div>
              <h2 className="display-font mt-5 text-2xl font-semibold leading-tight tracking-[-.03em]">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#667184]">{item.detail}</p>
            </div>
            <div className="mt-7 flex items-center justify-between border-t border-[#edf0f4] pt-4 text-xs font-semibold text-[#97a1b0]">
              <span>{item.date}</span>
              <button onClick={() => toast("Notice saved to your reading list.")} className="font-bold text-[#295CFF]">Save for later</button>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="surface col-span-full p-12 text-center">
            <CircleHelp className="mx-auto text-[#9da7b7]" />
            <h2 className="display-font mt-4 text-xl font-semibold">No notices match that search</h2>
            <p className="mt-2 text-sm text-[#667184]">Try a broader keyword such as “maintenance” or “event”.</p>
          </div>
        )}
      </div>
    </div>
  );
}
