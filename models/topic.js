var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Subject = require('./subject');

var topicSchema = new Schema({
    name: String,
    subject_id: Schema.Types.ObjectId,
    tests: [{type: Schema.Types.ObjectId, ref: 'Test'}],
    theory: String
});

var Topic = module.exports = mongoose.model('Topic', topicSchema);

module.exports.addTopic = function (req, res, next, callback) {
    var topic = new Topic(req.body);
    topic.save(function (err , topic) {
        if(err) return next(err);
        Subject.findById(req.body.subject, function (err, subject) {
            subject.topics.push(topic._id);
            subject.save(callback);
        });
    });
};

