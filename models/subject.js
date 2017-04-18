var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subjectSchema = new Schema({
    name: String,
    topics: [{type: Schema.Types.ObjectId, ref: 'Topic'}]
});

module.exports = mongoose.model('Subject', subjectSchema);
