import { toast } from "sonner";
import { BarChart3, Check, Clock3, Leaf, Send } from "lucide-react";
import { Button, SectionHeading, StatusTag } from "@/components/primitives";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { poll } from "@/lib/societyData";

export function PollsView() {
  const [choice, setChoice] = useLocalStorage<string | null>("poll-choice", null);
  const [submitted, setSubmitted] = useLocalStorage<boolean>("poll-submitted", false);
  const total = poll.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div>
      <SectionHeading eyebrow="Have your say" title="Polls that move the plan" detail="Lightweight decisions are easier when everyone can see the question, the deadline, and the signal so far." />
      <div className="grid gap-5 lg:grid-cols-[1fr_.72fr]">
        <div className="surface p-6 md:p-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <StatusTag tone="amber"><Clock3 size={13} />{poll.closes}</StatusTag>
              <h2 className="display-font mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-[-.04em]">{poll.title}</h2>
            </div>
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#fff2da] text-[#9a681d]"><BarChart3 size={22} /></div>
          </div>
          <div className="mt-8 space-y-3">
            {poll.options.map((option) => {
              const percentage = Math.round((option.votes / total) * 100);
              const selected = choice === option.label;
              return (
                <button key={option.label} onClick={() => !submitted && setChoice(option.label)} className={`w-full rounded-xl border p-4 text-left transition ${selected ? "border-[#295CFF] bg-[#f1f4ff]" : "border-[#e3e7ee] bg-white hover:border-[#bfcaff]"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-[#344054]">{option.label}</span>
                    <span className="text-xs font-bold text-[#8d97a7]">{submitted ? `${percentage}%` : `${option.votes} votes`}</span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#edf0f4]">
                    <div className={`h-full rounded-full ${selected ? "bg-[#295CFF]" : "bg-[#bac7ef]"}`} style={{ width: `${submitted ? percentage : Math.max(18, percentage - 4)}%` }} />
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-7 flex items-center justify-between border-t border-[#edf0f4] pt-5">
            <p className="text-xs font-semibold text-[#8d97a7]">{submitted ? "Your response has been recorded locally." : `${poll.votes} residents have voted`}</p>
            <Button
              onClick={() => {
                if (!choice) { toast("Choose an option first."); return; }
                setSubmitted(true);
                toast("Vote recorded for this demo.");
              }}
              variant={submitted ? "quiet" : "primary"}
            >
              {submitted ? <><Check size={15} />Vote submitted</> : <><Send size={15} />Submit vote</>}
            </Button>
          </div>
        </div>
        <div className="surface-dark grain p-6 text-white">
          <p className="eyebrow text-white/45">Why it matters</p>
          <h2 className="display-font mt-3 text-2xl font-semibold tracking-[-.03em]">Shared decisions build shared ownership.</h2>
          <p className="mt-4 text-sm leading-6 text-white/60">Polls keep small decisions visible and let the committee prioritize what residents actually want next.</p>
          <div className="mt-8 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10"><Leaf size={19} className="text-[#7dd1ac]" /></div>
            <p className="text-sm font-semibold">Make the next choice count.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
