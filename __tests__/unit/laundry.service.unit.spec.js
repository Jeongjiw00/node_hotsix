const LaundryService = require("../../services/laundry.service");

let mockLaundryRepository = {
  findApplyById: jest.fn(),
  createApply: jest.fn(),
};

let laundryService = new LaundryService();

laundryService.laundryRepository = mockLaundryRepository;

describe("Layered Architecture Pattern LaundryService Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test("Posts Service findApplyById Method By Success", async () => {
    const findApplyByIdReturnValue = {
      laundryName: "세탁",
      laundryContent: "니트",
      laundryAddress: "부산",
      laundryImg: "down1672749649243.jpg",
      requests: "살살 세탁해주세요",
      status: 0,
      userId: 1,
    };

    mockLaundryRepository.findApplyById = jest.fn(() => {
      return findApplyByIdReturnValue;
    });

    const deletePost = await postService.deletePost(1, "0000");

    // 1. 1번 호출, 입력받는 인자는 postId
    expect(mockPostsRepository.findApplyById).toHaveBeenCalledTimes(1);
    expect(mockPostsRepository.findApplyById).toHaveBeenCalledWith(1);
    // // 2. return값이 findPostById의 반환된 결과와 일치
    // expect(deletePost).toMatchObject({
    //   postId: findPostByIdReturnValue.postId,
    //   nickname: findPostByIdReturnValue.nickname,
    //   title: findPostByIdReturnValue.title,
    //   content: findPostByIdReturnValue.content,
    //   createdAt: findPostByIdReturnValue.createdAt,
    //   updatedAt: findPostByIdReturnValue.updatedAt,
    // });
  });
});
