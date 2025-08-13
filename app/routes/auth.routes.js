import { authJwt } from "../middleware/index.js";
import { verifySignUp } from "../middleware/verifySignUp.js";
import { signup, signin, signout } from "../controllers/auth.controller.js";

import rateLimit from "express-rate-limit";

// Limit repeated login attempts to 5 per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: {
    message: "Too many login attempts. Please try again after 15 minutes."
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


console.log("signup loaded:", typeof signup); // should log: "function"
console.log("verifySignUp:", verifySignUp);
export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    signup
  );

  app.post("/api/auth/signin", loginLimiter, signin);
  app.post("/api/auth/signout", signout);
}
