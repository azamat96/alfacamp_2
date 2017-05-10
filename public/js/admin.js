$(document).ready(function() {
    if($.cookie('msg') && $.cookie('type')){
        if ($.cookie('type')=="ok"){
            $(".msg-ok").css("display", "block");
            $(".msg-ok p").html("<strong>"+$.cookie('msg')+"</strong>");
        } else{
            $(".msg-error").css("display", "block");
            $(".msg-error p").html("<strong>"+$.cookie('msg')+"</strong>");
        }
        $.removeCookie('msg', {path: '/'});
        $.removeCookie('type', {path: '/'});
    }

    $(".close").click(function () {
        $(this).parent().css("display","none");
    });
});

