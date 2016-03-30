require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));
app.use(function(err, req, res, next){
	if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token... ' + req.body.authorization);
  }
});

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));
app.use('/api/resources', require('./controllers/report.controller'));

//All rest api need  to be checked for token
app.all('/mapi/*', [require('./middlewares/validateRequest')])
//route for rest api that is consumed by mobile
//app.use('/rest' require('./controller/rest.controller'));
app.use('/mapi/resources', require('./controllers/report.controller'));
app.use('/mapi/users', require('./controllers/api/users.controller'));

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// start server

var boot = function () {
	var server = app.listen(3000, function () {
	    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
	});
}
var shutdown = function() {
	server.close();
}
if (require.main === module) {
	boot();
}
else {
	console.info('Running app as a module')
	exports.boot = boot;
	exports.shutdown = shutdown;
	exports.port = app.get('port');
	exports.app = app;
}