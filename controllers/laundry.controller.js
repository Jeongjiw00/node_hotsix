const LaundryService = require("../services/laundry.service");

class LaundryController {
  laundryService = new LaundryService();

  getApplyById = async (req, res, next) => {
    //아직 로그인기능 없어서 임의로 해둠
    const { id } = req.params;

    const laundry = await this.laundryService.findApplyById(id);

    res.status(200).json({ data: laundry });
  };

  createApply = async (req, res, next) => {
    try {
      const { laundryName, laundryContent, laundryAddress, requests } =
        req.body;
      // console.log(laundryName, laundryContent, laundryAddress, requests);
      const laundryImg = req.file.path;

      //아직 로그인기능 없어서 임의로 해둠
      const id = 1;

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
      res.status(400).json({ errorMessage: error.message });
    }
  };

  getUserPoint = async (req, res) => {
    console.log("test2")
//아직 로그인기능 없어서 임의로 해둠!!!!!!!
    const id = 2;
    const { point } = await this.laundryService.findPoint(id);
    res.render('userMyPage', {point})
  };

  changePoint = async (req, res) => {
      const id = 1;
  
      const changePoint = await this.laundryService.changePointById(id);
  
      res.status(200).json({ data: changePoint });
    };
  
}

module.exports = LaundryController;
