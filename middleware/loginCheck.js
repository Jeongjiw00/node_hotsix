const jwt = require("jsonwebtoken");
const { user } = require("../models");

module.exports = async (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie) {
    res.locals.user = false;
    next();
    return;
  }

  const [authType, authToken] = cookie.split("=");
  if (!authToken || authType !== "accessToken") {
    res.locals.user = false;
    next();
    return;
  }
  try {
    const { userId } = jwt.verify(
      authToken,
      "my-secrect-key" //secretkey
    );

    console.log(userId, 84561324515465);

    user.findByPk(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    res.locals.user = false;
    next();
  }
};
