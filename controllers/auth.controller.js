const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// import * as userRepository from '../repositories/user.repository'
const AuthRepository = require('../repositories/auth.repository');

const jwtSecretKey = '9b3d1ec002d459170e7a09e04c72e7d57c78038e3468cb49971112c847128e7f' 
const expiresInSec = 86400

const { user: User } = require("../models");

class AuthController {
  authRepository = new AuthRepository(User);

// 회원가입 

  signup = async (req, res, next) => {
    const { nickname, password, email, phoneNumber, admin} = req.body;
    const found = await this.authRepository.findByNickname(nickname);  
    if ( found.length > 0) {
      return res.status(409).json({ message: `${nickname} is already exists`});
    }
    const hashed = await bcrypt.hash(password, 12);
    const userId = await this.authRepository.createUser(nickname,
      hashed,      
      email,
      phoneNumber,
      admin,
    )
    
    const token = jwt.sign({ userId }, jwtSecretKey, {expiresIn: expiresInSec,
      });
    
    // createJwtToken(userId)
    res.status(201).json({ token, nickname });
  }
  // 로그인

  login = async (req, res) => {
    const {nickname, password} = req.body;
    const [user] = await this.authRepository.findByNickname(nickname);
    const dbPw = user.dataValues.password
    if (!user) {
      return res.status(401).json({ message: 'Invalid user or password'});
    }
    const isValidPassword = await bcrypt.compare(password, dbPw);
    if(!isValidPassword) {
      return res.status(401).json({ message: 'Invalid user or password'});
    }
    const userId = user.dataValues.id
    const token = jwt.sign(
      {userId}, 
      jwtSecretKey, {expiresIn: expiresInSec,
      }); // 뭘로만들건지? user id
    res.status(200).json({ token, nickname });
  }

  me = async (req, res) => {
    const [user] = await this.authRepository.findById(nickname);
    console.log(user);
  }

  // jwt 토큰생성 함수
  //data로 임시 input 설정
  // createJwtToken(id) {
    // return jwt.sign(
      // {id}, 
      // jwtSecretKey, {expiresIn: expiresInSec,
      // });
  // }
}

module.exports = AuthController;