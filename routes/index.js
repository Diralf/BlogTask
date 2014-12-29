var mongodb = require('../db/dbmanager');
var fs = require('fs');
var mustacheManager = require("../mustache");

var ALL = 0, ONE = 1, SEARCH = 2, DATE = 3;

var db = {
    state: ALL,
    filter: '',
    game: []
};

exports.index = function (req, res) {
    db.state = ALL;
    mongodb.getAll(function (results, cb) {
        //var db = {game: []};
        db.game = results;
        console.log("db.game=" + db.game);
        res.render('index', mustacheManager.dataOnPage(db));
        cb();
    });
};

exports.content = function (req, res) {
    console.log("page=" + req.param('num'));
    var filter = req.param('filter');
    var min = req.param('min');
    var max = req.param('max');
    var id = req.param('id');
    var page = req.param('num');
    if (id) {
        db.state = ONE;
        mongodb.getOne(id, function (results, cb) {
            console.log("getOne results");
            db.game = results;
            var content = mustacheManager.dataOneGame(db);
            res.render('content', content);
            cb();
        });
    } else {
        var gamesCB = function (results, cb) {
            db.game = results;
            var content = mustacheManager.dataOnPage(db, page);
            res.render('content', content);
            cb();
        };
        if (min && max) {
            var minDate = new Date(min);
            var maxDate = new Date(max);
            db.state = DATE;
            filter = filter ? filter : '';
            mongodb.getSearchTitleWithDate(filter, minDate, maxDate, gamesCB);

        } else if (filter && filter !== '') {
            console.log("filtered");
            if (db.state !== SEARCH || db.filter !== filter) {
                db.state = SEARCH;
                db.filter = filter;
                mongodb.getSearchTitle(filter, gamesCB);
            } else {
                res.render('content', mustacheManager.dataOnPage(db, page));
            }
        } else {
            console.log("original");
            if (db.state !== ALL) {
                db.state = ALL;
                mongodb.getAll(gamesCB);
            } else {
                res.render('content', mustacheManager.dataOnPage(db, page));
            }
        }
    }
};

exports.addGame = function (req, res) {
    console.log("addGame reqPost");
    console.log(req.body.title);

    console.log(req.body);
    var game = {
        "title": req.body.title,
        "image": req.body.image,
        "genre": req.body.genre,
        "developer": req.body.developer,
        "release": Date.parse(req.body.release),
        "tags": [],
        "description": req.body.description,
        "screenshots": []
    };
    mongodb.addGame(game, function (results, cb) {
        cb();
        module.exports.index(req, res);
    });
};
