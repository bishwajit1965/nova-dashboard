# 🚀 Nova Dashboard, a Role-Based SaaS Platform with Plan & Feature Access

A full-featured role-based web app with authentication, subscription plans, and feature-based access — designed as a non-multi-tenant SaaS for learning, showcasing, or real-world use.

---

## 🛠️ Tech Stack

**Backend:**

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Access/Refresh Tokens)

**Frontend:**

- React + Vite
- Tailwind CSS
- React Query
- React Router DOM

**Others:**

- Lucide Icons
- Toast Notifications
- Context API

---

## 📦 Features

### ✅ Authentication

- Secure Register, Login, Logout
- Refresh Token handling
- Password reset functionality

### ✅ User Roles

- `user`, `writer`, `editor`, `admin`
- Each role has a separate dashboard (Unified View)

### ✅ Plans & Feature Access

- Predefined Plans: `free`, `pro`, `premium`, `enterprise`
- Plans define accessible features (by key)
- Roles get features according to their plan

### ✅ Plan Management

- Users can upgrade or delete their current plan
- Plan features shown with icons and descriptions
- Mock billing logic implemented for plan change

### ✅ Admin Tools (Ready to Expand)

- Admin can define roles, plans, features (future scope)

---

## 🎯 Use Cases

### 📚 Portfolio Project

Use this app to showcase:

- Full authentication system
- Role-based routing
- Feature gating with plans
- Complex frontend + backend integration

### 🧪 Practice Ground

Use this codebase to:

- Learn how to manage access control
- Build from starter project
- Add monetization (Stripe ready foundation)

### 🛠️ Standalone Utility

- Turn into an internal tool or starter kit for a SaaS
- Add Stripe and go live

---

## 🧭 How to Run

### 1. Clone the repo

```bash
git clone https://github.com/your-username/your-repo-name
cd your-repo-name
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

- Create `.env` with Mongo URI, JWT secrets

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📌 Future Enhancements (Optional)

- Stripe Integration for real billing
- Admin dashboard to manage users/plans
- Multi-tenant structure for SaaS apps
- Audit Logs / Activity Feed

---

## 💡 Inspiration

This project is meant to simulate a commercial SaaS-like experience, but simplified for clarity and learning. Inspired by real-world SaaS platforms.

---

## 🧑‍💻 Author

**Your Name:** Bishwajit Paul

Contributions welcome if open-sourced!

---

## 📸 Demo Screenshots (Optional)

_Add some demo screenshots here once deployed or captured._

---

## 📬 Contact

Feel free to reach out on GitHub or LinkedIn for collaboration or questions.

---

### ✅ All systems are ready. You’re now at the final polish stage. 🚀

### Pending tasks

## 📚 Documentation

- [Project Policies](./PROJECT_POLICIES.md)
