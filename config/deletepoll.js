let usermodel = require('./../app/models/user.js');
let pollmodel = require('./../app/models/poll.js');

module.exports = function(req, res){
	const userid = req.params.userid, pollid = req.params.pollid;

	// delete from usermodel
	usermodel.findOne({
		_id : userid
	}, function(err, user){
		// user doesn't exists	
		if(!user){
			req.flash('managepollMessage', "Invalid URI!!");
			res.redirect('/user/managepoll');
		}else if(user){ //user exists
			const index = user.mypolls.indexOf(pollid);
			if(index !== -1){user.mypolls.splice(index, 1);}

			// delete from pollmodel
			pollmodel.findOneAndRemove({
				_id : pollid
			}).then((response)=>{
				console.log(response);
				req.flash('managepollMessage', "Successfully Deleted!!!");
				res.redirect('/user/managepoll');
			}).catch((err)=>{
				console.log(err);
				req.flash('managepollMessage', err);
				res.redirect('/user/managepoll');
			});
		}
	}).catch((err)=>{
		console.log(err);
		req.flash('managepollMessage', err);
		res.redirect('/user/managepoll');
	});
};