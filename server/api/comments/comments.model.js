// Dependences Modules
var mongoose = require('mongoose');

var CommentsSchema = mongoose.Schema({
    user  : {type : mongoose.Schema.ObjectId, ref : 'Users', unique:false},
    item  : {type : mongoose.Schema.ObjectId, ref : 'Items', unipue:false},
    title : String,
    body  : String,
    type  : Boolean,
    genreAve: {type : Number, default : 0},
    genre         : {
        name            : String,
        options: {
            taste: {
                label : String,
                rate  : Number
            },
            beautiful: {
                label : String,
                rate  : Number
            },
            quality: {
                label : String,
                rate  : Number
            },
            originality: {
                label : String,
                rate  : Number
            },
            sense: {
                label : String,
                rate  : Number
            }
        }
    },
    scenesAve : {type : Number, default : 0},
    scenes   : [
        {
            name       : String,
            options: {
                value1: {
                    label:String,
                    rate : Number
                },
                value2: {
                    label:String,
                    rate : Number
                },
                value3: {
                    label:String,
                    rate : Number
                },
                value4: {
                    label:String,
                    rate : Number
                },
                value5: {
                    label:String,
                    rate : Number
                }
            },
            ave : {type: Number, default: 0}
        }
    ],
    itemLikesCounter : {
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


module.exports = mongoose.model('Comments', CommentsSchema);
