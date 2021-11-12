const express= require('express');
const Rest =require('../models/rest');
const router =express.Router();
const Comment= require('../models/comment');
const isLoggedIn=require('../utils/isLoggedIn');

//INDEX
router.get("/", async(req,res) => {
	console.log(req.user);
	try{
		const rests = await Rest.find().exec();
		res.render("restaurant",{restaurant:rests});
	}
	catch(err){
		console.log(err);
		res.send("you broki it .../index");
	}	
});

// Create

router.post("/", isLoggedIn , async(req,res) => {
	console.log(req.body);
	const genre =req.body.genre.toLowerCase();
	const newRest= {
		title: req.body.title,
		description: req.body.description,
		owner: req.body.owner,
		street: req.body.street,
		Date : req.body.date,		
		genre: genre,
		workers: req.body.workers,
		sundayon: !!req.body.sundayon,
		image_link: req.body.image_link,
		author: {
			id: req.user._id,
			username: req.user.username
		}
	}
	try{
		const rest = await Rest.create(newRest)	;
		console.log(rest)
		res.redirect("/restaurant/"+rest.id);
	}
	catch(err){
		console.log(err);
		rest.redirect("/restaurant");
	}
	// restaurant.push(req.body)
	
});


// NEW route to be ID route otherwise it will shown never 
router.get("/new", isLoggedIn ,(req,res)=>{
	res.render("restaurant_new");	
});

// Search
router.get("/search",async (req,res) => {
	try {
		const rest=await Rest.find({
			$text:{
				$search:req.query.term
			}
		});
		res.render("restaurant",{restaurant:rest});
	} catch(err){
		console.log(err);
		res.send("Broken again")
	}
})

//Show

router.get("/:id",async (req,res)=> {
	try {
		const rest= await Rest.findById(req.params.id).exec()
		const comments = await Comment.find({restId:req.params.id});
		res.render("restaurant_show",{rest,comments})
	}
	catch(err){
		console.log(err);
		res.send("You broke it ... /restaurant/:id");
	}
	
})

//Edit

router.get("/:id/edit",isLoggedIn, async (req,res)=> {
	
	if(req.isAuthenticated()){ // Check if the user is logges in 
		//If logged in check if they own the restaurant
		const rest= await Rest.findById(req.params.id).exec();
		console.log(rest.author.id);
		console.log(req.user._id);
		
		if(rest.author.id.equals(req.user._id)){
			// If author, render the form to edit
			res.render("restaurant_edit",{rest});
		}
		else{
			// If not rediect back to show the page
			res.redirect(`/restaurant/${rest._id}`)
		}
	} else {  // if not logged in ,rederict to /login	
		res.redirect("/login");
	} 
})

//Update

router.put("/:id", isLoggedIn, async(req,res) => {
	console.log(req.body);
	const genre =req.body.genre.toLowerCase();
	const rest= {
		title: req.body.title,
		description: req.body.description,
		owner: req.body.owner,
		street: req.body.street,
		Date : req.body.date,		
		genre: genre,
		workers: req.body.workers,
		sundayon: !!req.body.sundayon,
		image_link: req.body.image_link
	}
	try{
		const updatedRest =await Rest.findByIdAndUpdate(req.params.id, rest, {new: true} ).exec();
		console.log(updatedRest);
		res.redirect(`/restaurant/${req.params.id}`);
	}catch(err){
		console.log(err);
		res.send("You broke it ... /restaurant/:id");
	}	
})


//Delete

router.delete("/:id",isLoggedIn ,async (req,res) => {
	try{
		const deletedRest = await Rest.findByIdAndDelete(req.params.id).exec()
		console.log("Deleted:",deletedRest);
		res.redirect("/restaurant");
	}catch{
		console.log(err);
		res.send("You broke it ... /restaurant/:id");
	}
})

module.exports=router;