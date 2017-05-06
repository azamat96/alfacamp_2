var mongoose = require('mongoose');
mongoose.set('debug', true);

var countSchema = new mongoose.Schema({
    _id: String,
    seq: {type: Number}
});

module.exports = mongoose.model('Counter', countSchema);