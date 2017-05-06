var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Subject = require('../models/subject');
var Topic = require('../models/topic');
var randomstring = require("randomstring");
var fs = require('fs');

var passport = require('passport');
require('../config/passport')(passport);

router.post('/user/register', function(req, res, next) {
    if(!req.body.email || !req.body.password || !req.body.username){
        return res.status(404).send({success: false, msg: 'Отсутствует некоторые поля'});
    }
    User.getUserByEmail(req.body.email, function (err, user) {
        if(err) return next(err);
        if(user){
            res.status(404).send({sucess: false, msg: 'Этот Email использует другой пользователь'});
        } else{
            var newUser = new User(req.body);

            User.createUser(newUser, function (err, user) {
                if (err) return next(err);
                //console.log(user);
                res.send({success: true, uid: user._id});
            });
        }
    });
});

router.post('/user/login', function (req, res, next) {
    if(!req.body.email || !req.body.password){
        return res.status(404).send({success: false, msg: 'Отсутствует некоторые поля'});
    }
    User.getUserByEmail(req.body.email, function (err, user) {
        if(err) return next(err);
        if(!user){
            res.status(404).send({success: false, msg: 'Таково пользоваетеля не существует'});
        }else{
            User.comparePassword(req.body.password, user.password, function (err, isMatch) {
                if(isMatch){
                    return res.send({success: true, uid: user._id});
                } else{
                    return res.send({success: false, msg: 'Неправильный пороль'});
                }
            });
        }
    });
});

router.get('/fail', function (req, res, next) {
    res.status(404).send({success: false, msg: 'User not exist'});
});

router.use(passport.authenticate('bearer', {
    failureRedirect: '/api/fail',
    session: false}));

router.post('/subjects', function (req, res, next) {
    Subject.find({}).populate('topics', 'name').exec(function (err, subject) {
        if (err) return next(err);
        res.send(subject);
    });
});

router.post('/test', function (req, res, next) {
    if (!req.body.topic_id){
        return res.send({success: false, msg: 'Отсутствует некоторые поля'});
    }
    Topic.findOne({_id: req.body.topic_id}).populate('tests').exec(function (err, topic) {
        if (!topic) res.status(404).send({success: false,msg: 'Неправильная Topic_id'});
        else {
            res.send(topic.tests);
        }
    });
});

router.post('/theory', function (req, res, next) {
    if (!req.body.topic_id){
        return res.send({success: false, msg: 'Отсутствует некоторые поля'});
    }
    Topic.findOne({_id: req.body.topic_id}).exec(function (err, topic) {
        if (!topic) res.status(404).send({success: false,msg: 'Неправильная Topic_id'});
        else {
            res.send({theory: topic.theory});
        }
    });
});

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
}

router.post('/profile', function (req, res, next) {
    User.getUserById(req.body.access_token, function (err, user) {
        if(err) return next(err);
        var resp = base64_encode('public'+user.image_path);
        res.send({user: user, image: resp});
    });
});

router.post('/addScore', function (req, res, next) {
    if(!req.body.subject_id || !req.body.topic_id || !req.body.score){
        return res.status(404).send({success: false, msg: 'Отсутствует некоторые поля'});
    }
    User.addScore(req.body.access_token, req.body.subject_id, req.body.topic_id, req.body.score, function (err, user) {
        if (err) return next(err);
        res.send({success: true, msg:"Every thing is ok"})
    });
});

router.post('/imgUpload', function (req, res, next) {
    var img = '/uploads/'+randomstring.generate({
            length: 12,
            charset: 'alphabetic',
            capitalization: 'lowercase'
        })+'.jpg';
    base64_decode(req.body.my_picture, 'public'+img);
    User.findByIdAndUpdate(req.body.access_token, {image_path: img}, function (err, user) {
        if(err) return next(err);
        console.log('saved: '+img);
        res.send({success: true, msg:'Uploaded'});
    });
});

module.exports = router;