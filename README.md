# BazaarX

A modern e-commerce demo built with Angular 20+, designed for Middle Eastern markets. Features a signals-based cart, bilingual support (English / Arabic with RTL), and an admin analytics dashboard—all with polished animations and clean architecture.

![Angular](https://img.shields.io/badge/Angular-20+-DD0031?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)

## Live Demo

> **Note:** This is a simulated demo. No real transactions occur. Product and order data is generated at runtime.

Run locally (see [Getting Started](#getting-started)) or check the deployed version if available.

## Why This Project?

- **Signals-first state** — Cart, totals, and analytics rely on Angular signals and `computed()` instead of NgRx or services with BehaviorSubject.
- **Internationalization** — Full EN/AR support with RTL layout and a runtime language toggle.
- **Lazy loading** — Admin routes and analytics are lazy-loaded with a simple guard.
- **Animations** — Add-to-cart fly effect, cart drawer, page transitions, and micro-interactions using Angular Animations.
- **Demo-ready** — Clear structure, demo banner, and no external backend—easy to clone and run.

## Tech Stack

| Area | Choices |
|------|---------|
| Framework | Angular 20+ (standalone components) |
| State | Signals + `computed()` |
| Styling | SCSS, utility-style, oklch colors |
| i18n | Custom TranslationService + RTL |
| Animations | Angular Animations API |

## Features

### Storefront
- Product grid with 40 curated items (oud, abayas, prayer rugs, jewelry, etc.)
- Add-to-cart with “fly to cart” animation
- Cart drawer with quantity controls and subtotal
- Simple checkout flow with order confirmation

### Admin Analytics
- KPI cards: Total Orders, Revenue, Conversion Rate, Abandoned Cart %
- Revenue trend (bar chart) and orders-per-day (line chart)
- Top products list
- All metrics derived from signals / `computed()`

### Internationalization
- English and Arabic
- RTL layout when Arabic is selected
- Header language toggle

## Project Structure

```
src/app/
├── core/          # Guards, main layout
├── shared/         # Demo banner, language toggle, i18n pipe
├── models/         # Product, Order, CartItem
├── services/       # DataService, CartStore, TranslationService
├── storefront/     # Home, Store, ProductCard
├── cart/           # CartTrigger, CartDrawer
├── checkout/       # Checkout, order confirmation
└── admin/          # Analytics dashboard (lazy-loaded)
```

## Getting Started

### Prerequisites

- Node.js 20+ (LTS recommended)
- npm 10+

### Install & Run

```bash
git clone https://github.com/MahmoudGebril/BazaarX.git
cd BazaarX

npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200).

### Build for Production

```bash
npm run build
```

Output will be in `dist/BazaarX/browser/`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Dev server at `localhost:4200` |
| `npm run build` | Production build |
| `npm run watch` | Development build with watch |

## License

MIT

---

Built as a portfolio project to demonstrate Angular 20+, signals, and modern frontend practices.
