const ReviewRepository = require('../repositories/reviews.repository');

class ReviewService {
  reviewRepository = new ReviewRepository();

  // 작성되지않은 리뷰
  findReviewAble = async () => {
    const allReviews = await this.reviewRepository.findReviewAble();

    allReviews.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allReviews.map((review) => {
      return {
        reviewId: review.laundryId,
        reviewName: review.laundryName,
        reviewContent: review.laundryContent,
        reviewImg: review.laundryImg,
        createdAt: review.createdAt,
      };
    });
  };

  // 작성된 리뷰
  findAllWroteReview = async (laundryId) => {
    const findAllWroteReview = await this.reviewRepository.findAllWroteReview(
      laundryId
    );

    return findAllWroteReview.map((WroteReview) => {
      return {
        reviewId: WroteReview.reviewId,
        reviewText: WroteReview.reviewText,
        reviewRates: WroteReview.reviewRates,
        reviewFinish: WroteReview.reviewFinish,
        createdAt: WroteReview.createdAt,
      };
    });
  };

  createReview = async (reviewText, laundryId) => {
    await this.reviewRepository.createReview(reviewText, laundryId);
  };
}

module.exports = ReviewService;
