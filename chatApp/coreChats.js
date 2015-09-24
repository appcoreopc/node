exports.setup = function(app, http, db) {

	var self = this; 

	this.sendData = function(res, data)
	{
		res.status(200).json(
		{
			'data' : data
		});
	};

	app.get('/chat/get', function (req, res) {

		var userId = req.query.userId;
		if (userId)
		{
			self.loadChatsByRoom(userId, res, self.sendData);
		}
		else
		{
			res.status(400).json(
			{
				token : 'bad request'
			});
		}
	});

	
	this.loadChatsByRoom = function(id, res, callback)
	{
		return self.loadChats(id, res, callback);
	};

	this.loadChats = function(id, res, callback)
	{
		var chatsResult = [];
		var source = 'chats';

		db.find(source, 
		{
			chatRoomId  : parseInt(id)
		}, function(err, doc)
		{
			if (doc.length > 0)
			{
				for (var i = 0; i < doc.length; i++) {
					console.log(doc[i]);
					chatsResult.push(doc[i]);
				};

				callback(res, chatsResult);
			}
		});
		return chatsResult;
	};
};
