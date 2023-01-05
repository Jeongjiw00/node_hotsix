const OwnerRepository = require("../repositories/owner.repository");
const PointRepository = require("../repositories/point.repository");

class OwnerService{

    ownerRepository = new OwnerRepository();
    pointRepository = new PointRepository();

    async getAllLaundries(){
        const laundries = await this.ownerRepository.getAllLaundries();

        if(laundries.length < 1){
            return {msg: "세탁물이 없습니다."};
        }

        return laundries.map(function (laundry){
            return {
                laundryId: laundry.laundryId,
                laundryName: laundry.laundryName,
                status: laundry.status,
            };
        });
    }

    async chooseALaundryfromPendings(laundryId, userId){
        const currentLaundryValid = await this.ownerRepository.getALaundryInProgress(userId);

        if ( currentLaundryValid.length > 0 ){
            return {msg: "이미 작업중인 세탁물이 있습니다."};
        }

        const laundryAdminValid = await this.ownerRepository.getALaundryFromPendings(laundryId);        

        if ( laundryAdminValid.length < 1 ){
            return {msg: "다른 작업자에게 이미 배정된 세탁물입니다."};
        }

        await this.ownerRepository.setALaundryAdminIdFromPendings(laundryId, userId);
        
        return {msg: "선택 성공"};
    }

    async getALaundryInProgress(userId){
        const laundry = await this.ownerRepository.getALaundryInProgress(userId);

        if(laundry.length < 1){
            return {msg: "작업중인 세탁물이 없습니다."};            
        }

        return laundry;
    }

    async changeALaundryStatus(userId){

        const laundry = await this.ownerRepository.getALaundryInProgress(userId);        

        if(laundry.length < 1) {
            return {msg: "작업중인 세탁물이 없습니다."};
        }

        if(laundry[0].status == 3){
            console.log("if문");
            await this.pointRepository.changePointById(userId);
        }
        await this.ownerRepository.changeALaundryStatus(userId);
        
        
        return {msg: "작업 상태 변경 성공"};
    }
    
    
}

module.exports = OwnerService;