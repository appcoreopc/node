exports.setup = function(app, http, db) {

	var self = this; 
	this.sendData = function(res, data)
	{
		res.status(200).json(
		{
			'data' : data
		});
	};

	app.get('/chat/get/:id', function (req, res) {

		console.log('we have a hit' + req.params.id);
		var chatroomId = req.params.id;
		if (chatroomId)
		{
			self.loadChatsByRoom(chatroomId, res, self.sendData);
		}
		else
		{
			res.status(400).json(
			{
				token : 'bad request'
			});
		}
	});

	// loads chatroom by user id 
	this.loadChatsByRoom = function(chatTableId, res, callback)
	{
		return self.loadChats(chatTableId, res, callback);
	};

	// loads all the chats by table 
	this.loadChats = function(chatTableId, res, callback)
	{
		var chatsResult = [];
		db.find(chatTableId, 
		{ }, 
		function(err, doc)
		{
			if (doc.length > 0)
			{
				for (var i = 0; i < doc.length; i++) {
					chatsResult.push(doc[i]);
				};

				callback(res, chatsResult);
			}
		});
		return chatsResult;
	};
};
