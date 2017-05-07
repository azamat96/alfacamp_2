var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Subject = require('../models/subject');
var Topic = require('../models/topic');
var randomstring = require("randomstring");
var fs = require('fs');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, randomstring.generate({
                length: 12,
                charset: 'alphabetic',
                capitalization: 'lowercase'
            })+'.jpg')
    }
});
var upload = multer({ storage: storage });
//var upload = multer({ dest: 'public/uploads/' })

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
                    return res.send({success: true, uid: user._id, username: user.username, image_path: user.image_path, email: user.email});
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
    User.getUserById(req.cookies.uid, function (err, user) {
        if(err) return next(err);
        res.render('profile',{user: user});
        console.log(user);
    });
});

router.get('/account', function (req, res, next) {
    res.render('account');
});

function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
}

router.post('/updateAccount', upload.any(), function (req, res, next) {
    var img = {username: req.body.username, email: req.body.email};
    if(req.files[0]){
        var suret = '/uploads/'+req.files[0].filename;
        img = {image_path: suret, username: req.body.username, email: req.body.email};
    }
    User.findByIdAndUpdate(req.cookies.uid, img, function (err, user) {
        if(err) return next(err);
        console.log(user);
        res.cookie('email', img.email);
        res.cookie('username', img.username);
        if(img.image_path){
            res.cookie('image_path', img.image_path);
        }
        res.render('account', {msg: 'Изменения приняты'});
    });
});

router.get('/password', function (req, res, next) {
    res.render('password');
});

router.post('/updatePassword', function (req, res, next) {
    console.log(req.body);
    if(!req.body.c_password || !req.body.n_password){
        return res.redirect('/password');
    }else {
        User.findById(req.cookies.uid, function (err, user) {
            if (err) return next(err);
            User.comparePassword(req.body.c_password, user.password, function (err, isMatch) {
                if (isMatch) {
                    User.updatePassword(req, function (err, user) {
                        if(err) return next(err);
                        res.render('password', {msg: 'Пороль изменен'});
                    });
                } else {
                    return res.send({success: false, msg: 'Неправильный пороль'});
                }
            });

        });
    }
});

module.exports = router;
