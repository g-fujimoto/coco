// Dependences Modules
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var ItemsSchema = mongoose.Schema({
    itemName        : String,
    itemKana        : String,
    itemBranch      : String,
    itemOtherName   : String,
    itemTel         : String,
    itemIntroduction: String,
    itemLink        : String,
    itemArea        : String,
    address         : {
            postalCode  : String,
            pref        : String,
            city        : String,
            town        : String,
            building    : String
    },
    scenes          : [Object],
    genres          : [Object],
    tags            : [Object],
    itemLikes       : [String],
    created         : Date,
    modified        : Date,
    deleteFlg       : Number,
});

ItemsSchema.plugin(autoIncrement.plugin, {model: 'Items', field: '_id'});

module.exports = mongoose.model('Items', ItemsSchema);
