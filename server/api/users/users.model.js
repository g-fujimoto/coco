// Dependences Modules
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var UsersSchema = mongoose.Schema({
    email           : String,
    password        : String,
    lastName        : String,
    firstName       : String,
    birthYear       : String,
    birthArea       : String,
    highSchoolYear  : String,
    highSchoolName  : String,
    UniversityYear  : String,
    UniversityName  : String,
    oAuthName       : String,
    oAuthKey        : String,
    lastLogin       : String,
    deleteFlg       : String,
    specialized     : String,
    company         : {
            name        : String,
            postalCode  : String,
            address     : String,
            tel         : String,
            fax         : String,
            url         : String,
            email       : String,
            modified    : String,
    },
    tags            : [Object],
    images          : [Object],
    other           : [Object],
    aboutWork       : [Object],
    created         : String,
    modified        : String,
    deleted         : String
});

UsersSchema.plugin(autoIncrement.plugin, {model: 'Users', field: '_id'});

module.exports = mongoose.model('Users', UsersSchema);
