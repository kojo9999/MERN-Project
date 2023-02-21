const jwt = require("jsonwebtoken");

module.exports =function(req,res,next){
    const token = req.body.accessToken

    if(!token) return res.status(401).json("Access denied");

    try{
        //Verify token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        req.user = verified;

        next();
    }catch(err)
    {
        //return error message
        res.status(401).json("invalid token");
    }
}