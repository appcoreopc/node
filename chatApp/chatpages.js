
//var express = require('express');
//var router = express.Router();

exports.setup = function(app, http, io) {

	io.on('connection', function(socket){
		console.log('a user connected');
	});

	app.get('/chat', function (req, res) {
    res.sendFile(__dirname + '/index.html');

});
};