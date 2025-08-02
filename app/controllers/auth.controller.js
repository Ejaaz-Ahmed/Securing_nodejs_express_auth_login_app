import validator from "validator";
import db from "../models/index.js";
import config from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

export const signup = async (req, res) => {
  try {
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).send({ message: "Invalid email format" });
    }

    if (!validator.isStrongPassword(req.body.password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })) {
      return res.status(400).send({
        message: "Password is too weak. Use at least 8 characters, with uppercase, lowercase, number, and special character."
      });
    }

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      await user.setRoles(roles);
    } else {
      await user.setRoles([1]); // Default role
    }

    res.send({ message: "User registered successfully!" });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });
    const roles = await user.getRoles();
    const authorities = roles.map(role => "ROLE_" + role.name.toUpperCase());

    req.session.token = token;

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accesstoken: token,
    });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const signout = async (req, res) => {
  try {
    req.session = null;
    res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    res.status(500).send({ message: "Unable to sign out!" });
  }
};
