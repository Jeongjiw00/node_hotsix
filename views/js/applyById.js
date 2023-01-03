$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "/api/laundry",
    async: false,
    success: function (response) {
      if (response.data) {
        // 신청 내역이 있다면?
        for (let i = 0; i < response.data.length; i++) {
          // data 배열을 돌면서
          if (response.data[i].requests === null)
            response.data[i].requests = ""; // 요청사항이 null일때 빈 문자열로 만들어 줌

          if (response.data[i].status === 0) {
            response.data[i].status = "대기중";
          } else if (response.data[i].status === 1) {
            response.data[i].status = "수거중";
          } else if (response.data[i].status === 2) {
            response.data[i].status = "수거완료";
          } else if (response.data[i].status === 3) {
            response.data[i].status = "배송중";
          } else if (response.data[i].status === 4) {
            response.data[i].status = "배송완료";
          }

          let temp = `
          <tr>
          <td>
            <img src="../images/${response.data[i].laundryImg}" alt="img" />
          </td>
          <td>${response.data[i].laundryName}</td>
          <td>${response.data[i].laundryContent}</td>
          <td>${response.data[i].laundryAddress}</td>
          <td>${response.data[i].requests}</td>
          <td>${response.data[i].status}</td>
        </tr>
        `;
          $("#appliesList").append(temp);
        }
        return;
      } else {
        // 신청 내역이 없다면?
        let temp = `
                <div class="message">
                    ${response.message}
                </div>
            `;
        $("#appliesList").append(temp);
        return;
      }
    },
    error: function (error) {
      customAlert(error.responseJSON.errorMessage);
    },
  });
});
