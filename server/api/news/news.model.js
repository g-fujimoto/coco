// Dependences Modules
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var NewsSchema = mongoose.Schema({
    title           : String,
    body            : String,
    created         : String,
    modified        : String,
    deleteFlg       : String
});

NewsSchema.plugin(autoIncrement.plugin, {model: 'News', field: '_id'});

module.exports = mongoose.model('News', NewsSchema);
