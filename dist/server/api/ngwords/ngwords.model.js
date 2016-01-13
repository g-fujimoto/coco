// Dependences Modules
var mongoose = require('mongoose');

var NgWordsSchema = mongoose.Schema({
    word            : String,
    created         : Date,
    modified        : Date,
    deleteFlg       : Number
});


module.exports = mongoose.model('NgWords', NgWordsSchema);
