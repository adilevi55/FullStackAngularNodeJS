const models = require("../models");
const Order = models.Order;

function getAllOrders() {
    return new Promise((resolve, reject) => {
        Order.find({}, (err, ordrds) => {
            if (err) return reject(err);
            resolve(ordrds)
        })
    })
};

function getCastomerOrders(_reqCostomerId) {
    return new Promise((resolve, reject) => {
        Order.find({ costomer: _reqCostomerId }, (err, orders) => {
            if (err) return reject(err);
            resolve(orders)
        })
    })
};

function addOrder(reqOrder) {
    return new Promise((resolve, reject) => {
        const order = new Order(reqOrder);
        order.save((err, newOrder) => {
            if (err) return reject(err);
            resolve(newOrder)
        });
    });
};

module.exports = {
    getAllOrders,
    getCastomerOrders,
    addOrder,
}