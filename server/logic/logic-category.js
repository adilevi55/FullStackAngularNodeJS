const models = require("../models");
const Category = models.Category;


function getCategoryByName(reqCategoryName){
    return new Promise((resolve,reject)=>{
        Category.find({categoryName:reqCategoryName},(err, categoryName)=>{
            if(err)return reject(err); 
            resolve(categoryName)
        })
    })
};


function getAllCategories(){
    return new Promise((resolve,reject)=>{
        Category.find({},(err, categories)=>{
            if(err)return reject(err); 
            resolve(categories)
        })
    })
};

module.exports = {
    getCategoryByName,
    getAllCategories
    }