let usermodel = require('./../app/models/user.js');
const bcrypt = require('bcryptjs');

module.exports = (req, res)=>{

	//find User
	usermodel.findOne({
		username : req.body.username
	}, (err, user)=>{
		if(err){
			console.log(err);
			req.flash('failureMessage', "Some Error Occured!!!!")
			res.redirect('/signup');
		}else{

			
			if(!user){	// user does not exists

				let newuser = new usermodel();
				newuser.username = req.body.username;
				newuser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
				newuser.email = req.body.email;
				newuser.createdat = new Date();
				newuser.mypolls = [];
				//save the user
				newuser.save()
					.then((doc)=>{
						console.log(doc);
						req.flash('info', "Successfully Added to Database.")
						res.redirect('/');
					}).catch((err)=>{
						console.log(err);
						req.flash('failureMessage', "Some Error Occured!!!")
						res.redirect('/signup');
					});
			}else{
				//user exists
				req.flash('failureMessage', "User Exists!!!")
				res.redirect('/signup');
			}
		}
	}).catch((err)=>{
		console.log(err);
		req.flash('failureMessage', "Some Error Occured!!!!")
		res.redirect('/signup');
	});

};