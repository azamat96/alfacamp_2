//$.cookie('err','My err');
$(document).ready(function() {

    $(".button2").click(function () {
        $("#background").fadeIn(600, function () {
            $(".sign").fadeIn(600);
        });
    });

    $("#background").click(function () {
        $(".sign").fadeOut(600, function () {
            $("#background").fadeOut(600);
        });
    });
    $("#click").click(function () {
        $(".sign").fadeOut(600, function () {
            $(".regist").fadeIn(600);
        });
    });
    $("#background").click(function () {
        $(".regist").fadeOut(600, function () {
            $("#background").fadeOut(600);
        });
    });

    $("#click2").click(function () {
        $(".regist").fadeOut(600, function () {
            $(".sign").fadeIn(600);
        });
    });

    $("#nachat").click(function () {
        if($.cookie('uid')!=null){
            window.location.replace("/selectSubject");
        } else {
            $("#background").fadeIn(600, function () {
                $(".sign").fadeIn(600);
            });
        }
    });

    $('#sign').click(function () {
        var data = {};
        data.email = $('#sign_email').val();
        data.password = $('#sign_password').val();

        $.ajax({
            type: 'POST',
            url: '/user/login',
            data: data,
            success: function (data, status) {
                if (data.success) {
                    $('#sign_err').text('');
                    $.cookie('uid', data.uid);
                    $.cookie('username', data.username);
                    $.cookie('image_path', data.image_path);
                    $.cookie('email', data.email);
                    window.location.replace("/selectSubject");
                }
                else {
                    $('#sign_err').text(data.msg);
                }
            },
            error: function (err) {
                $('#sign_err').text('Соединение с базой данных пропало');
                //localStorage.err = err.responseJSON.msg;
            }
        });
    });

    $("#signup").click(function () {
        var data = {};
        data.username = $('#signup_username').val();
        data.email = $('#signup_email').val();
        data.password = $('#signup_password').val();

        $.ajax({
            type: 'POST',
            url: '/user/register',
            data: data,
            success: function (data, status) {
                if (data.success) {
                    $('#signup_err').text('');
                    $('#sign_err').text('Вы зарегистрировались. Войдите');
                    console.log(data);
                    $(".regist").fadeOut(600, function () {
                        $(".sign").fadeIn(600);
                    });
                    //$.cookie('uid', data.uid);
                    //$.cookie('username', data.username);
                    //$.cookie('image_path', data.image_path);
                    //window.location.replace("/selectSubject");
                }
                else {
                    $('#signup_err').text(data.msg);
                }
            },
            error: function (err) {
                $('#sign_err').text('Соединение с базой данных пропало');
                //localStorage.err = err.responseJSON.msg;
            }
        });
    });
});