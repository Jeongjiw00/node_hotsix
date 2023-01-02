const LaundryService = require("../services/laundry.service");

class LaundryController {
  laundryService = new LaundryService();

  getApplyById = async (req, res, next) => {
    //아직 로그인기능 없어서 임의로 해둠
    const { userId } = req.params;

    const laundry = await this.laundryService.findApplyById(userId);

    res.status(200).json({ data: laundry });
  };

  createApply = async (req, res, next) => {
    try {
      console.log(req.data, 0);
      console.log(req.file, 1);
      console.log(req.body, 2);

      const { laundryName, laundryContent, laundryAddress, requests } =
        req.body;
      const laundryImg = `/images/${req.file.filename}`;

      //아직 로그인기능 없어서 임의로 해둠
      const userId = 1;

      if (!laundryName || !laundryContent || !laundryAddress || !laundryImg)
        throw new Error("InvalidParamsError");

      const createApplyData = await this.laundryService.createApply(
        laundryName,
        laundryContent,
        laundryAddress,
        laundryImg,
        requests,
        userId
      );

      res.status(201).json({ data: createApplyData });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: error.message });
    }
  };
}

module.exports = LaundryController;
