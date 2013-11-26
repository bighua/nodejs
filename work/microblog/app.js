
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , util = require('util');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.locals=({
   headers: 'zhuxh'
});
app.use(function(req, res, next){
	res.locals.h = util.inspect(req.headers);
	next();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.all('/user/:username', function(req, res, next) {
console.log('all methods captured');
next();
});

app.get('/helper', function(req, res) {
console.log(res.locals.h);
res.render('helper', {title: 'Helpers', hobby : res.locals.headers});
});

app.get('/', routes.index);
app.get('/hello', routes.hello);

app.param(function(name, fn){
  if (fn instanceof RegExp) {
    return function(req, res, next, val){
      var captures;
      if (captures = fn.exec(String(val))) {
        req.params[name] = captures;
        next();
      } else {
        next(new Error('failed to load user'));
      }
    }
  }
});
app.param('username', /^\d+$/);
app.get('/user/:username', function(req, res){
  res.send(req.params.username + ' is coming!');
});

app.param('post', function(req, res, next, id){
  req.post= id + ': I love node.js!';
  next();
});
app.get('/post/:post', function(req, res){
  res.send(req.post);
});
app.get('/param/*', function(req, res){
  res.send(req.params[0] + ' is coming!');
});

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
