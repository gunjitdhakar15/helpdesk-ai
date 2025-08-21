# Wexa AI Support Ticket System

An AI-assisted support ticket management system built as part of the Wexa Assignment.  
The app allows users to register, log in, create support tickets, and track their status.  
In the future, AI will classify and suggest ticket resolutions automatically.

---

## 🚀 Features (Current)
- User authentication (Register/Login) with JWT
- Role-based access (User, Agent, Admin)
- Create and manage support tickets
- Basic ticket status workflow (`open → in_review → closed`)
- MongoDB backend with secure password hashing
- React frontend with Material UI for a clean UI

---

## 🛠 Tech Stack
- **Frontend:** React, Material UI, Axios, Vite
- **Backend:** Node.js, Express, MongoDB, JWT, Bcrypt
- **Database:** MongoDB Atlas (or local MongoDB)
- **Other Tools:** Git, Postman for API testing

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/wexa-assignment.git
cd wexa-assignment
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
Create a .env file inside backend/:

ini
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_KEY=your_secret_key
Run backend:

bash
Copy code
npm start
Server runs on http://localhost:5000

3️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
Run frontend:

bash
Copy code
npm run dev
App runs on http://localhost:5173

✅ Usage
Register a new account

Login to receive JWT token

Create a support ticket

View ticket list and statuses

📌 Roadmap / Pending Features
 AI-powered ticket classification (NLP model integration)

 Admin dashboard with analytics

 Role-based ticket assignment (auto-assign to agents)

 Better UI/UX design polish

 Deployment to cloud (Render / Vercel / Netlify)

🐞 Problems Faced & Solutions
Tailwind not working with Vite → Resolved by removing Tailwind configs and using Material UI instead.

Case sensitivity in imports (Windows issue) → Fixed by renaming Ticket.js properly.

Frontend lost accidentally → Rebuilt from scratch with cleaner folder structure.

API import errors (../api) → Created proper api.js Axios instance and fixed paths.

🤝 Contribution
If you'd like to improve this project, feel free to fork and submit PRs.
Suggestions and improvements are always welcome!

📜 License
This project is for educational/demo purposes. No license applied yet.

yaml
Copy code

---

⚡ I’ve also added a **“Problems Faced & Solutions”** section (good for interviews ✅).  

Want me to also generate a **demo script (step-by-step)** you can follow wh