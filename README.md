# INTERLINK™ 2.0 — Official Website

The public website for INTERLINK™, the unified AI workspace for agents, memory, knowledge ingestion, file intelligence, and automation. This repo contains the static site served through GitHub Pages, the browser-based demo shader, installer call-to-actions, and brand assets.

## Structure
- `index.html` — landing page with overview, hero visualization, and security pitch
- `sovereign.html` — sovereign AI infrastructure overview for regulated and mission-critical teams
- `features.html` — capability deep-dive
- `install.html` — Windows/Linux installer entry points with copyable commands
- `docs.html` — quickstart, APIs, security, extensibility
- `demo.html` — WebGL ripple visualization preview
- `pricing.html` — plan tiers
- `compare.html` — competitive comparison table
- `contact.html` — contact form and investor portal info
- `public/assets/css/style.css` — global styling and layout system
- `public/assets/js/main.js` — navigation highlighting + clipboard helpers
- `public/assets/js/demo.js` — WebGL shader powering the live preview
- `public/brand/logo.svg` — INTERLINK™ emblem
- `public/brand/brand-guide.md` — palette and typography guidance
- `service_profiles.yaml` — defaults for Ollama, DeepSeek, Groq, and OpenAI endpoints

## Running locally
This is a static site. Open `index.html` in your browser or serve the directory with any static server:

```bash
python -m http.server 8080
```

Then navigate to `http://localhost:8080` to explore all pages and the live WebGL demo.

## Service profiles
- Edit `service_profiles.yaml` to swap base URLs, models, or API keys for your target providers.
- Profiles include sensible defaults for local-first Ollama as well as cloud providers (DeepSeek, Groq, OpenAI).
- The `models` block defines named presets (e.g., `default`, `high_precision`, `local_fast`) that your backend or automation can reference.

## Deployment
The included GitHub Actions workflow (`.github/workflows/static.yml`) publishes the site to GitHub Pages on pushes to `main`.
