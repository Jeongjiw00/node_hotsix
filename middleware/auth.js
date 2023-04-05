const jwt = require("jsonwebtoken");
const { user } = require("../models");

module.exports = async (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie) {
    return res.status(401).json({ message: "로그인 후 이용가능합니다." });
  }
  const [authType, authToken] = cookie.split("=");
  if (!authToken || authType !== "accessToken") {
    res.status(401).send({
      message: "로그인 후 이용가능합니다.",
    });
    return;
  }
  try {
    const { userId } = jwt.verify(
      authToken,
      "my-secrect-key" //secretkey
    );

    user.findByPk(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    // // 쿠키삭제
    // res.clearCookie("accessToken");
    return res.status(401).json({ message: "로그인 후 이용가능합니다!" });
  }
};
