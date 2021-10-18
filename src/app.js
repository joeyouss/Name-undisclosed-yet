
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
require("./db/conn")
// --------
const Register = require("./models/registers");
const RecipeAdded = require("./models/recipedb");
// const Recipe = require("./models/recipe");
// --------

var curremail = "joe";

// -----------
const { urlencoded, Router } = require("express");
const { userInfo } = require("os");

// -------
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
// -------
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

// ------getting routes
app.get("/", (req, res)=>{
    res.render("index");
});
app.get("/register", (req,res)=>{
    res.render("register");
});

app.get("/login",(req,res)=>{
    res.render("login");
});


// ------- show data by the user , retriveing data form mongodb
app.post("/login", async (req,res)=>{
    var usern = req.body.email;
    var pass = req.body.password;
    try {
        console.warn("hmm the form sends data");
        RecipeAdded.find({}, function(err, obj){
            for(var p in obj){
                if(obj[p].email === usern){
                    if(obj[p].password === pass){
                        curremail = usern;
                        console.warn("password is correct");
                        RecipeAdded.find({}, function(err, obje){
                            for(var k in obje){
                                if(obje[k].email ===  usern){
                                    res.send(obje[k].recipename);
                                }
                                else{
                                    res.send("sorry no recipe");
                                }
                            }
                        })
                    }
                    else{
                        res.send("wrong password, go back and try again");
                    }
                }
            }
        }) 
    } catch (error) {
        
    }
})
// ------------ data collected from registration form -> inserting into mongodb
app.post("/register", async (req,res)=>{
    try {
        var flag = false;
        const pass = req.body.password;
        const dummymail = req.body.email;
        RecipeAdded.find({}, function(err, d){
            for(var check in d){
                if(d[check].email===dummymail){
                    flag = true;
                    if(d[check].password===pass){
                        const recipeeee = new RecipeAdded({
                            recipename:req.body.recipenam,
                            cookingtime:req.body.ctime,
                            ingredients:req.body.ingredients,
                            recipepara:req.body.recipay,
                            password:req.body.password,
                            email:req.body.email
                            
                        })
                        const register = recipeeee.save();
                        res.status(201).render("register");
                    }
                    else{
                        res.send("false password")
                    }
                }
            }
            if(!flag){
                const newUsr = new RecipeAdded({
                    recipename:req.body.recipenam,
                            cookingtime:req.body.ctime,
                            ingredients:req.body.ingredients,
                            recipepara:req.body.recipay,
                            password:req.body.password,
                            email:req.body.email
                })
                const regis = newUsr.save();
                res.status(201).render("register");
            }
        })
        // const cpassword = req.body.confirmpassword;
        // if(password===cpassword){
            // curremail = req.body.email;
            // const recipeeee = new RecipeAdded({
            //     recipename:req.body.recipenam,
            //     cookingtime:req.body.ctime,
            //     ingredients:req.body.ingredients,
            //     recipepara:req.body.recipeline,
            //     email:req.body.email
            // })
            // const registeremployee = new Register({
            //     firstname:req.body.firstname,
            //     lastname:req.body.lastname,
            //     email:req.body.email,
            //     gender:req.body.gender,
            //     phone:req.body.phone,
            //     age:req.body.age,
            //     password:req.body.password,
            //     confirmpassword:req.body.confirmpassword
            // })
            // const register = await registeremployee.save();
            // res.status(201).render("ok");
        // }else{
        //     res.send("passwords don't match");
        // }
        // console.log(req.body.firstname);
        // res.send(req.body.firstname);
    } catch (error) {
        res.status(400).send(error);
    }
});
// -------enter a new recipe
app.post("/chekck" , async(req,res)=>{
    try{
        const recipeeee = new RecipeAdded({
            recipename:req.body.recipenam,
            cookingtime:req.body.ctime,
            ingredients:req.body.ingredients,
            recipepara:req.body.recipeline,
            email:curremail
        })
        const rec = await recipeeee.save();
        // console.warn);
        res.status(201).render("chekck");
    }
    catch(error){
        res.status(400).send(error);
    }
});

// ------for home page = adding recipes

// app.post("/home", async(req,res)=>{
//     try {
//         const newRecipe = new Recipe({
//                 nameofrecipe:req.body.nameofrecipe,
//                 cookingtime:req.body.cookingtime,
//                 ingredients:req.body.ingredients,
//                 picture:req.body.picture,
//                 // phone:req.body.phone,
//                 // age:req.body.age,
//                 // password:req.body.password,
//                 // confirmpassword:req.body.confirmpassword
//             })
//             const register = await newRecipe.save();
//             res.status(201).render("home");
//         // console.log(req.body.firstname);
//         // res.send(req.body.firstname);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// -----listening on port
app.listen(port, ()=>{
    console.log("hey its working ");
})


// ------just checking if CRUD works
// var check = "jyotibisht6114@gmail.com"
// Register.find({}, function(err, us){
//     if(!err){
//         for(var prop in us){
//             console.warn(us[prop]);
//         }
//     }
// })
