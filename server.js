const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080

const expressHandlebars = require("express-handlebars");

app.engine("handlebars", expressHandlebars({defaultLayout:"main"}));

app.set("view engine", "handlebars");

//middleware parsing creates req.body
app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use(express.static("public"));

const webController = require("./controllers/web_controller");

webController(app)

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/oatmeal")  

app.listen(PORT, function(){
    console.log("Server is listening on http://localhost:" + PORT)
});