var page=1;
var max=3;
var countPage=0;

var data = {
    page: 1,
    pages: [],
    first: true,
    last: false,
    prev: 0,
    next: 2,
    begin: 0,
    end: 0
};

exports.getData = function (db, newPage) {
    countPage = Math.ceil(db.length / max);
    if (countPage < 2) {
        page = 1;
        return {};
    } else {
        page = +newPage;
        var pages = [];
        for (var i = 0; i < countPage; i++) {
            pages[i] = {number: i + 1, active: (i + 1) === page};
        }
        data.page = page;
        data.pages = pages;
        data.first = page === 1;
        data.last = page === countPage;
        data.begin = (page - 1) * max;
        data.end = data.begin + max;
        data.prev = page - 1;
        data.next = page + 1;
    }
    console.log(data);
    return data;
};

exports.page = page;
