// connecting database to express
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/recipe", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("connectojwnfiwen");
}).catch((e)=>{
    console.log(e);
})