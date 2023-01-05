const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const OwnerController = require("../controllers/owner.controller");
const ownerController = new OwnerController();


router.get("/laundries", authMiddleware, ownerController.getAllLaundries);
router.post("/laundry/:laundryId", authMiddleware, ownerController.chooseALaundryFromPendings);
router.get("/laundry", authMiddleware, ownerController.getALaundryInProgress);
router.patch("/laundry", authMiddleware, ownerController.changeALaundryStatus);

module.exports = router;