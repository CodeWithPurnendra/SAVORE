<div align="center">

# 🍽️ SAVORÉ

### Fine Dining & Full-Stack Culinary Experience

A modern, responsive full-stack web application for a luxury fine-dining restaurant, built with **React**, **GSAP**, **Tailwind CSS**, **Node.js**, **Express**, and **PostgreSQL**.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Sequelize-4169E1?logo=postgresql&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?logo=greensock&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Database Schema](#-database-schema)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🍷 About the Project

**SAVORÉ** is an end-to-end full-stack web application designed for an upscale restaurant. It blends high-performance UI animations with a robust backend architecture:

- **Frontend**: Built with React and GSAP for immersive scroll animations and interactive modal drawers. Dynamic menu categories are fetched live via TheMealDB API.
- **Backend**: An Express.js REST API backed by PostgreSQL using Sequelize ORM for automatic schema migrations and transactional table synchronization.

---

## 🌟 Key Features

### 📅 Table Reservation & Persistence (`BookTable.jsx`)
- Interactive reservation modal with time-slot selection.
- Complete backend validation and persistence into PostgreSQL (`bookings` table).
- Backdrop blur overlays and smooth exit triggers via `Esc` key or overlay clicks.

### 🛒 Real-Time Shopping Cart (`Cart.jsx` & `NavBar.jsx`)
- Slide-over drawer with item quantity controls (increment, decrement, clear).
- Dynamic subtotal, tax (8%), and grand total calculations formatted in USD ($).
- Animated navbar counter badge driven by centralized `App.jsx` state.

### 🍽️ Dynamic Category Menu (`FeaturedDishes.jsx`)
- Real-time fetching of menu items via external dish APIs.
- Filterable category pills (Seafood, Pasta, Vegetarian, Dessert, Starter).
- Interactive dish detail view modal and smooth notification toast triggers.

### 📬 Contact & Location Management (`Contact.jsx`)
- Contact form handling general inquiries and custom feedback.
- Automated storage inside PostgreSQL (`contact_messages` table).

---

## 🛠️ Tech Stack

| Domain | Technology |
| --- | --- |
| **Frontend** | React 18, Tailwind CSS, GSAP (ScrollTrigger & ScrollTo), React Icons |
| **Backend** | Node.js, Express.js, Cors, Dotenv |
| **Database** | PostgreSQL, Sequelize ORM |
| **External API** | TheMealDB (Dynamic menu content feed) |
| **Build Tool** | Vite |

---

## 🗄️ Database Schema

Sequelize manages table structures automatically using database synchronization (`sequelize.sync({ alter: true })`).

1. **`bookings`**: Stores user reservations (`name`, `email`, `phone`, `guests`, `date`, `time`, `specialRequests`, `status`).
2. **`contact_messages`**: Tracks contact inquiries (`name`, `email`, `subject`, `message`).
3. **`menu_items`**: Custom catalog overrides (`name`, `description`, `price`, `category`, `isAvailable`, `image`).

---

## 📁 Project Structure

```text
savore/
├── sever/
│   ├── models/
│   │   ├── Booking.js       # Table schema for reservations
│   │   ├── Contact.js       # Table schema for inquiries
│   │   └── MenuItem.js      # Table schema for menu catalog
│   ├── routes/
│   │   ├── bookingRoutes.js # CRUD endpoints for reservations
│   │   ├── contactRoutes.js # Endpoints for contact messages
│   │   └── menuRoutes.js    # Endpoints for dish categories
│   ├── modules/
│   │   └── db.js            # Main database instance export
│   └── server.js            # Express server entry point & sync logic
│
└── frontend/
    ├── src/
    │   ├── Components/
    │   │   ├── BookTable/   # Reservation modal component
    │   │   ├── Cart/        # Slide-over cart drawer
    │   │   ├── Contact/     # Contact form section
    │   │   ├── FeaturedDishes/ # Category dish grid & detail modal
    │   │   ├── Hero/        # Entrance hero section
    │   │   ├── NavBar/      # Sticky nav with live cart badge
    │   │   └── Story/       # Restaurant philosophy section
    │   ├── App.jsx          # State orchestrator & handler setup
    │   ├── main.jsx         # Vite entry point
    │   └── index.css        # Tailwind CSS imports
    └── vite.config.js
```
## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher)
- PostgreSQL database running locally or hosted (e.g., [Neon.tech](https://neon.tech/))

### 1. Backend Setup

Open your terminal and navigate to the backend directory:

```bash
cd server
```

Install the dependencies:

```bash
npm install
```

Configure your environment variables:

```bash
cp .env.example .env
```

Start the backend server:

```bash
node server.js
```

The backend server will run at:

```text
http://localhost:5000
```

### 2. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Visit the application in your browser:

**http://localhost:5173**

---

## 🔑 Environment Variables

Create a `.env` file inside your backend directory:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=savore_db
DB_USER=postgres
DB_PASSWORD=your_password

CLIENT_URL=http://localhost:5173
```

**Important:** Replace `your_password` with your actual PostgreSQL password. Never commit your `.env` file to GitHub.

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check backend server status |
| GET | `/api/menu` | Fetch menu items |
| POST | `/api/bookings` | Create a table reservation |
| POST | `/api/contact` | Send a contact inquiry |

**Base URL (Local Development):**

```text
http://localhost:5000
```

---

## 🗺️ Roadmap

### Completed

- [x] Full-stack PERN architecture integration
- [x] Sequelize automatic table synchronization
- [x] Animated cart drawer with tax and subtotal calculations
- [x] GSAP scroll-triggered entrance animations
- [x] External meal API integration with USD pricing

### Upcoming Features

- [ ] Admin dashboard to manage reservations and update booking statuses
- [ ] User authentication (JWT / OAuth 2.0)
- [ ] Stripe payment gateway integration for online orders

---

## 📄 License

Distributed under the MIT License. See the `LICENSE` file for more information.

---

## ⭐ Credits

Created with ❤️ by **Purnendra**.

If you like this project, don't forget to give it a ⭐ on GitHub!
