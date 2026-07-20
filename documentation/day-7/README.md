# Day 7 - Authentication & Security

## Overview
This project demonstrates Authentication and Security using Node.js, Express.js, MongoDB, JWT, and bcrypt.

## Features
- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes
- Role-Based Access Control (Admin)
- Refresh Token
- Logout API
- Input Validation
- Error Handling

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- express-validator
- dotenv
- CORS

## Project Structure

```
day-7/
│── middleware/
│   ├── authMiddleware.js
│   ├── adminMiddleware.js
│   └── roleMiddleware.js
│
│── models/
│   └── User.js
│
│── routes/
│   └── authRoutes.js
│
│── server.js
│── package.json
│── .env
│── README.md
```

## API Endpoints

### Register
```
POST /api/auth/register
```

### Login
```
POST /api/auth/login
```

### Profile (Protected)
```
GET /api/auth/profile
```

### Admin Route
```
GET /api/auth/admin
```

### Refresh Token
```
POST /api/auth/refresh-token
```

### Logout
```
POST /api/auth/logout
```

## Environment Variables

Create a `.env` file:

```
MONGO_URL=mongodb://127.0.0.1:27017/portfolioDB

JWT_SECRET=mySecretKey123
JWT_EXPIRES_IN=1h

REFRESH_SECRET=myRefreshSecret123
REFRESH_EXPIRES_IN=7d
```

## Learning Outcomes

- Authentication using JWT
- Password Security with bcrypt
- Authorization using Role-Based Access Control
- Refresh Token implementation
- Protected APIs
- OWASP Security Basics

## Author

Karina Katre