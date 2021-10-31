const express= require('express');
const Rest =require('../models/rest');
const router =express.Router();
const Comment= require('../models/comment');

//INDEX
router.get("/",(req,res) => {
	Rest.find()
	.exec()
	.then((rests)=>{
		res.render("restaurant",{restaurant:rests});
	})
	.catch((err)=>{
		console.log(err)
		res.redirect("/restaurant")
	})
	// res.render("restaurant",{restaurant});
});

// Create

router.post("/",(req,res) => {
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
	
	Rest.create(newRest)
	.then((rest)=> {
		console.log(rest)
		res.redirect("/restaurant/"+rest.id);
	})
	.catch((err)=>{
		console.log(err);
		rest.redirect("/restaurant");
	})
	// restaurant.push(req.body)
	
});


// NEW route to be ID route otherwise it will shown never 
router.get("/new",(req,res)=>{
	res.render("restaurant_new");	
});

//Show

router.get("/:id",(req,res)=> {
	Rest.findById(req.params.id)
	.exec()
	.then((rest)=> {
		Comment.find({comicId:req.params.id},(err,comments)=>{
			if(err){
				res.send(err);
			}
			else{
				res.render("restaurant_show",{rest,comments})
			}
		})
		
			
	})
	.catch((err) => {
		res.send(err)
	})
	
})

//Edit

router.get("/:id/edit",(req,res)=> {
	//Get the comic from the DB'
	Rest.findById(req.params.id)
	.exec()
	.then((rest) => {
		res.render("restaurant_edit",{rest})
	})
	//Render the edit form passing in that comic
})

//Update

router.put("/:id",(req,res) => {
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
	
	Rest.findByIdAndUpdate(req.params.id, rest, {new: true} )
	.exec()
	.then((updatedRest)=> {
		console.log(updatedRest)
		res.redirect(`/restaurant/${req.params.id}`);
	})
	.catch((err)=> {
	res.send("Error:",err);
	})
	
})


//Delete

router.delete("/:id",(req,res) => {
	Rest.findByIdAndDelete(req.params.id)
	.exec()
	.then((deletedRest)=> {
		console.log("Deleted:",deletedRest);
		res.redirect("/restaurant");
	})
	.catch((err)=>{
		res.send("Error deleting",err);
	})
})

module.exports=router;