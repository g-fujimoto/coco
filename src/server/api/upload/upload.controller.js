var Comments = require('./../comments/comments.model');
var Items = require('./../items/items.model');
var Users = require('./../users/users.model');

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

            var image = {
                    path: upload_file,
                    sortNo: req.body.sortNo,
                    registerUser: req.session.loginUser.lastName + ' ' + req.session.loginUser.firstName
            };

            Items.update({_id: req.body.item_id},
                {$push : {images : image}}, function(err, data) {
                // 例外処理
                return res.json(image);
            });

        }
    });
};

exports.user = function(req, res) {

    var upload_dir = 'assets/images/users';

    var fs = require('fs');
    var upload_file = upload_dir + '/' + req.session.loginUser._id + '.' + req.file.originalname.match(/(.*)(?:\.([^.]+$))/)[2];
    fs.createReadStream(req.file.path).pipe(fs.createWriteStream('client/' + upload_file));

    var image = {path: upload_file, sortNo: 0};

    Users.update({_id: req.session.loginUser._id, 'images.sortNo' : {$nin : 0}},
        {$push : {images : image}}, function(err, data) {
        // 例外処理
        console.log(data);
    });

    res.json(true);
};

exports.pre = function(req, res) {
    var pre_uploadfile = req.file.filename + '.' + req.file.originalname.match(/(.*)(?:\.([^.]+$))/)[2];
    res.json(pre_uploadfile);
};

const start_upload = function (req, upload_dir) {
    var fs = require('fs');
    var upload_file = upload_dir + '/' + req.file.filename + '.' + req.file.originalname.match(/(.*)(?:\.([^.]+$))/)[2];
    fs.createReadStream(req.file.path).pipe(fs.createWriteStream('client/' + upload_file));
    return upload_file;
};
