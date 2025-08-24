
import helmet from "helmet";

import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieSession from "cookie-session";

const app = express();

import { globalLimiter } from './app/middleware/rateLimit.js';
app.use(globalLimiter);

app.use(helmet());

/* for Angular Client (withCredentials) */
// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:8081"],
//   })
// );

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// database
import db from "./app/models/index.js";
const { role, sequelize } = db;
const Role = role;

sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application. All the vulnerabilities of this app will be removed by EJAZ AHMED" });
});

// routes
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";

authRoutes(app);
userRoutes(app);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

import { corsOptions } from './app/config/cors.config.js';

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight

import { securityHeaders, hstsOptions } from './app/middleware/securityHeaders.js';
app.use(securityHeaders);
app.use(helmet.hsts(hstsOptions));


import requestLogger from "./app/middleware/requestLogger.js";
app.use(requestLogger);


import logger from "./app/logger.js";
logger.info(`Application started on port ${PORT}`);

app.use((err, req, res, next) => {
  logger.error(`Unhandled Error: ${err.message}`, { stack: err.stack });
  res.status(500).json({ message: "Something went wrong!" });
});
