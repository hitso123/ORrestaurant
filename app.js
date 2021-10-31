//NPM Imports
const express =require('express');
const app =express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

//config Imports
const config =require('./config');


//Route Imports
const restaurantRoutes=require('./routes/restaurant')
const commentRoutes=require('./routes/comments')
const mainRoutes=require('./routes/main')

//Model Imports
const Rest =require('./models/rest');
const Comment= require('./models/comment');

//Connect to db
mongoose.connect(config.db.connection);

//Config
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));



//Use Routes
app.use("/",mainRoutes);
app.use("/restaurant/:id/comments",commentRoutes);
app.use("/restaurant",restaurantRoutes);

app.listen(3000,()=>{
	console.log("ORrestaurant is running....");
});