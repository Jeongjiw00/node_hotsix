import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';

// import * as userRepository from '../repositories/user.repository'
const AuthRepository = require('../repositories/auth.repository');

const jwtSecretKey = '9b3d1ec002d459170e7a09e04c72e7d57c78038e3468cb49971112c847128e7f' 
const expiresInSec = 86400

class AuthController {
  authRepository = new AuthRepository();

// 회원가입 

  signup = async (req, res, next) => {
    const { nickname, password, address, email, phoneNumber, admin} = req.body;
    const found = await userRepository.findByNickname(nickname);  
    if ( found ) {
      return res.status(409).json({ message: `${nickname} is already exists`});
    }
    const hashed = await bcrypt.hash(password, 12);
    const data = await userRepository.createUser({
      nickname,
      password: hashed,
      address,
      email,
      phoneNumber,
      admin,
    })
    const token = createJwtToken(); // 뭘로 만들건지?
    res.status(201).json({ token, username });
  }
  // 로그인

  login = async (req, res) => {
    const {nickname, password} = req.body;
    const user = await userRepositry.findByNickname(nickname);
    if (!user) {
      return res.status(401).json({ message: 'Invalid user or password'});
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) {
      return res.status(401).json({ message: 'Invalid user or password'});
    }
    const token = createJwtToken() // 뭘로만들건지? user id
    res.status(200).json({ token, nickname });
  }

  // jwt 토큰생성 함수
  //data로 임시 input 설정
  createJwtToken(id) {
    return jwt.sign(
      {id}, 
      jwtSecretKey, {expiresIn: expiresInSec,
      });
  }
}

module.exports = AuthController;
