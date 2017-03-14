var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new Schema({
    name: String,
    tests: [{type: Schema.Types.ObjectId, ref: 'Test'}],
    theory: String
});

module.exports = mongoose.model('Topic', topicSchema);
