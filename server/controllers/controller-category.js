const express = require("express");
const logicCategory = require("../logic/logic-category");
const route = express.Router();
const checkToken = require("../middleware/check-token");

route.get("/:categoryName",checkToken, async (req,res) =>{
    try{
        const categories = await logicCategory.getCategoryByName(req.params.categoryName);
        res.json(categories);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

route.get("/categories/all-categories",checkToken, async (req,res) =>{
    try{
        const categories = await logicCategory.getAllCategories();
        res.json(categories);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

module.exports = route;