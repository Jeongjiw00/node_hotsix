$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: '/api/review/wrote',
    async: false,
    success: function (response) {
      // console.log(response);
      document.getElementById('reviewDoneList').innerHTML = '';
      let tempHtml = ``;

      if (response['getReview']['msg']) {
        tempHtml = response['getReview']['msg'];
        $('#reviewDoneList').append(tempHtml);

        return;
      }

      // reviewId: review.laundryId,
      //   reviewName: review.laundryName,
      //   reviewContent: review.laundryContent,
      //   createdAt: review.createdAt,

      let rows = response['getReview'];

      console.log(rows);

      for (let i = 0; i < rows.length; i++) {
        tempHtml += `    <tr>
        <td><img src="../images/${rows[i].reviewImg}" class="review-img" /></td>
        <td>${rows[i].createdAt}</td>
      </tr>
      <tr>
        <td><${rows[i].reviewName}/td>
        <td>${rows[i].reviewText}</td>
      </tr>
      <hr> 
    `;
      }

      $('#reviewDoneList').append(tempHtml);
    },
  });

  return;
});
