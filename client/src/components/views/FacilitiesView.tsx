import { toast } from "sonner";
import { Building2, Check } from "lucide-react";
import { SectionHeading, StatusTag } from "@/components/primitives";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { facilities } from "@/lib/societyData";

export function FacilitiesView() {
  const [booked, setBooked] = useLocalStorage<string[]>("facility-bookings", []);

  return (
    <div>
      <SectionHeading eyebrow="Shared spaces" title="Book the good spaces" detail="See availability, understand the rules, and reserve a slot without another message thread." />
      <div className="grid gap-5 sm:grid-cols-2">
        {facilities.map((facility) => {
          const isBooked = booked.includes(facility.id);
          return (
            <article key={facility.id} className="surface group overflow-hidden p-5">
              <div className="flex items-start justify-between">
                <span className={`tone-${facility.color} grid h-11 w-11 place-items-center rounded-xl`}><Building2 size={20} /></span>
                <StatusTag tone={facility.color}>{facility.tag}</StatusTag>
              </div>
              <h2 className="display-font mt-6 text-2xl font-semibold tracking-[-.03em]">{facility.name}</h2>
              <p className="mt-2 text-sm text-[#667184]">{facility.detail}</p>
              <div className="mt-6 flex items-center justify-between border-t border-[#edf0f4] pt-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.1em] text-[#9aa4b2]">Availability</p>
                  <p className="mt-1 text-sm font-semibold text-[#344054]">{facility.next}</p>
                </div>
                <button
                  onClick={() => {
                    if (isBooked) {
                      setBooked((current) => current.filter((id) => id !== facility.id));
                      toast("Booking released.");
                    } else {
                      setBooked((current) => [...current, facility.id]);
                      toast(`${facility.name} booked for today at 6:00 PM.`);
                    }
                  }}
                  className={`rounded-lg px-3 py-2 text-xs font-bold ${isBooked ? "bg-[#e4f5ee] text-[#28785a]" : "bg-[#295CFF] text-white"}`}
                >
                  {isBooked ? <span className="flex items-center gap-1"><Check size={14} />Booked</span> : "Book slot"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <div className="surface mt-6 flex flex-col gap-5 overflow-hidden p-6 md:flex-row md:items-center">
        <img src="/manus-storage/societyconnect-courtyard_7c5c2181.jpg" alt="Shared courtyard with a noticeboard" className="h-48 w-full rounded-xl object-cover md:h-36 md:w-64" />
        <div>
          <p className="eyebrow">A better shared routine</p>
          <h2 className="display-font mt-2 text-2xl font-semibold tracking-[-.03em]">Leave spaces ready for the next neighbor.</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#667184]">Booking history, time slots, and simple handover notes make shared spaces easier for everyone to use.</p>
        </div>
      </div>
    </div>
  );
}
