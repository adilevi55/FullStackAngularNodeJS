const jwt = require("jsonwebtoken");

module.exports = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        decoded = jwt.verify(token, "sectret");
       
        next();
    } catch(error){
        console.log(req.headers);
        return res.status(401).json({
            message: "missing Token!"
        })
    }
}