const express = require("express");
const router = express.Router();

//고객 세탁물신청,불러오기
const laundryRouter = require("./laundry.routes");
router.use("/laundry", laundryRouter);

//유저 포인트 조회
const userPointRouter = require("./userPoint.routes");
router.use("/user", userPointRouter);

//사장님 포인트 조회
const ownerPointRouter = require("./ownerPoint.routes");
router.use("/owner", ownerPointRouter);

//포인트 차감기능
const pointChangeRouter = require("./pointChange.routes");
router.use("/points", pointChangeRouter);
//로그인
const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

//리뷰관련
const reviewRouter = require("./review.routes");
router.use("/review", reviewRouter);
//사장님페이지관련
const ownerRouter = require("./owner.routes");
router.use("/owner", ownerRouter);

module.exports = router;
