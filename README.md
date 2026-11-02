<div align="center">

# 🍽️ SAVORÉ

### Fine Dining & Full-Stack Culinary Experience

A modern, responsive full-stack web application for a luxury fine-dining restaurant, built with **React**, **Tailwind CSS**, **GSAP**, **Node.js**, **Express** and **PostgreSQL**.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)
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
- [Database Schema](#️-database-schema)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Roadmap](#️-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🍷 About the Project

**SAVORÉ** is an end-to-end full-stack web application for an upscale restaurant. It pairs an animated, immersive UI with a REST API and a relational database:

- **Frontend:** React and Vite, styled with Tailwind CSS. GSAP powers the scroll animations, and interactive modals and drawers handle reservations, the cart and checkout. Menu categories are fetched live from TheMealDB API.
- **Backend:** An Express.js REST API backed by PostgreSQL through the Sequelize ORM, with JWT-based authentication and automatic table synchronization.

---

## 🌟 Key Features

### 📅 Table Reservations
- Reservation modal with guest count, date and time-slot selection.
- Server-side validation (required fields, guest count, no past dates) and storage in PostgreSQL.
- Animated success screen, and the form resets on close.
- Close with the `Esc` key, the close button or the "Done" button.

### 🛒 Shopping Cart & Checkout
- Slide-over cart drawer with quantity controls (increment, decrement, clear).
- Live subtotal, 8% tax and grand total in USD.
- Checkout modal with delivery address and payment option selection.
- Orders are saved to PostgreSQL (`Orders` and `OrderItems`) for logged-in users, with a confirmation screen after a successful order.
- Navbar badge showing the live cart count.

### 🔐 Authentication
- User accounts with JWT-based authentication.
- Protected routes: placing an order requires a valid token.

### 🍽️ Dynamic Category Menu
- Menu items fetched in real time from TheMealDB.
- Filterable category pills (Seafood, Pasta, Vegetarian, Dessert, Starter).
- Dish detail modal and toast notifications.

### 📬 Contact Form
- General inquiries and feedback form.
- Messages stored automatically in PostgreSQL.

---

## 🛠️ Tech Stack

| Domain | Technology |
| --- | --- |
| **Frontend** | React 18, Vite, Tailwind CSS, GSAP (ScrollTrigger & ScrollTo), React Icons |
| **Backend** | Node.js, Express.js, CORS, Dotenv |
| **Database** | PostgreSQL, Sequelize ORM |
| **Auth** | JSON Web Tokens (JWT) |
| **External API** | TheMealDB (dynamic menu content) |

---

## 🗄️ Database Schema

Sequelize creates and updates tables automatically on server start (`sequelize.sync({ alter: true })`).

| Table | Purpose |
| --- | --- |
| **`Users`** | Registered accounts |
| **`Bookings`** | Table reservations (`name`, `email`, `phone`, `guests`, `date`, `time`, `specialRequests`, `status`) |
| **`Orders`** | Customer orders (total, delivery address, payment method) |
| **`OrderItems`** | Individual items belonging to an order |
| **`Contacts`** | Contact form messages |
| **`MenuItems`** | Custom menu catalog entries |

**Relationships:** a `User` has many `Bookings` and many `Orders`, and each `Order` has many `OrderItems`.

---

## 📁 Project Structure

```text
savore/
├── public/                     # Static assets
├── src/                        # React frontend
│   ├── Components/
│   │   ├── BookTable/          # Reservation modal
│   │   ├── Cart/               # Slide-over cart drawer
│   │   ├── CheckoutModal/      # Checkout & order confirmation
│   │   ├── Contact/            # Contact form section
│   │   ├── FeaturedDishes/     # Category dish grid & detail modal
│   │   ├── Hero/               # Hero section
│   │   ├── MessageAlert/       # Reusable success/error alert
│   │   ├── NavBar/             # Sticky nav with live cart badge
│   │   └── Story/              # Restaurant story section
│   ├── App.jsx                 # App state & handlers
│   ├── main.jsx                # Vite entry point
│   └── index.css               # Tailwind CSS imports
│
├── server/                     # Express backend
│   ├── modules/                # Sequelize models & DB connection
│   │   ├── db.js
│   │   ├── User.js
│   │   ├── Booking.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── menuRoutes.js
│   │   ├── contactRoutes.js
│   │   └── orderRoutes.js
│   └── server.js               # Entry point, middleware & DB sync
│
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/) running locally or hosted (for example on [Neon](https://neon.tech/))

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/savore.git
cd savore
```

### 2. Create the database

```sql
CREATE DATABASE savore_restaurant;
```

### 3. Backend setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder (see [Environment Variables](#-environment-variables)), then start the server:

```bash
node server.js
```

The API runs at **http://localhost:5000**. On first start, Sequelize creates all tables automatically.

### 4. Frontend setup

Open a new terminal in the project root:

```bash
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🔑 Environment Variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=savore_restaurant
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_long_random_secret

CLIENT_URL=http://localhost:5173
```

> **Important:** replace the placeholder values with your own. Never commit your `.env` file to GitHub.

---

## 🔗 API Endpoints

**Base URL (local):** `http://localhost:5000`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/api/health` | No | Check server status |
| POST | `/api/auth/*` | No | Register and log in users |
| GET | `/api/menu` | No | Fetch menu items |
| POST | `/api/bookings` | No | Create a table reservation |
| POST | `/api/contact` | No | Send a contact inquiry |
| POST | `/api/orders` | Bearer token | Place an order |

Protected routes expect the header `Authorization: Bearer <token>`.

---

## 🗺️ Roadmap

### Completed

- [x] Full-stack PERN architecture
- [x] Automatic Sequelize table synchronization
- [x] Animated cart drawer with tax and subtotal calculation
- [x] Table reservations with server-side validation
- [x] User authentication (JWT)
- [x] Checkout flow with order storage
- [x] GSAP scroll-triggered animations
- [x] External meal API integration

### Upcoming

- [ ] Admin dashboard to manage reservations and orders
- [ ] Online payments (Razorpay / Stripe)
- [ ] Email confirmations for bookings and orders
- [ ] Order history page for users

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "feat: add amazing feature"`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See the `LICENSE` file for more information.

---

## ⭐ Credits

Created with ❤️ by **Purnendra**.

If you like this project, consider giving it a ⭐ on GitHub!
