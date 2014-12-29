var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mustache = require('mustache-express');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000 );
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
app.get('/content', routes.content);
app.get('/content/page/:num', routes.content);
app.get('/content/search/:filter', routes.content);
app.get('/content/search/:filter/page/:num', routes.content);
app.get('/content/date/:min/:max', routes.content);
app.get('/content/date/:min/:max/page/:num', routes.content);
app.get('/content/search/:filter/date/:min/:max', routes.content);
app.get('/content/search/:filter/date/:min/:max/page/:num', routes.content);
app.get('/content/:id', routes.content);

app.post('/content',routes.addGame);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});





