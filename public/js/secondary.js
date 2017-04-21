$(document).ready(function() {
    $(".button img").attr("src", $.cookie('image_path'));
    $("#username").text($.cookie('username'));

    $("#logout").click(function () {
        $.removeCookie('uid', {path: '/'});
        $.removeCookie('image_path', {path: '/'});
        $.removeCookie('username', {path: '/'});
        window.location.replace("/");
    });
});

