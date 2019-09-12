const models = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Costomer = models.Costomer;
const Manager = models.Manager;

// Costomer Login
function costomerLogin(reqCostomer){
    return new Promise((resolve,reject)=>{
        Manager.findOne({userName:reqCostomer.userName},(err,admin)=>{
            if(err) return reject(err);
            if(!admin){
                Costomer.findOne({userName:reqCostomer.userName},(err,newCostomer)=>{
     
                    if(err) return reject(err);
                    if(!newCostomer) return reject({message:"User Name or Password are Invalid"});
                    bcrypt.compare(reqCostomer.password,newCostomer.password,(err,resolte)=>{
                        if(err)return reject(err);
                        if(!resolte) return reject({message:"User Name or Password are Invalid"});
                        const newToken = jwt.sign(
                            {userName: newCostomer.userName,
                             email: newCostomer.email,
                             phone: newCostomer.phone,
                             constomer_id: newCostomer._id},
                             "sectret",
                             {expiresIn: "1h"});
                             newCostomer.token = newToken;
                             resolve(newCostomer);          
                            });     
                })


            }
            else{
                bcrypt.compare(reqCostomer.password,admin.password,(err,resolte)=>{
                    if(err)return reject(err);
                    if(!resolte) return reject({message:"User Name or Password are Invalid"});
                    const newToken = jwt.sign(
                        {userName: admin.userName,
                         email: admin.email,
                         admin_id: admin._id},
                         "sectret",
                         {expiresIn: "1h"});
                         admin.token = newToken;
                         resolve(admin);          
                        });    
            } 
        })
  
    })
};
//register
function register(reqCostomer){
    return new Promise((resolve,reject)=>{

    Costomer.findOne({userName:reqCostomer.userName}, (err,checkCostomerUserName)=>{
        if(err) return reject(err);
        if(checkCostomerUserName) return reject({message:"User Name already exists"});

        Costomer.findOne({email:reqCostomer.email}, (err,checkCostomerEmail)=>{
            if(err) return reject(err);
            if(checkCostomerEmail) return reject({message:"Email already exists"});

        bcrypt.hash(reqCostomer.password,1,(err,hash) =>{
            if(err)return reject(err);
            const costomer = new Costomer({
                userName:reqCostomer.userName,
                firstName:reqCostomer.firstName,
                lastName:reqCostomer.lastName,
                email:reqCostomer.email,
                phone:reqCostomer.phone,
                city:reqCostomer.city,
                street:reqCostomer.street,
                houseNumber:reqCostomer.houseNumber,
                password:hash
            });
            costomer.save((err,newCostomer)=>{
                if(err)return reject(err);

                const newToken = jwt.sign(
                {   
                    userName: newCostomer.userName,
                    email: newCostomer.email,
                    phone: newCostomer.phone,
                    constomer_id: newCostomer._id
                },
                    "sectret",
                    {expiresIn: "1h"});
                    newCostomer.token = newToken;
                    resolve(newCostomer);
            })
        });
    });
    });
});
}

function getAllCostomers(){
    return new Promise((resolve,reject)=>{
        Costomer.find({}, (err, costomers)=>{
            if(err){reject(err);}
            else{
                resolve(costomers);
            }
        })
    })
};


module.exports = {
getAllCostomers,
costomerLogin,
register,
}