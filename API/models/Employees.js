const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({

    employeeId:{
        type: mongoose.Types.ObjectId,
    },
    firstName:{
        type: String,
    },
    lastName:{
        type:String,
    },
    dateOfBirth:{
        type: Date,
    },
    email:{
        type:String,
        max:256
    },
    active:{
        type: Boolean,
    },
    age:{
        type: Number
    }
});

module.exports = mongoose.model("Employees",EmployeeSchema);