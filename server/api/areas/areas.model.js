// Dependences Modules
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var AreasSchema = mongoose.Schema({
    name      : String,
    created   : Date,
    modified  : Date,
    deleteFlg : Number
});

AreasSchema.plugin(autoIncrement.plugin, {model: 'Areas', field: '_id'});

module.exports = mongoose.model('Areas', AreasSchema);
