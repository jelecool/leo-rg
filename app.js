var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');

var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signing/signup');
var signinRouter = require('./routes/signing/signin');
var signoutRouter = require('./routes/signing/signout');
var profileRouter = require('./routes/profile');
var completeProfileRouter = require('./routes/complete-profile');
var dailystatsRouter = require('./routes/daily-stats');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Connecte le client mongoose à la bonne base de données
mongoose.connect(config.dbhost, { useNewUrlParser: true });

//enregistre la base de donnédans une variable facilement accessible
var db = mongoose.connection;

//Facilite le "error handling" des bases de donnnées
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // Signifie à la console que la connection s'est bien effectuée
  console.log("connected");
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "123456"}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/signout', signoutRouter);
app.use('/signin', signinRouter);
app.use('/profile', profileRouter);
app.use('/complete-profile', completeProfileRouter);
app.use('/daily-stats', dailystatsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
