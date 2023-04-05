// routes/posts.routes.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const PointController = require("../controllers/point.controller");
const pointController = new PointController();

router.get("/", authMiddleware, pointController.getPoint);
router.put("/change", authMiddleware, pointController.changePoint);

module.exports = router;
