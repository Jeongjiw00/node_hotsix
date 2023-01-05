// repositories/posts.repository.js

const { user } = require("../models");

class PointRepository {
  findPoint = async (id) => {
    const point = await user.findByPk(id);
    return point;
  };
}

module.exports = PointRepository;
