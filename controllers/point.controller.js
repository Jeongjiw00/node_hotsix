
const PointService = require('../services/point.service');

class PointController {
  PointService = new PointService();

  getPoint = async (req, res) => {
    console.log("test2")
    const id = 1;
    const { point } = await this.PointService.findPoint(id);
    res.render('userMyPage', {point})
  }
}

module.exports = PointController;