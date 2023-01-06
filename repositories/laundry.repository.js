// const { laundry } = require("../models");
const { user } = require("../models");

class LaundryRepository {
  constructor(Model) {
    this.Model = Model;
  }

  findApplyById = async (id) => {
    const applies = await this.Model.findAll({ where: { userId: id } });

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

  findPoint = async (id) => {
    const point = await user.findByPk(id);
    return point;
  }

  changePointById = async (id) => {
    const userById = await user.findByPk(id);
    let point = userById.point;

    if (point - 10000 < 0) {
      return point - 10000;
    } else {
      const changePoint = await user.update(
        {
          point: point - 10000,
        },
        { where: { id: id } }
      );
    }

    const newUserById = await user.findByPk(id);
    const newPoint = newUserById.point;

    return newPoint;
  };
}

module.exports = LaundryRepository;
