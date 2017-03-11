var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: {type: String, require: true},
    password: {type: String, require: true}
});

module.exports = mongoose.model('User', userSchema);
