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
var mongo = require('mongodb')

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

app.get('/test/set/:id', function(req, res) {
    var userId = req.params.id;
    if (userId)
      req.session.userId = userId;
    else 
      req.session.userId = "55ddc65d4990130d94bb5f96";      

    res.status(200).json(
    {
        'data' : 'Ok'
    });
});

app.get('/test', function(req, res) {
    res.sendFile(__dirname + '/main.html');
});
  
app.use('/', routes);
app.use('/users', users);

userApp.setup(app, http, io, db, mongo);
coreRoom.setup(app, http, db, mongo);
coreChats.setup(app, http, db, mongo);

chatApp.setup(app, http, io, coreRoom, db, mongo);
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
