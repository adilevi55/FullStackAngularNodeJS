const models = require("../models");
const mongoose = require("mongoose");
const ShoppingCart = models.ShoppingCart;

function addShoppingCart(reqShoppingCart) {
    return new Promise((resolve, reject) => {
        reqShoppingCart._id = mongoose.Types.ObjectId();
        const shoppingCart = new ShoppingCart(reqShoppingCart);
        shoppingCart.save((err, newShoppingCart) => {
            if (err) return reject(err);
            resolve(newShoppingCart)
        });
    });
}

function getShoppingCart(_shooppingCartId) {
    return new Promise((resolve, reject) => {
        ShoppingCart.find({ _id: _shooppingCartId }, (err, shoppingCart) => {
            if (err) return reject(err);
            resolve(shoppingCart)
        })
    })
};

function deletAll() {
    return new Promise((resolve, reject) => {
        ShoppingCart.deleteMany({}, err => {
            if (err) return reject(err);
            resolve()
        });
    });
};

module.exports = {
    addShoppingCart,
    getShoppingCart,
    deletAll,
}