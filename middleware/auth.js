const jwt = require('jsonwebtoken');

const AuthRepository = require('../repositories/auth.repository')

class IsAuth {
    jwtSecretKey = '9b3d1ec002d459170e7a09e04c72e7d57c78038e3468cb49971112c847128e7f' 
    AUTH_ERROR = { message: 'Authentication Error' };

    authRepository = new AuthRepository();

    isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
      return res.status(401).json(AUTH_ERROR);
    }
    const token = authHeader.split(' ')[1];
    console.log(token);

    // 여기까지는 token 출력이 잘 됨

    // try {
    //   //복호화 및 검증
      // const { userId } = jwt.verify(token, "9b3d1ec002d459170e7a09e04c72e7d57c78038e3468cb49971112c847128e7f");
      // const user = await this.authRepository.findById(userId);
      // console.log(user)
    //   res.locals.user = user;
    //   console.log(user);
    //   next();
    // } catch(error) {
    //   res.status(400).json({ message: 'Authentication Error' });
    // }
    return;
  }
}

module.exports = IsAuth;


// const jwtSecretKey = '9b3d1ec002d459170e7a09e04c72e7d57c78038e3468cb49971112c847128e7f' 
// const AUTH_ERROR = { message: 'Authentication Error' };

// export const isAuth = async (req, res, next) => {
//   const authHeader = req.get('Authorization');
//   if (!(authHeader && authHeader.startsWith('Bearer '))) {
//     return res.status(401).json(AUTH_ERROR);
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     //복호화 및 검증
//     const { userId } = jwt.verify(token, jwtSecretKey);
//     const user = await userRepository.findById(userId);
//     res.locals.user = user;
//     console.log(user);
//     next();
//   } catch(error) {
//     res.status(400).json({AUTH_ERROR})
//   }
//   return;
// }