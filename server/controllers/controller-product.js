const express = require("express");
const logicProduct = require("../logic/logic-product");
const imgLogic = require("../logic/add-img-logic");
const route = express.Router();
const checkToken = require("../middleware/check-token");

route.post("",checkToken,imgLogic.upload.single('img'), async (req,res) =>{
    try{
        const product = await logicProduct.addProdcut(req);
        res.status(201).json(product);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

route.get("/products/all-products", async (req,res) =>{
    try{
        const products = await logicProduct.getAllProducts();
        res.json(products);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

route.get("/products/:_categoryId",checkToken, async (req,res) =>{
    try{
        const products = await logicProduct.getAllProductsByCategory(req.params._categoryId);
        res.json(products);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});


route.put("/:_id",checkToken,imgLogic.upload.single('img'), async (req,res) =>{
    try{
        const product = await logicProduct.updateProduct(req,req.params._id);
        res.json(product);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

route.get("/products-search/:productName",checkToken, async (req,res) =>{
    try{
        const product = await logicProduct.getAllProductsSearch(req.params.productName);
        res.json(product);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

module.exports = route;