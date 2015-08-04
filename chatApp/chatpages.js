
var express = require('express');
var router = express.Router();

exports.setup = function(app) {

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/chat', function (req, res) {
  res.send('Hello World!');
});

};