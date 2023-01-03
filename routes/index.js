const express = require("express");
const router = express.Router();

//고객 세탁물신청,불러오기
const laundryRouter = require("./laundry.routes");
router.use("/laundry", laundryRouter);
//로그인
const loginRouter = require("./auth.routes");
router.use("/login", loginRouter);
//회원가입
const signUpRouter = require("./signUp.routes");
router.use("/signUp", signUpRouter);
//리뷰관련
const reviewRouter = require("./review.routes");
router.use("/review", reviewRouter);

module.exports = router;
