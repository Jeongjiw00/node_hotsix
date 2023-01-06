const express = require("express");
const router = express.Router();

const authRouter = require('./auth.routes');
const usersRouter = require('./users.routes');
const ownersRouter = require('./owners.routes');

router.use('/laundries/', [authRouter, usersRouter, ownersRouter]);


module.exports = router;
