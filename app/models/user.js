const mongoose = require('mongoose');
const validator = require('validator');

let userschema = new mongoose.Schema({
	username : {
		type : String,
		required : true,
		unique : true
	},
	password : {
		type : String,
		required : true,
	},
	email : {
		type : String,
		validate : (value)=>{
			return validator.isEmail(value);
		}
	},
	createdat : {
		type : Date
	}
});

module.exports = mongoose.model('users', userschema);