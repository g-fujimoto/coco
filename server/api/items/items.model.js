// Dependences Modules
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var ItemsSchema = mongoose.Schema({
    name        : String,
    kana        : String,
    branch      : String,
    otherName   : String,
    tel         : String,
    area        : String,
    address         : {
        postalCode  : String,
        pref        : String,
        city        : String,
        town        : String,
        building    : String
    },
    itemRecommendCounter : {
        count : Number
    },
    created         : Date,
    modified        : Date,
    deleteFlg       : Number
});

ItemsSchema.plugin(autoIncrement.plugin, {model: 'Items', field: '_id'});

module.exports = mongoose.model('Items', ItemsSchema);
