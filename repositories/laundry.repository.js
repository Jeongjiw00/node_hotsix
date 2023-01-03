// const { laundry } = require("../models");

class LaundryRepository {
  constructor(Model) {
    this.Model = Model;
  }

  findApplyById = async (id) => {
    const applies = await this.Model.findAll({ where: { userId: id } });

    console.log(applies);

    return applies;
  };

  createApply = async (
    laundryName,
    laundryContent,
    laundryAddress,
    laundryImg,
    requests,
    id
  ) => {
    const createApplyData = await this.Model.create({
      laundryName,
      laundryContent,
      laundryAddress,
      laundryImg,
      requests,
      userId: id,
    });

    return createApplyData;
  };
}

module.exports = LaundryRepository;
