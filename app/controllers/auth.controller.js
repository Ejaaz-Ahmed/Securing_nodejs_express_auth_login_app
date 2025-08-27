// app/controllers/auth.controller.js
import db from "../models/index.js";
import config from "../config/auth.config.js";
import logger from "../logger.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const User = db.user;
const Role = db.role;
export const signup = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    logger.info({
      event: "user_signup",
      username: req.body.username,
      email: req.body.email,
      status: "success",
    });

    res.send({ message: "User registered successfully!" });
  } catch (err) {
    logger.error({
      event: "user_signup",
      username: req.body.username,
      email: req.body.email,
      status: "failed",
      error: err.message,
    });

    res.status(500).send({ message: err.message });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
    });

    if (!user) {
      logger.warn({
        event: "login_attempt",
        username: req.body.username,
        status: "failed",
        reason: "User not found",
      });

      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      logger.warn({
        event: "login_attempt",
        username: req.body.username,
        status: "failed",
        reason: "Invalid password",
        username: req.body.username,
        ip: req.ip, // log IP for Fail2Ban
      });

      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    logger.info({
      event: "user_login",
      username: user.username,
      email: user.email,
      status: "success",
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    logger.error({
      event: "user_login",
      username: req.body.username,
      status: "failed",
      error: err.message,
    });

    res.status(500).send({ message: err.message });
  }
};

export const signout = async (req, res) => {
  try {
    logger.info({
      event: "user_signout",
      username: req.body.username || "unknown",
      status: "success",
    });

    res.status(200).send({ message: "User signed out successfully!" });
  } catch (err) {
    logger.error({
      event: "user_signout",
      username: req.body.username || "unknown",
      status: "failed",
      error: err.message,
    });

    res.status(500).send({ message: err.message });
  }
};
