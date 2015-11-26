// Dependences Modules
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var ItemCommentsSchema = mongoose.Schema({
    userId          : Number,
    itemId          : Number,
    title           : String,
    body            : String,
    genre           : {
        name            : String,
        tasteRate       : Number,
        beautifulRate   : Number,
        qualityRate     : Number,
        originalityRate : Number,
        senseRate       : Number,
        created         : Date,
        modified        : Date,
        deleteFlg       : Number
    },
    scene           : [
        {
            name            : String,
            valueRate1      : Number,
            valueRate2      : Number,
            valueRate3      : Number,
            valueRate4      : Number,
            valueRate5      : Number,
            created         : Date,
            modified        : Date,
            deleteFlg       : Number
        }
    ],
    itemLikes       : {
        count           : Number
    },
    images          : [
        {
            path            : String,
            sortNo          : Number,
            created         : Date,
            modified        : Date,
            deleteFlg       : Number
        }
    ],
    created         : Date,
    modified        : Date,
    deleteFlg       : Number
});

ItemCommentsSchema.plugin(autoIncrement.plugin, {model: 'ItemComments', field: '_id'});

module.exports = mongoose.model('ItemComments', ItemCommentsSchema);
