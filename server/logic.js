const models = require("./models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mognoose = require("mongoose");


const Costomer = models.Costomer;
const Manager = models.Manager;
const Category = models.Category;
const Product = models.Product;
const ShoppingCart = models.ShoppingCart;
const CartItem = models.CartItem;
const Order = models.Order;


// Costomer Login
function costomerLogin(reqCostomer){
    return new Promise((resolve,reject)=>{
        Manager.findOne({userName:reqCostomer.userName},(err,admin)=>{
            if(err) return reject(err);
            if(!admin){
                Costomer.findOne({userName:reqCostomer.userName},(err,newCostomer)=>{
     
                    if(err) return reject(err);
                         /// להחליף את ההודעת שגיעה
                    if(!newCostomer) return reject({message:"User Name or Password are Invalid"});
                    //// להחליף את השם resolte
                    bcrypt.compare(reqCostomer.password,newCostomer.password,(err,resolte)=>{
                        if(err)return reject(err);
                                    /// להחליף את ההודעת שגיעה
                        if(!resolte) return reject({message:"User Name or Password are Invalid"});
                        const newToken = jwt.sign(
                            {userName: newCostomer.userName,
                             email: newCostomer.email,
                             phone: newCostomer.phone,
                             constomer_id: newCostomer._id},
                             // להחליף את המחרוזת לקובץ אחר שיהיה יותר נגיש
                             "sectret",
                             {expiresIn: "1h"});
                             newCostomer.token = newToken;
                             resolve(newCostomer);          
                            });     
                })


            }
            else{
                bcrypt.compare(reqCostomer.password,admin.password,(err,resolte)=>{
                    if(err)return reject(err);
                                /// להחליף את ההודעת שגיעה
                    if(!resolte) return reject({message:"haker!!!!"});
                    const newToken = jwt.sign(
                        {userName: admin.userName,
                         email: admin.email,
                         phone: admin.phone,
                         admin_id: admin._id},
                         // להחליף את המחרוזת לקובץ אחר שיהיה יותר נגיש
                         "sectret",
                         {expiresIn: "1h"});
                         admin.token = newToken;
                         resolve(admin);          
                        });    
            } 
        })
  
    })
};

function register(reqCostomer){
    return new Promise((resolve,reject)=>{

    Costomer.findOne({userName:reqCostomer.userName}, (err,checkCostomerUserName)=>{
        if(err) return reject(err);
        if(checkCostomerUserName) return reject({message:"User Name invalid"});

        Costomer.findOne({email:reqCostomer.email}, (err,checkCostomerEmail)=>{
            if(err) return reject(err);
            if(checkCostomerEmail) return reject({message:"Email already exists"});

        bcrypt.hash(reqCostomer.password,1,(err,hash) =>{
            if(err)return reject(err);
            const costomer = new Costomer({
                userName:reqCostomer.userName,
                firstName:reqCostomer.firstName,
                lastName:reqCostomer.lastName,
                email:reqCostomer.email,
                phone:reqCostomer.phone,
                city:reqCostomer.city,
                street:reqCostomer.street,
                houseNumber:reqCostomer.houseNumber,
                password:hash
            });
            costomer.save((err,newCostomer)=>{
                if(err)return reject(err);

                const newToken = jwt.sign(
                {   
                    userName: newCostomer.userName,
                    email: newCostomer.email,
                    phone: newCostomer.phone,
                    constomer_id: newCostomer._id
                },
                    // להחליף את המחרוזת לקובץ אחר שיהיה יותר נגיש
                    "sectret",
                    {expiresIn: "1h"});
                    newCostomer.token = newToken;
                    resolve(newCostomer);
            })
        });
    });
    });
});
}

function getAllCostomers(){
    return new Promise((resolve,reject)=>{
        Costomer.find({}, (err, costomers)=>{
            if(err){reject(err);}
            else{
                resolve(costomers);
            }
        })
    })
};

function getAllProducts(){
    return new Promise((resolve,reject)=>{
        Product.find({}).populate("category").exec((err, products)=>{
            if(err)return reject(err); 
            resolve(products)
        })
    })
};

function getAllCategoryByName(reqCategoryName){
    return new Promise((resolve,reject)=>{
        Category.find({categoryName:reqCategoryName},(err, categoryName)=>{
            if(err)return reject(err); 
            resolve(categoryName)
        })
    })
};


function getAllCategory(){
    return new Promise((resolve,reject)=>{
        Category.find({},(err, categories)=>{
            if(err)return reject(err); 
            resolve(categories)
        })
    })
};

function updateProduct(reqBody,id){
    return new Promise((resolve,reject)=>{
        let product = reqBody.body;
        let imgName = reqBody.file.originalname;
        product.img = imgName;
        Product.updateOne({_id:id},product,err=>{
            if(err)return reject(err); 
            resolve(product)
        })
    })
};

function getAllProductsByCategory(_categoryId){
    return new Promise((resolve,reject)=>{
        Product.find({category:_categoryId}).populate("category").exec((err, products)=>{
            if(err)return reject(err); 
            resolve(products)
        })
    })
};

function getAllProductsSearch(productName){
    return new Promise((resolve,reject)=>{
        let regex =  new RegExp(productName,'i');
        Product.find({productName:{ $regex: regex } }).populate("category").exec((err, products)=>{
            if(err)return reject(err); 
            resolve(products)
        })
    })
};
function addProdcut(reqProdcut){
    return new Promise((resolve,reject)=>{
        let reqBody = reqProdcut.body;
        let imgName = reqProdcut.file.originalname
        reqBody.img = imgName;
        const product = new Product(reqBody);
        product.save((err,newProduct)=>{
            if(err) return reject(err);
            resolve(newProduct)
        });
    });
};

// order
function getAllOrders(){
    return new Promise((resolve,reject)=>{
        Order.find({},(err, ordrds)=>{
            if(err)return reject(err); 
            resolve(ordrds)
        })
    })
}
// order
function getCastomerOrders(_reqCostomerId){
    return new Promise((resolve,reject)=>{
        Order.find({costomer:_reqCostomerId},(err, ordrds)=>{
            if(err)return reject(err); 
            resolve(ordrds)
        })
    })
}

function addShoppingCart(reqShoppingCart){
    return new Promise((resolve,reject)=>{
        reqShoppingCart._id = mognoose.Types.ObjectId();
        const shoppingCart = new ShoppingCart(reqShoppingCart);
        shoppingCart.save((err,newShoppingCart)=>{
            if(err) return reject(err);
            resolve(newShoppingCart)
        });
    });
}

function addItemToCart(reqCartItem){
    return new Promise((resolve,reject)=>{
        const cartItem = new CartItem(reqCartItem);
        cartItem.save((err,newCartItem)=>{
            if(err) return reject(err);
            CartItem.populate(cartItem, {path: "product"},(err,cartItemPopulat)=>{
               if(err) return reject(err);
               resolve(cartItemPopulat)

            })
        });
    });
}
  
    
function getAllCartItem(_reqShoppingCartId){
    return new Promise((resolve,reject)=>{
        CartItem.find({shoppingCart:_reqShoppingCartId}).populate("product").exec((err, cartItems)=>{
            if(err)return reject(err); 
            resolve(cartItems)
        })
    })   
};

function getShoppingCart(_shooppingCartId){
    return new Promise((resolve,reject)=>{
        ShoppingCart.find({_id:_shooppingCartId},(err, shoppingCart)=>{
            if(err)return reject(err); 
            resolve(shoppingCart)
        })
    })   
};

function addOrder(reqOrder){
    return new Promise((resolve,reject)=>{
        const order = new Order(reqOrder);
        order.save((err,newOrder)=>{
            if(err) return reject(err);
            resolve(newOrder)
        });
    });
};

function deletAllCartItems(reqShoppingCartItems){
    return new Promise((resolve,reject)=>{
        CartItem.deleteMany({shoppingCart:reqShoppingCartItems},err=>{
            if(err) return reject(err);
            resolve()
        });
    });
};

function deletAll(){
    return new Promise((resolve,reject)=>{
        ShoppingCart.deleteMany({},err=>{
            if(err) return reject(err);
            resolve()
        });
    });
};


function deletOneCartItems(reqShoppingCartItem){
    return new Promise((resolve,reject)=>{
        CartItem.deleteOne({_id:reqShoppingCartItem},err=>{
            if(err) return reject(err);
            resolve()
        });
    });
};

module.exports = {
getAllCostomers,
getAllProducts,
costomerLogin,
register,
addProdcut,
getAllOrders,
getAllOrders,
getCastomerOrders,
addShoppingCart,
addItemToCart,
getAllCartItem,
addOrder,
getShoppingCart,
getAllProductsByCategory,
getAllCategoryByName,
deletAllCartItems,
deletOneCartItems,
getAllProductsSearch,
deletAll,
getAllCategory,
updateProduct


}