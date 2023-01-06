const express = require('express');
const router = express.Router();

const LaundryController = require("../controllers/laundry.controller");
const laundryController = new LaundryController();
const { upload } = require("../multer.js");

//고객 세탁물 신청
router.post("/user/apply", upload.single("file"), laundryController.getApplyById);

//고객 세탁물 불러오기
router.get("/user", laundryController.getApplyById);

//유저 포인트 조회
router.get("/user", laundryController.getUserPoint);

//유저 포인트 차감기능
router.put("/user", laundryController.changePoint);

module.exports = router;