
const PointService = require('../services/point.service');

class PointController {
  PointService = new PointService();

  getPoint = async (req, res) => {
    console.log("test2")
//아직 로그인기능 없어서 임의로 해둠!!!!!!!
    const id = 2;
    const { point } = await this.PointService.findPoint(id);
    res.render('userMyPage', {point})
  }
}

module.exports = PointController;