

module.exports = function(app, passport){

	// handle the home page
	app.get('/', (req, res)=>{
		res.render('index.ejs');
	});

	// handle the login page
	/*app.get('/login', (req, res)=>{
		res.render('login.ejs', { message : req.flash('loginMessage') });
	});
	*/

	// handle the Signup page
	app.get('/signup', (req, res)=>{
		res.render('signup.ejs', { successMessage : req.flash('successMessage'), failureMessage : req.flash('failureMessage') });
	});

	app.post('/signup', (req, res)=>{
		console.log(req.query);
		require('./../config/saveuser.js')(req, res);
	});

};