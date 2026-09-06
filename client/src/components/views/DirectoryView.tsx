import { useState } from "react";
import { toast } from "sonner";
import { MessageSquareText, Plus, Search } from "lucide-react";
import { Avatar, Button, SectionHeading } from "@/components/primitives";
import { residents } from "@/lib/societyData";

export function DirectoryView() {
  const [query, setQuery] = useState("");
  const filtered = residents.filter((resident) => `${resident.name} ${resident.unit} ${resident.role}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <SectionHeading
        eyebrow="Resident directory"
        title="Know who’s around"
        detail="A searchable, privacy-minded directory for the people who make Willow Creek work."
        action={<Button onClick={() => toast("Demo mode: invite flow is ready for backend integration.")}><Plus size={16} />Invite resident</Button>}
      />
      <div className="surface mb-5 flex items-center gap-3 px-4 py-3">
        <Search size={18} className="text-[#9ba5b4]" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, unit, or role" className="w-full bg-transparent text-sm outline-none placeholder:text-[#9ba5b4]" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((resident) => (
          <article key={resident.name} className="surface flex items-center gap-4 p-5">
            <Avatar initials={resident.initials} color={resident.color} size="lg" />
            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-[#121722]">{resident.name}</h2>
              <p className="mt-1 text-xs text-[#667184]">{resident.unit}</p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[.1em] text-[#9aa4b2]">{resident.role}</p>
            </div>
            <button onClick={() => toast(`A production app would open a safe contact action for ${resident.name}.`)} className="ml-auto text-[#9da7b7] hover:text-[#295CFF]"><MessageSquareText size={17} /></button>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="surface col-span-full p-12 text-center text-sm text-[#8d97a7]">No one matches that search yet.</div>
        )}
      </div>
    </div>
  );
}
