import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { RepoSidebar } from "@/components/waycode/RepoSidebar";
import { IntentCanvas } from "@/components/waycode/IntentCanvas";
import { TelemetryPanel, type TelemetryEntry } from "@/components/waycode/TelemetryPanel";
import { CodeReviewPanel } from "@/components/waycode/CodeReviewPanel";
import { repos } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "WayCode Dashboard — Intent canvas & mobile code review" },
      {
        name: "description",
        content:
          "Run feature prompts against your GitHub repositories, watch live agent telemetry, and approve diffs from your phone.",
      },
      { property: "og:title", content: "WayCode Dashboard — Intent canvas & mobile code review" },
      {
        property: "og:description",
        content:
          "Prompt, monitor, and approve AI-generated pull requests from a single mobile-first console.",
      },
    ],
  }),
  component: Dashboard,
});

function stamp() {
  return new Date().toLocaleTimeString("en-GB", { hour12: false });
}

function Dashboard() {
  const [activeId, setActiveId] = useState(repos[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [lines, setLines] = useState<TelemetryEntry[]>([]);
  const [running, setRunning] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const repo = repos.find((r) => r.id === activeId) ?? repos[0];

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const selectRepo = (id: string) => {
    clearTimers();
    setActiveId(id);
    setSidebarOpen(false);
    setRunning(false);
    setReviewOpen(false);
    setStatus("pending");
    setLines([
      {
        id: `switch-${id}`,
        tag: "AGENT",
        message: `Workspace switched to ${id} — daemon context reloaded.`,
        time: stamp(),
      },
    ]);
  };

  const run = (prompt: string) => {
    clearTimers();
    setRunning(true);
    setReviewOpen(false);
    setStatus("pending");
    setLines([
      { id: "intent", tag: "AGENT", message: `Intent received: "${prompt}"`, time: stamp() },
    ]);

    repo.script.forEach((line, i) => {
      const t = setTimeout(
        () => {
          setLines((prev) => [
            ...prev.map((p) => ({ ...p, active: false })),
            { ...line, id: `${repo.id}-${line.id}`, time: stamp(), active: true },
          ]);
          if (i === repo.script.length - 1) {
            setRunning(false);
            setReviewOpen(true);
            setLines((prev) => prev.map((p) => ({ ...p, active: false })));
          }
        },
        700 * (i + 1),
      );
      timers.current.push(t);
    });
  };

  const resolve = (next: "approved" | "rejected") => {
    setStatus(next);
    setLines((prev) => [
      ...prev,
      {
        id: `resolve-${next}-${Date.now()}`,
        tag: next === "approved" ? "TERMINAL" : "AGENT",
        message:
          next === "approved"
            ? `Patch approved — deploying ${repo.name} to production.`
            : "Patch rejected — agent re-planning with refined constraints.",
        time: stamp(),
      },
    ]);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className={cn(desktopCollapsed && "lg:hidden")}>
        <RepoSidebar
          repos={repos}
          activeId={activeId}
          onSelect={selectRepo}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open repositories"
            className="press grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground lg:hidden"
          >
            <Menu className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => setDesktopCollapsed((v) => !v)}
            aria-label="Toggle sidebar"
            className="press hidden h-9 w-9 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground lg:grid"
          >
            {desktopCollapsed ? (
              <PanelLeftOpen className="h-4.5 w-4.5" />
            ) : (
              <PanelLeftClose className="h-4.5 w-4.5" />
            )}
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold">{repo.name}</h1>
            <p className="truncate text-xs text-muted-foreground">
              {repo.branch} · updated {repo.updated}
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-border bg-surface px-2.5 py-1 text-[0.68rem] font-medium tracking-wide text-muted-foreground">
            {running ? "RUNNING" : "IDLE"}
          </span>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 space-y-4 px-4 py-5 pb-10">
          <IntentCanvas repoName={repo.name} running={running} onRun={run} />
          <TelemetryPanel lines={lines} />
          {reviewOpen && (
            <div className="log-enter">
              <CodeReviewPanel
                file={repo.diffFile}
                diff={repo.diff}
                status={status}
                onApprove={() => resolve("approved")}
                onReject={() => resolve("rejected")}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
