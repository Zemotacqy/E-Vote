const mongoose = require('mongoose');

let pollschema = new mongoose.Schema({
	question : {
		type : String,
		required : true
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
	},
	createdat : {
		type : Date
	}
});

module.exports = mongoose.model('polls', pollschema);