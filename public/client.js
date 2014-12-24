
var changePage = function (num) {
    console.log("page click " + num);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/content" + searchPath() + "/page/" + num, true);
    xhr.send();
    xhr.onload = function () {
        var output = this.responseText;
        console.log('content get');
        $("#content").html(output);
    };
};

var openPost = function (id) {
    console.log("open post click " + id);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/content/" + id, true);
    xhr.send();
    xhr.onload = function () {
        var output = this.responseText;
        console.log('post get');
        $("#content").html(output);
        $('.carousel').carousel(0);
    };
};

var searchPath = function () {
    var filter = $('#search-field').val();
    return filter ? "/search/" + filter : "";
};

$(document).ready(function () {
    $(".home").click(function () {
        console.log("home click");
        $('#search-field').val("");
        var xhr = new XMLHttpRequest();
        xhr.open("GET", '/content', true);
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

    $('#search-button').click(function () {
        var filter = $('#search-field').val();
        console.log("search click filter=" + filter);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/content" + searchPath(), true);
        xhr.send();
        xhr.onload = function () {
            var output = this.responseText;
            console.log('search get');
            $("#content").html(output);
        };
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