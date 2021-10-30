const express=require('express')
const router=express.Router({mergeParams:true});

const Comment= require('../models/comment');


//new Comment -Show form
router.get("/new",(req,res)=> {
	res.render("comments_new",{restId: req.params.id})
})

// create Comments -Actually Update DB

router.post("/",(req,res)=> {
	//Create the comments
	Comment.create({
		user: req.body.user,
		text:req.body.text,
		restId:req.body.restId
	})
	.then((newComment)=>{
		console.log(newComment);
		res.redirect(`/restaurant/${req.body.restId}`);
	})
	.catch((err)=>{
		console.log(err);
		res.redirect(`/restaurant/${req.body.restId}`);
	})
	//redirect to the show page for the restaurant
})
module.exports=router;