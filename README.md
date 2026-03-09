# Full Stack Authentication & RBAC System

A full-stack web application demonstrating JWT-based authentication and Role-Based Access Control (RBAC) using **Spring Boot** (backend) and **React + TypeScript** (frontend).

---

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.5.3
- Spring Security + JWT (jjwt 0.12.6)
- Spring Data JPA + Hibernate
- PostgreSQL
- MapStruct
- Lombok
- Maven
- Swagger / OpenAPI (springdoc)

### Frontend
- React 18 + TypeScript
- Vite
- React Router v6
- React Query (@tanstack/react-query)
- Axios
- React Hook Form
- TailwindCSS

---

## Features

- User registration with Name, Email, Password, Role (`USER` / `ADMIN`)
- JWT-based login — token stored in `localStorage`
- Token automatically attached to all protected API requests via Axios interceptor
- Protected frontend routes (redirects to `/login` if unauthenticated)
- Role-based dashboard:
  - **Public** content visible to everyone
  - **User Content** card visible to `USER` and `ADMIN`
  - **Admin Content** card visible to `ADMIN` only
- Logout functionality
- Password validation (min 8 chars, must contain letter + number)
- Loading and error states on all forms

---

## Project Structure

```
hospitalManagement/
├── src/                        # Spring Boot backend
│   └── main/java/SpringAssignment/hospitalManagement/
│       ├── controller/         # REST controllers (Auth, RBAC, etc.)
│       ├── dto/                # Request/Response DTOs
│       ├── entity/             # JPA entities (User, Patient, Doctor...)
│       ├── security/           # JWT filter, AuthService, WebSecurityConfig
│       ├── repository/         # Spring Data repositories
│       ├── service/            # Business logic
│       └── mapper/             # MapStruct mappers
├── frontend/                   # React + TypeScript frontend
│   └── src/
│       ├── pages/              # Login, Register, Dashboard, Unauthorized
│       ├── components/         # Navbar, ProtectedRoute
│       ├── context/            # AuthContext (JWT state management)
│       ├── api/                # Axios instance + API calls
│       └── types/              # TypeScript types
└── README.md
```

---

## Prerequisites

- Java 17
- Maven 3.6+
- Node.js 18+
- PostgreSQL 14+

---

## Setup Instructions

### 1. Database Setup

Open PostgreSQL and create the database:

```sql
CREATE DATABASE "hospitalDB";
```

> Default credentials used: username `postgres`, password `k6226`.  
> To change them, update `src/main/resources/application.properties`.

### 2. Backend Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd hospitalManagement

# Build the project
mvn clean package -DskipTests

# Run the backend (starts on port 8081)
java -jar target/hospitalManagement-0.0.1-SNAPSHOT.jar --server.port=8081
```

Backend starts at: `http://localhost:8081/api/v1`

> **Note:** `spring.jpa.hibernate.ddl-auto=create` will automatically create all tables on first run.

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend starts at: `http://localhost:5173`  
All `/api` requests are proxied to `http://localhost:8081`.

---

## API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/v1/auth/signup` | Public | Register a new user |
| POST | `/api/v1/auth/login` | Public | Login, returns JWT token |
| GET | `/api/v1/public/welcome` | Public | Public content |
| GET | `/api/v1/user/dashboard` | USER / ADMIN | User-level content |
| GET | `/api/v1/admin/dashboard` | ADMIN only | Admin-level content |

### Swagger UI
```
http://localhost:8081/api/v1/swagger-ui/index.html
```

---

## Usage

1. Open `http://localhost:5173/register`
2. Register with a name, email, password and choose role `USER` or `ADMIN`
3. Login at `http://localhost:5173/login`
4. Dashboard shows content based on your role:
   - `USER` → sees Public + User Content
   - `ADMIN` → sees Public + User Content + Admin Content

---

## Screenshots

### USER Dashboard

<img width="1919" height="847" alt="Screenshot 2026-03-09 172224" src="https://github.com/user-attachments/assets/8a64f6b4-b712-41a0-b9aa-fd750f2ceb8d" />

### ADMIN Dashboard

<img width="1919" height="1002" alt="Screenshot 2026-03-09 172254" src="https://github.com/user-attachments/assets/4a0a4b49-4478-49ab-80bd-eaa40dbb8efc" />

