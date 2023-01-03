// repositories/posts.repository.js

const { user } = require("../models");

class PointRepository {
  changePointById = async (id) => {
    const userById = await user.findByPk(id);
    let point = userById.point;

    const changePoint = await user.update(
      {
        point: point - 10000,
      },
      { where: { id: id } }
    );

    const newUserById = await user.findByPk(id);
    const newPoint = newUserById.point;

    return newPoint;
  };
}

module.exports = PointRepository;