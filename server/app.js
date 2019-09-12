const express = require("express");
const app = express();
const cors = require("cors");
const controllerCategory = require("./controllers/controller-category");
const controllerCostomer = require("./controllers/controller-costomer");
const controllerOrder = require("./controllers/controller-order");
const controllerProduct = require("./controllers/controller-product");
const controllerShoppingCart = require("./controllers/controller-shopping-cart");
const controllerCartItem = require("./controllers/controller-cart-item");


app.use(express.json());
app.use(cors());

app.use("/api/category",controllerCategory);
app.use("/api/costomer",controllerCostomer);
app.use("/api/order",controllerOrder);
app.use("/api/product",controllerProduct);
app.use("/api/shopping-cart",controllerShoppingCart);
app.use("/api/cart-item",controllerCartItem);

app.listen(3000,()=>console.log("We are Listening on http://localhost:3000"))