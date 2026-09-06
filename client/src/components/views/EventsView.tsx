import { toast } from "sonner";
import { MoreHorizontal, Plus, Users } from "lucide-react";
import { Button, SectionHeading } from "@/components/primitives";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { events } from "@/lib/societyData";

export function EventsView() {
  const [rsvps, setRsvps] = useLocalStorage<string[]>("event-rsvps", ["event-1"]);

  return (
    <div>
      <SectionHeading
        eyebrow="Community calendar"
        title="Time well spent together"
        detail="A lightweight calendar for the moments that make a residential society feel like a neighborhood."
        action={<Button onClick={() => toast("Demo mode: event creation would open for committee members.")}><Plus size={16} />Create event</Button>}
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {events.map((event) => {
          const joined = rsvps.includes(event.id);
          return (
            <article key={event.id} className="surface overflow-hidden">
              <div className={`h-2 ${event.color === "blue" ? "bg-[#295CFF]" : event.color === "amber" ? "bg-[#E8A23A]" : "bg-[#4BAF86]"}`} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-xl bg-[#f0f2f5] text-center">
                    <span className="block text-[10px] font-bold tracking-[.12em] text-[#8d97a7]">{event.month}</span>
                    <span className="display-font -mt-1 block text-2xl font-semibold leading-none">{event.day}</span>
                  </div>
                  <button onClick={() => toast("Event options are available to committee members in production.")} className="text-[#9da7b7] hover:text-[#295CFF]"><MoreHorizontal size={20} /></button>
                </div>
                <h2 className="display-font mt-6 text-2xl font-semibold tracking-[-.03em]">{event.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#667184]">{event.meta}</p>
                <div className="mt-6 flex items-center justify-between border-t border-[#edf0f4] pt-5">
                  <span className="flex items-center gap-2 text-xs font-semibold text-[#8d97a7]"><Users size={15} />{event.people} going</span>
                  <button
                    onClick={() => {
                      setRsvps((current) => (joined ? current.filter((id) => id !== event.id) : [...current, event.id]));
                      toast(joined ? "RSVP removed." : "You’re on the list.");
                    }}
                    className={`rounded-lg px-3 py-2 text-xs font-bold ${joined ? "bg-[#e4f5ee] text-[#28785a]" : "bg-[#121722] text-white"}`}
                  >
                    {joined ? "Going" : "RSVP"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="surface mt-6 grid gap-5 p-6 md:grid-cols-[1fr_.8fr] md:items-center">
        <div>
          <p className="eyebrow">Community note</p>
          <h2 className="display-font mt-2 text-2xl font-semibold tracking-[-.03em]">Small invitations compound.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#667184]">The best events are easy to discover, have a clear time and place, and give people a comfortable way to say yes.</p>
        </div>
        <img src="/manus-storage/societyconnect-event_7d17e496.jpg" alt="Warm evening community gathering" className="h-40 w-full rounded-xl object-cover" />
      </div>
    </div>
  );
}
