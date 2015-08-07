	exports.setup = function(app, http, io) {

		io.on('connection', function(socket){
				console.log('a user connected');
		});

		io.on('disconnect', function(socket){
				console.log('a user connected');
		});

		io.on('connection', function(socket){
			socket.on('chat message', function(msg)
			{
		    	io.emit('chat message', msg);
		  });
		});

		app.get('/chat', function (req, res) {
	    res.sendFile(__dirname + '/index.html');

	});
	};