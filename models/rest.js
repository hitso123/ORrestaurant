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
	image_link:String,
	author: {
		id: {
			type : mongoose.Schema.Types.ObjectId,
			ref : "User"
		},
		username : String
	}
})

restSchema.index({
	'$**' :'text'
});
module.exports=mongoose.model("rest",restSchema);