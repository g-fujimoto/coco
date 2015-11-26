// Dependences Modules
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var AreaSchema = mongoose.Schema({
    areaName : String,
    created  : Date,
    modified : Date,
    deleted  : Number
});

AreaSchema.plugin(autoIncrement.plugin, {model: 'Area', field: '_id'});

module.exports = mongoose.model('Area', AreaSchema);
