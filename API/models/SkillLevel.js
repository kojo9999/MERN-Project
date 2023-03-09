const mongoose = require("mongoose");
const uuid = require("uuid-random");
const guid =uuid();

const SkillLevelSchema = new mongoose.Schema({

    skillLevelId:{
        type: String,
        default: guid
    },
    skillName:{
        type: String,
    },
    skillDesc:{
        type:String,
    }
   
});

module.exports = mongoose.model("SkillLevel",SkillLevelSchema);