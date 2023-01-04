$(document).ready(function (){
        
    let statusArray = ["대기중", "수거중", "수거완료", "배송중", "배송완료"];

    $.ajax({
        type: "GET",
        url: "/api/owner/laundry",
        async: false,
        success: function (response){
            
            document.getElementById("ownerPageLaundry").innerHTML= "";
            let tempHtml = ``;

            // console.log(response);

            if (response['laundry']['msg']){

                tempHtml = response['laundry']['msg'];
                $('#ownerPageLaundry').append(tempHtml);

            } else {

               let laundry = response['laundry'][0];

            //    console.log(laundry);
            //    console.log(laundry.laundryId);
                
                tempHtml +=     `<div> 세탁물 번호 ${laundry.laundryId} </div>
                                 <div> 세탁물 이름 ${laundry.laundryName} </div>
                                 <div> 세탁물 내용 ${laundry.laundryContent} </div>
                                 <div> 세탁물 사진 <img src="${laundry.laundryImg}"> </div>
                                 <div> 주소 ${laundry.laundryAddress} </div>
                                 
                                 <div> 요청사항 ${laundry.requests} </div>
                                 <div> 작업상태 ${statusArray[laundry.status]} </div>

                                 <div> 요청일 ${laundry.createdAt} </div>
                                 <div> 요청자 ${laundry.userId} </div>
                                 <div> 작업자 ${laundry.adminId} </div>
                                 <div> <button onclick="changeALaundryStatus()"> 작업상태 변경 </button></div>
                `;                

                $('#ownerPageLaundry').append(tempHtml);
            }
        }
    })
})

function changeALaundryStatus(){
    $.ajax({
        type: "PATCH",
        url: "/api/owner/laundry",
        async: false,
        success: function (response) {
            
            alert(response['msg']['msg']);
            window.location.reload();
        }

    })
}