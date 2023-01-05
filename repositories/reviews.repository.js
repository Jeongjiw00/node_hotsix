const { review, laundry:Laundry } = require('../models');

class ReviewRepository {
  // 세탁서비스조회
  findReviewAble = async () => {
    console.log("########################################################");

    // const allReviews = await review.findAll();

    const allReviews = await Laundry.findAll({
      where: {status: 4}
    })


    console.log("########################################################");
    return allReviews;
  };

  // 작성된 리뷰조회
  findAllWroteReview = async (id) => {

    const reviews = await review.findAll({});
    // const getReviews = await review.findAll({
    //   where: { id },
    // });

    // const getReview = getReviews.map((laundry) => {
    //   return [laundry.laundryId];
    // });

    // const getReviewInfo = await review.findAll({
    //   order: [['createdAt', 'desc']],
    //   where: { laundryId: getReview },
   

    return reviews;
  };

  createReview = async (reviewText, laundryId) => {

    const reviewRates = 3;

    await review.create({reviewText, laundryId, reviewRates});

    return true;       //
      
  };
  //   // 작성된 리뷰
  //   findLaundryById = async (laundryId) => {
  //     const laundry = await review.findByPk(laundryId);

  //     return laundry;
  //   };
}

module.exports = ReviewRepository;
