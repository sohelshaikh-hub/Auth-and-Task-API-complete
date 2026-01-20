# PrimeTrade Backend Assignment

A secure Task Management API built with the MERN stack (Node.js, Express, MongoDB). This project features robust Authentication, Role-Based Access Control (RBAC), and full CRUD operations for tasks.

## 🚀 Key Features

- **JWT Authentication**: Secure login and registration with token-based sessions.
- **RBAC (Role-Based Access Control)**: Middleware to differentiate between 'User' and 'Admin' roles.
- **Task Management (CRUD)**: 
  - Create, Read, Update, and Delete tasks.
  - **Ownership Security**: Users can only interact with tasks they created.
- **Security**: Password hashing using `bcryptjs` and protected routes via custom middleware.
- **Database**: Organized data modeling with Mongoose (MongoDB).

## 🛠️ Tech Stack

- **Server**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Security**: JSON Web Tokens (JWT), BcryptJS
- **Tools**: Postman (Testing), Git/GitHub (Version Control)

## 📦 Getting Started

### 1. Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)

### 2. Installation
```bash
npm install

3. Configuration
Create a .env file in the root directory and add:

Code snippet

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_random_secret
4. Run the Project
Bash

# Development mode
npm run dev

# Production mode
npm start
🛣️ API Endpoints
Auth Routes
POST /api/v1/auth/register - Register a user (Role: user/admin)

POST /api/v1/auth/login - Login & get token

GET /api/v1/auth/admin-only - Admin-only test route (Requires Admin Token)

Task Routes (Authorization: Bearer <token>)
GET /api/v1/tasks - Fetch all tasks for the logged-in user

POST /api/v1/tasks - Create a new task

PUT /api/v1/tasks/:id - Update a task (Owner only)

DELETE /api/v1/tasks/:id - Delete a task (Owner only)
