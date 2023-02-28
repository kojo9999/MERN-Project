const express = require("express");
const router = express.Router();
const SkillLevel = require("../models/SkillLevel");
require("dotenv/config");
const mongoose = require("mongoose");
const uuid = require("uuid-random");
const nodecache = require('node-cache')
const appCache = new nodecache({stdTTL:360})
require('isomorphic-fetch');


router.get("/getAllSkillLevels", async (req,res)=>{

    if(appCache.has('allSkillLevels')){
        const skillLevels= appCache.get('allSkillLevels');
        console.log('Data from node cache');
        res.status(200).json({skillLevels});
    }else{

        try{
            //get all skill levels
            const skillLevels = await SkillLevel.find({});

            //return skill level list
            appCache.set("allSkillLevels",skillLevels)
            res.status(200).json({skillLevels});
        }catch(err){
            res.status(401).json({message:err.message})
        }
    }
});

//FIND SKILL LEVEL BY ID
router.get("/getSkillLevelById/:skillLevelId", async (req,res)=>{

    const skillLevelId = req.params.skillLevelId;

    if(appCache.has(skillLevelId)){
        const returnedSkillLevel= appCache.get(skillLevelId);
        console.log('Data from node cache');
        res.status(200).json({returnedSkillLevel});
    }else{

        try{
            const returnedSkillLevel = await SkillLevel.find({
                skillLevelId:String(skillLevelId),
            });

            appCache.set(skillLevelId,returnedSkillLevel)
            res.status(200).json({returnedSkillLevel});

        }catch(err){

            res.status(401).json({message:err.message});

        }
    }

});

     //CREATE NEW SKILL LEVEL
     router.post("/createNewSkillLevel", async (req,res)=>{
        const{skillName,skillDesc} = req.body;

        const guid = uuid();

        const skillLevel = new SkillLevel({
            skillLevelId: guid,
            skillName,
            skillDesc,
        });



        try{
            //Save skillLevel to collection
            await skillLevel.save();

            //return skillLevel success message
            res.status(200).json({messsage:"Skill Level Created Successfully"});
        }catch(err){
            res.status(401).json({message:err.message})
        }

    });

    //DELETE SKILL LEVEL BY ID
    router.delete("/deleteSkillLevelById/:skillLevelId", async (req,res)=>{

        const skillLevelId = req.params;

        try{
            await SkillLevel.deleteOne({
                skillLevelId: String(skillLevelId.skillLevelId),
            }).exec();

        

            res.status(200).json({message:"Success"})
        }catch(err){

            res.status(401).json({message:err.message})
        }

    });

    //UPDATE SKILL LEVEL BY ID
    router.patch("/updateSkillLevelById/:skillLevelId",async (req,res)=>{

        const {skillLevelId} = req.params;
        const content = req.body;

        try{
        await SkillLevel.findOneAndUpdate({
            skillLevelId: String(skillLevelId),
        },
        content
        );
        res.status(200).json({message:"success",content});
    }catch(err){
        res.status(401).json({message:err.message});
    }

    });

    module.exports = router;