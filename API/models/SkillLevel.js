const mongoose = require("mongoose");

const SkillLevelSchema = new mongoose.Schema({

    skillLevelId:{
        type: String,
    },
    skillName:{
        type: String,
    },
    skillDesc:{
        type:String,
    }
   
});

module.exports = mongoose.model("SkillLevel",SkillLevelSchema);