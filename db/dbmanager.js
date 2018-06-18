var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
// Connection URL
var url = 'mongodb://';

var convertDate = function (data) {
    data.forEach(function (item) {
        item.release = new Date(item.release);
    });
    return data;
};

var findBase = function (filter, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("Error: unable to connect to database");
            return;
        }
        console.log("Connected correctly to server");

        var collGame = db.collection('game');
        var cursor = collGame.find(filter);
        cursor.toArray(function (err, results) {
            console.log("db loaded");
            var dataRes = convertDate(results);
            callback(dataRes, function () {
                console.log("db close");
                db.close();
            });
        });
    });
};

exports.getAll = function (callback) {
    findBase({}, callback);
};

exports.getOne = function (id, callback) {
    console.log("getOne connected");
    console.log("id" + id);
    findBase({"_id": ObjectID(id)}, callback);
};

exports.getSearchTitle = function (filter, callback) {
    var reg = new RegExp(filter, 'i');
    findBase({"title": reg}, callback);
};

exports.getSearchTitleWithDate = function (filter, min, max, callback) {
    var reg = new RegExp(filter, 'i');
    console.log(min);
    console.log(max);
    findBase({"title": reg, "release": {$gte: Date.parse(min), $lt: Date.parse(max)}}, callback);
};

exports.addGame = function (game, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("Error: unable to connect to database");
            return;
        }
        console.log("Connected correctly to server");

        var collGame = db.collection('game');

        collGame.insert(game, function (err, docs) {
            if (err)
                throw err;
            console.log("game added");
            console.log("docs" + docs);
            var dataRes = convertDate(docs);
            callback(dataRes, function () {
                console.log("db close");
                db.close();
            });
        });
    });
};
