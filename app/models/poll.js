const mongoose = require('mongoose');

let pollschema = new mongoose.Schema({
	question : {
		type : String,
		required : true,
		unique : true
	},
	options : [{
		option : {
			type : String,
			required : true
		},
		votes : {
			type : Number
		}
	}],
	owner : {
		type : mongoose.Schema.ObjectId,
		ref : 'users'
	},
	createdat : {
		type : Date
	}
});

module.exports = mongoose.model('polls', pollschema);