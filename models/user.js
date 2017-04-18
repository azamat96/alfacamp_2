var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
mongoose.set('debug', true);

var userSchema = new mongoose.Schema({
    username: String,
    email: {type: String, require: true},
    password: {type: String, require: true},
    subjects:[{
        subject: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
        topics: [{
            topic:{type: mongoose.Schema.Types.ObjectId, ref: 'Topic'},
            score: Number
        }],
        sum: Number
    }],
    image_path: { type: String, default: '/img/user_man.png' }
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
    User.findById(id, { '_id': 0, '__v' :0, 'password': 0, 'subjects.topics':0, 'subjects._id':0})
        .populate('subjects.subject', { '_id': 0, '__v' :0, 'topics':0})
        .exec(callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
   bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
      if(err) throw err;
      callback(null, isMatch);
   });
};