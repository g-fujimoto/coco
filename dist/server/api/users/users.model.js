// Dependences Modules
var mongoose = require('mongoose');

var UsersSchema = mongoose.Schema({
    email          : String,
    password       : String,
    lastName       : String,
    firstName      : String,
    birthYear      : String,
    birthPref      : String,
    highSchoolYear : String,
    highSchoolName : String,
    universityYear : String,
    universityName : String,
    oAuthName      : String,
    oAuthKey       : String,
    specialized    : String,
    admin          : {type: Number, default: 0},
    lastLogin      : {type: Date, default: Date.now()},
    others          : [
        {
            title     : String,
            body      : String,
            created   : {type: Date, default: Date.now()},
            modified  : {type: Date, default: Date.now()},
            deleteFlg : {type: Number, default: 0}
        }
    ],
    aboutWorks : [
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
    recommendItems : [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Items',
            unique: true
        }
    ],
    wentItems : [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Items'
        }
    ],
    wantGoItems : [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Items'
        }
    ],
    created        : {type: Date, default: Date.now()},
    modified       : {type: Date, default: Date.now()},
    deleted        : Date,
    deleteFlg      : {type: Number, default: 0}
});

module.exports = mongoose.model('Users', UsersSchema);
