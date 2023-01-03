const express = require("express");
const router = express.Router();

//고객 세탁물신청,불러오기
const laundryRouter = require("./laundry.routes");
router.use("/laundry", laundryRouter);
<<<<<<< HEAD
//포인트 조회
const userPointRouter = require("./userPoint.routes");
router.use("/user", userPointRouter);

const ownerPointRouter = require("./ownerPoint.routes");
router.use("/owner", ownerPointRouter);

// //로그인
// const loginRouter = require("./login.routes");
// router.use("/login", loginRouter);
// //회원가입
// const signUpRouter = require("./signUp.routes");
// router.use("/signUp", signUpRouter);
// //리뷰관련
// const reviewRouter = require("./review.routes");
// const { request } = require("express");
// router.use("/review", reviewRouter);
=======
//포인트 차감기능
const pointChangeRouter = require("./pointChange.routes");
router.use("/points", pointChangeRouter);
//로그인
const loginRouter = require("./login.routes");
router.use("/login", loginRouter);
//회원가입
const signUpRouter = require("./signUp.routes");
router.use("/signUp", signUpRouter);
//리뷰관련
const reviewRouter = require("./review.routes");
router.use("/review", reviewRouter);
>>>>>>> dev

module.exports = router;
