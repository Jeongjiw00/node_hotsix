const jwt = require("jsonwebtoken");
const { user } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    //토큰이 존재하지 않을떄
    if (!accessToken) {
      res.locals.user = {};
      return next();
    }
    const { userId } = jwt.verify(
      accessToken,
      "my-secrect-key" //secretkey
    );

    const allUser = await user.findById(userId);
    console.log(allUser);
    const Id = allUser.id;
    const admin = allUser.admin;
    const nickname = allUser.nickname;

    res.locals.user = { Id, admin, nickname };
    console.log(user);
    next();
  } catch (error) {
    console.log(error);
    // 쿠키삭제
    res.clearCookie("accessToken");
    return res.status(500).json({ message: error });
  }
};
