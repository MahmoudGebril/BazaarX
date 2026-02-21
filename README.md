# BazaarX

A modern, animated e-commerce demo for Middle Eastern users. Built with Angular 20+ as a portfolio-level demonstration of clean architecture, signals, and premium UX.

## Tech Stack

- **Angular 20+** – Standalone components, signals, control flow (`@if`, `@for`)
- **RxJS** – Reactive patterns where appropriate
- **Angular Animations** – Page transitions, micro-interactions, add-to-cart fly effect
- **SCSS** – Utility-based minimal styling
- **i18n** – English & Arabic with RTL support

## Features

### Storefront
- Animated product grid with 40 Middle Eastern products
- Smooth hover effects and scaling
- Add-to-cart animation (item flies to cart icon)
- Animated cart drawer
- Fake checkout flow with order confirmation animation

### Admin Analytics
- Total Orders, Revenue, Conversion Rate, Abandoned Cart %
- Revenue trend chart (last 3 months)
- Orders per day chart
- Top products list
- All metrics computed via signals and `computed()`

### Internationalization
- English and Arabic
- RTL layout for Arabic
- Language toggle in header

## Project Structure

```
src/app/
├── core/           # Guards, layout
├── shared/         # Pipes, reusable components
├── models/         # Product, Order, CartItem
├── services/       # DataService, CartStore, TranslationService
├── storefront/     # Home, Store, ProductCard
├── cart/           # CartTrigger, CartDrawer
├── checkout/       # Checkout, order confirmation
└── admin/          # Analytics dashboard
```

## Running the Project

```bash
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200).

## Build

```bash
npm run build
```

---

**Note:** This is a simulated e-commerce demo. No real transactions occur. Data (products, orders) is generated at runtime for demonstration purposes.
