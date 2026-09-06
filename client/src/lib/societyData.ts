// Civic Signal style: shared SocietyConnect domain vocabulary and demo data live here so the UI can later swap this module for a repository/API layer.

export type ViewKey =
  | "overview"
  | "announcements"
  | "requests"
  | "events"
  | "facilities"
  | "directory"
  | "polls"
  | "visitors";

export type RequestStatus = "In progress" | "Open" | "Resolved";

export type ServiceRequest = {
  id: string;
  title: string;
  category: string;
  location: string;
  created: string;
  status: RequestStatus;
  priority: "High" | "Normal";
};

export const navigation: Array<{ key: ViewKey; label: string; icon: string }> = [
  { key: "overview", label: "Overview", icon: "grid" },
  { key: "announcements", label: "Notice board", icon: "megaphone" },
  { key: "requests", label: "Service requests", icon: "wrench" },
  { key: "events", label: "Events", icon: "calendar" },
  { key: "facilities", label: "Facilities", icon: "building" },
  { key: "directory", label: "Directory", icon: "users" },
  { key: "polls", label: "Polls", icon: "bar-chart" },
  { key: "visitors", label: "Visitor pass", icon: "scan" },
];

export const announcements = [
  {
    id: "notice-1",
    title: "Water tank cleaning on Saturday",
    detail: "Supply will pause between 10:00 and 14:00. Please keep enough water stored for the morning.",
    category: "Maintenance",
    date: "Today · 09:15",
    pinned: true,
    tone: "amber",
  },
  {
    id: "notice-2",
    title: "Monsoon safety checklist",
    detail: "A five-minute checklist for balconies, windows, and shared electrical areas before the next rain.",
    category: "Safety",
    date: "Yesterday · 17:40",
    pinned: false,
    tone: "blue",
  },
  {
    id: "notice-3",
    title: "Weekend movie night confirmed",
    detail: "Bring a blanket to the rooftop lawn. The committee will provide seating and refreshments.",
    category: "Community",
    date: "14 Jun · 11:30",
    pinned: false,
    tone: "mint",
  },
];

export const seedRequests: ServiceRequest[] = [
  {
    id: "SR-204",
    title: "Corridor light flickering",
    category: "Electrical",
    location: "Tower B · 5th floor",
    created: "Today · 08:42",
    status: "In progress",
    priority: "High",
  },
  {
    id: "SR-203",
    title: "Water pressure is low",
    category: "Plumbing",
    location: "Tower A · Flat 104",
    created: "Yesterday · 19:10",
    status: "Open",
    priority: "Normal",
  },
  {
    id: "SR-201",
    title: "Gym treadmill service",
    category: "Facilities",
    location: "Clubhouse",
    created: "12 Jun · 11:25",
    status: "Resolved",
    priority: "Normal",
  },
];

export const events = [
  { id: "event-1", day: "22", month: "JUN", title: "Rooftop movie night", meta: "Sat · 7:30 PM · Rooftop lawn", people: 18, color: "blue" },
  { id: "event-2", day: "25", month: "JUN", title: "Committee open hour", meta: "Tue · 6:00 PM · Reading room", people: 7, color: "amber" },
  { id: "event-3", day: "29", month: "JUN", title: "Kids' art morning", meta: "Sat · 10:00 AM · Multipurpose hall", people: 23, color: "mint" },
];

export const facilities = [
  { id: "facility-1", name: "Clubhouse", detail: "Indoor gathering space", next: "Available today", tag: "Most booked", color: "blue" },
  { id: "facility-2", name: "Tennis court", detail: "Outdoor court · 60 min slots", next: "2 slots left", tag: "Popular", color: "amber" },
  { id: "facility-3", name: "Reading room", detail: "Quiet work and study zone", next: "Open until 9 PM", tag: "Quiet hours", color: "mint" },
  { id: "facility-4", name: "Rooftop lawn", detail: "Open-air community area", next: "Available tomorrow", tag: "New", color: "ink" },
];

export const residents = [
  { name: "Thamizhamuthan", unit: "Tower A · 204", role: "Resident", initials: "TH", color: "blue", contact: "thamizhamuthan@example.com" },
  { name: "Meera Nair", unit: "Tower B · 110", role: "Committee member", initials: "MN", color: "amber", contact: "meera@example.com" },
  { name: "Rohan Kapoor", unit: "Tower C · 302", role: "Resident", initials: "RK", color: "mint", contact: "rohan@example.com" },
  { name: "Sana Iyer", unit: "Tower A · 407", role: "Resident", initials: "SI", color: "blue", contact: "sana@example.com" },
  { name: "Vikram Joshi", unit: "Tower B · 502", role: "Security desk", initials: "VJ", color: "ink", contact: "security@example.com" },
  { name: "Ananya Rao", unit: "Tower C · 108", role: "Resident", initials: "AR", color: "amber", contact: "ananya@example.com" },
];

export const poll = {
  id: "poll-1",
  title: "Which community workshop should we host next?",
  closes: "Closes in 3 days",
  votes: 68,
  options: [
    { label: "Balcony gardening", votes: 31 },
    { label: "Home safety basics", votes: 22 },
    { label: "Budget cooking", votes: 15 },
  ],
};

export const activity = [
  { time: "09:15", title: "Water tank cleaning notice posted", by: "Committee desk", icon: "megaphone", tone: "amber" },
  { time: "08:42", title: "Corridor light issue updated", by: "Facilities team", icon: "wrench", tone: "blue" },
  { time: "Yesterday", title: "Rooftop movie night reached 18 RSVPs", by: "Community calendar", icon: "calendar", tone: "mint" },
];

export const chartData = [42, 48, 45, 58, 52, 63, 71, 68, 76, 72, 84, 81];
