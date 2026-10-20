import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Maximize2, r as Search, t as X } from "../_libs/lucide-react.mjs";
import { n as games_default, r as previewPathPrefix } from "./router-BZVibWz3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-7f2hhuFs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RECENT_KEY = "night-grid-recent";
var SPOTLIGHT = [
	"Bowmasters",
	"OvO",
	"Ice Dodo",
	"Friday Night Funkin",
	"Sprunki",
	"Drift Boss",
	"Block Blast",
	"Stickman Hook"
];
function coverUrl(id) {
	return `https://raw.githubusercontent.com/gn-math/covers/main/${id}.png`;
}
function playPath(id) {
	if (typeof window === "undefined") return `/api/play/${id}`;
	return `${previewPathPrefix(window.location.hostname, window.location.pathname) ?? ""}/api/play/${id}`;
}
function Home() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)("name");
	const [active, setActive] = (0, import_react.useState)(null);
	const [recent, setRecent] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(RECENT_KEY);
			if (raw) setRecent(JSON.parse(raw));
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!active) return;
		const onKey = (event) => {
			if (event.key === "Escape") setActive(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [active]);
	const spotlight = (0, import_react.useMemo)(() => {
		const wanted = new Set(SPOTLIGHT.map((name) => name.toLowerCase()));
		return games_default.filter((game) => wanted.has(game.name.toLowerCase())).slice(0, 8);
	}, []);
	const recentGames = (0, import_react.useMemo)(() => {
		const map = new Map(games_default.map((game) => [game.id, game]));
		return recent.map((id) => map.get(id)).filter((game) => Boolean(game)).slice(0, 8);
	}, [recent]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		const next = [...q ? games_default.filter((game) => game.name.toLowerCase().includes(q)) : games_default];
		if (sort === "id") next.sort((a, b) => a.id - b.id);
		else next.sort((a, b) => a.name.localeCompare(b.name));
		return next;
	}, [query, sort]);
	function openGame(game) {
		setActive(game);
		setRecent((prev) => {
			const next = [game.id, ...prev.filter((id) => id !== game.id)].slice(0, 12);
			localStorage.setItem(RECENT_KEY, JSON.stringify(next));
			return next;
		});
	}
	function fullscreen() {
		(document.getElementById("game-frame") ?? document.getElementById("player-stage"))?.requestFullscreen?.();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-screen max-w-6xl px-4 pb-16 pt-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs font-bold tracking-[0.28em] text-primary",
						children: "UNBLOCKED ARCADE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-extrabold leading-none tracking-tight sm:text-5xl",
						children: "Night Grid"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 max-w-xl text-sm text-muted sm:text-base",
						children: [games_default.length, " browser games pulled from the gn-math HTML catalog. Pick one, it loads in place."]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary",
						children: filtered.length
					}), " showing"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Search games"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Search Bowmasters, OvO, Sprunki…",
							className: "h-12 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-fg outline-none ring-primary placeholder:text-muted focus:ring-2"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSort("name"),
						className: `h-12 rounded-xl px-4 text-sm font-semibold ${sort === "name" ? "bg-primary text-primary-ink" : "border border-border bg-surface text-fg"}`,
						children: "A–Z"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSort("id"),
						className: `h-12 rounded-xl px-4 text-sm font-semibold ${sort === "id" ? "bg-primary text-primary-ink" : "border border-border bg-surface text-fg"}`,
						children: "Newest ID"
					})]
				})]
			}),
			!query && recentGames.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold",
					children: "Jump back in"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: recentGames.map((game) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameCard, {
						game,
						onOpen: openGame
					}, game.id))
				})]
			}),
			!query && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold",
					children: "On the board"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: spotlight.map((game) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameCard, {
						game,
						onOpen: openGame
					}, game.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold",
					children: query ? "Results" : "The whole cabinet"
				}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-muted",
					children: "Nothing matches that. Try a shorter name."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
					children: filtered.map((game) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameCard, {
						game,
						onOpen: openGame
					}, game.id))
				})]
			}),
			active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex flex-col bg-bg/95 p-3 backdrop-blur-sm sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-widest text-primary",
							children: "NOW PLAYING"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "truncate font-display text-xl font-bold",
							children: active.name
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: fullscreen,
							className: "inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-3 text-sm font-semibold text-primary-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-4" }), "Full screen"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setActive(null),
							className: "inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-fg",
							"aria-label": "Close game",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "player-stage",
					className: "min-h-0 flex-1 overflow-hidden rounded-xl border border-border bg-black",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						id: "game-frame",
						title: active.name,
						src: playPath(active.id),
						className: "h-full w-full",
						allow: "fullscreen; autoplay; gamepad"
					})
				})]
			})
		]
	});
}
function GameCard({ game, onOpen }) {
	const [broken, setBroken] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onOpen(game),
		className: "group overflow-hidden rounded-xl border border-border bg-surface text-left transition hover:-translate-y-0.5 hover:border-primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative aspect-[16/10] bg-surface-2",
			children: broken ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full items-center justify-center font-display text-2xl font-extrabold text-primary",
				children: game.name.slice(0, 1)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: coverUrl(game.id),
				alt: "",
				loading: "lazy",
				className: "h-full w-full object-cover",
				onError: () => setBroken(true)
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2 px-3 py-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate text-sm font-semibold",
				children: game.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "shrink-0 text-xs text-muted",
				children: ["#", game.id]
			})]
		})]
	});
}
//#endregion
export { Home as component };
