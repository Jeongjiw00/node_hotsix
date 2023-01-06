const LaundryRepository = require("../repositories/laundry.repository");
const { laundry } = require("../models/index");

class LaundryService {
  laundryRepository = new LaundryRepository(laundry);

  findApplyById = async (id) => {
    const allLaundryById = await this.laundryRepository.findApplyById(id);

    allLaundryById.sort((a, b) => {
      return b.createAt - a.createAt;
    });

    return allLaundryById.map((laundry) => {
      return {
        laundryName: laundry.laundryName,
        laundryContent: laundry.laundryContent,
        laundryAddress: laundry.laundryAddress,
        laundryImg: laundry.laundryImg,
        requests: laundry.requests,
        status: laundry.status,
        userId: laundry.userId,
      };
    });
  };

  createApply = async (
    laundryName,
    laundryContent,
    laundryAddress,
    laundryImg,
    requests,
    id
  ) => {
    const createApplyData = await this.laundryRepository.createApply(
      laundryName,
      laundryContent,
      laundryAddress,
      laundryImg,
      requests,
      id
    );

    return {
      laundryName: createApplyData.laundryName,
      laundryContent: createApplyData.laundryContent,
      laundryAddress: createApplyData.laundryAddress,
      laundryImg: createApplyData.laundryImg,
      requests: createApplyData.requests,
    };
  };

  findPoint = async (id) => {

    const point = await this.laundryRepository.findPoint(id);

      return {
        point: point.point,
      }
  }

  changePointById = async (id) => {
    const changePoint = await this.laundryRepository.changePointById(id);

    return {
      changePoint: changePoint,
    };
  };
}

module.exports = LaundryService;
