
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mustache = require('mustache-express');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + "/templates");
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
/*
 content/			-> все записи, первая страница
 content/page/14			-> все записи, указанная страница
 content/search/filter		-> найденные записи, первая страница
 content/search/filter/page/2    -> найденные записи, указанная страница
 content/2			-> одна запись с указанным id
 */
app.get('/content', routes.content);
app.get('/content/page/:num', routes.content);
app.get('/content/search/:filter', routes.content);
app.get('/content/search/:filter/page/:num', routes.content);
app.get('/content/:id', routes.content);

//app.post('/content', routes.content);
//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});





