// routes/posts.routes.js

const express = require("express");
const router = express.Router();

const PointController = require("../controllers/pointChange.controller");
const pointController = new PointController();

router.put("/change", pointController.changePoint);

module.exports = router;
