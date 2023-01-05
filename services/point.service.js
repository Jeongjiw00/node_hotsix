const PointRepository = require("../repositories/point.repository");

class PointService {
  pointRepository = new PointRepository();

  findPoint = async (id) => {
    const point = await this.pointRepository.findPoint(id);

    return {
      point: point.point,
    };
  };

  changePointById = async (id) => {
    const changePoint = await this.pointRepository.changePointById(id);

    return {
      changePoint: changePoint,
    };
  };
}

module.exports = PointService;
