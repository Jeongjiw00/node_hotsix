const LaundryService = require("../services/laundry.service");

class LaundryController {
  laundryService = new LaundryService();

  getApplyById = async (req, res, next) => {
    //아직 로그인기능 없어서 임의로 해둠!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let id = 1;

    const laundry = await this.laundryService.findApplyById(id);

    res.status(200).json({ data: laundry });
    // console.log(laundry, "laundry");
    // res.render("index_jw.ejs", { test: true });
  };

  createApply = async (req, res, next) => {
    try {
      const { laundryName, laundryContent, laundryAddress, requests } =
        req.body;
      // console.log(laundryName, laundryContent, laundryAddress, requests);
      const laundryImg = req.file.filename;

      //아직 로그인기능 없어서 임의로 해둠!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
      //로그인기능받으면바꿔야함!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      res.redirect("/laundry/1");
      // res.status(201).json({ data: createApplyData });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: error.message });
    }
  };
}

module.exports = LaundryController;
