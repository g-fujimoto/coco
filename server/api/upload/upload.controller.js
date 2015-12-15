var Comments = require('./../comments/comments.model');
var Items = require('./../items/items.model');

exports.comment = function(req, res) {

  　var mkdirp = require('mkdirp');
    var upload_dir = 'assets/images/comments/' + req.body.comment_id;

    mkdirp('client/' + upload_dir, function (err) {
        if (err) {
            res.json(false);
        } else {

            var upload_file = start_upload(req, upload_dir);

            var image = {path: upload_file, sortNo: req.body.sortNo};

            Comments.update({_id: req.body.comment_id},
                {$push : {images : image}}, function(err, data) {
                // 例外処理
            });

            res.json(true);
        }
    });
};

exports.item = function(req, res) {

  　var mkdirp = require('mkdirp');
    var upload_dir = 'assets/images/items/' + req.body.item_id;

    mkdirp('client/' + upload_dir, function (err) {
        if (err) {
            res.json(false);
        } else {

            var upload_file = start_upload(req, upload_dir);

            var image = {path: upload_file, sortNo: req.body.sortNo};

            Items.update({_id: req.body.item_id},
                {$push : {images : image}}, function(err, data) {
                // 例外処理
            });

            res.json(true);
        }
    });
};

exports.user = function(req, res) {
    var fs = require('fs');
    fs.createReadStream(req.file.path).pipe(fs.createWriteStream(
      'client/assets/images/users/' + req.session.user._id + '.' + req.file.originalname.match(/(.*)(?:\.([^.]+$))/)[2]));
};

const start_upload = function (req, upload_dir) {
    var fs = require('fs');
    var upload_file = upload_dir + '/' + req.file.filename + '.' + req.file.originalname.match(/(.*)(?:\.([^.]+$))/)[2];
    fs.createReadStream(req.file.path).pipe(fs.createWriteStream('client/' + upload_file));
    return upload_file;
}
