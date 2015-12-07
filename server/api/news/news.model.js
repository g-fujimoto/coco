// Dependences Modules
var mongoose = require('mongoose');

var NewsSchema = mongoose.Schema({
    title           : String,
    body            : String,
    created         : Date,
    modified        : Date,
    deleteFlg       : Number
});

module.exports = mongoose.model('News', NewsSchema);
