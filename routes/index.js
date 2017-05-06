var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Subject = require('../models/subject');
var Topic = require('../models/topic');

/* GET home page. */
router.get('/', function(req, res, next) {
    //console.log(req.cookies);
    res.render('index', {user:req.cookies});
});

/* LOGIN */
router.post('/user/login', function(req, res, next) {
    //res.send(req.cookies);
    if (!req.body.email || !req.body.password) {
        return res.send({success: false, msg: 'Заполните все поля'});
    }
    User.getUserByEmail(req.body.email, function (err, user) {
        if (err) return next(err);
        if (!user) {
            return res.send({success: false, msg: 'Таково пользоваетеля не существует'});
        } else {
            User.comparePassword(req.body.password, user.password, function (err, isMatch) {
                if(isMatch){
                    return res.send({success: true, uid: user._id, username: user.username, image_path: user.image_path});
                } else{
                    return res.send({success: false, msg: 'Неправильный пороль'});
                }
            });
        }
    });
});

router.post('/user/register', function (req, res, next) {
    if (!req.body.email || !req.body.password || !req.body.username) {
        return res.send({success: false, msg: 'Заполните все поля'});
    }
    User.getUserByEmail(req.body.email, function (err, user) {
        if(err) return next(err);
        if(user){
            res.send({sucess: false, msg: 'Этот Email использует другой пользователь'});
        } else{
            var newUser = new User(req.body);
            User.createUser(newUser, function (err, user) {
                if (err) return next(err);
                res.send({success: true, uid: user._id});
            });
        }
    });
});

var checkCookie = function (req, res, next) {
    if(req.cookies.uid !=null) {
        User.findById(req.cookies.uid, function (err, user) {
            if (err) return res.redirect('/');
            if (!user) {
                return res.redirect('/');
            }
            next();
        });
    } else{
        return res.redirect('/');
    }
};

router.use(checkCookie);

router.get('/selectSubject', function(req, res, next) {
    Subject.find({}, {'__v':0, 'topics':0},function (err, items) {
        if (err) return next(err);
        res.render('select_subject', {subjects: items});
    });
});

router.get('/test/:sub_id', function(req, res, next) {
    Subject.findById(req.params.sub_id,'-name -__v').populate('topics', 'name').exec(function (err, subject) {
        if (err) return next(err);
        res.render('test', {subject: subject});
    });
});

router.get('/test_in/:sub_id/:top_id', function(req, res, next) {
    res.render('test_in', {sub_id: req.params.sub_id});
});

router.post('/test_in', function (req, res, next) {
    Topic.findById(req.body.top_id, '-_id -__v -theory').populate('tests', '-_id -__v').exec(function (err, topic) {
        if (err) return next(err);
        //console.log(topic);
        res.send({success: true, topic: topic});
    });
});

router.get('/check/:sub_id/:top_id', function(req, res, next) {
    if(req.cookies.top_id !=null && req.cookies.score !=null){
        if(req.cookies.top_id==req.params.top_id){
            //console.log("EVERY THING IS OK!");
            User.addScore(req.cookies.uid, req.params.sub_id, req.params.top_id, req.cookies.score, function (err, user) {
                if (err) return next(err);
                console.log({sub_id: req.params.sub_id, success: true, score: req.cookies.score});
                return res.render('check',{sub_id: req.params.sub_id, success: true, score: req.cookies.score});
            });
        }
    } else {
        res.render('check', {success: false, msg: "Извините.Пройзошли ошибки в базе данных"});
        console.log({success: false, msg: "Извините.Пройзошли ошибки в базе данных"});
    }
});

router.get('/theory/:sub_id', function(req, res, next) {
    Subject.findById(req.params.sub_id,'-name -__v').populate('topics', 'name').exec(function (err, subject) {
        if (err) return next(err);
        res.render('theory', {subject: subject});
    });
});

router.get('/theory_in/:sub_id/:top_id', function(req, res, next) {
    Topic.findById(req.params.top_id, '-_id -__v -tests',function (err, topic) {
        if (err) return next(err);
        res.render('theory_in', {topic: topic, sub_id: req.params.sub_id});
    });
});

router.get('/profile', function (req, res, next) {
    res.render('profile');
});

router.get('/account', function (req, res, next) {
    res.render('account');
});

router.get('/password', function (req, res, next) {
    res.render('password');
});

module.exports = router;
