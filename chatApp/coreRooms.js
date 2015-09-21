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
		var userId = req.body.userId;
		if (userId)
		{
			var chatRoomResult = self.loadChatRooms(userId, self.sendData, res);
			if (chatRoomResult)
			{
				res.status(200).json(
				{
					data : []
				});
			}
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
		db.find(source, 
		{
			memberId  : id
		}, function(err, doc)
		{
			if (doc.length > 0)
			{
				var result = self.findChatGroupMembers(res, doc, callback);	
				if (result != null)
				{
					return result;
				}
			}
		});
		return null;
	};

	this.findChatGroupMembers = function(res, doc, callback)
	{
		var result = [];
		for (var i = 0; i < doc.length; i++) 
		{
			var chatGroupMemberId = doc[i].chatGroupMemberId;
			db.find('chatgroupmember',
			{
				Id : chatGroupMemberId
			}, function(err, doc)
			{
				if (doc.length)
				{
					for (var i = 0; i < doc.length; i++) 
					{
						var chatroomId = doc[i].chatroomId;
						self.findChatRoom(res, chatroomId, callback);
					};
				}
			});
		}
		return result;
	};

	this.findChatRoom = function(res, id, callback)
	{
		var rooms = [];
		
		db.find('chatrooms', 
		{
			_id : chatroomId
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
			callback(res, room);
		});
	};

};

