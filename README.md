# Mohamad Shehab - Portfolio

Personal portfolio website with a **Cyberpunk 2077** inspired theme.

## ✨ Features

- 🎮 **Cyberpunk 2077 aesthetic** — Neon glows, glitch effects, scanlines
- 📝 **YAML-configurable** — All content managed via `config.yaml`
- 📄 **PDF Export** — Download CV as PDF with one click
- 📱 **Fully responsive** — Works on all devices
- ⚡ **No build step** — Pure HTML/CSS/JS, just serve and go

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML entry point
├── config.yaml         # All CV/portfolio data (edit this!)
├── css/
│   └── style.css       # Cyberpunk theme styles
├── js/
│   └── app.js          # App logic, YAML parsing, PDF generation
└── README.md
```

## 🛠️ Configuration

Edit `config.yaml` to update your portfolio. All sections are configurable:

- **personal** — Name, title, contact info, status badge
- **about** — Bio paragraphs and stats
- **experience** — Work history with highlights
- **skills** — Skill categories and items
- **certifications** — Professional certifications
- **education** — Academic background
- **theme** — Colors, footer text, copyright year

## 🚀 Quick Start

1. Clone the repo
2. Edit `config.yaml` with your info
3. Serve with any static server:
   ```bash
   # Python
   python -m http.server 8080
   
   # Node
   npx serve
   
   # Caddy
   caddy file-server --listen :8080
   ```
4. Open `http://localhost:8080`

## 📦 Dependencies (CDN)

- [js-yaml](https://github.com/nodeca/js-yaml) — YAML parsing
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) — PDF generation
- [Google Fonts](https://fonts.google.com/) — Orbitron, Rajdhani, Share Tech Mono

## 📄 PDF Export

Click the **"Download CV"** button to generate a clean, professional PDF version of your CV.

## 🎨 Theme Customization

Edit the `theme` section in `config.yaml` to customize:
- Primary/secondary/accent colors
- Footer text
- Copyright year

Or modify `css/style.css` directly for deeper customization.

## 📜 License

MIT

---

*Built with ☕ and too much synthwave*
