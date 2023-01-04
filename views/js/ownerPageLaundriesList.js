$(document).ready(function (){
        
    let statusArray = ["대기중", "수거중", "수거완료", "배송중", "배송완료"];

    $.ajax({
        type: "GET",
        url: "/api/owner/laundries",
        async: false,
        success: function (response){

            // console.log(response);
            document.getElementById("ownerPageLaundriesList").innerHTML= "";
            let tempHtml = ``;

            if (response['laundries']['msg']){

                tempHtml = response['laundries']['msg'];
                $('#ownerPageLaundriesList').append(tempHtml);

            } else {

                let rows = response['laundries'];

                for(let i = 0; i < rows.length; i++){

                    if(rows[i].status > 3){
                        tempHtml += `<div>${rows[i].laundryName} ${statusArray[rows[i].status]} 
                    </div>`;
                    }else{
                        
                        tempHtml += `<div onclick="chooseALaundryFromPendings(${rows[i].laundryId})">${rows[i].laundryName} ${statusArray[rows[i].status]} 
                        </div>`;
                    }

                }

                $('#ownerPageLaundriesList').append(tempHtml);
            }
        }
    })
})

function chooseALaundryFromPendings(laundryId){
    $.ajax({
        type: "POST",
        url: "../api/owner/laundry/" + laundryId,
        async: false,
        success: function (response) {
            // console.log(response);

            alert(response['msg'].msg);

            window.location.reload();

        }

    })
}