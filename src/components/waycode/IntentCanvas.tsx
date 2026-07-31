import { useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  repoName: string;
  running: boolean;
  onRun: (prompt: string) => void;
};

export function IntentCanvas({ repoName, running, onRun }: Props) {
  const [value, setValue] = useState("");

  return (
    <section className="rounded-2xl border border-border bg-surface p-1.5 shadow-[0_20px_60px_-40px_rgba(0,0,0,1)]">
      <div className="rounded-[calc(var(--radius)+2px)] bg-background/40 px-4 pt-4 pb-3">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pb-3">
          <div className="flex min-w-0 items-center gap-2">
            <Sparkles className="h-4 w-4 shrink-0 text-primary" />
            <h2 className="truncate text-sm font-medium">Intent Canvas</h2>
          </div>
          <span className="shrink-0 truncate rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted-foreground">
            {repoName}
          </span>
        </div>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
          placeholder="Enter your functional intent... (e.g., Build an admin dashboard page connected to Supabase)"
          className="w-full resize-none bg-transparent text-[0.95rem] leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none"
        />

        <div className="mt-3 flex items-center justify-end">
          <button
            disabled={running}
            onClick={() => {
              onRun(value.trim() || "Build an admin dashboard page connected to Supabase");
              setValue("");
            }}
            className={cn(
              "press inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground",
              "hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              running && "cursor-not-allowed opacity-60",
            )}
          >
            {running ? "Running..." : "Run Feature Prompt"}
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
