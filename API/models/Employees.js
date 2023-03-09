const mongoose = require("mongoose");
const uuid = require("uuid-random");
const guid =uuid();

const EmployeeSchema = new mongoose.Schema({
    
    employeeId:{
        type: String,
        default: guid
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