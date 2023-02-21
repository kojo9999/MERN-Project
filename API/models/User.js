const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    id:{
        type: String,
    },
    username:{
        type: String,
        min:6,
        max:32,
    },
    password:{
        type:String,
        max:1024,
        min:8,
    }
});

module.exports = mongoose.model("Users",UserSchema);