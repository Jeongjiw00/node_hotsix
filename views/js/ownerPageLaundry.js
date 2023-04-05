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

                tempHtml = `<tr><td>${response['laundry']['msg']}</td></tr>`;
                $('#ownerPageLaundry').append(tempHtml);

            } else {

               let laundry = response['laundry'][0];
               let day = laundry.createdAt.substr(0, 10);
               let time = laundry.createdAt.split("T")[1].split(".")[0];
               

            //    console.log(laundry);
            //    console.log(laundry.laundryId);
                
                tempHtml +=     `<tr> <td>세탁물 번호  </td> <td>${laundry.laundryId}</td></tr>
                                 <tr> <td>세탁물 이름 </td> <td>${laundry.laundryName} </td></tr>
                                 <tr> <td>세탁물 내용 </td> <td>${laundry.laundryContent} </td></tr>
                                 <tr> <td>세탁물 사진 </td> <td><img src="../images/${laundry.laundryImg}"> </td></tr>
                                 <tr> <td>주소 </td> <td>${laundry.laundryAddress} </td></tr>
                                 
                                 <tr> <td>요청사항 </td> <td>${laundry.requests} </td></tr>
                                 <tr> <td>작업상태 </td> <td>${statusArray[laundry.status]} </td></tr>

                                 <tr> <td>요청일 </td> <td>${day} ${time} </td></tr>
                                
                                
                                <tr><td colspan='2'> <button onclick="changeALaundryStatus()" style ='background-color: #333; color: white';> 작업상태 변경 </button></td></tr>
                                
                               
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