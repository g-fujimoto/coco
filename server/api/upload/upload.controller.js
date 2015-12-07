exports.index = function(req, res) {
};

exports.create = function(req, res) {
console.log(req.file);
};

exports.userimg = function(req, res) {
    var fs = require('fs');
    fs.createReadStream(req.file.path).pipe(fs.createWriteStream('client/assets/images/users/' + req.session.user._id + '.jpg'));
    console.log(req.file);
};

exports.destroy = function(req, res) {
};

exports.update = function(req, res) {
};
