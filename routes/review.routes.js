const express = require('express');
const router = express.Router();

const ReviewsController = require('../controllers/reviews.controller');
const reviewsController = new ReviewsController();

// 리뷰 작성
router.post('/write', reviewsController.createReview);
// 작성되지 않은 리뷰
router.get('/', reviewsController.getReviews);
// 작성된 리뷰
router.get('/wrote', reviewsController.getWroteReview);

module.exports = router;
