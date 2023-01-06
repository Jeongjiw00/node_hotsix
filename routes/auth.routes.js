
const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller")
const IsAuth = require("../middleware/auth")

const authController = new AuthController();
const auth = new IsAuth();


router.post('/signup', authController.signup);

router.post('/login', authController.login);


module.exports = router;
