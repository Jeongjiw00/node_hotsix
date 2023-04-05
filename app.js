const express = require('express');
const ejs = require('ejs');
const loginMiddleware = require('./middleware/loginCheck');
const cookieParser = require('cookie-parser');

const { upload } = require('./multer.js');
// const { Laundry, User } = require("./models");
const router = require('./routes');
const { urlencoded } = require('express');

const app = express();

const port = 4000;

app.use(cookieParser());

//ejs설정
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views')); //정적파일, 이미지파일

// 유저 마이 페이지

app.get('/user', loginMiddleware, (req, res) => {
  if (res.locals.user) {
    if (res.locals.user.admin === 0) {
      return res.render('userMyPage.ejs', { admin: 0, list: -1 });
    } else {
      return res.render('userMyPage.ejs', { admin: 1, list: -1 });
    }
  } else {
    return res.render('logIn.ejs');
  }
});

// app.get("/owner", loginMiddleware, (req, res) => {
//   if (res.locals.user) {
//     return res.render("ownerMyPage.ejs");
//   } else {
//     return res.render("logIn.ejs");
//   }
// });

// 유저가 빨래 신청 ejs 연결
app.get('/laundry/apply', async (req, res) => {
  res.render('index_jw.ejs', { test: false });
});
//유저별 빨래신청내역
app.get('/laundry', async (req, res) => {
  res.render('index_jw.ejs', { test: true });
});

// 사장-모든 신청목록들 불러오기
app.get('/owner/laundries', (req, res) => {
  return res.render('userMyPage.ejs', { admin: 1, list: 1 });
});
// 사장-자기가 받은 세탁물 보기
app.get('/owner/laundry', (req, res) => {
  return res.render('userMyPage.ejs', { admin: 1, list: 0 });
});

// 로그인 페이지 ejs 연결
app.get('/logIn', (req, res) => {
  res.render('logIn.ejs');
});

// 회원가입 페이지 ejs 연결
app.get('/signUp', (req, res) => {
  res.render('signUp.ejs');
});

// 작정되지않은 리뷰조회
app.get('/review', (req, res) => {
  res.render('reviewAble.ejs');
});
//작성된 리뷰조회
app.get('/review/done', (req, res) => {
  res.render('reviewDone.ejs');
});

//메인페이지 나중에 변경해야함~
// app.get("/", (req, res) => {
//   res.render("index_jw.ejs");
// });

//라우터,json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

//포트설정
app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

//내보내기
module.exports = app;
