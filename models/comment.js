const mongoose =require("mongoose");

const commentSchema =new mongoose.Schema({
	user:String,
	text: String,
	restId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Rest"
	}
})
module.exports=mongoose.model("comment",commentSchema);