var express = require('express');
var app = express();

exports.setup = function(app) {
  
app.get('/chat', function (req, res) {
  res.send('Never say die!!!');
});

};