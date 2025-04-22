# Frontend Setup (React + Tailwind)

## 1. Install dependencies

```
npm install
```

## 2. Start the development server

```
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

# Project Structure

- `src/pages/SignupPage.jsx`: User registration (with email verification)
- `src/pages/LoginPage.jsx`: User login
- `src/pages/Dashboard.jsx`: Dashboard after login
- `src/pages/AccountActions.jsx`: Update/Delete actions (with email verification)

---

# Tailwind CSS

Tailwind is preconfigured. Modify `tailwind.config.js` and `index.css` as needed.

---

# API Endpoints

The frontend expects the backend to be running at `http://localhost:5000` by default.
