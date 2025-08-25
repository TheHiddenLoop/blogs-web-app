# My Awesome Blog Web App

[🌐 Live App Blog App](https://blogs-web-app-orcin.vercel.app/)

A full-stack blog application where users can create, read, update, and delete blog posts. It also includes authentication, commenting, and profile management features, all wrapped in a clean and responsive UI.

## ✨ Features

- **User Authentication** – Sign up, log in, password reset, and email verification.
- **Blog Management** – Create, edit, and delete personal blog posts.
- **Comments** – Interact with posts by adding comments.
- **User Profiles** – View and update user details.
- **Responsive Design** – Works smoothly on desktop, tablet, and mobile.
- **Search/Filter** – (Optional) Search for blogs or filter by categories.
- **Saved Blogs** – (Optional) Bookmark or save blogs for later.


## 🛠️ Technologies Used

### Frontend

- **React.js** – For building the dynamic UI
- **Tailwind CSS** – For styling and responsive layout
- **Axios** – For sending requests to the backend
- **Recoil** – For state management


### Backend

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for Node.js
- **MongoDB + Mongoose** – Database and schema modeling
- **JWT** – Authentication and authorization
- **Cloudinary** – Image/media uploading
- **Nodemailer** – Sending emails (verification, reset links, etc.)


## 🚀 Getting Started

### Prerequisites

Make sure you have these installed before running the project:

- Node.js (LTS version recommended)
- npm or Yarn
- Git


### Installation

1. Clone the repo and go into the folder:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

2. Install frontend dependencies:

```bash
cd client
npm install  # or yarn install
```

3. Install backend dependencies:

```bash
cd ../server
npm install  # or yarn install
```

4. Create a `.env` file inside the **server** directory and add your environment variables:

```
PORT=3000
MONGO_URL=
JWT_SECRET=18e968180d9c48bacd7c9fa41f7037cb599fbc418e5480c750c04c8f954d5d697c5bae3fb39a86821480b15c6e57b386b59ad5d79ee0fd89a98cae7371012621
NODE_ENV=production
FRONTEND_URL=http://localhost:5173
GMAIL_USER=
GMAIL_PASS=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NODE_ENV=production

```


### Run the project

- Start the **backend server**:

```bash
cd server
npm start
```

Runs on: `http://localhost:5000`
- Start the **frontend app**:

```bash
cd client
npm run dev
```

Runs on: `http://localhost:3000`

Now open the app in your browser at:
👉 [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
├── client/                 \# Frontend (React) application
│   ├── public/             \# Public assets
│   ├── src/                \# React source code
│   │   ├── assets/         \# Images, icons, etc.
│   │   ├── components/     \# Reusable UI components
│   │   ├── layout/         \# Layout components (e.g., Navbar, Footer)
│   │   ├── lib/            \# Utility functions (e.g., axios)
│   │   ├── pages/          \# Individual pages/views
│   │   └── store/          \# State management stores (Zustand)
│   ├── index.html
│   ├── package.json
│   └── ...
└── server/                 \# Backend (Node.js/Express) application
├── controllers/        \# Logic for handling requests
├── lib/                \# Helper functions, external service integrations
├── middleware/         \# Express middleware
├── model/              \# Database schemas/models
├── node_modules/
├── routes/             \# API routes
├── .env                \# Environment variables
├── Example-env
├── package.json
├── server.js           \# Main server file
└── ...

```


5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License.

***

