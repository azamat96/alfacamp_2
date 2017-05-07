$(document).ready(function() {
    $(".button img").attr("src", $.cookie('image_path'));
    $("#username").text($.cookie('username'));

    $("#logout").click(function () {
        $.removeCookie('uid', {path: '/'});
        $.removeCookie('image_path', {path: '/'});
        $.removeCookie('username', {path: '/'});
        $.removeCookie('email', {path: '/'});
        window.location.replace("/");
    });

    // $("#man").attr("src", $.cookie('image_path'));
    // $("#username2").text($.cookie('username'));
});

