const socket = io.connect("/");

socket.on("APPLY_LAUNDRY", function (data) {
  const { laundryName, laundryContent, laundryAddress, laundryImg, requests } =
    data;
  applyNotification(
    laundryName,
    laundryContent,
    laundryAddress,
    laundryImg,
    requests
  );
});

function applyNotification(targetNickname, date) {
  const messageHtml = `${targetNickname}님이 방금 주문했어요! <br /><small>(${date})</small>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>`;
  const alt = $("#customerAlert");
  if (alt.length) {
    alt.html(messageHtml);
  } else {
    const htmlTemp = `<div class="alert alert-sparta alert-dismissible show fade" role="alert" id="customerAlert">${messageHtml}</div>`;
    $("body").append(htmlTemp);
  }
}
