const express = require('express');
const app = express();
const passport = require('passport');
const configdb = require('./config/database.js');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const expressValidator = require('express-validator');
const morgan = require('morgan');

// connect to database
mongoose.connect(configdb.url)
	.then(()=>{
		console.log("Database Connection successful");
	}).catch((err)=>{
		console.log(err);
	});

// get the passport configuration
require('./config/passport.js')(passport);

// set the environment variables
const port = process.env.PORT || 1310;
app.set('view engine', 'ejs');

// use the middlewares
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended : true }));
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true
}));
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// handle the routes
require('./app/routes.js')(app, passport);

// start the server
app.listen(port, ()=>{
	console.log("Server is running at " + port + "...");
});