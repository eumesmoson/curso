var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect= require('connect')
var methodOverride = require('method-override');
var session=require('express-session');
var partials=require('express-partials');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setu
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/help.png'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cookieParser('Quiz 2015'));

app.use(session({secret: 'keyboard cat',cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
app.use(partials());
app.use('/users', users);
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handl
app.use(function(req, res, next) {

  if(!req.path.match(/\/login|\/logout/))
    {req.session.redir=req.path;}
  res.locals.session=req.session;

  if(!req.session.ultimo){
  req.session.ultimo=new Date().getTime();
  }
  if(new Date().getTime()-req.session.ultimo>=120000){
  delete req.session.user;
  req.session.ultimo=null;
  }
  console.log('Acceso sesion : '+res.locals.session.id+'-->'+req.session.ultimo+
    '-->'+new Date().getTime());
  //res.render('index', { title: 'Preguntas',session:req.session,errors:[] });
  next();

});

app.use('/', routes);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      errors:[]
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    errors:[]
    
  });
});


module.exports = app;
