var mongoose = require('mongoose');

var UploadSchema = mongoose.Schema({
    uploadName: String,
    uploadTel : String,
    uploadType: String,
    uploadSeen: String,
    uploadRate: Number
});

module.exports = mongoose.model('Upload', UploadSchema);
