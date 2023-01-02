module.exports = {
  // 해당 패턴에 일치하는 경로가 존재할 경우 테스트를 하지 않고 넘어갑니다.(특정 주소 무시)
  testPathIgnorePatterns: ["/node_modules/"],
  // 테스트 실행 시 각 TestCase에 대한 출력을 해줍니다.(상세하게 결과나오도록)
  verbose: true,
};
