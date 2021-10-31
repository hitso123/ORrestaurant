//============================
// IMPORTS
//============================


//NPM Imports
const express =require('express');
const app =express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
var morgan = require('morgan')

//config Imports
const config =require('./config');


//Route Imports
const restaurantRoutes=require('./routes/restaurant')
const commentRoutes=require('./routes/comments')
const mainRoutes=require('./routes/main')

//Model Imports
const Rest =require('./models/rest');
const Comment= require('./models/comment');

//============================
//DEVLOPMENT
//============================
// Morgan
app.use(morgan('tiny'))

// Seed to DB

const seed=require('./utils/seed');
seed();

//============================
// CONFIG
//============================

//Connect to db
mongoose.connect(config.db.connection);

// Express Config
app.set("view engine","ejs");
app.use(express.static('public'));

// Body parser Config
app.use(bodyParser.urlencoded({extended: true}));

//Method Override Config
app.use(methodOverride('_method'));

// Route Config
app.use("/",mainRoutes);
app.use("/restaurant/:id/comments",commentRoutes);
app.use("/restaurant",restaurantRoutes);

//============================
// LISTEN
//============================


app.listen(3000,()=>{
	console.log("ORrestaurant is running....");
});