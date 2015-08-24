exports.setup = function(app, http, io) {
	
	var db = require("./db");
	
	this.init = function()
	{
		db.setup();
	}

	app.post('/user/login', function (req, res) {
			
		console.log('login request');
		if (req.body.username && req.body.password)
		{
			db.find(db, 'users', {
				username : req.body.username, 
				password : req.body.password
			}, function()
			{
				console.log('testing');
			});
		}
	});


	app.post('/user/create', function (req, res) {
			
		console.log('create user request');
		if (req.body.username && req.body.password)
		{

		}
		
	});

	app.post('/user/delete', function (req, res) {
			
		if (req.body.username && req.body.password)
		{
		}
	});

};