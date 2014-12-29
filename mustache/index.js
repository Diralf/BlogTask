var pagination = require('./pagination');
var data = {
    "full": false,
    "game": [],
    "pagination": {},
    "isScreens": true,
    "formatRelease": function () {
        var dateString = this.toDateString();
        return dateString;
    }
};

exports.dataOnPage = function (db, page) {
    data.full = false;
    var pag = pagination.getData(db.game, page);
    data.pagination = pag;
    data.game = pag ? db.game.slice(pag.begin, pag.end) : db.game;
    return data;
};

exports.dataOneGame = function (db) {
    data.full = true;
    data.pagination = null;
    data.game = {};
    data.game = db.game[0];
    var screens = data.game.screenshots;
    if (!screens[0]) {
        console.log("!screens");
        data.isScreens = false;
    } else {
        console.log("screens");
        data.isScreens = true;
        screens[0].active = true;
    }
    screens.forEach(function (item, i, arr) {
        item.id = i;
    });
    return data;
};

exports.dataSearch = function (db, filter) {
    data.game = db.game.filter(function (item) {
        return item.title.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    });
    return data;
};

var formatDate = function () {
    var dateString = this.toLocaleDateString("%b %e, %Y");
    return dateString;
};








