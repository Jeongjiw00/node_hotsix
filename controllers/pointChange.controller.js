const PointService = require("../services/pointChange.service");

class PointController {
  PointService = new PointService();

  changePoint = async (req, res) => {
    const id = 1;

    const changePoint = await this.PointService.changePointById(id);

    res.status(200).json({ data: changePoint });
  };
}

module.exports = PointController;
