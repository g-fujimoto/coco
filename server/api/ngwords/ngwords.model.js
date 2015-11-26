// Dependences Modules
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var NgWordsSchema = mongoose.Schema({
    word            : String,
    created         : Date,
    modified        : Date,
    deleteFlg       : Number
});

NgWordsSchema.plugin(autoIncrement.plugin, {model: 'NgWords', field: '_id'});

module.exports = mongoose.model('NgWords', NgWordsSchema);
