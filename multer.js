const multer = require("multer");
const path = require("path");

// const fileFilter = (req, file, cb) => {
//   //확장자 필터링
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     //해당하는 mimetype만 받겠다는 의미
//     cb(null, true);
//   } else {
//     req.fileValidationError =
//       "jpg, jpeg, png, gif, webp 파일만 업로드 가능합니다!";
//     cb(null, false);
//   }
// };

const upload = multer({
  storage: multer.diskStorage({
    //폴더위치 지정
    destination: (req, file, done) => {
      done(null, "./views/images");
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      // aaa.txt => aaa+&&+129371271654.txt
      const fileName = path.basename(file.originalname, ext) + Date.now() + ext;
      done(null, fileName);
    },
  }),
  // fileFilter: fileFilter,
  limits: { fileSize: 30 * 1024 * 1024 },
});

module.exports = { upload };
