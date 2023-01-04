const express = require("express");
const router = express.Router();

const OwnerController = require("../controllers/owner.controller");
const ownerController = new OwnerController();


router.get("/laundries", ownerController.getAllLaundries);
router.post("/laundry/:laundryId", ownerController.chooseALaundryFromPendings);
router.get("/laundry", ownerController.getALaundryInProgress);
router.patch("/laundry", ownerController.changeALaundryStatus);

module.exports = router;