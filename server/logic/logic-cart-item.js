const models = require("../models");
const CartItem = models.CartItem;

function addItemToCart(reqCartItem) {
    return new Promise((resolve, reject) => {
        const cartItem = new CartItem(reqCartItem);
        cartItem.save((err, newCartItem) => {
            if (err) return reject(err);
            CartItem.populate(cartItem, { path: "product" }, (err, cartItemPopulat) => {
                if (err) return reject(err);
                resolve(cartItemPopulat)
            })
        });
    });
};

function getAllCartItem(_reqShoppingCartId) {
    return new Promise((resolve, reject) => {
        CartItem.find({ shoppingCart: _reqShoppingCartId }).populate("product").exec((err, cartItems) => {
            if (err) return reject(err);
            resolve(cartItems)
        })
    })
};

function deletAllCartItems(reqShoppingCartItems) {
    return new Promise((resolve, reject) => {
        CartItem.deleteMany({ shoppingCart: reqShoppingCartItems }, err => {
            if (err) return reject(err);
            resolve()
        });
    });
};

function deletOneCartItems(reqShoppingCartItem) {
    return new Promise((resolve, reject) => {
        CartItem.deleteOne({ _id: reqShoppingCartItem }, err => {
            if (err) return reject(err);
            resolve()
        });
    });
};

module.exports = {
    addItemToCart,
    getAllCartItem,
    deletAllCartItems,
    deletOneCartItems,
}