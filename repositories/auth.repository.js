// const { Sequelize, QueryTypes } = require('sequelize');

class AuthRepository {
  constructor(Model) {
    this.Model = Model;
  }

  findByEmail = async (email) => {
    const user = await this.Model.findAll({
      where: { email: email },
    });
    return user;
  };

  createUser = async (nickname, hashed, email, phoneNumber, admin) => {
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
