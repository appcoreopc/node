exports.setup = function(app, http, db, corechats) {


	var self = this; 

	this.initStartup = function(id, res, callback)
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
