const jwt = require('jsonwebtoken');
const AuthRepository = require('../repositories/auth.repository')

class IsAuth {
    // jwtSecretKey = '9b3d1ec002d459170e7a09e04c72e7d57c78038e3468cb49971112c847128e7f' 
    // AUTH_ERROR = { message: 'Authentication Error' };

    authRepository = new AuthRepository();

    isAuth = async (req, res, next) => {
      if(!req.cookies.token) {
        return res.status(401).json({ message: "Authentication Error"})
      }

      // 보낸 쿠키
      const authToken = req.cookies.token;
    // const authHeader = req.get('Authorization');
    // if (!(authHeader && authHeader.startsWith('Bearer '))) {
    //   return res.status(401).json(AUTH_ERROR);
    // }
    // const token = authHeader.split(' ')[1];

    try {
      // 복호화 검증
    const { userId } = jwt.verify(token, "9b3d1ec002d459170e7a09e04c72e7d57c78038e3468cb49971112c847128e7f");
    const user = await this.authRepository.findById(userId);
      res.locals.user = user;
      console.log(user);
      next();
    } catch(error) {
      res.status(400).json({ message: 'Authentication Error' });
    }
    // console.log(user)

    return;
  }
}

module.exports = IsAuth;