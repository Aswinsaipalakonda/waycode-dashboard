import { useEffect, useRef } from "react";
import { Loader2, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LogLine, LogTag } from "@/lib/mock-data";

const tagClass: Record<LogTag, string> = {
  AGENT: "text-tag-agent",
  TERMINAL: "text-tag-terminal",
  WHATSAPP: "text-tag-whatsapp",
};

export type TelemetryEntry = LogLine & { time: string; active?: boolean };

export function TelemetryPanel({ lines }: { lines: TelemetryEntry[] }) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [lines]);

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <Terminal className="h-4 w-4 shrink-0 text-muted-foreground" />
          <h2 className="truncate text-sm font-medium">Log &amp; Telemetry</h2>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">{lines.length} events</span>
      </div>

      <div className="max-h-64 overflow-y-auto px-4 py-3 font-mono text-[0.78rem] leading-6">
        {lines.length === 0 ? (
          <p className="text-muted-foreground">Idle — run a feature prompt to stream telemetry.</p>
        ) : (
          lines.map((line) => (
            <div key={line.id} className="log-enter flex items-start gap-2 py-0.5">
              <span className="shrink-0 text-muted-foreground/70">{line.time}</span>
              <span className={cn("shrink-0 font-semibold", tagClass[line.tag])}>
                [{line.tag}]
              </span>
              <span className="min-w-0 flex-1 break-words text-foreground/90">{line.message}</span>
              {line.spinner && line.active && (
                <Loader2 className="mt-1 h-3.5 w-3.5 shrink-0 animate-spin text-primary" />
              )}
            </div>
          ))
        )}
        <div ref={endRef} />
      </div>
    </section>
  );
}
