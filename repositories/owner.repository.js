const { laundry: Laundry } = require("../models");
const { Op } = require("sequelize");

class OwnerRepository{
    async getAllPendingLaundries(){

        try{
            const laundries = await Laundry.findAll({
                where: { status: 0, adminId: null }
            });
        } catch (err){
            console.log(err);
            return false;
        }        

        return laundries;
    }

    async getALaundryFromPendings(laundryId){

        try{
            const laundry = await Laundry.findOne({
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
                adminId: userId}, {where: {laundryId}
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

    async changeLaundryStatus(laundryId, userId){
        try{
            await Laundry.update({})
        } catch (err) {

        }
    }


   
}