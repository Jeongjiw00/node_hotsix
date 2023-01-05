const AuthRepository = require("../repositories/auth.repository");

const { user } = require("../models/index");

class AuthService {
  authRepository = new AuthRepository(user);

  findByEmail = async (email) => {
    const userByEmail = await this.authRepository.findByEmail(email);
    console.log(userByEmail);

    return userByEmail.map((user) => {
      return { password: user.password, email: user.email };
    });
  };

  createUser = async (nickname, hashed, email, phoneNumber, admin) => {
    if (admin === "1") {
      const point = 0;
      const createUserData = await this.authRepository.createUser(
        nickname,
        hashed,
        email,
        phoneNumber,
        admin,
        point
      );

      return {
        nickname: createUserData.nickname,
        password: createUserData.password,
        email: createUserData.email,
        phoneNumber: createUserData.phoneNumber,
        admin: createUserData.admin,
        point: createUserData.point,
      };
    }

    const createUserData = await this.authRepository.createUser(
      nickname,
      hashed,
      email,
      phoneNumber,
      admin
    );

    return {
      nickname: createUserData.nickname,
      password: createUserData.password,
      email: createUserData.email,
      phoneNumber: createUserData.phoneNumber,
      admin: createUserData.admin,
    };
  };
}

module.exports = AuthService;
