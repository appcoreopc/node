exports.setup = function(app, http, db) {

	var self = this; 

	this.sendData = function(res, data)
	{
			res.status(200).json(
			{
				'data' : data
			});

	};

	app.get('/chatroom/load', function (req, res) {
		var userId = req.query.userId;
		if (userId)
		{
			self.loadChatRooms(userId, self.sendData, res);
		}
		else
		{
			res.status(400).json(
			{
				token : 'bad request'
			});
		}
	});

	app.post('/chatroom/create', function (req, res) {

		if (req.body.username && req.body.password)
		{
			db.find(source, {
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

	app.post('/chatroom/delete', function (req, res) {

		if (req.body.username && req.body.password)
		{
			
		}
		else
		{
			res.status(400).json(
			{
				token : 'bad request'
			});
		}
	});

	app.post('/chatroom/rename', function (req, res) {

		if (req.body.username && req.body.password)
		{
			
		}
		else
		{
			res.status(400).json(
			{
				token : 'bad request'
			});
		}
	});

	this.loadChatRooms = function(id, callback, res)
	{
		self.loadChatMembers(res, id, callback);
	};

	this.loadChatMembers = function(res, id, callback)
	{
		var source = 'chatmembers';
		var dataObject = {
			memberId  : parseInt(id)
		};

		console.log(dataObject);
		
		db.find(source, dataObject
		, function(err, doc)
		{
			console.log(doc);

			if (doc.length > 0)
			{
				self.findChatGroupMembers(res, doc, callback);	
			}
		});
	};

	this.findChatGroupMembers = function(res, doc, callback)
	{		
		var result = doc.map(function(a) {return a.chatgroupMemberId;});
		console.log(result);

			db.find('chatgroupmember',
			{
				Id : { $in : result }
			}, function(err, dbresult)
			{
				console.log('chatgroupmember section:' + doc);

				if (doc.length)
				{
					self.findChatRoom(res, dbresult, callback);
				}
			});
	};

	this.findChatRoom = function(res, doc, callback)
	{
		var result = doc.map(function(a) {return a.chatroomId;});
		
		var rooms = [];

		db.find('chatrooms', 
		{
			Id : { $in : result }
		}, function(err, doc)
		{	
			for (var i = 0; i < doc.length; i++) 
			{
				var roomInfo = 
				{
					Id : doc[i]._id,
					Name : doc[i].name
				};
				rooms.push(roomInfo);
			}
			callback(res, rooms);
		});
	};
};
