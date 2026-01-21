# Copilot Instructions for Kay Agency Digital Marketing Site

## Architecture Overview

This is a **React 19 + Vite 7** single-page marketing website for Kay Agency. It uses a section-based layout with scroll-driven animations. The site deploys to GitHub Pages at `/digital-marketing/`.

**Key Stack:**

- **Animation**: GSAP (`@gsap/react`) + Framer Motion (`motion/react`) — used together; GSAP for complex scroll-triggered animations, Framer Motion for component-level animations
- **Smooth Scroll**: Locomotive Scroll (initialized in `App.jsx`) + Lenis
- **Styling**: Tailwind CSS v4 with `@tailwindcss/vite` plugin — no `tailwind.config.js`, uses CSS-based config in `src/index.css`
- **UI Components**: shadcn/ui (New York style, JSX not TSX) via `components.json` with Aceternity UI registry

## Project Structure

```
src/
├── App.jsx              # Main layout, scroll setup, modal state
├── components/
│   ├── *.jsx            # Page sections (Intro, Services, Clients, etc.)
│   ├── effects/         # Animation components (Sparkles, TypeShuffle)
│   ├── ui/              # shadcn/ui primitives
│   └── lib/utils.js     # cn() utility for class merging
```

## Component Patterns

**Import Alias**: Use `@components/` for all component imports (configured in `vite.config.js`):

```jsx
import Services from "@components/Services";
import { cn } from "@components/lib/utils";
```

**Animation Pattern**: Combine scroll-based transforms with viewport-triggered animations:

```jsx
const { scrollYProgress } = useScroll({
  target: container,
  offset: ["start end", "end start"],
});
const y = useTransform(scrollYProgress, [0, 1], ["-40%", "50%"]);
```

**Class Merging**: Always use `cn()` or inline `cx()` helper for conditional Tailwind classes:

```jsx
import { cn } from "@components/lib/utils";
<div className={cn("base-class", isActive && "active-class")} />;
```

## Styling Conventions

- **Dark theme by default**: Background `#0a0a0f` or `bg-[#0a0a0f]`, text white/gray
- **Brand colors**: Primary violet `#4900f4`, accent lime `#c8ff00`, pink `#f400a1`
- **Glassmorphism**: Use `bg-white/5 border border-white/10 backdrop-blur-xl` pattern
- **Font**: Montserrat for headings (`font-montserrat`), Inter for body
- **Custom theme tokens**: Defined in `@theme` blocks in `src/index.css`

## Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run deploy   # Build + deploy to GitHub Pages (gh-pages -d dist)
npm run lint     # ESLint check
```

## Adding New Sections

1. Create component in `src/components/` following existing pattern
2. Use `framer-motion` for entrance animations with `whileInView`
3. Import via `@components/NewSection` in `App.jsx`
4. Wrap with `ref` for scroll-based effects if needed

## Key Files Reference

- `src/index.css` — Tailwind theme, font-faces, Lenis styles, CSS variables
- `vite.config.js` — Base path `/digital-marketing/`, alias config
- `components.json` — shadcn/ui configuration with Aceternity registry
- `src/components/lib/utils.js` — `cn()` class utility

## Notes

- Images in `public/images/` are referenced without import (e.g., `"/images/kaymarklogog.png"`)
- Client logos use sequential naming: `client-1.jpeg` through `client-32.jpeg`
- SVG icons are typically inline React components, not imported files
- No TypeScript — all files use `.jsx` extension
