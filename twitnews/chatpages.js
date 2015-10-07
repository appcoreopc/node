

exports.setup = function(app, http, io) {

	var clients  = [];
	var maxclient = 2;
	var idx = 0;  
	var clientSockets = [];
	var serverSocket; 

	io.on('connection', function(socket) {
		
		console.log('connected');
		serverSocket = socket;

		clientSockets[socket.handshake.session.userid] = socket; 
		
		//console.log(socket.handshake.session);
		//console.log(socket.client);

		//*****************************************************************************
		// find a list of groupchats that this user is associated with // 
		// and push all the data over manually -> check which message sent and which are not // 
		// push all of these data over //
		//*****************************************************************************

		for (var i = 0; i < socket.server.sockets.sockets.length; i++) {
			console.log('----------------------------------------');
			console.log(socket.server.sockets.sockets[i]);
			console.log('----------------------------------------');
		};

		idx++; 
		var userid = 'user#' + idx;
		console.log('array name' + userid);
		clients[userid] = socket; 
		console.log(clients.length);

		socket.on('chat message', function(msg) {

			// examine 

			var userid = serverSocket.handshake.session.userid;
			
			if (userid)
			{
				var socket = clientSockets[userid];	
				//socket.to('').emit('an event', { some: 'data' });
			}

    		//io.emit('chat message', msg); 
    		//console.log('in coming msg111' + msg);
    		//clients['user#1'].emit('chat message', msg); 
    		
    	});
	});

	io.on('disconnect', function(socket)
	{
		var userid = serverSocket.handshake.session.userid;
		console.log('a user disconnected');
		delete  clientSockets[userid];
	});

	app.get('/chat', function (req, res) {
		res.sendFile(__dirname + '/index.html');
	});
};