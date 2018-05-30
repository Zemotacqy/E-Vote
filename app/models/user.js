const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
	},
	mypolls : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : 'polls'
	}]
});

// checking if password is valid
userschema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', userschema);