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


// 유저 마이 페이지
app.get("/user", (req, res) => {
  res.render("userMyPage.ejs");
});

app.get("/owner", (req, res) => {
  res.render("ownerMyPage.ejs");
});

// 유저가 빨래 신청 ejs 연결
app.get("/laundry/apply", (req, res) => {
  res.render("index_jw.ejs", { test: false });
});
app.get("/laundry/:id", (req, res) => {
  res.render("index_jw.ejs", { test: true });
});

app.get("/owner/laundries", (req, res) => {
  res.render("ownerPage.ejs", { temp: 1 });
})
app.get("/owner/laundry", (req, res) => {
  res.render("ownerPage.ejs", { temp: 2 });
})


// 로그인 페이지 ejs 연결
app.get("/logIn", (req, res) => {
  res.render("logIn.ejs");
});

// 회원가입 페이지 ejs 연결
app.get("/signUp", (req, res) => {
  res.render("signUp.ejs");
});


//메인페이지 나중에 변경해야함~
// app.get("/", (req, res) => {
//   res.render("index_jw.ejs");
// });


//라우터,json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);


//포트설정
app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});

//내보내기
module.exports = app;
