<p align="center">

<img src="https://img.shields.io/badge/Status-Ongoing-green?style=for-the-badge" />
<img src="https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/Frontend-React%20%2B%20MUI-61DAFB?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/Backend-Node%20%2B%20Express-339933?style=for-the-badge&logo=node.js" />
<img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb" />
<img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge" />

</p>

<h1 align="center">🛒 KiranaBook</h1>
<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

<p align="center">
<b>Full Stack Business Management Web Application</b><br/>
A modern MERN-style platform to manage customers, transactions, analytics, and records.
</p>

<p align="center">

<img src="https://img.shields.io/github/stars/ParthKachchhi/KiranaBook?style=social" />
<img src="https://img.shields.io/github/forks/ParthKachchhi/KiranaBook?style=social" />
<img src="https://img.shields.io/github/last-commit/ParthKachchhi/KiranaBook" />

</p>

---

## 🚀 Live Demo

👉 https://kirana-book.vercel.app

---

## ✨ Key Features

- 🔐 Secure **JWT-based authentication & authorization**
- 📊 Interactive **business analytics dashboard** with charts
- ☁️ **Cloudinary** powered image & file uploads
- 📧 **Email notifications** via Nodemailer
- 🗂️ **MongoDB local + Atlas cloud** database support
- ⚡ RESTful **Node.js + Express** backend architecture
- 🎨 Responsive **React + MUI** user interface
- 🎬 Smooth animations using **Framer Motion**

---

## 🏗️ System Architecture

KiranaBook follows a **layered MERN-style architecture** ensuring scalability, maintainability, and security.

## 🏗️ System Architecture

KiranaBook follows a **layered MERN-style architecture** to ensure  
**scalability, maintainability, and security**.

```text
+-----------------------------+
|        React Frontend        |
|   UI • Routing • State • API |
+-------------+---------------+
              |
              |  HTTP (Axios)
              v
+-----------------------------+
|     Node.js + Express API    |
| Routes • Controllers • Auth  |
+-------------+---------------+
              |
              |  Mongoose ODM
              v
+-----------------------------+
|        MongoDB Database      |
|     Local + Atlas Cloud      |
+-------------+---------------+
              |
              |  External Services
              v
+-------------------------------------------+
| Cloudinary Storage • Email • JWT Auth     |
+-------------------------------------------+
```

This layered architecture ensures:

- scalability  
- maintainability  
- security  
- clean separation of concerns  

---

## 🛠️ Tech Stack

### 🎨 Frontend
- React.js  
- Material UI (MUI)  
- Axios  
- Chart.js & Recharts  
- Framer Motion  
- React Router  

### ⚙️ Backend
- Node.js  
- Express.js  
- Mongoose  
- Bcrypt.js  
- JSON Web Token (JWT)  
- Multer  
- Cloudinary  
- Nodemailer  
- Dotenv  
- Nodemon  

### 🗄️ Database
- MongoDB (Local)  
- MongoDB Atlas (Cloud)

---

## 🔐 Authentication & Security

- Password hashing using **bcrypt.js**  
- Protected API routes via **JWT tokens**  
- Secrets managed with **environment variables (.env)**  
- Separation of **public vs protected endpoints**

---

## 📊 Core Modules

### Customer Management
- Add, edit, and delete customers  
- Maintain transaction history  
- Structured MongoDB data storage  

### Transaction Handling
- Record and manage business transactions  
- CRUD-based REST API operations  
- Backend validation & secure processing  

### Dashboard & Analytics
- Real-time business insights  
- Charts powered by **Chart.js & Recharts**  

### Media Upload System
- File handling via **Multer**  
- Cloud storage with **Cloudinary**

### Email Automation
- Notifications using **Nodemailer**  
- Secure credential handling via `.env`

---

## 📁 Project Structure

```text
KiranaBook/
│
├── client/                    # React Frontend
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route-level screens
│   │   ├── services/          # API calls (Axios)
│   │   ├── hooks/             # Custom React hooks
│   │   ├── utils/             # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                    # Node.js + Express Backend
│   ├── controllers/           # Business logic
│   ├── routes/                # API route definitions
│   ├── models/                # Mongoose schemas
│   ├── middleware/            # Auth & error handling
│   ├── config/                # DB & cloud configuration
│   ├── uploads/               # Temporary file storage
│   ├── server.js              # Entry point
│   └── package.json
│
├── .env                       # Environment variables (not committed)
├── README.md                  # Project documentation
└── package.json               # Root scripts (optional)
```
---

## ⚙️ Local Development Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/ParthKachchhi/KiranaBook.git
cd KiranaBook
