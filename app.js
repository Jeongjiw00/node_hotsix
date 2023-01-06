const express = require("express");
const ejs = require("ejs");

const { upload } = require("./multer.js");
// const { Laundry, User } = require("./models");
const router = require("./routes");
const { urlencoded } = require("express");

const app = express();
const port = 4000;


//ejs설정
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/views")); //정적파일, 이미지파일

//라우터,json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

//포트설정
app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});

//내보내기
module.exports = app;
