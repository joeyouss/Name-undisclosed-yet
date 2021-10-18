// defining schema 
const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
    // firstname:{
    //     type:String,
    //     required:true
    // },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    recipename:{
        type:String,
        required:true
    },
    cookingtime:{
        type:Number,
        required:true
    },
    ingredients:{
        type:String,
        required:true
    },
    recipepara:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    }
})
//  creating collection
const RecipeAdded = new mongoose.model("RecipeAdded",recipeSchema );
module.exports = RecipeAdded;

