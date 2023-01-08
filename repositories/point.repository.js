// repositories/posts.repository.js

const { user } = require("../models");

class PointRepository {
  findPoint = async (id) => {
    const point = await user.findByPk(id);
    return point;
  };

  changePointById = async (id) => {
    const userById = await user.findByPk(id);
    let point = userById.point;

    console.log(userById);

    if (userById.admin == 1) {
      await user.update(
        {
          point: point + 10000,
        },
        {
          where: { id },
        }
      );
    } else {
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
    }

    const newUserById = await user.findByPk(id);
    const newPoint = newUserById.point;

    return newPoint;
  };
}

module.exports = PointRepository;
