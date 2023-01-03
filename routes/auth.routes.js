const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller")

authController = new AuthController();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

module.exports = router;