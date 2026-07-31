import { Check, FileDiff, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DiffLine } from "@/lib/mock-data";

type Props = {
  file: string;
  diff: DiffLine[];
  status: "pending" | "approved" | "rejected";
  onApprove: () => void;
  onReject: () => void;
};

export function CodeReviewPanel({ file, diff, status, onApprove, onReject }: Props) {
  const added = diff.filter((d) => d.type === "add").length;
  const removed = diff.filter((d) => d.type === "remove").length;

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <FileDiff className="h-4 w-4 shrink-0 text-muted-foreground" />
          <h2 className="truncate font-mono text-xs sm:text-sm">{file}</h2>
        </div>
        <div className="flex shrink-0 items-center gap-2 font-mono text-xs">
          <span className="text-diff-add">+{added}</span>
          <span className="text-diff-remove">-{removed}</span>
        </div>
      </div>

      <div className="overflow-x-auto py-2">
        {diff.map((line, i) => (
          <div
            key={i}
            className={cn(
              "flex items-start gap-3 px-4 py-0.5 font-mono text-[0.78rem] leading-6 whitespace-pre",
              line.type === "add" && "bg-diff-add-bg text-diff-add",
              line.type === "remove" && "bg-diff-remove-bg text-diff-remove",
              line.type === "context" && "text-muted-foreground",
            )}
          >
            <span className="w-5 shrink-0 text-right opacity-60">{i + 1}</span>
            <span className="w-2 shrink-0">
              {line.type === "add" ? "+" : line.type === "remove" ? "-" : " "}
            </span>
            <span>{line.text}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-2.5 border-t border-border p-4 sm:grid-cols-2">
        <button
          onClick={onApprove}
          disabled={status !== "pending"}
          className={cn(
            "press inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90",
            status !== "pending" && "cursor-not-allowed opacity-50",
          )}
        >
          <Check className="h-4 w-4" />
          {status === "approved" ? "Deployed" : "Approve & Deploy"}
        </button>
        <button
          onClick={onReject}
          disabled={status !== "pending"}
          className={cn(
            "press inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-raised px-5 py-3.5 text-sm font-semibold text-foreground hover:bg-accent",
            status !== "pending" && "cursor-not-allowed opacity-50",
          )}
        >
          <RotateCcw className="h-4 w-4" />
          {status === "rejected" ? "Refining" : "Reject & Refine"}
        </button>
      </div>
    </section>
  );
}
