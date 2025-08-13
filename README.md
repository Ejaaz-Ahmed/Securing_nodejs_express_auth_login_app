# Secure Node.js Express Login & Registration with JWT – Enhanced Version by Ejaz Ahmed

This is an enhanced, secure, and modernized version of the original [Bezkoder's Node.js Express JWT Authentication Example](https://www.bezkoder.com/node-js-express-login-example/). It includes improvements for security, code quality, and ES module support.

---

## What’s Improved in This Fork

-  **Converted all code to ES Modules (import/export)**
-  **Added strong email & password validation using [`validator`](https://www.npmjs.com/package/validator)**
-  **Secured routes with `helmet`, `cookie-session`, and CORS headers**
-  **Enforced Foreign Key constraints in MySQL with Sequelize**
-  **Sanitized input to prevent weak credentials**
-  **Improved Role-based Access Control (User / Admin / Moderator)**
-  **Resolved all Sequelize sync issues (e.g., `createdAt`/`updatedAt` not null)**
-  **Removed vulnerabilities present in original version**
-  **Rewritten with clean, modular ES syntax**

---

## Folder Structure

```
├── app/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
├── config/
├── server.js
├── package.json
```

---

## Technologies Used

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JSON Web Token (JWT)
- cookie-session
- validator
- helmet

---

## Authentication & Authorization Flow

This app supports:

-  Signup with email and secure password
-  JWT-based login, stored securely in cookie-session
-  Admin, Moderator, and User role-based access
-  Logout support (session destruction)

---

## Project Setup

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### Install Dependencies

```bash
npm install
```

### Configure Database

Edit `config/db.config.js` with your MySQL credentials:

```js
export default {
  HOST: "localhost",
  USER: "your_mysql_user",
  PASSWORD: "your_mysql_password",
  DB: "your_db_name",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
```

### Start the Server

```bash
node server.js
```

---

## API Endpoints

| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| POST   | `/api/auth/signup`   | Register a new user    |
| POST   | `/api/auth/signin`   | Login and get JWT      |
| POST   | `/api/auth/signout`  | Destroy user session   |
| GET    | `/api/test/user`     | Access User board      |
| GET    | `/api/test/admin`    | Access Admin board     |
| GET    | `/api/test/mod`      | Access Moderator board |

---

## Reference to Original Repo

This project is based on:

🔗 [Bezkoder Node.js JWT Auth Example](https://www.bezkoder.com/node-js-express-login-example/)

> This fork enhances it with security hardening, ES modules, and project structure improvements.

---

## Future Enhancements

- Add rate limiting / brute-force protection
- Add CSRF token in cookies
- Add frontend (React/Vue/Angular) clients
- Unit testing with Jest

---

## Updates – Advanced Security & Final Reporting

I enhanced the **Node.js Express Authentication App** by performing advanced security hardening, logging setup, and penetration testing.  

### 🔹 Security Enhancements
- **Brute Force Protection** – Implemented rate limiting to block excessive failed login attempts.
- **Winston Logging** – Added `winston` logger to record security-related events in both console and `security.log`.
- **Basic Penetration Testing** – Used Nmap to scan service details and checked for unnecessary exposure.
- **Role Escalation Protection** – Verified that non-admin tokens cannot access admin routes.
- **Strong Validation** – Continued enforcing strong password & email validation using `validator`.
- **Helmet.js Middleware** – Applied HTTP security headers to mitigate common vulnerabilities.
- **HTTPS Recommendation** – App is ready to run behind HTTPS for secure data transmission.

### 🔹 Documentation
- Updated **Security Checklist** confirming all measures applied.
- Added **Final Detailed Documentation** for Week 3 work.

### 🔹 Tools Used
- **Postman** – API testing and role escalation checks.
- **Nmap** – Port scanning & service fingerprinting.
- **Winston** – Security and application logging.

---

**Outcome:**  
The application is now more secure, logs critical events, and prevents unauthorized role access & brute-force attacks. All checklist items are marked as passed.

## Author

**Ejaz Ahmed**  
Cyber Security & Full-stack Enthusiast

> Fork it, explore it, secure it! 🔒

