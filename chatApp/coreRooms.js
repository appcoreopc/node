	exports.setup = function(app, http, db, mongo) {

		var chatgroupmemberTable = "chatgroupmember";
		var chatroomsTable = "chatrooms";
		var userTable = "users";

		// chatroom keep tracks of room created and by who 
		// chatgroupmembers keep tracks of members in a conversation 

		var self = this; 
		this.sendData = function(res, data)
		{
			res.status(200).json(
			{
				'data' : data
			});
		};

		app.get('/chatroom/load/userid/:id', function (req, res) {
			
			var userId = req.params.id;
			
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

		this.findChatGroupMembers = function(res, userId, callback)
		{		
			db.find(chatgroupmemberTable,
			{
				userid : userId
			}, function(err, dbresult)
			{
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

			console.log('room we are after');
			console.log(result);

			db.find(chatroomsTable, 
			{
				_id : { $in : result }
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
				console.log('fdata' + rooms);
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

		// chatrooms -> chatgroupmember 
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
				chatroomId : roomId, 
				userid : userId, 
				dateCreated : new Date()
			}, function(err, doc)
			{
				if (doc.insertedCount > 0)
				{
					self.createTableChatroom(roomId, userId, res);
				}
			});
		};

		this.addUserToRoom = function(roomId, userToAdd, res)
		{
			db.insert(chatroomsTable, {
				roomId : roomId,
				userid : userToAdd, 
				dateCreated : new Date(),
			}, function(err, doc)
			{
				if (doc.insertedCount > 0)
				{
					res.status(200).json(
					{
						roomId : doc._id,
						status : 'Ok'
					});
				}
			});
		};

		this.createTableChatroom = function(roomId, userId, res)
		{
			db.insert(String(roomId), {
				users :  [ userId, userId ], 
				dateCreated : new Date(),
			}, function(err, doc)
			{
				if (doc.insertedCount > 0)
				{
					res.status(200).json(
					{
						roomId : roomId,
						status : 'Ok'
					});
				}
			});
		};

		app.get('/chatroom/users/:id', function (req, res) {
			
			var chatroomId = req.params.id;
			
			if (chatroomId)
			{
				self.findChatGroupMembersByRoom(res, chatroomId);
			}
			else
			{
				res.status(400).json(
				{
					token : 'bad request'
				});
			}
		});

		// finds all members related to a chatroom 
		this.findChatGroupMembersByRoom = function(res, roomId)
		{	
			
			var obj = new mongo.ObjectID(roomId);
			console.log('guid');
			console.log(obj);

			db.find(chatgroupmemberTable,
			{
				chatroomId : new mongo.ObjectID(roomId)
			}, function(err, dbresult)
			{				
				if (dbresult.length)
				{
					self.getMatchingUser(dbresult, res);
				}
			});
		};

		this.getMatchingUser = function(users, res)
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
					}

					res.status(200).json(
					{
						data : fResult
					});
				}
				else
				{
					res.status(200).json(
					{
						data : []
					});
				}
			});
		};

	};
