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


//Logout

router.delete("/logout", async (req,res) =>{

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


//REFRESH ACCESS TOKEN
router.post("/token", async (req, res) => {

    const authHeader = req.headers.authorization;
if (!authHeader) {
  return res.status(401).json({ message: "Authorization header missing" });
}

    const refreshToken = req.headers.authorization.split(' ')[1];

  
    //Check if refresh token empty
    if (!refreshToken) return res.status(401).json("No Token");
  
    try {
      //Check if refresh token exists
      RefreshToken.findOne({ token: refreshToken }, (err, doc) => {
        //Return error if not found
        if (doc === null) return res.status(401).json("Token Not Found");
  
        //Verify refresh token
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          (err, user) => {
            //Return error if token isn't valid
            if (err) return res.status(401).json("Token Invalid");
  
            //Create new access token
            const newAccessToken = jwt.sign(
              { _id: user._id },
              process.env.TOKEN_SECRET,
              {
                expiresIn: "1h",
              }
            );
  
            //Return new access token
            res.json({ accessToken: newAccessToken });
          }
        );
      });
    } catch (err) {
      //Return error message
      res.status(401).json("Oops something went wrong!");
    }
  });

  router.delete("/deleteUserById/:id", async (req, res) => {
    const id = req.params.id;
    try {
      // Find user by id and remove it
      const deletedUser = await User.findByIdAndRemove(id);
      
      // Delete associated refresh tokens
      await RefreshToken.deleteMany({ _id: { $in: deletedUser.refreshTokens } });
      
      res.status(200).json({ message: "User deleted" });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  });
  

module.exports = router;