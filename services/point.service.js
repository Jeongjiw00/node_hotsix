const PointRepository = require('../repositories/point.repository');

class PointService {
  pointRepository = new PointRepository();

  findPoint = async (id) => {

    const point = await this.pointRepository.findPoint(id);

      return {
        point: point.point,
        admin: point.admin,
      }
  }
}

module.exports = PointService;