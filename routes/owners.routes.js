//express 불러오기
const express = require("express");
const router = express.Router();

const OwnerController = require("../controllers/owner.controller");
const ownerController = new OwnerController();

//사장님 마이페이지 포인드 가져오기
router.get("/owner/laundries", ownerController.getAllLaundries);

router.post("/owner/laundry/:laundryId", ownerController.chooseALaundryFromPendings);

router.get("/owner/laundry", ownerController.getALaundryInProgress);

router.patch("/owner/laundry", ownerController.changeALaundryStatus);


module.exports = router;