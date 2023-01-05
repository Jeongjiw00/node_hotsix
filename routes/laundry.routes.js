const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
// const multer = require("multer");
// const path = require("path");

const LaundryController = require("../controllers/laundry.controller");
const laundryController = new LaundryController();
const { upload } = require("../multer.js");

// router.get('/', registerController.getPosts);
router.post(
  "/apply",
  upload.single("file"),
  authMiddleware,
  laundryController.createApply
);
router.get("/", authMiddleware, laundryController.getApplyById);

module.exports = router;
