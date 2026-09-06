// Civic Signal style: the primary SocietyConnect workspace combines an asymmetric navigation rail, editorial headers, calm status language, and clear resident actions.
// This file owns the app shell (sidebar, header, routing between views, and the
// new-request modal). Each feature screen lives in components/views/ so it can
// be read, tested, and changed independently of the others.

import { useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Bell, CircleHelp, Menu, MoreHorizontal, Send, Settings2, X } from "lucide-react";
import { Avatar, BrandMark, Button, Icon, iconMap } from "@/components/primitives";
import { AnnouncementsView } from "@/components/views/AnnouncementsView";
import { DirectoryView } from "@/components/views/DirectoryView";
import { EventsView } from "@/components/views/EventsView";
import { FacilitiesView } from "@/components/views/FacilitiesView";
import { OverviewView } from "@/components/views/OverviewView";
import { PollsView } from "@/components/views/PollsView";
import { RequestsView } from "@/components/views/RequestsView";
import { VisitorsView } from "@/components/views/VisitorsView";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { navigation, seedRequests, type ServiceRequest, type ViewKey } from "@/lib/societyData";

export default function Home() {
  const [activeView, setActiveView] = useState<ViewKey>("overview");
  const [requests, setRequests] = useLocalStorage<ServiceRequest[]>("service-requests", seedRequests);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestTitle, setRequestTitle] = useState("");
  const [requestCategory, setRequestCategory] = useState("Maintenance");
  const currentLabel = navigation.find((item) => item.key === activeView)?.label ?? "Overview";

  const openCreateRequest = () => {
    setShowRequestModal(true);
    setMobileOpen(false);
  };

  const submitRequest = (event: FormEvent) => {
    event.preventDefault();
    if (!requestTitle.trim()) {
      toast("Add a short title so the team knows what to look for.");
      return;
    }
    setRequests((current) => [
      { id: `SR-${204 + current.length + 1}`, title: requestTitle, category: requestCategory, location: "Tower A · Flat 204", created: "Just now", status: "Open", priority: "Normal" },
      ...current,
    ]);
    setShowRequestModal(false);
    setRequestTitle("");
    toast("Request added to your service desk.");
    setActiveView("requests");
  };

  const content = useMemo(() => {
    switch (activeView) {
      case "announcements": return <AnnouncementsView />;
      case "requests": return <RequestsView requests={requests} onAdd={openCreateRequest} />;
      case "events": return <EventsView />;
      case "facilities": return <FacilitiesView />;
      case "directory": return <DirectoryView />;
      case "polls": return <PollsView />;
      case "visitors": return <VisitorsView />;
      default: return <OverviewView onNavigate={(key) => setActiveView(key)} onCreateRequest={openCreateRequest} />;
    }
  }, [activeView, requests]);

  return (
    <div className="app-shell min-h-screen lg:flex">
      <aside className={`desktop-sidebar ink-sidebar fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col px-4 py-6 lg:static ${mobileOpen ? "flex" : "hidden lg:flex"}`}>
        <div className="px-3"><BrandMark /></div>
        <div className="mt-12 px-3">
          <p className="eyebrow text-white/35">Your workspace</p>
          <p className="mt-2 text-sm font-semibold text-white/85">Willow Creek Society</p>
          <p className="mt-1 text-xs text-white/40">Tower A · Flat 204</p>
        </div>
        <nav className="mt-8 flex-1 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveView(item.key); setMobileOpen(false); }}
              className={`nav-item flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold ${activeView === item.key ? "active" : "text-white/60 hover:text-white"}`}
            >
              <Icon name={item.icon as keyof typeof iconMap} size={17} />
              <span>{item.label}</span>
              {item.key === "requests" && <span className="ml-auto rounded-full bg-[#e8a23a] px-1.5 py-0.5 text-[10px] font-bold text-[#3c2a0e]">2</span>}
            </button>
          ))}
        </nav>
        <div className="mt-8 border-t border-white/10 pt-5">
          <button onClick={() => toast("Help center is ready for your backend integration.")} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-white/55 transition hover:bg-white/8 hover:text-white"><CircleHelp size={17} />Help center</button>
          <button onClick={() => toast("Demo profile settings opened.")} className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-white/55 transition hover:bg-white/8 hover:text-white"><Settings2 size={17} />Settings</button>
          <div className="mt-5 flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <Avatar initials="TH" color="blue" size="sm" />
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-white/85">Thamizhamuthan</p>
              <p className="mt-0.5 text-[10px] text-white/40">Resident account</p>
            </div>
            <button onClick={() => toast("Signed in as the demo resident Thamizhamuthan.")} className="ml-auto text-white/40 hover:text-white"><MoreHorizontal size={16} /></button>
          </div>
        </div>
      </aside>
      {mobileOpen && <button aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-[#121722]/45 lg:hidden" />}
      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-[#e2e6ed] bg-[#f3f4f6]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="mobile-menu-button rounded-lg bg-white p-2 text-[#344054] shadow-sm"><Menu size={20} /></button>
            <div className="lg:hidden"><BrandMark small /></div>
            <div className="hidden lg:block">
              <p className="eyebrow">Resident workspace</p>
              <p className="mt-1 text-sm font-bold text-[#344054]">{currentLabel}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => toast("No new notifications. You’re all caught up.")} className="relative rounded-lg p-2.5 text-[#667184] transition hover:bg-white hover:text-[#295CFF]"><Bell size={19} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#e8a23a]" /></button>
            <div className="hidden h-6 w-px bg-[#dfe3ea] sm:block" />
            <button onClick={() => toast("Profile panel is ready for backend integration.")} className="flex items-center gap-2 rounded-lg px-1.5 py-1.5 transition hover:bg-white">
              <Avatar initials="TH" color="blue" size="sm" />
              <span className="hidden text-left sm:block">
                <span className="block text-xs font-bold text-[#344054]">Thamizhamuthan</span>
                <span className="block text-[10px] text-[#8d97a7]">Resident</span>
              </span>
            </button>
          </div>
        </header>
        <div className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{content}</div>
      </main>
      {showRequestModal && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-[#121722]/50 p-4">
          <div className="surface w-full max-w-lg p-6 shadow-[0_24px_70px_rgba(18,23,34,.25)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow">Service desk</p>
                <h2 className="display-font mt-2 text-3xl font-semibold tracking-[-.04em]">What needs attention?</h2>
              </div>
              <button onClick={() => setShowRequestModal(false)} className="rounded-lg p-2 text-[#8d97a7] hover:bg-[#f0f2f5] hover:text-[#344054]"><X size={18} /></button>
            </div>
            <form onSubmit={submitRequest} className="mt-7 space-y-5">
              <label className="block">
                <span className="eyebrow">Short description</span>
                <input autoFocus value={requestTitle} onChange={(event) => setRequestTitle(event.target.value)} className="mt-2 w-full rounded-lg border border-[#d8dee8] bg-white px-3.5 py-3 text-sm outline-none transition focus:border-[#295CFF]" placeholder="e.g. Lift button is not responding" />
              </label>
              <label className="block">
                <span className="eyebrow">Category</span>
                <select value={requestCategory} onChange={(event) => setRequestCategory(event.target.value)} className="mt-2 w-full rounded-lg border border-[#d8dee8] bg-white px-3.5 py-3 text-sm outline-none transition focus:border-[#295CFF]">
                  <option>Maintenance</option>
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>Facilities</option>
                  <option>Security</option>
                </select>
              </label>
              <div className="flex items-center justify-end gap-3 border-t border-[#edf0f4] pt-5">
                <Button variant="quiet" onClick={() => setShowRequestModal(false)}>Cancel</Button>
                <Button type="submit"><Send size={15} />Submit request</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
