const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/FullStack",{useNewUrlParser:true},(err,mongoCilent)=>{
    if(err)return console.log(err)
    console.log("We are connected to" + mongoCilent.name + " database on MongoDB");
});

module.exports = {
    mongoose
}