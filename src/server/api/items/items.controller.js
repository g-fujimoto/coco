/**
 * GET     /api/items              ->  index
 * POST    /api/items              ->  create
 * GET     /api/items/:id          ->  show
 * PUT     /api/items/:id          ->  update
 * DELETE  /api/items/:id          ->  delete
 */
// Dependences Modules
var Items = require('./items.model');
var Users = require('./../users/users.model');
var _     = require('lodash');

//index
exports.index = function(req, res) {

    if (req.body.name) {
        req.body.name = new RegExp('^' + req.body.name);
    }

    Items.find(req.body, function(err, data) {
        res.json(data);
    });
};

exports.findOne = function(req,res) {

    Items.find({_id: req.params._id}, function(err, data) {
        res.json(data);
    });
};

exports.recommend_item = function(req, res) {

    Users.find({_id : req.session.loginUser._id}, function(err, data) {
        Items.find({_id: {$in : data[0].recommendItems}}, function(err, data) {
            res.json(data);
        });
    });
};

//create
exports.create = function(req, res) {
    var newItem = new Items(req.body);

    newItem.save(function(err) {
        if(err) {
            console.log(err);
            var errData = {
                type    : err.type,
                message : err.message
            };
            res.json(errData);
        } else {
            res.json(newItem);
        }
    });
};
exports.update = function(req, res) {
    Items.findOne({_id: req.params._id}, function(err, data) {
        _.extend(data, req.body);
        data.modified = new Date();
        data.save(function(err, data) {
            if(err) {
            console.log(err.message);
            }
            res.json(data);
        });
    });
};

// delete
exports.delete = function(req, res) {
    Items.remove({_id: req.params._id}, function(err) {
        if(err) {
            res.json(err);
        }
        res.json({message: 'success'});
    });
};

exports.fiximage = function(req, res) {

    if(req.pre && req.pre.length) {

        var mkdirp = require('mkdirp');
        var upload_dir = 'assets/images/items/' + req.body.item_id;

        mkdirp('client/' + upload_dir, function (err) {
            if (err) {
                res.json(false);
            } else {

                var upload_file = upload_dir + '/' + req.pre[i];

                for(var sortNo = 0; sortNo < req.pre.length; sortNo++) {
                    fs.createReadStream('upload/' + req.pre[sortNo]).pipe(fs.createWriteStream('client/' + upload_file));
                    var image = {path: upload_file, sortNo: sortNo, registerUser: req.session.loginUser.lastName + ' ' + req.session.loginUser.filstName};

                    Items.update({_id: req.body.item_id},
                        {$push : {images : image}}, function(err, data) {
                        // 例外処理
                    });
                }

                res.json(true);
            }
        });
    }
};
