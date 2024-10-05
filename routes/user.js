const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { logMessage } = require("../middleware/loggingMiddleware");
const { limiter } = require("../middleware/rateLimitMiddleware");

//userControllers degine the logic inside this
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userControllers");

router.route("/register").post(logMessage, registerUser); //every time this endpoint is called, logMessage and registerUser functions will be executed (logic is in controllers)
router.route("/login").post(logMessage, limiter, loginUser);
router.route("/profile").get(logMessage, verifyToken, getUserProfile);
module.exports = router;
