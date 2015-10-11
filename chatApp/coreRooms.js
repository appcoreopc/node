	exports.setup = function(app, http, db) {

		var chatgroupmemberTable = "chatgroupmember";
		var chatmembersTable = "chatmembers";
		var chatroomsTable = "chatrooms";

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
				self.loadChatRooms(res, userId, self.sendData);
			}
			else
			{
				res.status(400).json(
				{
					token : 'bad request'
				});
			}
		});

		// creates a room and return roomId created
		// also register entry to groupchatmembers 
		app.post('/chatroom/create', function (req, res) {

			var roomName = req.body.name;
			var userId = req.session.userId;

			if (userId && roomName)
			{
				self.createRoom(userId, roomName, res);
			}
			else
			{
				res.status(400).json(
				{
					token : 'bad request'
				});
			}
		});

		app.get('/chatroom/delete', function (req, res) {

			if (req.body.username && req.body.password)
			{
				db.delete(chatgroupmemberTable, { chatroomId : roomId }, function(err, doc)
				{
					db.delete(chatroomsTable, { _id : roomId }, function(err, doc)
					{
						res.status(400).json(
						{
							Status : 'Ok',
							roomId : roomId
						});
					});
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

		this.loadChatRooms = function(res, userid, callback)
		{
			self.findChatGroupMembers(res, userid, callback);
		};

		this.loadChatMembers = function(res, userid, callback)
		{
			var source = chatmembersTable;
			var dataObject = {
				memberId  : parseInt(userid)
			};
			
			db.find(source, dataObject, function(err, doc)
			{
				if (doc.length > 0)
				{
					self.findChatGroupMembers(res, doc, callback);	
				}
			});
		};

		this.findChatGroupMembers = function(res, userId, callback)
		{		
			db.find(chatgroupmemberTable,
			{
				userid : parseInt(userId)
			}, function(err, dbresult)
			{
				console.log(dbresult);
				if (dbresult.length)
				{
					self.findChatRoom(res, dbresult, callback);
				}
			});
		};

		this.findChatRoom = function(res, doc, callback)
		{
			var result = doc.map(function(a) {return a.chatroomId;});
			
			var rooms = [];

			db.find(chatroomsTable, 
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

		// asynch function to send messages to client // 
		this.getUserIdleMessage = function(res, data, socket)
		{
			var lastLoginDate = new Date(2000, 1, 1);

			for (var i = 0; i < data.length; i++) {
				var roomid = data[i].Id;
				db.find("Test",
				{
					Id : roomid
				}, function(err, dbresult)
				{
					self.syncMessage(dbresult, socket);		
				});
			};
		};

		this.syncMessage = function(dbResult, socket, lastUpdate)
		{
			var messageList = []; 

			for (var i = 0; i < dbresult.length; i++) {

				//find chat table //
				//db.find("",)

				var sender = dbResult[i].sender;
				var msgAt = dbResult[i].messageAt;
				if (dbResult[i].messageAt < lastUpdate)
				{
					var message = { 
						message : dbResult[i].message,
						sender : dbResult[i].sender,
						messageAt : msgAt
					};
					messageList.push(message);
				}

			// send messge to connected client //
			// sendMessage(messageList);
			// json
			// socket.emit('chat message', JSON.stringify(messageList));
			// mark the message as sent // 

		}
	};

		// init tasks todo - basically figuring out 
		// unsent messages to be deliver across 
		this.socketInit = function(userid, socketInstance)
		{
			//	self.loadChatRooms(userid, self.getUserIdleMessage);
		};

		this.createRoom = function(userId, roomName, res)
		{
			db.insert(chatroomsTable, {
				name : roomName, 
				userid : userId, 
				dateCreated : new Date()
			}, function(err, doc)
			{
				console.log(doc);
				if (doc.insertedCount > 0)
				{
					var roomId = doc.ops[0]._id;
					self.addGroupMemberToChatRoom(userId, roomId, res);
				}
			});
		};

		this.addGroupMemberToChatRoom = function(userId, roomId, res)
		{
			db.insert(chatgroupmemberTable, {
				chatrooomId : roomId, 
				userid : userId, 
				dateCreated : new Date()
			}, function(err, doc)
			{
				if (doc.insertedCount > 0)
				{
					res.status(200).json(
					{
						roomId : roomId
					});
				}
			});
		};

		this.addUserToRoom = function(roomId, userToAdd)
		{
			db.insert(chatroomsTable, {
				roomId : roomId,
				userid : userToAdd, 
				dateCreated : new Data(),
			}, function(err, doc)
			{
				if (doc.length > 0)
				{
					res.status(200).json(
					{
						roomId : doc._id,
						status : 'Ok'
					});
				}
			});
		};
	};
