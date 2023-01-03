const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");


const { laundry: Laundry } = require("../models");


//대기중인 세탁물 전체 조회
router.get("/laundries", async (req, res) => {
    const laundries = await Laundry.findAll({
        where: { status: 0, adminId: null }
    });
    // console.log(laundries);
    // console.log(laundry);

    return res.status(200).send({laundries});
});


//대기중인 세탁물 중 하나 선택
router.post("/laundry/:laundryId", async (req, res) => {

    const { laundryId } = req.params;

    // const ownerId = res.locals.user.userId;
    const ownerId = 2 //임시로 아이디값 2

    const laundry = await Laundry.findOne({
        where: { laundryId }
    });

    if(laundry.adminId != null){
        return res.status(400).send({errMsg: "이미 배정된 작업물입니다."})
    }

    await laundry.update({adminId: ownerId});

    return res.status(200).send({msg: "선택 성공"});
})


//작업중인 세탁물 상세 조회
router.get("/laundry/:laundryId", async (req, res) => {

    const { laundryId } = req.params;

    // const ownerId = res.locals.user.userId;
    const ownerId = 2 //임시로 아이디값 2

    const laundry = await Laundry.findOne({
        where: {laundryId, adminId: ownerId, status:{ [Op.lt]: 4}}
    })

    if(!laundry){
        return res.status(400).send({errMsg: "작업중인 세탁물이 없습니다."});
    }

    return res.status(200).send({laundry});
});


//작업중인 세탁물 상태 변경
router.patch("/laundry/:laundryId", async (req, res) => {
    const { laundryId } = req.params;

    // const ownerId = res.locals.user.userId;
    const ownerId = 2 //임시로 아이디값 2

    const laundry = await Laundry.findOne({
        where: {laundryId, adminId: ownerId, status:{ [Op.lt]: 4}}
    })

    if(!laundry){
        return res.status(400).send({errMsg: "작업중인 세탁물이 없습니다."});
    }

    await laundry.increment({ status: 1 });


    return res.status(200).send({msg: "작업상태 변경 성공"});

});

module.exports = router;
