const PointRepository = require("../repositories/pointChange.repository");

class PointService {
  pointRepository = new PointRepository();

  changePointById = async (id) => {
    const changePoint = await this.pointRepository.changePointById(id);

    return {
      changePoint: changePoint,
    };
  };
}

module.exports = PointService;
