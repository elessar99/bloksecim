const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();


async function checkUser(req, res, next) {
  try {
    if (!req.headers.cookie) {
      return res.status(400).json({ message: "There isn't token a cookie." });
    }
    const tokenCookie = req.headers.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    const token = tokenCookie.split("=")[1];
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decodedToken.id });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    res.locals.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occured while checking user." });
  }
}

module.exports = checkUser
