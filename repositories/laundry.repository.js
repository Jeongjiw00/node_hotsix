// const { laundry } = require("../models");

class LaundryRepository {
  constructor(Model) {
    this.Model = Model;
  }

  findApplyById = async (userId) => {
    const applies = await this.Model.findAll({ where: { userId: userId } });

    return applies;
  };

  createApply = async (
    laundryName,
    laundryContent,
    laundryAddress,
    laundryImg,
    requests,
    userId
  ) => {
    const createApplyData = await this.Model.create({
      laundryName,
      laundryContent,
      laundryAddress,
      laundryImg,
      requests,
      userId,
    });

    return createApplyData;
  };
}

module.exports = LaundryRepository;
