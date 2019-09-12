const models = require("../models");
const Product = models.Product;


function getAllProducts(){
    return new Promise((resolve,reject)=>{
        Product.find({}).populate("category").exec((err, products)=>{
            if(err)return reject(err); 
            resolve(products)
        })
    })
};

function updateProduct(reqBody,id){
    return new Promise((resolve,reject)=>{
        let product = reqBody.body;
        let imgName = reqBody.file.originalname.split(".png");
        reqBody.img = imgName[0];
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
        let imgName = reqProdcut.file.originalname.split(".png");
        reqBody.img = imgName[0];
        const product = new Product(reqBody);
        product.save((err,newProduct)=>{
            if(err) return reject(err);
            resolve(newProduct)
        });
    });
};

module.exports = {
    getAllProducts,
    getAllProductsByCategory,
    getAllProductsSearch, 
    updateProduct,
    addProdcut
    }