// Shared display primitives used across every SocietyConnect view: icons, the
// brand mark, avatars, status pills, section headers, and the base button.
import type { ReactNode } from "react";
import {
  BarChart3,
  Building2,
  CalendarDays,
  CircleHelp,
  Grid2X2,
  Megaphone,
  ScanLine,
  Users,
  Wrench,
} from "lucide-react";

export const iconMap = {
  grid: Grid2X2,
  megaphone: Megaphone,
  wrench: Wrench,
  calendar: CalendarDays,
  building: Building2,
  users: Users,
  "bar-chart": BarChart3,
  scan: ScanLine,
};

export function Icon({ name, size = 18, strokeWidth = 1.8 }: { name: keyof typeof iconMap; size?: number; strokeWidth?: number }) {
  const Component = iconMap[name];
  return <Component size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}

export function BrandMark({ small = false }: { small?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${small ? "scale-90 origin-left" : ""}`}>
      <div className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-[#295CFF] shadow-[0_8px_18px_rgba(41,92,255,.28)]">
        <img src="/manus-storage/societyconnect-mark_91f6a8da.png" alt="" className="h-7 w-7 object-contain" />
        <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-[#F4B24F]" />
      </div>
      <div>
        <p className="display-font text-[18px] font-semibold leading-none tracking-[-.02em]">SocietyConnect</p>
        <p className="mt-1 text-[10px] uppercase tracking-[.18em] text-white/45">Community operating layer</p>
      </div>
    </div>
  );
}

export function Avatar({ initials, color = "blue", size = "md" }: { initials: string; color?: string; size?: "sm" | "md" | "lg" }) {
  const dimensions = size === "sm" ? "h-7 w-7 text-[10px]" : size === "lg" ? "h-12 w-12 text-sm" : "h-9 w-9 text-xs";
  return <div className={`${dimensions} tone-${color} grid shrink-0 place-items-center rounded-full font-bold`}>{initials}</div>;
}

export function StatusTag({ children, tone = "blue" }: { children: ReactNode; tone?: string }) {
  return <span className={`tone-${tone} inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold`}>{children}</span>;
}

export function SectionHeading({ eyebrow, title, detail, action }: { eyebrow: string; title: string; detail?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-font signal-line mt-2 text-[clamp(28px,3vw,42px)] font-semibold leading-[1.02] tracking-[-.04em] text-[#121722]">{title}</h1>
        {detail && <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667184]">{detail}</p>}
      </div>
      {action}
    </div>
  );
}

export function Button({ children, onClick, variant = "primary", className = "", type = "button" }: { children: ReactNode; onClick?: () => void; variant?: "primary" | "quiet" | "outline" | "dark"; className?: string; type?: "button" | "submit" }) {
  const variants = {
    primary: "bg-[#295CFF] text-white hover:bg-[#1e4be5]",
    quiet: "bg-[#eef1f6] text-[#344054] hover:bg-[#e4e8ef]",
    outline: "border border-[#d8dee8] bg-white text-[#344054] hover:border-[#295CFF] hover:text-[#295CFF]",
    dark: "bg-[#121722] text-white hover:bg-[#242e3e]",
  };
  return <button type={type} onClick={onClick} className={`action-button inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-semibold ${variants[variant]} ${className}`}>{children}</button>;
}

export function EmptyFallback({ title }: { title: string }) {
  return (
    <div className="surface p-12 text-center">
      <CircleHelp className="mx-auto text-[#9da7b7]" />
      <h2 className="display-font mt-4 text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-[#667184]">This screen is part of the frontend demo and is ready for a backend repository.</p>
    </div>
  );
}
