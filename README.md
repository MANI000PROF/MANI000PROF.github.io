# 🚀 Next-Gen Personal Portfolio

A premium, data-driven portfolio website showcasing my projects, skills, and professional journey. Built natively with HTML, CSS, and JavaScript, it features a highly modular JSON-backed architecture, beautiful glassmorphism, and a responsive bento-box grid design.

## 🌟 Live Demo

**[View Live Portfolio](https://mani000prof.github.io)**

## ✨ Premium Features

- **🧠 Data-Driven Architecture** - Entire portfolio content is modularized in `portfolio_data.json` for instant updates without touching HTML.
- **🎨 Native Glassmorphism** - Frosted glass styling with ambient glows, strictly implemented without heavy external frameworks.
- **🍱 Bento-Box Grids** - Modern, asymmetrical layout design for the about and research sections.
- **🌓 Dual Theme Supremacy** - Defaults to a stunning deep-slate Dark Mode, with a strict, high-contrast Light Mode toggle.
- **📱 Fully Responsive** - Optimized flawlessly for all devices and screen sizes.
- **⚡ Dynamic Rendering Engine** - Core UI is dynamically injected via `renderers.js` for lightweight performance.
- **🔗 Project Modals & Infinite Marquee** - Animated tech stack scroll and detailed modal popups for GitHub/downloads.

## 🛠️ Technologies Used

- **Frontend Core:** HTML5, Modern CSS3, Vanilla JavaScript (ES6+)
- **Architecture:** JSON DOM Injection, Asynchronous Fetch
- **Styling:** Vanilla CSS, native DOM manipulation, custom properties (Variables), `@media (prefers-color-scheme)`
- **Hosting:** GitHub Pages

## 📂 Project Structure

```text
portfolio/
├── index.html              # Main HTML skeletal structure
├── portfolio_data.json     # 100% of website content (Source of Truth)
├── style.css               # Base styles and color variables
├── custom.css              # Premium glassmorphism, bento grids, & light/dark modes
├── app.js                  # Core interactions, scroll effects, and theme toggling
├── renderers.js            # Modular JS engine that populates HTML from JSON
├── images/                 
│   ├── mani.jpg            # Profile picture
│   └── projects/           # High-res project logos and screenshots
└── README.md               # Project documentation
```

## 🔧 Setup & Installation

### Option 1: View Online
Simply visit the [live demo](https://mani000prof.github.io) to see the portfolio in action.

### Option 2: Run Locally
Since the portfolio securely fetches data from a local JSON file, it requires a basic local server to bypass browser CORS restrictions.

1. **Clone the repository**
   ```bash
   git clone https://github.com/MANI000PROF/MANI000PROF.github.io.git
   cd MANI000PROF.github.io
   ```

2. **Start a local server** 
   ```bash
   # Using Python (Windows/Mac/Linux)
   python -m http.server 8000
   
   # Or using Node.js
   npx serve
   ```

3. **Open in browser**
   Visit `http://localhost:8000`

## 🔄 Making Updates (Zero-Code Content Management)

Thanks to the customized data-driven architecture, you can update almost everything **without touching a single line of HTML or CSS**.

1. Open `portfolio_data.json`
2. Add a new object to the `"projects"` array or `"timeline"` array.
3. Add any new skill tags to the `"skills"` lists.
4. Save and refresh. The website will automatically render the new containers, generate the correct borders, and rebuild the animated filters!

## 🚀 Deployment

This portfolio is automatically deployed using GitHub Pages:

1. **Commit your changes:** `git commit -am "Update portfolio data"`
2. **Push to the main branch:** `git push origin main`
3. **GitHub Pages** automatically rebuilds the site
4. **Live updates** appear within 1-2 minutes.

## 🤝 Contributing & License
This is a personal portfolio repository, but the source code is open for inspiration! 
Available under the [MIT License](LICENSE).

## 📞 Contact

**ALAPATI MANIKANTA** - Final Year Computer Science Student

- 🌐 **Portfolio:** [https://mani000prof.github.io](https://mani000prof.github.io)
- 💼 **LinkedIn:** [linkedin.com/in/alapati-manikanta](https://linkedin.com/in/alapati-manikanta)
- 📧 **Email:** alapati.manikanta.off@gmail.com
- 🐱 **GitHub:** [@MANI000PROF](https://github.com/MANI000PROF)

---

⭐ **Star this repo** if you found the architecture helpful!
*Last updated: March 2026*
