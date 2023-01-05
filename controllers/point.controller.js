const PointService = require("../services/point.service");

class PointController {
  PointService = new PointService();

  getPoint = async (req, res) => {

    const id = res.locals.user.id;    

    const point = await this.PointService.findPoint(id);
    res.status(200).json({ data: point });
  };

  changePoint = async (req, res) => {
    const id = res.locals.user.id;
    
    const changePoint = await this.PointService.changePointById(id);

    res.status(200).json({ data: changePoint });
  };

}

module.exports = PointController;
