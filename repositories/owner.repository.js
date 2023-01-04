const { laundry: Laundry } = require("../models");
const { Op } = require("sequelize");

class OwnerRepository{


    //미사용 (대기중인 세탁물들만 조회)
    // async getAllPendingLaundries(){

    //     try{
    //         const laundries = await Laundry.findAll({
    //             where: { status: 0, adminId: null }
    //         });
    //     } catch (err){
    //         console.log(err);
    //         return false;
    //     }        

    //     return laundries;
    // }

    async getAllLaundries(){

        try{
            const laundries = await Laundry.findAll({                
            });
            return laundries;
        } catch (err){
            console.log(err);
            return false;
        }        

        
    }

    
    async getALaundryFromPendings(laundryId){

        try{
            const laundry = await Laundry.findAll({
                where:{ status: 0, adminId: null, laundryId}
            })

            return laundry;

        } catch (err){
            console.log(err);
            return false;
        }                
        
    }

    async setALaundryAdminIdFromPendings(laundryId, userId){

        try{
            await Laundry.update({
                adminId: userId, status: 1}, {where: {laundryId, adminId: null}
            });
        } catch (err){
            console.log(err);
            return false;
        }        

        return true;
    }

    async getALaundryInProgress(userId){

        try{
            const laundry = await Laundry.findAll({
                where: {adminId: userId, status: {[Op.lt]: 4}}
            });
            return laundry;

        } catch (err){
            console.log(err);
            return false;
        }
        
    }

    async changeALaundryStatus(userId){
        try{
            await Laundry.increment(
                {status: 1}, 
                {where: {adminId: userId, status: {[Op.lt]: 4}}}
                );
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
   
}

module.exports = OwnerRepository;