const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({

    skillLevelId:{
        type: mongoose.Types.ObjectId,
    },
    skillName:{
        type: String,
    },
    skillDesc:{
        type:String,
    }
   
});

module.exports = mongoose.model("SkillLevel",SkillLevelSchema);