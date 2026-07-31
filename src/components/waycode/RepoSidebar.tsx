import { Link } from "@tanstack/react-router";
import { GitBranch, X } from "lucide-react";
import logo from "@/assets/waycode-logo.png.asset.json";
import { cn } from "@/lib/utils";
import type { Repo } from "@/lib/mock-data";

type Props = {
  repos: Repo[];
  activeId: string;
  onSelect: (id: string) => void;
  open: boolean;
  onClose: () => void;
};

export function RepoSidebar({ repos, activeId, onSelect, open, onClose }: Props) {
  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-30 bg-background/80 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[17rem] flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 ease-out",
          "lg:static lg:z-auto lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-sidebar-border px-4 py-4">
          <Link to="/dashboard" className="flex min-w-0 items-center gap-2.5">
            <img src={logo.url} alt="WayCode" className="h-8 w-8 shrink-0 rounded-full" />
            <span className="truncate text-base font-semibold tracking-tight">WayCode</span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close repositories"
            className="press grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground lg:hidden"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <p className="px-4 pt-5 pb-2 text-[0.68rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          Repositories
        </p>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2.5 pb-4">
          {repos.map((repo) => {
            const active = repo.id === activeId;
            return (
              <button
                key={repo.id}
                onClick={() => onSelect(repo.id)}
                className={cn(
                  "press grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-xl px-3 py-2.5 text-left",
                  active
                    ? "bg-primary/15 text-foreground ring-1 ring-primary/40"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                )}
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{repo.name}</span>
                  <span className="mt-0.5 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                    <GitBranch className="h-3 w-3 shrink-0" />
                    <span className="truncate">
                      {repo.branch} · {repo.language}
                    </span>
                  </span>
                </span>
                <span
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full",
                    active ? "bg-primary" : "bg-transparent",
                  )}
                />
              </button>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border px-4 py-3.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="truncate">Daemon online · gateway eu-west</span>
          </div>
        </div>
      </aside>
    </>
  );
}
