const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller")
const IsAuth = require("../middleware/auth")

authController = new AuthController();
auth = new IsAuth();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

// 실험용
router.get('/me', auth.isAuth, authController.me)

module.exports = router;