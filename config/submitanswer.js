let usermodel = require('./../app/models/user.js');
let pollmodel = require('./../app/models/poll.js');

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
							const ans = req.body.option;
							//let flag = 0;
							for(let i=0;i<poll.options.length;i++){
								if(poll.options[i].option === ans){
									// update the pollmodel
									pollmodel.update({
										'options._id' : poll.options[i]._id,
									}, 
									{ 
										'$set' : {'options.$.votes' : poll.options[i].votes + 1 }
									}, { new : true }, (err, doc)=>{
										if(err){
											console.log(err);
										}else{
											res.redirect('/viewresults/'+poll._id);
										}
									});								
								}
							}
						}
					}
				}).catch((err)=>{
					console.log(err);
				});

			}
		}
	}).catch((err)=>{
		console.log(err);
	})

};