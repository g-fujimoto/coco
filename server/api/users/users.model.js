// Dependences Modules
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var UsersSchema = mongoose.Schema({
    email          : String,
    password       : String,
    lastName       : String,
    firstName      : String,
    birthYear      : String,
    birthArea      : String,
    highSchoolYear : String,
    highSchoolName : String,
    UniversityYear : String,
    UniversityName : String,
    oAuthName      : String,
    oAuthKey       : String,
    specialized    : String,
    lastLogin      : Date,
    other          : [
        {
            title     : String,
            body      : String,
            created   : {type: Date, default: Date.now()},
            modified  : {type: Date, default: Date.now()},
            deleteFlg : {type: Number, default: 0}
        }
    ],
    aboutWork : [
        {
            title     : String,
            body      : String,
            sortNo    : {type: Number, default: 0},
            created   : {type: Date, default: Date.now()},
            modified  : {type: Date, default: Date.now()},
            deleteFlg : {type: Number, default: 0}
        }
    ],
    images : [
        {
            path      : String,
            sortNo    : {type: Number, default: 0},
            created   : {type: Date, default: Date.now()},
            modified  : {type: Date, default: Date.now()},
            deleteFlg : {type: Number, default: Date.now()}
        }
    ],
    company : {
        name       : String,
        postalCode : String,
        address    : String,
        tel        : String,
        fax        : String,
        url        : String,
        email      : String,
        created    : {type: Date, default: Date.now()},
        modified   : {type: Date, default: Date.now()},
        deleteFlg  : {type: Number, default: 0}
    },
    itemCommontCounter : {
        count : {type: Number, default: 0}
    },
    itemRegisterCounter : {
        count : {type: Number, default: 0}
    },
    itemWent      : [Number],
    itemWantGo    : [Number],
    itemReccomend : [Number],
    created       : {type: Date, default: Date.now()},
    modified      : {type: Date, default: Date.now()},
    deleted       : Date,
    deleteFlg     : {type: Number, default: 0}
});

UsersSchema.plugin(autoIncrement.plugin, {model: 'Users', field: '_id'});

module.exports = mongoose.model('Users', UsersSchema);
