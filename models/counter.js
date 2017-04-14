var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSchema = new Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0}
});

var Counter = module.exports = mongoose.model('Counter', counterSchema);

module.exports.getNextSeq = function (name) {
    var ret = Counter.findOneAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        {new: true}
    );
    return ret.seq;
};