// Dependences Modules
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var UsersSchema = mongoose.Schema({
    email               : String,
    password            : String,
    lastName            : String,
    firstName           : String,
    birthYear           : String,
    birthArea           : String,
    highSchoolYear      : String,
    highSchoolName      : String,
    UniversityYear      : String,
    UniversityName      : String,
    oAuthName           : String,
    oAuthKey            : String,
    specialized         : String,
    lastLogin           : Date,
    other               : [
        {
            title      : String,
            body       : String,
            created    : Date,
            modified   : Date,
            deleteFlg  : Number
        }
    ],
    aboutWork           : [
        {
            title      : String,
            body       : String,
            sortNo     : Number,
            created    : Date,
            modified   : Date,
            deleteFlg  : Number
        }
    ],
    images              : [
        {
            path       : String,
            sortNo     : Number,
            created    : Date,
            modified   : Date,
            deleteFlg  : Number
        }
    ],
    company             : {
        name       : String,
        postalCode : String,
        address    : String,
        tel        : String,
        fax        : String,
        url        : String,
        email      : String,
        created    : Date,
        modified   : Date,
        deleteFlg  : Number
    },
    itemCommontCounter  : {
        count      : Number
    },
    itemRegisterCounter : {
        count      : Number
    },
    itemWent            : [Number],
    itemWantGo          : [Number],
    itemReccomend       : [Number],
    created             : Date,
    modified            : Date,
    deleted             : Date,
    deleteFlg           : Number
});

UsersSchema.plugin(autoIncrement.plugin, {model: 'Users', field: '_id'});

module.exports = mongoose.model('Users', UsersSchema);
