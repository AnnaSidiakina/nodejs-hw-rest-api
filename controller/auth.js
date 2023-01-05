// const { signupUser } = require("../service/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../service/schemas/user");
const { validationSchema } = require("../service/schemas/contact");
const { Conflict, BadRequest, Unauthorized } = require("http-errors");
const { SECRET_KEY } = process.env;

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }
    // const { error } = validationSchema.validate(req.body);
    // if (error) {
    //   throw BadRequest("missing required name field");
    // }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const data = await User.create({ email, password: hashPassword });
    res.status(201).json({
      user: {
        email: data.email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized("Email not found");
    }
    // const { error } = validationSchema.validate(req.body);
    // if (error) {
    //   throw BadRequest("missing required name field");
    // }
    const passCompare = bcrypt.compareSync(password, user.password);
    if (!passCompare) {
      throw new Unauthorized("Password is wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
};
