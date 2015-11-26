// Dependences Modules
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var TagsSchema = mongoose.Schema({
    name            : String,
    created         : Date,
    modified        : Date,
    deleteFlg       : Number
});

TagsSchema.plugin(autoIncrement.plugin, {model: 'Tags', field: '_id'});

module.exports = mongoose.model('Tags', TagsSchema);
