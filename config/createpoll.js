let pollmodel = require('./../app/models/poll.js');
let usermodel = require('./../app/models/user.js');
const querystring = require('querystring');

module.exports = (req, res)=>{
	//console.log(req.body);
	//console.log(req.user);
	usermodel.findOne({
		username : req.user.username
	}, (err, user)=>{

		if(err){
			console.log(err);
			req.flash('createpollMessage', "Some Error Occured!!!!")
			res.redirect('/user/createpoll');
		}else{
			// user doesn't exists
			if(!user){
				req.flash('loginMessage', "Login First!");
				res.redirect('/login');
			}else if(user){	// user exists

				// create an array of options
				let optionsArray = [], reqObject = req.body;
				for( let prop in reqObject ){
					if( reqObject.hasOwnProperty(prop) ){
						if( prop.toString().trim() != "question" ){
							const optionObj = {
								option : reqObject[prop].toString().trim(),
								votes : 0
							};
							optionsArray.push(optionObj);
						}
					}
				}

				// make a newpoll
				let newpoll = new pollmodel({
					question : req.body.question.toString().trim(),
					owner : user._id,
					options : optionsArray,
					createdat : new Date()
				});
				
				newpoll.save().then((doc)=>{
					//console.log(doc);
					user.mypolls.push(newpoll.id);
					user.save((err)=>{
						if(err){
							console.log(err);
							req.flash('createpollMessage', "Some Error Occured!!!!");
							res.redirect('/user/createpoll');
						}else{
							// populate the polls
							pollmodel.find({})
								.populate('owner')
								.exec((err, polls)=>{
									if(err){
										console.log(err);
									}else{
										console.log(polls);
									}
							});
							// populate the users
							usermodel.find({})
								.populate('mypolls')
								.exec(function(err, users) {
							        if(err){
										console.log(err);
										req.flash('createpollMessage', "Some Error Occured!!!!")
										res.redirect('/user/createpoll');
									}else{
										//console.log(users);
										const polluri = "http://localhost:1310/get/"+user.username+"/"+req.body.question.toString().trim();
										req.flash('createdpollMessage', "Poll created successfully, visit: " + polluri);
										res.redirect('/user/createpoll');
									}
							});
						}
					});
				}).catch((err)=>{
					console.log(err);
					req.flash('createpollMessage', "Poll cannot be saved!!");
					res.redirect('/user/createpoll');
				});


			}
		}
	}).catch((err)=>{
		console.log(err);
		req.flash('createpollMessage', err.errmsg);
		res.redirect('/user/createpoll');
	});
};