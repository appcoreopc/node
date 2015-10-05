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
				self.createRoom();
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

		this.loadChatRooms = function(userid, callback, res)
		{
			self.loadChatMembers(res, userid, callback);
		};

		this.loadChatMembers = function(res, userid, callback)
		{
			var source = 'chatmembers';
			var dataObject = {
				memberId  : parseInt(userid)
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

		// asynch function to send messages to client // 
		this.getUserIdleMessage = function(res, data, socket)
		{
			var lastLoginDate = new Date(2000, 1, 1);

			for (var i = 0; i < data.length; i++) {
				var roomid = data[i].Id;
				db.find(roomid,
				{
					Id : { $in : result }
				}, function(err, dbresult)
				{
					self.syncMessage(result, socket);		
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
			self.loadChatRooms(userid, self.getUserIdleMessage);
		};

		this.createRoom = function(roomName, userId)
		{
			db.insert("chatrooms", {
				name : roomName, 
				userid : userId, 
				dateCreated : new Data(),
			}, function(err, doc)
			{
				if (doc.length > 0)
				{
					res.status(200).json(
					{
						roomId : doc._id
					});
				}
			});
		};

		this.addUserToRoom = function(roomId, userToAdd)
		{
			db.insert("chatrooms", {
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
