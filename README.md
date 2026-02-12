# NestJS JWT REST API

Simple REST API built using NestJS and TypeScript with JWT authentication and SQL database.

---

## 🚀 Features

- User Registration
- User Login (JWT Authentication)
- Post CRUD
- Owner-based Authorization
- SQL Database (MySQL)
- Modular Architecture
- DTO Validation
- Clean Type-safe Implementation

---

## 🏗 Architecture & Pattern

This project uses:

### 1️⃣ Modular Architecture (Feature-based)

Each feature is separated into its own module:

- AuthModule
- UsersModule
- PostsModule

This improves:
- Scalability
- Maintainability
- Code organization

---

### 2️⃣ Layered Pattern
Controller → Service → Repository → Database

- Controller: Handles HTTP requests
- Service: Business logic
- Repository: Database interaction
- Entity: Database schema

---

### 3️⃣ JWT Authentication

Authentication flow:

1. User registers
2. User logs in
3. Server returns JWT token
4. Token is used as Bearer Token
5. JwtGuard protects routes

JWT Payload:

```json
{
  "sub": userId,
  "email": "user@email.com"
}
```

---

4️⃣ Owner-based Authorization

Users can:

Create their own posts

View only their own posts

Update only their own posts

Delete only their own posts

Unauthorized access returns:

401 → Invalid / Missing token

403 → Not the owner

🗄 Database

MySQL

TypeORM

Entity Relations:

One User → Many Posts

📂 Project Structure
src/
 ├── auth/
 ├── users/
 ├── posts/
 ├── common/
 ├── app.module.ts
 └── main.ts
⚙️ Environment Variables

Create .env file:
```
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
```

JWT_SECRET=your_secret
JWT_EXPIRES_IN=1d
▶️ Running the App
npm install
npm run start:dev
