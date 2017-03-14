var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
    question: {type: String, required: true},
    answers: [{
        answer: String,
        right: Boolean
    }]
});

module.exports = mongoose.model('Test', testSchema);
