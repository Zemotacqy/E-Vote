let usermodel = require('./../app/models/user.js');
let pollmodel = require('./../app/models/poll.js');
const querystring = require('querystring');

module.exports = (req, res)=>{

	usermodel.findOne({
		username : req.params.username
	}, (err, user)=>{
		if(err){
			console.log(err);
		}else{
			if(!user){
				res.render('nodata.ejs');
			}else if(user){
				pollmodel.findOne({
					question : req.params.question
				}, (err, poll)=>{
					if(err){
						console.log(err);
					}else{
						if(!poll){
							res.render('nodata.ejs');
						}else if(poll){
							/*console.log("polldata:");
							console.log(poll);
							console.log("userdata:");
							console.log(user);*/
							res.render('pollactivity.ejs', { polldata : poll, userdata : user });
						}
					}
				}).catch((err)=>{
					console.log(err);
				})

			}
		}
	}).catch((err)=>{
		console.log(err);
	})

};