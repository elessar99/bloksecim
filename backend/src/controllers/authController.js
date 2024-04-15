const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

async function register(req, res) {
  const { username, password, email } = req.body; // email alanını ekledim

  try {
    if (!username || !password || !email) {
      return res.status(400).json({ message: "Fill all fields." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      password: hashedPassword,
      email: email,
      categories: [],
      pinList: [],
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      SECRET_KEY
    );

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User was registered successfully!",
        user: {
          username: user.username,
          email: user.email,
        },
      });
  } catch (error) {
    console.error("Error in registering user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function login(req, res) {
  const { username, password } = req.body; // password ve username düzeltildi
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Fill all fields." });
    }
    if (username && password) {
      let user;
      user = await User.findOne({ username });

      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          const token = jwt.sign(
            {
              id: user._id,
            },
            SECRET_KEY
          );
          res
            .status(200)
            .cookie("token", token, {
              httpOnly: true,
              maxAge: 365 * 24 * 60 * 60 * 1000,
            })
            .json({
              message: "You succesfully logged in.",
              user: {
                username: user.username,
                email: user.email,
                categories: user.categories,
                pinList:user.pinList
              },
            });
        } else {
          res.status(400).json({ message: "Incorrect Password" });
        }
      } else {
        res
          .status(400)
          .json({ message: "Your email or password is incorrect." });
      }
    }
  } catch (error) {
    console.log("Error in login user.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

function logout(req, res) {
  res
    .cookie("token", "", { httpOnly: true, maxAge: 1 })
    .json({ message: "You succesfully logged out!" });
}

module.exports = {
  register,
  login,
  logout,
};
