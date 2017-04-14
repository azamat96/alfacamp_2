var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Topic = require('./topic');

var testSchema = new Schema({
    question: {type: String, required: true},
    a: String,
    b: String,
    c: String,
    d: String,
    correct: String
});

var Test = module.exports = mongoose.model('Test', testSchema);

module.exports.addTest = function (req, res, next, callback) {
    var test = new Test(req.body);
    test.save(function (err , test) {
        if(err) return next(err);
        Topic.findById(req.params.id, function (err, topic) {
            console.log(topic);
            topic.tests.push(test._id);
            topic.save(callback);
        });
    });
};

module.exports.delTest = function (testid, topicid, callback) {
    Test.findByIdAndRemove(testid, function (err, test) {
        if (err) throw err;
        Topic.findById(topicid, function (err, topic) {
            if(err) throw err;
            //console.log(topic);
            topic.tests.remove(testid);
            topic.save(callback);
        });
    });
};
