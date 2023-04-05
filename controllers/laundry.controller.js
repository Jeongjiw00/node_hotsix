const LaundryService = require("../services/laundry.service");

class LaundryController {
  laundryService = new LaundryService();

  getApplyById = async (req, res, next) => {
    //아직 로그인기능 없어서 임의로 해둠
    const id = res.locals.user.id;
    // console.log(res.locals.user.id, 84561234512);

    const laundry = await this.laundryService.findApplyById(id);

    res.status(200).json({ data: laundry });
  };

  createApply = async (req, res, next) => {
    try {
      const { laundryName, laundryContent, laundryAddress, requests } =
        req.body;
      // console.log(laundryName, laundryContent, laundryAddress, requests);
      const imgPath = req.file.path;
      const laundryImg = imgPath.split("\\")[2];

      //아직 로그인기능 없어서 임의로 해둠
      const id = res.locals.user.id;

      if (!laundryName || !laundryContent || !laundryAddress || !laundryImg)
        throw new Error("InvalidParamsError");

      const createApplyData = await this.laundryService.createApply(
        laundryName,
        laundryContent,
        laundryAddress,
        laundryImg,
        requests,
        id
      );

      res.status(201).json({ data: createApplyData });
    } catch (error) {
      // console.log(error, 4564);
      res.status(400).json({ errorMessage: error.message });
    }
  };
}

module.exports = LaundryController;
