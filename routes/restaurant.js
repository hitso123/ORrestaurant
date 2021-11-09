const express= require('express');
const Rest =require('../models/rest');
const router =express.Router();
const Comment= require('../models/comment');

//INDEX
router.get("/", async(req,res) => {
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

router.post("/", async(req,res) => {
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
		image_link: req.body.image_link
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
router.get("/new",(req,res)=>{
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

router.get("/:id/edit",async (req,res)=> {
	//Get the comic from the DB'
	try{
		const rest = await Rest.findById(req.params.id).exec()
		res.render("restaurant_edit",{rest})
	}catch(err){
		console.log(err);
		res.send("Broken ../comics/id/edit")
	}
	
	//Render the edit form passing in that comic
})

//Update

router.put("/:id", async(req,res) => {
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

router.delete("/:id",async (req,res) => {
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