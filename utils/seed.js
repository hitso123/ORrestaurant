const Rest= require('../models/rest');
const Comment = require('../models/comment');


const rest_seeds = [
	{
		title:"New-sagar",
		description:"It is needless to say that Python makes the task easier to engage in m...",
		owner:"Hariram singh",
		street:"Cantt",
		Date:"2021-09-10",
		genre:"chat",
		workers:8,
		sundayon:true,
		image_link:"https://cdn.dribbble.com/users/63407/screenshots/2571339/media/08d8b8b22e5c4e652d72f275f42604c9.png?compress=1&resize=400x300"
	},
	{
		title:"Gamandi",
		description:"I'm baby tacos cray actuall y prism semiotics tumblr mlkshk pok pok ac...",
		owner:"Kamalnath sharma",
		street:"lashmiganj",
		Date:"2021-09-11",
		genre:"ice-cream",
		workers:6,
		sundayon:false,
		image_link:"https://media.istockphoto.com/vectors/ice-cream-cart-vector-id476666816?k=20&m=476666816&s=612x612&w=0&h=HhE1tBpVLnMS2DdE7QZnQhraSzSYIombroU-nngzVPQ="
	},
	{
		title:"Gual",
		description:"I'm baby tacos cray actuall y prism semiotics tumblr mlkshk pok pok ac...",
		owner:"Kamalnath sharma",
		street:"lashmiganj",
		Date:"2021-08-19",
		genre:"samosa",
		workers:5,
		sundayon:true,
		image_link:"https://mpng.subpng.com/20180508/ute/kisspng-aloo-chaat-indian-cuisine-street-food-clip-art-5af1cd8d9f9129.9948417615257962376536.jpg"
		
	}
]

const seed= async () =>{
	//Delete all the current restaurant and comments 
	await Rest.deleteMany();
	console.log("Deleted All the restaurant");
	
	await Comment.deleteMany();
	console.log("Deleted All the Comments");
	
	// Create three new comics
	for (const rest_seed of rest_seeds) {
		let rest = await Rest.create(rest_seed);
		console.log("created a new Rest",rest.title);
		//Create a new comment for each restaurant
		await Comment.create( {
			text : "I went to the Restaurant ",
			user : "scoby_doo",
			restId:rest._id
		})
		console.log("created a new comment!")
	}
	
	
}

module.exports=seed;