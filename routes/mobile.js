var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.post('/user/register', function(req, res, next) {
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



module.exports = router;
