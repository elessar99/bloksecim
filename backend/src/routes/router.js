const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controllers/authController");
const { deletePin, addCategory } = require("../controllers/userController");
const checkUser = require("../middlewares/authMiddleware");
const addPinToUsers = require("../controllers/pinController");

router.post("/register",register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/add-pin", addPinToUsers);
router.delete("/delete-pin", checkUser, deletePin);
router.post("/add-category", checkUser, addCategory);

module.exports = router;
