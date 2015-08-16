	exports.setup = function(app, http, io) {
		
		var clients  = [];
		var maxclient = 2;
		var idx = 0;  

		io.on('connection', function(socket) {

			idx++; 
			var userid = 'user#' + idx;
			console.log('array name' + userid);
			clients[userid] = socket; 
			console.log(clients.length);


			socket.on('chat message', function(msg) {
    		//io.emit('chat message', msg); 
    		console.log('in coming msg111' + msg);
     		clients['user#1'].emit('chat message', msg); 
    		
  			});
		});

		io.on('disconnect', function(socket){
			console.log('a user disconnected');
		});

		app.get('/chat', function (req, res) {
			
	    	res.sendFile(__dirname + '/index.html');
		
	});
};