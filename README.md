# Mini CRM — Client Lead Management System

A simple CRM I built to manage client leads without the bloat of enterprise tools. It covers the basics — adding leads, tracking their status, dropping follow-up notes, and a quick stats overview at the top.

Built with the MERN stack over a couple of days as part of an internship task.

---

## What it does

- Register / login as an admin (JWT-based auth)
- See all your leads in one table — name, email, phone, source, status
- Move leads through stages: **New → Contacted → Converted**
- Add timestamped notes to any lead (follow-up reminders, call summaries, etc.)
- Add new leads manually or delete ones you don't need
- Search by name or email, filter by status
- Stats bar at the top showing total, new, contacted, and converted counts

---

## Tech used

- **Frontend** — React (Vite), plain CSS
- **Backend** — Node.js + Express
- **Database** — MongoDB with Mongoose
- **Auth** — JWT + bcryptjs

---

## Project structure

```
Task-2/
├── backend/
│   ├── config/db.js
│   ├── middleware/auth.js
│   ├── models/User.js
│   ├── models/Lead.js
│   ├── routes/auth.js
│   ├── routes/leads.js
│   ├── seed.js          ← run this to populate sample data
│   ├── server.js
│   └── .env
└── frontend/
    └── src/
        ├── api/axios.js
        ├── components/
        │   ├── StatsBar.jsx
        │   ├── AddLeadModal.jsx
        │   └── LeadRow.jsx
        ├── pages/
        │   ├── Login.jsx
        │   └── Dashboard.jsx
        └── App.jsx
```

---

## Running it locally

We need Node.js (v18+) and MongoDB running on port 27017.

**Backend**
```bash
cd backend
npm install
node server.js
```
Runs on http://localhost:5000

**Frontend**
```bash
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173

**Seed sample data** 
```bash
cd backend
node seed.js
```


---

## First time setup

1. Open http://localhost:5173
2. Hit **"Don't have an account? Register"**
3. Create your admin account
4. Dashboard loads with your leads — or run the seed script first if you want sample data right away

---

## API reference

| Method | Endpoint | What it does |
|--------|----------|--------------|
| POST | /api/auth/register | Create admin account |
| POST | /api/auth/login | Login |
| GET | /api/leads | Fetch all leads |
| GET | /api/leads/stats | Get counts by status |
| POST | /api/leads | Add a new lead |
| PUT | /api/leads/:id | Update lead or status |
| POST | /api/leads/:id/notes | Add a note to a lead |
| DELETE | /api/leads/:id | Delete a lead |
