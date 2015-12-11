// Dependences Modules
var mongoose = require('mongoose');

var ItemsSchema = mongoose.Schema({
    name      : String,
    kana      : String,
    branch    : String,
    otherName : String,
    tel       : String,
    area      : String,
    introduce : String,
    address   : {
        postalCode : String,
        pref       : String,
        city       : String,
        town       : String,
        building   : String
    },
    station    : String,
    title      : String,
    genreName  : String,
    sceneNames : [String],
    itemRecommendCounter : {
        count : {type: Number, default: 0}
    },
    itemLikeCounter : {
        count : {type: Number, default: 0}
    },
    images : [
        {
            path      : String,
            sortNo    : String,
            created   : {type: Date, default: Date.now()},
            modified  : {type: Date, default: Date.now()},
            deleteFlg : {type: Number, default: 0}
        }
    ],
    created   : {type: Date, default : Date.now()},
    modified  : {type: Date, default : Date.now()},
    deleteFlg : {type: Number, default: 0}
});

module.exports = mongoose.model('Items', ItemsSchema);
