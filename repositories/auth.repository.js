// const { Sequelize, QueryTypes } = require('sequelize');

class AuthRepository {
  constructor(Model) {
    this.Model = Model;
  }

  findByEmail = async (email) => {
    const user = await this.Model.findAll({
      where: { email },
    });
    return user;
  };

  createUser = async (nickname, hashed, email, phoneNumber, admin) => {
    if (admin === "1") {
      const userData = await await this.Model.create({
        nickname,
        password: hashed,
        email,
        phoneNumber,
        admin,
        point: 0,
      });

      return userData;
    }
    const userData = await this.Model.create({
      nickname,
      password: hashed,
      email,
      phoneNumber,
      admin,
    });

    return userData;
  };
}

module.exports = AuthRepository;
