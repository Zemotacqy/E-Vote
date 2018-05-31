let usermodel = require('./../app/models/user.js');
let pollmodel = require('./../app/models/poll.js');

module.exports = (req, res)=>{

	pollmodel.findOne({
		_id : req.params.pollid
	}, (err, poll)=>{
		if(err){
			console.log(err);
		}else{
			if(!poll){
				res.render('nodata.ejs');
			}else if(poll){
				res.render('viewresults.ejs', { polldata : poll });
			}
		}
	}).catch((err)=>{
		console.log(err);
	})

};