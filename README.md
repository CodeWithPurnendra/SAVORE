# 🍽️ Savory - Fine Dining & Culinary Experience

A modern, responsive web application for a luxury fine-dining restaurant built with **React**, **Tailwind CSS**, and **Lucide/Feather Icons**. Features real-time state management for item orders, interactive booking modals, and a slide-over shopping cart drawer.

---

## 🌟 Key Features

- ** Table Reservation Modal (`BookTable.jsx`)**: 
  - Real-time time-slot dropdown with 12-hour formatting ($5:00\text{ PM} - 10:00\text{ PM}$).
  - Keyboard accessible (`Escape` key detection) with animated backdrop overlay.
  - Interactive submission feedback state.

- ** Interactive Shopping Cart Drawer (`Cart.jsx`)**:
  - Slide-over drawer navigation for mobile and desktop screens.
  - Item quantity increment/decrement controls with dynamic tax ($8\%$) and subtotal recalculations.
  - Empty cart fallback state.

- ** Responsive Navigation (`NavBar.jsx`)**:
  - Animated item badge counter reflecting total items in the cart.
  - Quick action buttons for reservation and order viewing.

---

## 🛠️ Tech Stack

- **Frontend Library**: React 18
- **Styling**: Tailwind CSS
- **Icon Set**: React Icons (`react-icons/fi`)
- **Build Tool**: Vite

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── BookTable.jsx       # Reservation modal component
│   ├── Cart.jsx            # Cart slide-over drawer
│   ├── Contact.jsx         # Contact and location section
│   ├── FeaturedDishes.jsx  # Menu items grid with Add to Cart trigger
│   ├── Hero.jsx            # Landing hero section
│   ├── NavBar.jsx          # Header navigation with badge count
│   └── Story.jsx           # Brand story section
├── App.jsx                 # Core application layout & state orchestrator
├── main.jsx                # Application entry point
└── index.css               # Global styles & Tailwind imports

