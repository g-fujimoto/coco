var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

var UploadSchema = mongoose.Schema({
    uploadName: String,
    uploadTel : String,
    uploadType: String,
    uploadSeen: String,
    uploadRate: Number
});

UploadSchema.plugin(autoIncrement.plugin, {model: 'Upload', field: '_id'});

module.exports = mongoose.model('Upload', UploadSchema);
