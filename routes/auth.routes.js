const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");

const AuthController = require("../controllers/auth.controller");
const authController = new AuthController();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

//토큰검증API
router.get("/login/check", authMiddleware, async (req, res) => {
  res.json({ user: res.locals.user });
});

module.exports = router;
