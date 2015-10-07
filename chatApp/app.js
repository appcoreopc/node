var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var chatApp = require('./chatpages');
var userApp = require('./coreuser');
var parseCookie = require('connect');

var coreRoom = require('./coreRooms');
var coreChats = require('./coreChats');

var db = require('./db'); 
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

// init the database engine //
db.setup();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var sessionData = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
});

app.use(sessionData);

var ios = require('socket.io-express-session');
io.use(ios(sessionData)); // session support

app.get('/test', function(req, res) {
    req.session.userId = 9999;
    console.log(req.session.userId);
    res.sendFile(__dirname + '/main.html');
});
  
app.use('/', routes);
app.use('/users', users);


userApp.setup(app, http, io, db);
coreRoom.setup(app, http, db);
coreChats.setup(app, http, db);

chatApp.setup(app, http, io, coreRoom);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
  
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

http.listen(3000, function(){
  console.log('server:3000');
});
