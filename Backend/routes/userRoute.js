const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  forgotPassword,
} = require("../controllers/userController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").get(logout);

module.exports = router;
