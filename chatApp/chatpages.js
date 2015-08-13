	exports.setup = function(app, http, io) {
		
		io.on('connection', function(socket){
			console.log('connected user');
  			socket.on('chat message', function(msg){
  				   console.log(msg);
    			   io.emit('chat message', msg);
  			});
		});
		
		io.on('disconnect', function(socket){
			console.log('a user disconnected');
		});

		app.get('/chat', function (req, res) {
	    res.sendFile(__dirname + '/index.html');
	});
};