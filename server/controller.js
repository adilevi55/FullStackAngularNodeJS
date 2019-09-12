const express = require("express");
const logic = require("./logic");
const imgLogic = require("./add-img-logic");
const route = express.Router();


route.post("/product",imgLogic.upload.single('img'), async (req,res) =>{
    try{
        const product = await logic.addProdcut(req);
        res.status(201).json(product);
    }
    catch(err){
        res.status(500).json(err)
    }
});

route.post("/logIn", async (req,res)=>{
    try{
        const costomer = await logic.costomerLogin(req.body);
        res.json(costomer);
    }
    catch(err){
                /// לבדוק את הסטטוס
        console.log(err);
        if(err.message) return res.status(409).json(err);
        res.status(500).json(err);
    }
});

route.post("/register", async (req,res)=>{
    try{
        const costomer = await logic.register(req.body);
        res.status(201).json(costomer)
    }
    catch(err){
        if(err.message) return res.status(409).json(err);
        res.status(500).json(err);
    }
})

route.get("/costomers", async (req,res) =>{
    try{
        const costomers = await logic.getAllCostomers();
        res.json(costomers);
    }
    catch(err){
        res.status(500).json(err)
    }
});

route.get("/products", async (req,res) =>{
    try{
        const products = await logic.getAllProducts();
        res.json(products);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

route.get("/products/:_categoryId", async (req,res) =>{
    try{
        const products = await logic.getAllProductsByCategory(req.params._categoryId);
        res.json(products);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});
route.get("/category/:categoryName", async (req,res) =>{
    try{
        const products = await logic.getAllCategoryByName(req.params.categoryName);
        res.json(products);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});
route.get("/categories", async (req,res) =>{
    try{
        const products = await logic.getAllCategory();
        res.json(products);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});




route.put("/product/:_id",imgLogic.upload.single('img'), async (req,res) =>{
    try{
        const product = await logic.updateProduct(req,req.params._id);
        res.json(product);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});


route.get("/orders", async (req,res) =>{
    try{
        const orders = await logic.getAllOrders();
        res.json(orders);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});
route.get("/orders/:_reqCostomerId", async (req,res) =>{
    try{
        const orders = await logic.getCastomerOrders(req.params._reqCostomerId);
        res.json(orders);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

route.post("/shoppingCart" ,async (req,res) =>{
try{
    const shoppingCart = await logic.addShoppingCart(req.body);
    res.status(201).json(shoppingCart);
}
catch(err){
    console.log(err)
    res.status(500).json(err)
}
});

route.post("/cartItem" ,async (req,res) =>{
    try{
        const CartItem = await logic.addItemToCart(req.body);
        res.status(201).json(CartItem);
    }
    catch(err){
        res.status(500).json(err)
    }
    });

    route.get("/cart-items/:_reqShoppingCartId", async (req,res) =>{
        try{
            const cartItems = await logic.getAllCartItem(req.params._reqShoppingCartId);
            res.json(cartItems);
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    });

    route.post("/order" ,async (req,res) =>{
        try{
            const order = await logic.addOrder(req.body);
            res.status(201).json(order);
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
        });

        route.get("/shoppingCart/:_shooppingCartId", async (req,res) =>{
            try{
                const cart = await logic.getShoppingCart(req.params._shooppingCartId);
                res.json(cart);
            }
            catch(err){
                console.log(err)
                res.status(500).json(err)
            }
        });

        route.get("/products-search/:productName", async (req,res) =>{
            try{
                const product = await logic.getAllProductsSearch(req.params.productName);
                res.json(product);
            }
            catch(err){
                console.log(err)
                res.status(500).json(err)
            }
        });

        
        route.delete("/shoppingCartItems/:_shoppingCartId", async (req,res) =>{
            try{
                const cart = await logic.deletAllCartItems(req.params._shoppingCartId);
                res.status(204).json(cart);
            }
            catch(err){
                console.log(err)
                res.status(500).json(err)
            }
        });

        route.delete("/aa", async (req,res) =>{
            try{
                const cart = await logic.deletAll();
                res.status(204)
            }
            catch(err){
                console.log(err)
                res.status(500).json(err)
            }
        });

        route.delete("/shoppingCartItem/:_shoppingCartId", async (req,res) =>{
            try{
                const cart = await logic.deletOneCartItems(req.params._shoppingCartId);
                res.status(204).json(cart);
            }
            catch(err){
                console.log(err)
                res.status(500).json(err)
            }
        });


module.exports = route;