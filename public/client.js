var changePage = function (num) {
    console.log("page click " + num);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/content" + searchPath() + datePath() + "/page/" + num, true);
    xhr.send();
    xhr.onload = function () {
        var output = this.responseText;
        console.log('content get');
        $("#content").html(output);
    };
};

var openGame = function (id) {
    startSpinner();
    console.log("open game click " + id);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/content/" + id, true);
    xhr.send();
    xhr.onload = function () {
        var output = this.responseText;
        console.log('game get');
        $("#content").html(output);
        $('.carousel').carousel(0);
    };
};



var searchPath = function () {
    var filter = $('#search-field').val();
    return filter ? "/search/" + filter : "";
};

var datePath = function () {
    var minDate = $('#minDate').val();
    var maxDate = $('#maxDate').val();
    return minDate && maxDate && $('#checkDate').is(':checked') ? "/date/" + minDate + "/" + maxDate : "";
};



$(document).ready(function () {
    $('#checkDate').prop('checked', false);
    $('#searchMenuItem').hide();

    $(".home").click(function () {
        startSpinner();
        console.log("home click");
        $('#search-field').val("");
        $('#checkDate').prop('checked', false);
        $('#minDate').hide();
        $('#maxDate').hide();
        $('#searchMenuItem').hide();
        $("#addForm").hide();
        $("#content").show();
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
        startSpinner();
        $(".active").removeClass("active");
        $('#searchMenuItem').addClass("active");
        $('#searchMenuItem').show();
        $("#addForm").hide();
        $("#content").show();
        var filter = $('#search-field').val();
        console.log("search click filter=" + filter);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/content" + searchPath() + datePath(), true);
        xhr.send();
        xhr.onload = function () {
            var output = this.responseText;
            console.log('search get');
            $("#content").html(output);
        };
    });

    $('#checkDate').change(function () {
        if ($('#checkDate').is(':checked')) {
            $('#minDate').show();
            $('#maxDate').show();
        } else {
            $('#minDate').hide();
            $('#maxDate').hide();
        }
    });

    $("#addForm").load("addForm.html #template-add-game", function () {
        var template = document.getElementById('template-add-game').innerHTML;
        var output = Mustache.render(template);
        $("#addForm").hide();
        $("#addForm").html(output);    
    });
    $('#addMenuItem').click(function () {
        $("#addForm").show();
        $("#content").hide();
    });
});

var startSpinner = function () {
    $("#content").html('');
    var target = document.getElementById('content');
    var spinner = new Spinner(opts).spin(target);
};

var opts = {
    lines: 7, // The number of lines to draw
    length: 0, // The length of each line
    width: 15, // The line thickness
    radius: 15, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 90, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#FFF', // #rgb or #rrggbb or array of colors
    speed: 2.2, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '25%', // Top position relative to parent
    left: '50%' // Left position relative to parent
};