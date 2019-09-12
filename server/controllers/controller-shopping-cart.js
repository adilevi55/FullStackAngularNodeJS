const express = require("express");
const logicShoppingCart = require("../logic/logic-shopping-cart");
const route = express.Router();
const checkToken = require("../middleware/check-token");

//add shopping cart
route.post("/",checkToken, async (req, res) => {
    try {
        const shoppingCart = await logicShoppingCart.addShoppingCart(req.body);
        res.status(201).json(shoppingCart);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

route.get("/:_shooppingCartId",checkToken, async (req, res) => {
    try {
        const cart = await logicShoppingCart.getShoppingCart(req.params._shooppingCartId);
        res.json(cart);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

module.exports = route;