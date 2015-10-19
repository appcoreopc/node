exports.setup = function(app, http, io, chatmodule, db, mongo) {

	var clients  = [];
	var maxclient = 2;
	var idx = 0;  
	var clientSockets = [];
	var self = this; 
	var chatmessageConst = 'chat message';
	var chatgroupmemberTable = "chatgroupmember";
	var chatroomsTable = "chatrooms";
	var userTable = "users";

	io.on('connection', function(socket) {
		
		console.log('connected');
		var connectedUserId = socket.handshake.session.userId;
		//var connectedUserId = '1';
		console.log('connected user id :'  + connectedUserId);
		console.log(socket.id);

		clientSockets[connectedUserId] = socket; 
		chatmodule.socketInit(connectedUserId, socket);

		//*****************************************************************************
		// find a list of groupchats that this user is associated with // 
		// and push all the data over manually -> check which message sent and which are not // 
		// push all of these data over //
		//*****************************************************************************

		/*for (var i = 0; i < socket.server.sockets.sockets.length; i++) {
			console.log('----------------------------------------');
			console.log(socket.server.sockets.sockets[i]);
			console.log('----------------------------------------');
		};*/

		// msg format 
		// [sender:xxxxxxxx] [target:chatroomid] [message:content]
		socket.on(chatmessageConst, function(msg) {
			
			console.log('sent message...');
			console.log(msg);

			/// send to client 
			if (msg)
			{
				var messageParts = msg.split("[");

				var sender = self.getSender(messageParts[1]);
				var targetChatroom = self.getTargetRoom(messageParts[2]);
				var messageContent = self.getMessage(messageParts[3]);

				console.log(sender);
				console.log(targetChatroom);
				console.log(messageContent);

				if (targetChatroom.length > 0)
				{
					self.findChatGroupMembersByRoom(sender, targetChatroom, messageContent);
				}
			}
    	});
	});

io.on('disconnect', function(socket)
{
	var userid = serverSocket.handshake.session.userid;
	console.log('a user disconnected');
	delete clientSockets[userid];
});

app.get('/chat', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

this.sendMessage = function(sender, users, messageContent)
{	
	for (var i = 0; i < users.length; i++) {

		var clientId = clientSockets[users[i].Id]; 
		//if (clientId != sender)
		//{
			// found means users is online 
			var clientSoc = clientSockets[users[i].Id];
			if (clientSoc)
			{
				console.log('means user is online');
				clientSoc.emit(chatmessageConst, { some: 'data' });
			}
			else 
			{
				// persist to chat message table //
			}
		//}
	};
}

this.getText = function(searchstring, protocolmessage)
{
	var startMarker = protocolmessage.indexOf(searchstring);
	var searchMarker = startMarker + searchstring.length; 
	var lastMarker = protocolmessage.indexOf("]");
	return protocolmessage.substring(searchMarker, lastMarker);
}

this.getSender = function(protocolmessage)
{
	return this.getText("[sender:", protocolmessage);
};

this.getTargetRoom = function(protocolmessage)
{
	return this.getText("[target:", protocolmessage);
};

this.getMessage = function(protocolmessage)
{
	return this.getText("[message:", protocolmessage);	
};

	// finds all members related to a chatroom 
	this.findChatGroupMembersByRoom = function(sender, roomId, messageContent)
	{	
		var obj = new mongo.ObjectID(roomId);

		db.find(chatgroupmemberTable,
		{
			chatroomId : new mongo.ObjectID(roomId)
		}, function(err, dbresult)
		{				
			if (dbresult.length)
			{
				self.getMatchingUser(sender, dbresult, messageContent);
			}
			else
			{
				console.log('no info found');
			}
		});
	};

	this.getMatchingUser = function(sender, users, messageContent)
	{
		var userlist = users.map(function(a) {return new mongo.ObjectID(a.userid);});

		db.find(userTable,
		{
			_id : { $in : userlist}
		}, function(err, dbresult)
		{
			var fResult = [];
			if (dbresult.length)
			{
				for (var i = 0; i < dbresult.length; i++) {
					var userInfo = 
					{
						Id : dbresult[i]._id,
						Name : dbresult[i].name, 
						Username : dbresult[i].username 
					};		

					fResult.push(userInfo);
					self.sendMessage(sender, users, messageContent);
				}
			}
			else
			{

			}
		});
	};
};