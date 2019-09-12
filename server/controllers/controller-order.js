const express = require("express");
const route = express.Router();
const logicOrder = require("../logic/logic-order");
const checkToken = require("../middleware/check-token");

route.get("/orders/all-orders", async (req,res) =>{
    try{
        const orders = await logicOrder.getAllOrders();
        res.json(orders);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});
route.get("/orders/:_reqCostomerId",checkToken, async (req,res) =>{
    try{
        const orders = await logicOrder.getCastomerOrders(req.params._reqCostomerId);
        res.json(orders);
    }
    catch(err){
        res.status(500).json(err)
    }
});

route.post("" ,checkToken,async (req,res) =>{
    try{
        const order = await logicOrder.addOrder(req.body);
        res.status(201).json(order);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
    });

    module.exports = route;