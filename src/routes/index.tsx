import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Maximize2, Search, X } from "lucide-react";
import games from "@/data/games.json";
import { previewPathPrefix } from "@/lib/preview-path-prefix";

type Game = (typeof games)[number];

const RECENT_KEY = "night-grid-recent";
const SPOTLIGHT = ["Bowmasters", "OvO", "Ice Dodo", "Friday Night Funkin", "Sprunki", "Drift Boss", "Block Blast", "Stickman Hook"];

export const Route = createFileRoute("/")({ component: Home });

function coverUrl(id: number) {
  return `https://raw.githubusercontent.com/gn-math/covers/main/${id}.png`;
}

function zonePath(file: string) {
  if (typeof window === "undefined") return `/zones/${file}`;
  const prefix = previewPathPrefix(window.location.hostname, window.location.pathname) ?? "";
  return `${prefix}/zones/${encodeURIComponent(file)}`;
}

function Home() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"name" | "id">("name");
  const [active, setActive] = useState<Game | null>(null);
  const [recent, setRecent] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) setRecent(JSON.parse(raw) as number[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const spotlight = useMemo(() => {
    const wanted = new Set(SPOTLIGHT.map((name) => name.toLowerCase()));
    return games.filter((game) => wanted.has(game.name.toLowerCase())).slice(0, 8);
  }, []);

  const recentGames = useMemo(() => {
    const map = new Map(games.map((game) => [game.id, game]));
    return recent.map((id) => map.get(id)).filter((game): game is Game => Boolean(game)).slice(0, 8);
  }, [recent]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? games.filter((game) => game.name.toLowerCase().includes(q)) : games;
    const next = [...list];
    if (sort === "id") next.sort((a, b) => a.id - b.id);
    else next.sort((a, b) => a.name.localeCompare(b.name));
    return next;
  }, [query, sort]);

  function openGame(game: Game) {
    setActive(game);
    setRecent((prev) => {
      const next = [game.id, ...prev.filter((id) => id !== game.id)].slice(0, 12);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  }

  function fullscreen() {
    const frame = document.getElementById("game-frame") as HTMLIFrameElement | null;
    const node = frame ?? document.getElementById("player-stage");
    node?.requestFullscreen?.();
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 pb-16 pt-6 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="font-display text-xs font-bold tracking-[0.28em] text-primary">UNBLOCKED ARCADE</p>
          <h1 className="font-display text-4xl font-extrabold leading-none tracking-tight sm:text-5xl">Night Grid</h1>
          <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">
            {games.length} browser games pulled from the gn-math HTML catalog. Pick one, it loads in place.
          </p>
        </div>
        <div className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted">
          <span className="text-primary">{filtered.length}</span> showing
        </div>
      </header>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search games</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Bowmasters, OvO, Sprunki…"
            className="h-12 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-fg outline-none ring-primary placeholder:text-muted focus:ring-2"
          />
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSort("name")}
            className={`h-12 rounded-xl px-4 text-sm font-semibold ${sort === "name" ? "bg-primary text-primary-ink" : "border border-border bg-surface text-fg"}`}
          >
            A–Z
          </button>
          <button
            type="button"
            onClick={() => setSort("id")}
            className={`h-12 rounded-xl px-4 text-sm font-semibold ${sort === "id" ? "bg-primary text-primary-ink" : "border border-border bg-surface text-fg"}`}
          >
            Newest ID
          </button>
        </div>
      </div>

      {!query && recentGames.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-bold">Jump back in</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {recentGames.map((game) => (
              <GameCard key={game.id} game={game} onOpen={openGame} />
            ))}
          </div>
        </section>
      )}

      {!query && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-bold">On the board</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {spotlight.map((game) => (
              <GameCard key={game.id} game={game} onOpen={openGame} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="font-display text-lg font-bold">{query ? "Results" : "The whole cabinet"}</h2>
        {filtered.length === 0 ? (
          <p className="mt-6 text-muted">Nothing matches that. Try a shorter name.</p>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((game) => (
              <GameCard key={game.id} game={game} onOpen={openGame} />
            ))}
          </div>
        )}
      </section>

      {active && (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg/95 p-3 backdrop-blur-sm sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs tracking-widest text-primary">NOW PLAYING</p>
              <h2 className="truncate font-display text-xl font-bold">{active.name}</h2>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={fullscreen}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-3 text-sm font-semibold text-primary-ink"
              >
                <Maximize2 className="size-4" />
                Full screen
              </button>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-fg"
                aria-label="Close game"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
          <div id="player-stage" className="min-h-0 flex-1 overflow-hidden rounded-xl border border-border bg-black">
            <GameFrame key={active.id} file={active.file} title={active.name} />
          </div>
        </div>
      )}
    </main>
  );
}

function GameFrame({ file, title }: { file: string; title: string }) {
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancel = false;
    setHtml(null);
    setError("");
    fetch(zonePath(file))
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.text();
      })
      .then((text) => {
        if (!cancel) setHtml(text);
      })
      .catch(() => {
        if (!cancel) setError("This game file is missing.");
      });
    return () => {
      cancel = true;
    };
  }, [file]);

  if (error) {
    return <p className="p-6 text-sm text-muted">{error}</p>;
  }
  if (html === null) {
    return <p className="p-6 text-sm text-muted">Loading {title}…</p>;
  }
  return (
    <iframe
      id="game-frame"
      title={title}
      srcDoc={html}
      className="h-full w-full border-0 bg-black"
      allow="fullscreen; autoplay; gamepad"
    />
  );
}

function GameCard({ game, onOpen }: { game: Game; onOpen: (game: Game) => void }) {
  const [broken, setBroken] = useState(false);
  return (
    <button
      type="button"
      onClick={() => onOpen(game)}
      className="group overflow-hidden rounded-xl border border-border bg-surface text-left transition hover:-translate-y-0.5 hover:border-primary"
    >
      <div className="relative aspect-[16/10] bg-surface-2">
        {broken ? (
          <div className="flex h-full items-center justify-center font-display text-2xl font-extrabold text-primary">
            {game.name.slice(0, 1)}
          </div>
        ) : (
          <img
            src={coverUrl(game.id)}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
            onError={() => setBroken(true)}
          />
        )}
      </div>
      <div className="flex items-center justify-between gap-2 px-3 py-2.5">
        <span className="truncate text-sm font-semibold">{game.name}</span>
        <span className="shrink-0 text-xs text-muted">#{game.id}</span>
      </div>
    </button>
  );
}
