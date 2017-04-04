var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
    question: {type: String, required: true},
    a: String,
    b: String,
    c: String,
    d: String,
    correct: String
});

module.exports = mongoose.model('Test', testSchema);
