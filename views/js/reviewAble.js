$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: '/api/review/',
    async: false,
    success: function (response) {
      // console.log(response);
      document.getElementById('reviewAbleList').innerHTML = '';
      let tempHtml = ``;

      console.log(response['reviews']);

      if (response['reviews']['msg']) {
        tempHtml = response['reviews']['msg'];
        $('#reviewAbleList').append(tempHtml);

        return;
      }

      // reviewId: review.laundryId,
      //   reviewName: review.laundryName,
      //   reviewContent: review.laundryContent,
      //   createdAt: review.createdAt,

      let rows = response['reviews'];

      for (let i = 0; i < rows.length; i++) {
        tempHtml += `    <tr>
          <td><img src="../images/${rows[i].reviewImg}" class="review-img" /></td>
          <td>${rows[i].reviewName}</td>
        </tr>
        <tr>
          <td></td>
          <td>${rows[i].reviewContent}</td>
          <td><div class="button">
          <span id="textBoxSpan${rows[i].reviewId}"><button onclick="makeTextBox(${rows[i].reviewId})">리뷰 작성</button>
        </div></td>
        </tr>
        <hr> 
      `;
      }

      $('#reviewAbleList').append(tempHtml);
    },
  });

  return;
});

function makeTextBox(reviewId) {
  document.getElementById(`textBoxSpan${reviewId}`).innerHTML = '';

  let tempHtml = ``;

  tempHtml += ` <div class="saveText">리뷰 내용: <input type="text" id="textBox${reviewId}"> <button onclick = saveText(${reviewId})> 저장 </button></div>`;

  $(`#textBoxSpan${reviewId}`).append(tempHtml);
}

function saveText(reviewId) {
  const reviewText = $(`#textBox${reviewId}`).val();
  document.getElementById(`textBoxSpan${reviewId}`).innerHTML = '';

  $.ajax({
    url: '/api/review/write',
    type: 'POST',
    data: {
      reviewText: reviewText,
      laundryId: reviewId,
    },
    async: false,
    success: function (response) {
      console.log(response);

      return;
    },
  });
}
