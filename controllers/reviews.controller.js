const ReviewService = require('../services/reviews.service');

class ReviewsController {
  reviewService = new ReviewService();

  // 작성되지않은 리뷰
  getReviews = async (req, res, next) => {
    const reviews = await this.reviewService.findReviewAble();

    res.status(200).json({ reviews });
  };

  // 작성된 리뷰조회
  getWroteReview = async (req, res, next) => {
    const laundryId = 1;
    const getReview = await this.reviewService.findAllWroteReview(laundryId);

    res.status(200).json({ getReview });
  };

  //리뷰 작성
  createReview = async (req, res, next) => {
    const { reviewText, laundryId } = req.body;
    const review = await this.reviewService.createReview(reviewText, laundryId);
    res.status(201).json(review);
  };
}

module.exports = ReviewsController;
