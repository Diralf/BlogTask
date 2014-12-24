var pagination = require('./pagination');


exports.dataOnPage = function (db, page) {
    var data = {
        "full": false,
        "pagination": {},
        "post": []
    };
    var pag = pagination.getData(db.post, page);
    data.pagination = pag;
    data.post = pag ? db.post.slice(pag.begin, pag.end) : db.post;
    return data;
};

exports.dataOnePost = function (db, id) {
    var data = {
        "full": true,
        "post": {}
    };
    data.post = db.post[id];
    var screens = data.post.screenshots;
    screens[0].active = true;
    screens.forEach(function (item, i, arr) {
        item.id = i;
    });
    return data;
};

exports.dataSearch = function (db, filter) {
    var data = {
        post: []
    };
    data.post = db.post.filter(function (item) {
        return item.title.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    });
    return data;
};




