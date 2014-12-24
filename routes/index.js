var db = require('../db/post');
var fs = require('fs');
var mustacheManager = require("../mustache");

exports.index = function (req, res) {
    res.render('index', mustacheManager.dataOnPage(db));
};

exports.content = function (req, res) {
    console.log("page=" + req.param('num'));
    var filter = req.param('filter');
    var id = req.param('id');
    var page = req.param('num');

    var data;
    if (filter) {
        console.log("filtered");
        data = mustacheManager.dataSearch(db, filter);
    } else {
        console.log("original");
        data = db;
    }

    var content = {};
    if (id) {
        content = mustacheManager.dataOnePost(data, id);
    } else {
        content = mustacheManager.dataOnPage(data,page);
    }
    res.render('content', content);
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