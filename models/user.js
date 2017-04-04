var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
mongoose.set('debug', true);

var userSchema = new mongoose.Schema({
    username: String,
    email: {type: String, require: true},
    password: {type: String, require: true}
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByEmail = function (email, callback) {
    var query = {email: email};
    User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
   bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
      if(err) throw err;
      callback(null, isMatch);
   });
};