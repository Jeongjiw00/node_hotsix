// routes/posts.routes.js

const express = require('express');
const router = express.Router();

const PointController = require('../controllers/point.controller');
const pointController = new PointController();

router.get('/userMyPage', pointController.getPoint);

module.exports = router;