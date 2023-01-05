const AuthService = require("../services/auth.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const jwtSecretKey =
//   "9b3d1ec002d459170e7a09e04c72e7d57c78038e3468cb49971112c847128e7f";
// const expiresInSec = 86400;

class AuthController {
  authService = new AuthService();
  // 회원가입(email도 동일하면 안됨!)
  signup = async (req, res, next) => {
    try {
      const { nickname, password, email, phoneNumber, admin } = req.body;
      if (!nickname || !password || !email || !phoneNumber || !admin) {
        return res.status(400).json({ message: "모든 값을 입력하세요!" });
      }

      const foundByEmail = await this.authService.findByEmail(email);

      if (foundByEmail.length > 0) {
        return res.status(409).json({ message: `${email} is already exists` });
      }

      const hashed = await bcrypt.hash(password, 12);

      if (admin === "1") {
        const point = 0;
        const createUser = await this.authService.createUser(
          nickname,
          hashed,
          email,
          phoneNumber,
          admin,
          point
        );

        return res
          .status(201)
          .json({ data: createUser, message: "회원가입완료!" });
      }

      const createUser = await this.authService.createUser(
        nickname,
        hashed,
        email,
        phoneNumber,
        admin
      );

      res.status(201).json({ data: createUser, message: "회원가입완료!" });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };

  // 로그인
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      // console.log(req.body);
      // console.log(email);

      const user = await this.authService.findByEmail(email);
      // console.log(user, 456465);
      const passwordTest = await bcrypt.compare(password, user[0].password);
      // console.log(passwordTest, 78978978);
      if (user.length === 0 || !passwordTest) {
        return res
          .status(401)
          .json({ message: "사용자가 없거나 비밀번호가 틀렸습니다!" });
      }

      const accessToken = jwt.sign(
        {
          userId: user[0].id,
          userNickname: user[0].nickname,
          admin: user[0].admin,
        },
        "my-secrect-key", //비밀키
        { expiresIn: "1d" }
      );

      // 쿠키에 토큰 담아서 보내기
      // res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
      res.cookie("accessToken", accessToken);

      //쿠키의 id값을 가져오고 싶음!----------------------------------------------------
      // return res.redirect("/laundry/");
      return res.status(200).json({ message: "로그인완료!" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "로그인실패!" });
    }
  };

  //로그아웃
  logout = async (req, res) => {
    res.clearCookie("accessToken");
    return res.json({ message: "logout success" });
    // return res.redirect("/"); // 로그인 페이지로
  };
}

module.exports = AuthController;
