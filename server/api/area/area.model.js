// Dependences Modules
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var AreaSchema = mongoose.Schema({
    name      : String,
    created   : Date,
    modified  : Date,
    deleteFlg : Number
});

AreaSchema.plugin(autoIncrement.plugin, {model: 'Area', field: '_id'});

module.exports = mongoose.model('Area', AreaSchema);
