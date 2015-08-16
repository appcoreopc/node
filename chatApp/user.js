exports.setup = function(app, http, io) {

	app.post('/user/login', function (req, res) {
			
		console.log('request body data :' + req.body.name);
		//console.log('req url' + req.params('name'));
	    console.log('testing user');
		
	});
};