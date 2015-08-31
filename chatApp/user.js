exports.setup = function(app, http, io, db) {

	this.init = function()
	{
		db.setup();
	}

	app.post('/user/login', function (req, res) {

		if (req.body.username && req.body.password)
		{
			db.find('users', {
				username : req.body.username, 
				password : req.body.password
			}, function(err, doc)
			{
				if (doc.length > 0)
				{
					res.status(200).json(
					{
						token : 'userToken'
					});
				}
			});
		}
		else
		{
			res.status(400).json(
			{
				token : 'bad request'
			});
		}
	});

	app.post('/user/create', function (req, res) {
		console.log('create user request');
		if (req.body.username && req.body.password)
		{
			db.insert('users', userData, function(err, result)
			{
				if (result.result.n > 0)
				{
					res.status(201).json(
					{
						status : 'Ok'
					});
				}
			});
		}
		else 
		{
			res.status(304).json(
    		{
    			status : 'Not modified'
    		});
		}
	});

	app.post('/user/update', function (req, res) {
		if (req.body.username && req.body.password)
		{
			db.update('users', userData, function(err, result) 
			{
				assert.equal(err, null);
    			if (result.result.n > 0)
    			{
    				res.status(200).json(
    				{
    					status : 'Ok'
    				});
    			}
			});
		}
		else 
		{
			res.status(304).json(
    		{
    			status : 'Not modified'
    		});
		}
	});


	app.post('/user/delete', function (req, res) {
			
		if (req.body.username && req.body.password)
		{
			db.delete('users', userData, function(err, result) 
			{
				assert.equal(err, null);
    			if (result.result.n > 0)
    			{
    				res.status(200).json(
    				{
    					status : 'Ok'
    				});
    			}
			});
		}
		else 
		{
			res.status(304).json(
    		{
    			status : 'Not modified'
    		});
		}
	});
};