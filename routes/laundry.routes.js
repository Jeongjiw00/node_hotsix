const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const LaundryController = require("../controllers/laundry.controller");
const laundryController = new LaundryController();
const upload = multer({ dest: "uploads/" });

// router.get('/', registerController.getPosts);
router.post("/apply", upload.single("file"), laundryController.createApply);
router.get("/:userId", laundryController.getApplyById);

module.exports = router;
