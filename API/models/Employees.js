const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({

    employeeId:{
        type: String,
    },
    firstName:{
        type: String,
    },
    lastName:{
        type:String,
    },
    dateOfBirth:{
        type: String,
    },
    email:{
        type:String,
        max:256
    },
    skills:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"SkillLevel"
    }],
    active:{
        type: Boolean,
    },
    age:{
        type: Number
    }
}, {collection:'Employees'});

module.exports = mongoose.model("Employees",EmployeeSchema);