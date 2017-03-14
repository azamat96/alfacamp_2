var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Subject = require('../models/subject');
var Topic = require('../models/topic');

/* GET home page. */
router.post('/user/register', function(req, res, next) {
    if(!req.body.email || !req.body.password || !req.body.username){
        return res.status(404).send({success: 'err'});
    }
    User.findOne({email:req.body.email}).exec(function (err, user) {
        if(err) return next(err);
        if(user){
            res.status(404).send({sucess:'exist'});
        }
        else{
            var data = new User(req.body);
            data.save(function(err, user) {
                if (err) console.log('Data base saveing error');
                res.send({success:'ok', uid: user._id});
            });
        }
    });
});

router.post('/user/login', function (req, res, next) {
   User.findOne({email: req.body.email, password: req.body.password}).exec(function (err, user) {
       if(err) return next(err);
       if(!user){
           res.status(404).send({success: 'no'});
       }else{
           res.send({success: 'ok', uid: user._id});
       }
   });
});

router.get('/subjects', function (req, res, next) {
    //res.send({success: req.query.uid});
    User.findOne({_id: req.query.uid}).exec(function (err, user) {
        if(err) return next(err);
        if(!user){
            res.status(404).send({success: 'no'});
        }else{
            Subject.find({}).populate('topics', 'name _id theory').exec(function (err, subject) {
                if(err) return next(err);
                res.send(subject);
            });
        }
    });
});

router.get('/topic/:id', function (req, res, next) {

});

module.exports = router;
