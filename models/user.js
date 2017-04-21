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

var insertTopic = function(user, i, top_id, score) {
    user.subjects[i].topics.push({topic: top_id, score: parseInt(score)});
    user.subjects[i].sum = parseInt(user.subjects[i].sum)+parseInt(score);
    user.save(function (err, user) {
        if(err) return false;
        return true;
    });
};

module.exports.addScore = function (user_id, sub_id, top_id, score, callback) {
    User.findOne({
        "_id": user_id,
        "subjects":{ $elemMatch: {"subject": sub_id}}
    }, function (err, user) {
        if (err) return callback(err);
        if (user != undefined && user != null) {
            for(var i =0;i<user.subjects.length;i++){
                if(user.subjects[i].subject==sub_id){
                    for(var j =0;j<user.subjects[i].topics.length;j++){
                        if(user.subjects[i].topics[j].topic==top_id) {
                            if (user.subjects[i].topics[j].score < score) {
                                user.subjects[i].sum = parseInt(user.subjects[i].sum)-parseInt(user.subjects[i].topics[j].score);
                                user.subjects[i].sum =parseInt(user.subjects[i].sum)+ parseInt(score);
                                user.subjects[i].topics[j].score = parseInt(score);
                                user.save(function (err, user) {
                                    if (err) return callback(err);
                                    return callback(null, user);
                                });
                            }else {
                                return callback(null, user);
                            }
                            return;
                            break;
                        }
                        if(j==user.subjects[i].topics.length-1){
                            if(insertTopic(user, i, top_id, score)){
                                return callback(null, user);
                            }
                        }
                    }
                }
            }
        } else {
            User.findByIdAndUpdate(
                user_id,
                {
                    $push: {
                        "subjects": {
                            subject: sub_id,
                            sum: score,
                            topics: {topic: top_id, score: score}
                        }
                    }
                },
                {safe: true, upsert: true}, function (err, user) {
                    if (err) return callback(err);
                    return callback(null, user);
                });
        }
    });
};