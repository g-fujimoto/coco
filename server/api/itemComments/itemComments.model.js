// Dependences Modules
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var ItemCommentsSchema = mongoose.Schema({
    userId        : Number,
    userFirstName : String,
    userLastName  : String,
    itemId        : Number,
    title         : String,
    body          : String,
    genre         : {
        name            : String,
        tasteRate       : {type: Number, default: 0},
        beautifulRate   : {type: Number, default: 0},
        qualityRate     : {type: Number, default: 0},
        originalityRate : {type: Number, default: 0},
        senseRate       : {type: Number, default: 0}
    },
    genreAve : {type : Number, default : 0},
    scenes   : [
        {
            name       : String,
            rate1 : {type: Number, default: 0},
            rate2 : {type: Number, default: 0},
            rate3 : {type: Number, default: 0},
            rate4 : {type: Number, default: 0},
            rate5 : {type: Number, default: 0}

        }
    ],
    sceneAve : {type: Number, default: 0},
    itemLikes : {
        count : {type: Number, default: 0}
    },
    images : [
        {
            path      : String,
            sortNo    : {type: Number, default: 0},
            created   : {type: Date, default: Date.now()},
            modified  : {type: Date, default: Date.now()},
            deleteFlg : {type: Number, default: 0}
        }
    ],
    created   : {type : Date, default   : Date.now()},
    modified  : {type : Date, default   : Date.now()},
    deleteFlg : {type : Number, default : 0}
});

ItemCommentsSchema.plugin(autoIncrement.plugin, {model: 'ItemComments', field: '_id'});

module.exports = mongoose.model('ItemComments', ItemCommentsSchema);
