var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../models/user');

module.exports = function(passport) {
    passport.use(new BearerStrategy({},
        function(token, done){
            User.findOne({ _id: token }, function(err, user){
                //if(err) return done(err, false);
                if(!user) return done(null, false);
                return done(null, user);
            });
        }));
};