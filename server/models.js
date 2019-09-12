const dal = require("./dal");
const mongoose = dal.mongoose;

const costomerSchema = mongoose.Schema({
    userName:String,
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    phone:Number,
    city:String,
    street:String,
    houseNumber:Number,
    token:String
});

const Costomer = mongoose.model("Costomer",costomerSchema,"costomers");

const managerSchema = mongoose.Schema({
    userName:String,
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    token:String

});

const Manager= mongoose.model("Manager",managerSchema,"manager");

const categorySchema = mongoose.Schema({
    categoryName:String
});

const Category= mongoose.model("Category",categorySchema,"categories");

const productSchema = mongoose.Schema({
    productName:String,
    category: {type: mongoose.Schema.Types.ObjectId, ref:"Category"},
    price:Number,
    img:String
});

const Product= mongoose.model("Product",productSchema,"products");

const shoppingCartSchema = mongoose.Schema({
    costomer: {type: mongoose.Schema.Types.ObjectId, ref:"Costomer"},
    cartCreationDate: Date
});

const ShoppingCart= mongoose.model("ShoppingCart",shoppingCartSchema,"shoppingCarts");

const cartItemSchema = mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref:"Product"},
    quantity: Number,
    generalPrice:Number,
    shoppingCart: {type: mongoose.Schema.Types.ObjectId, ref:"ShoppingCart"}

});

const CartItem= mongoose.model("CartItem",cartItemSchema,"cartItems");

const orderSchema = mongoose.Schema({
    costomer: {type: mongoose.Schema.Types.ObjectId, ref:"Costomer"}, 
    shoppingCart: {type: mongoose.Schema.Types.ObjectId, ref:"ShoppingCart"},
    finalPrice: Number,
    cityToShip:String,
    streetToShip:String,
    dateToShip:Date,
    CreditCardNumber:Number
});

const Order= mongoose.model("Order",orderSchema,"orders");


module.exports = {
    Costomer,
    Manager,
    Category,
    Product,
    ShoppingCart,
    CartItem,
    Order
}