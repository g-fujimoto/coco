// Dependences Modules
var mongoose = require('mongoose');

var AreasSchema = mongoose.Schema({
    name      : String,
    created   : Date,
    modified  : Date,
    deleteFlg : Number
});

module.exports = mongoose.model('Areas', AreasSchema);
