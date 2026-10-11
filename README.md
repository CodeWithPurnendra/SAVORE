<div align="center">

# 🍽️ Savory

### Fine Dining & Culinary Experience

A modern, responsive web application for a luxury fine-dining restaurant, built with **React**, **Tailwind CSS**, and **Vite**.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Component Overview](#-component-overview)
- [State Management](#-state-management)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🍷 About the Project

**Savory** is a front-end showcase for an upscale restaurant. It combines an elegant landing page with real-time interactions: guests can browse featured dishes, add items to a cart, and reserve a table, all without leaving the page.

The application uses React state lifted into `App.jsx`, so the navbar badge, cart drawer, and menu grid always stay in sync.

---

## 🌟 Key Features

### 📅 Table Reservation Modal (`BookTable.jsx`)
- Time-slot dropdown with 12-hour formatting (5:00 PM – 10:00 PM)
- Keyboard accessible: press `Esc` to close
- Animated backdrop overlay
- Interactive submission feedback state

### 🛒 Interactive Shopping Cart Drawer (`Cart.jsx`)
- Slide-over drawer for both mobile and desktop screens
- Quantity increment/decrement controls per item
- Dynamic subtotal and tax (8%) recalculation
- Friendly empty-cart fallback state

### 🧭 Responsive Navigation (`NavBar.jsx`)
- Animated badge showing the total number of items in the cart
- Quick action buttons for reservations and viewing the order

### 🎨 General
- Fully responsive layout (mobile, tablet, desktop)
- Clean, elegant UI with Tailwind utility classes
- Lightweight icons via React Icons

---

## 🛠️ Tech Stack

| Category | Technology |
| --- | --- |
| Frontend Library | [React 18](https://react.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) (`react-icons/fi`) |
| Build Tool | [Vite](https://vitejs.dev/) |

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
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js) or yarn

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/CodeWithPurnendra/SAVORE.git
```

2. **Navigate into the project**
```bash
   cd savory
```

3. **Install dependencies**
```bash
   npm install
```

4. **Start the development server**
```bash
   npm run dev
```

5. **Open in your browser**

   Visit [http://localhost:5173](http://localhost:5173)

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot reload |
| `npm run build` | Creates an optimized production build in `dist/` |
| `npm run preview` | Serves the production build locally for testing |

---

## 🧩 Component Overview

| Component | Responsibility |
| --- | --- |
| `App.jsx` | Holds cart and modal state; composes all sections |
| `NavBar.jsx` | Navigation, cart badge counter, reservation/cart triggers |
| `Hero.jsx` | Landing section with primary call to action |
| `Story.jsx` | Brand story and restaurant philosophy |
| `FeaturedDishes.jsx` | Menu grid; fires the "Add to Cart" handler |
| `Cart.jsx` | Slide-over drawer with quantity controls and totals |
| `BookTable.jsx` | Reservation modal with time-slot selection |
| `Contact.jsx` | Contact details and location |

---

## 🔄 State Management

State is managed with React hooks and lifted up to `App.jsx`:

- **`cartItems`**: array of items with quantities
- **`isCartOpen`**: controls the cart drawer visibility
- **`isBookingOpen`**: controls the reservation modal visibility

**Cart calculations:**

```text
Subtotal = Σ (item price × quantity)
Tax      = Subtotal × 0.08
Total    = Subtotal + Tax
```

---

## 🗺️ Roadmap

- [x] Responsive landing page
- [x] Cart drawer with quantity controls
- [x] Table reservation modal
- [ ] Persist cart using `localStorage`
- [ ] Backend integration for reservations
- [ ] Online payment / checkout flow
- [ ] Full menu page with category filters
- [ ] Dark mode
- [ ] Unit tests with Vitest and React Testing Library

---

## 🤝 Contributing

Contributions are welcome and appreciated!

1. Fork the project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m "Add some AmazingFeature"`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

⭐ If you like this project, give it a star!

</div>
