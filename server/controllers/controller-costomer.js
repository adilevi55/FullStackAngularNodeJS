const express = require("express");
const logicCostomer = require("../logic/logic-costomer");
const route = express.Router();

route.post("/logIn", async (req,res)=>{
    try{
        const costomer = await logicCostomer.costomerLogin(req.body);
        res.json(costomer);
    }
    catch(err){
                /// לבדוק את הסטטוס
        console.log(err);
        if(err.message) return res.status(409).json(err);
        res.status(500).json(err);
    }
});

route.post("/register", async (req,res)=>{
    try{
        const costomer = await logicCostomer.register(req.body);
        res.status(201).json(costomer)
    }
    catch(err){
        if(err.message) return res.status(409).json(err);
        res.status(500).json(err);
    }
})
//get all Castomers לבדוק מחיקה
// route.get("/costomers", async (req,res) =>{
//     try{
//         const costomers = await logicCostomer.getAllCostomers();
//         res.json(costomers);
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// });

module.exports = route;