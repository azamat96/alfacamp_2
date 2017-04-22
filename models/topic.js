var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Subject = require('./subject');
var Test = require('./test');

var topicSchema = new Schema({
    name: String,
    subject_id: {type: Schema.Types.ObjectId , ref: 'Subject'},
    tests: [{type: Schema.Types.ObjectId, ref: 'Test'}],
    theory: String
});

var Topic = module.exports = mongoose.model('Topic', topicSchema);

module.exports.addTopic = function (req, res, next, callback) {
    var topic = new Topic(req.body);
    topic.save(function (err , topic) {
        if(err) return next(err);
        Subject.findById(req.body.subject_id, function (err, subject) {
            if (err) return next(err);
            subject.topics.push(topic._id);
            subject.save(callback);
        });
    });
};

module.exports.delTopic = function (top_id, callback) {
    Topic.findByIdAndRemove(top_id, function (err, response) {
        if(err) return callback(err);
        response.tests.forEach(function (id) {
            Test.findByIdAndRemove(id, function (err, response) {
                if(err) return callback(err);
            });
        });
        callback(null, response);
    });
};