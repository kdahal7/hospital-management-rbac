# Deploy HospitalManagement Live (Render)

This guide deploys:
- Spring Boot API + PostgreSQL on Render
- React frontend as a static site (Render Static Site or Netlify/Vercel)

## 1) Push code to GitHub

Render deploys from a GitHub repo.

## 2) Create PostgreSQL on Render

1. In Render Dashboard: New -> PostgreSQL
2. Choose a name (example: `hospital-db`)
3. After creation, copy:
   - Internal Database URL (recommended for backend connection)
   - Username, password, database name (optional if using full URL)

## 3) Deploy Spring Boot backend (Render Web Service)

Create a new Web Service from your GitHub repo and use:

- Runtime/Environment: `Docker` (recommended)
- Root Directory: leave empty (or `.`)
- Build Command: leave empty when using Docker
- Start Command: leave empty when using Docker

If you use Docker, add a `Dockerfile` at repo root:

```dockerfile
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app
COPY . .
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/hospitalManagement-0.0.1-SNAPSHOT.jar app.jar
CMD ["java","-jar","app.jar"]
```

If you do not use Docker:

- Root Directory: leave empty (or `.`)
- Build Command: `chmod +x mvnw; ./mvnw clean package -DskipTests`
- Start Command: `java -jar target/hospitalManagement-0.0.1-SNAPSHOT.jar`

Important: do not put build commands into Root Directory.

Set Environment Variables in Render:

- `SPRING_DATASOURCE_URL` = your Render Postgres JDBC URL
  - Example format: `jdbc:postgresql://<host>:5432/<db>`
  - Do not use `postgresql://...` here
- `SPRING_DATASOURCE_USERNAME` = your DB username
- `SPRING_DATASOURCE_PASSWORD` = your DB password
- `SPRING_JPA_HIBERNATE_DDL_AUTO` = `update`
- `APP_CORS_ALLOWED_ORIGINS` = frontend URL(s), comma-separated
  - Example: `https://hospital-frontend.onrender.com`
- `JWT_SECRET_KEY` (recommended if you externalize it later)

Your backend URL will look like:
- `https://<backend-service>.onrender.com/api/v1`

## 4) Deploy React frontend

Option A: Render Static Site

Use frontend folder:
- Root Directory: `hospitalManagement/frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment Variable:
  - `VITE_API_BASE_URL=https://<backend-service>.onrender.com/api/v1`

Option B: Netlify / Vercel

- Vercel Root Directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Env var: `VITE_API_BASE_URL=https://<backend-service>.onrender.com/api/v1`
- Add `frontend/vercel.json` for SPA routes:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 5) Verify production flow

1. Open frontend URL.
2. Register a user.
3. Login and open dashboard.
4. Confirm requests hit backend URL (browser devtools -> Network).
5. Test Swagger at:
   - `https://<backend-service>.onrender.com/api/v1/swagger-ui/index.html`

## 6) Common fixes

- CORS error:
  - Ensure `APP_CORS_ALLOWED_ORIGINS` contains exact frontend URL including `https://`.
- Database connection failure:
  - Verify DB host/port/user/password and JDBC format.
- 404 from frontend API calls:
  - Ensure `VITE_API_BASE_URL` includes `/api/v1`.

## Optional hardening

- Move `jwt.secretKey` to environment variable.
- Set `spring.jpa.show-sql=false` in production.
- Add Flyway/Liquibase for schema migration control.
