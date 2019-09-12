const express = require("express");
const logicCartItem = require("../logic/logic-cart-item");
const route = express.Router();
const checkToken = require("../middleware/check-token");

route.post("" ,checkToken,async (req,res) =>{
    try{
        const CartItem = await logicCartItem.addItemToCart(req.body);
        res.status(201).json(CartItem);
    }
    catch(err){
        res.status(500).json(err)
    }
    });

    route.get("/cart-items/:_reqShoppingCartId",checkToken, async (req,res) =>{
        try{
            const cartItems = await logicCartItem.getAllCartItem(req.params._reqShoppingCartId);
            res.json(cartItems);
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    });

    route.delete("/cart-items/:_shoppingCartId",checkToken, async (req,res) =>{
        try{
            const cart = await logicCartItem.deletAllCartItems(req.params._shoppingCartId);
            res.status(204).json(cart);
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    });

    route.delete("/:_shoppingCartId",checkToken, async (req,res) =>{
        try{
            const cart = await logicCartItem.deletOneCartItems(req.params._shoppingCartId);
            res.status(204).json(cart);
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    });
    module.exports = route;