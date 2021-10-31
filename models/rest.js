const mongoose =require("mongoose");

const restSchema =new mongoose.Schema({
	title:String,
	description:String,
	owner: String,
	street: String,
	Date : Date,
	genre: String,
	workers: Number,
	sundayon:Boolean,
	image_link:String
})
module.exports=mongoose.model("rest",restSchema);