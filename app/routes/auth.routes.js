import { authJwt } from "../middleware/index.js";
import { verifySignUp } from "../middleware/verifySignUp.js";
import { signup, signin, signout } from "../controllers/auth.controller.js";


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

  app.post("/api/auth/signin", signin);
  app.post("/api/auth/signout", signout);
}
