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
    res.status(201).json({ message: "signup success!" });
  }
  // 로그인

  login = async (req, res) => {
    const {nickname, password} = req.body;
    const [user] = await this.authRepository.findByNickname(nickname);
    if (!user) {
      return res.status(401).json({ message: 'Invalid user or password'});
    }
    const dbPw = user.dataValues.password
    const isValidPassword = await bcrypt.compare(password, dbPw);
    if(!isValidPassword) {
      return res.status(401).json({ message: 'Invalid user or password'});
    }
    const userId = user.dataValues.id
    const userNickname = user.dataValues.nickname
    const adminNum = user.dataValues.admin

    // token 생성
    const token = jwt.sign(
      {userId, userNickname, adminNum}, 
      jwtSecretKey, {expiresIn: expiresInSec,
      }); 
    // 쿠키에 토큰 담아서 보내기 
    res.cookie('token', token, {httpOnly: true,secure: true});
    res.status(200).json({ message: "login success!"})
  }

  logout = async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'logout success'});
    // return res.redirect("/"); // 로그인 페이지로
  }
}

// me = async (req, res) => {
  //   const [user] = await this.authRepository.findById(nickname);
  //   console.log(user);
  //   res.status(200).json({ message: "success"});
  // }

module.exports = AuthController;