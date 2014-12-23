$("#form").click(function () {
    console.log("form submit log");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/content", true);
    xhr.send(JSON.stringify({"page": 3}));
    xhr.onload = function () {
        console.log('response! ' + this.responseText);
    };
    return false;
});


var changePage = function (num) {
    console.log("page click " + num);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/content?page=" + num, true);
    xhr.send();
    xhr.onload = function () {
        var output = this.responseText;
        console.log('content get');
        $("#content").html(output);
    };
};
$(document).ready(function () {
    $('.home').click(function () {
        console.log("home click");
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/content?page=1&search=''", true);
        xhr.send();
        xhr.onload = function () {
            var output = this.responseText;
            console.log('home get');
            $("#content").html(output);
        };
    });

    $(".menuitem").click(function () {
        $(".active").removeClass("active");
        $(this).addClass("active");
    });
});


/*
 $(".page").click(function () {
 page = $(this).text();
 console.log("page click " + page);
 var xhr = new XMLHttpRequest();
 xhr.open("GET", "/content?page=" + page, true);
 xhr.send();
 xhr.onload = function () {
 var output = this.responseText;
 console.log('content get');
 $("#content").html(output);
 };
 //$(".active").removeClass("active");
 //$(this).addClass("active");
 });*/