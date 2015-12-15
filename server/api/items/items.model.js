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
    registerUser  : String,
    registerId: mongoose.Schema.ObjectId,
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
    deleteFlg : {type : Number, default : 0},
    access    : String,
    feature   : {
        location : String,
        service  : String,
        url      : String
    },
    fundation: {
        lunch: {
            start  : String,
            finish : String,
            last   : String
        },
        diner: {
            start  : String,
            finish : String,
            last   : String
        },
        holiday: {
            start  : String,
            finish : String,
            last   : String
        },
        feature        : String,
        regularHoliday : String,
        creditCard     : Boolean
    },
    sheat: {
        count        : Number,
        privateRoom  : Boolean,
        charter      : Boolean,
        smoke        : Number,
        parking      : Boolean,
        spaceFeature : String,
        mobilePhone  : String,
        sofa         : Boolean
    },
    menu: {
        cuisine : String,
        drink   : String,
        cource  : String
    }
});

module.exports = mongoose.model('Items', ItemsSchema);
