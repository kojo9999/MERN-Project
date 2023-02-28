require("dotenv/config");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const jwt =require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uuid = require("uuid-random");



//Register
router.post("/register", async (req,res) =>{
    const {username, password} = req.body;

    //check if username in use
    const userExists = await User.findOne({username});

    if(userExists) return res.status(401).json("Username already exists");
    
    //Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    const guid = uuid();

        //create user object
        const user = new User({
            id: guid,
            username,
            password: hashedPassword,
        })

        //create JWT tokens
        const accessToken = jwt.sign(
            {_id: user._id},
            process.env.TOKEN_SECRET,
            {
                expiresIn:"60m",
            }
        );
    
        refreshToken =jwt.sign(
            {_id: user._id},
            process.env.REFRESH_TOKEN_SECRET
        );
    
        //Create a new refresh token object
        const newRefreshToken = new RefreshToken({
            token: refreshToken,
        });



    try{
        //save user to collection
        const savedUser = await user.save();
        newRefreshToken.save()

        //return user id and ok
        res.status(200).json({user:user,accessToken, refreshToken: refreshToken});
    } catch(err){
        //return error message
        res.status(401).json({message: err.message});
    }
});


router.post("/login", async (req,res)=>{

    const {username,password} = req.body;

    //check user exists
    const user = await User.findOne({username});

    if(!user) return res.status(401).json("invalid Username");

    //check if password is correct
    const validPass = await bcrypt.compare(password, user.password)

    if(!validPass) return res.status(401).json("invalid password");

    //create JWT tokens
    const accessToken = jwt.sign(
        {_id: user._id},
        process.env.TOKEN_SECRET,
        {
            expiresIn:"60m",
        }
    );

    refreshToken =jwt.sign(
        {_id: user._id},
        process.env.REFRESH_TOKEN_SECRET
    );

    //Create a new refresh token object
    const newRefreshToken = new RefreshToken({
        token: refreshToken,
    });

    try{
        //Save refresh token object to collection
        newRefreshToken.save();

        res.json({user,accessToken, refreshToken: refreshToken});
    } catch(err){
        //return error messageand status
        res.status(401).json({message: err.message});
    }

});

//Refresh access tokens
router.post("token",(req,res) => {
    const {refreshToken} = req.body;

    //Check if token refresh empty
    if(!refreshToken) return res.status(401).json("No token");

    try{

        //Check if refresh token exists
        RefreshToken.findOne({token: refreshToken}, (err,doc)=>{

            //return error for no token
            if(doc=== null) return res.status(401).json("Toekn not found");

            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err,user) => {
                    //return error if token invalid
                    if(err) return res.status(401).json("Token invalid");

                    //Create new access token

                    const newAccessToken =jwt.sign(

                        {_id: user._id},
                        process.env.TOKEN_SECRET,
                        {
                            expiresIn: "15m",
                        }
                    );

                    //return new access token
                    res.json({accessToken: newAccessToken});

                }
            );

        });

    } catch (err){
        //return error message
        res.status(401).json("Something went wrong. Try again")
    }

});

//Logout

router.delete("logout", async (req,res) =>{

    const refreshToken = req.body.refreshToken;

    try{
        //Delete refreshtoken from collection
        await RefreshToken.deleteOne({token:refreshToken});

        //return success message
        res.status(200).json("Token removed");
    }catch(err){
        res.status(401).json({message: err.message});
    }

});

module.exports = router;