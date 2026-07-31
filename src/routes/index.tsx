import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Github } from "lucide-react";
import logo from "@/assets/waycode-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WayCode — Sign in to your coding daemon" },
      {
        name: "description",
        content:
          "Sign in to WayCode with GitHub to drive repository-aware AI coding agents from your phone.",
      },
      { property: "og:title", content: "WayCode — Sign in to your coding daemon" },
      {
        property: "og:description",
        content:
          "Strict GitHub OAuth access to the WayCode gateway. Ship features from anywhere, on any device.",
      },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-18rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]"
      />

      <div className="relative w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <img
            src={logo.url}
            alt="WayCode logo"
            className="h-20 w-20 rounded-full shadow-glow"
          />
          <h1 className="mt-6 text-3xl font-semibold tracking-tight">WayCode</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Repository-aware agents, driven from your pocket.
          </p>
        </div>

        <div className="mt-9 rounded-2xl border border-border bg-surface p-5">
          <button
            onClick={() => navigate({ to: "/dashboard" })}
            className="press inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none"
          >
            <Github className="h-5 w-5" />
            Sign in with GitHub
          </button>

          <div className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <span className="relative mt-1 flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="min-w-0">
              Connected to Gateway: Waiting for active daemon handshake...
            </span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          OAuth only · no passwords are ever stored
        </p>
      </div>
    </main>
  );
}
