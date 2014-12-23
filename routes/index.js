var db = require('../db/post');
var fs = require('fs');
var pagination = require('./pagination');

var createContent = function (db, page) {
    var data = {
        "full": false,
        "pagination": {},
        "post": []
    };
    var pag = pagination.getData(db.post,page);
    data.pagination = pag; 
    data.post = db.post.slice(pag.begin, pag.end);
    return data;
};

exports.index = function (req, res) {
    res.render('index', createContent(db,pagination.page));
};

exports.content = function (req, res) {
    console.log(req.param('page'));
    res.render('content', createContent(db, req.param('page')));
};

/*
 exports.content = function (req, res) {
 var body = '';
 req
 .on('readable', function () {
 body += req.read();
 })
 .on('end', function () {
 body = JSON.parse(body);
 console.log(body);
 res.end(''+body.page);
 });
 
 };*/