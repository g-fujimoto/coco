/**
 * GET     /api/comments              ->  index
 * POST    /api/comments              ->  create
 * GET     /api/comments/:id          ->  show
 * PUT     /api/comments/:id          ->  update
 * DELETE  /api/comments/:id          ->  delete
 */

// Dependences Modules
var Comments = require('./comments.model');
var _ = require('lodash');

//index
exports.index = function(req, res) {

    if (req.body.itemId) {
        req.body.itemId = {$in : req.body.itemId};
    }

    Comments.find(req.body)
        .populate('userId')
        .populate('itemId')
        .exec(function(err, data) {
            if(err) throw Error(err);
            res.json(data);
        });
};

//get
exports.get = function(req, res) {
    Comments.findOne({_id: req.params._id})
    .populate('userId')
    .populate('itemId')
    .exec(function(err, data) {
        if(err) throw Error(err);
        res.json(data);
    });
};

exports.getByItemID = function(req, res) {

    if (req.body.itemId) {
        req.body.itemId = {$in : req.body.itemId};
    }

    Comments.find(req.body, function(err, data) {
        res.json(data);
    });

}

//create
exports.create = function(req, res) {

    var newComment = new Comments(req.body);

    newComment.save(function(err) {
        if(err) {
            console.log(err);
            var errData = {
                type    : err.type,
                message : err.message
            };

            res.json(errData);

        } else {
            console.log(newComment);
            res.json(newComment);

        }
    });
};

exports.update = function(req, res) {
    Comments.findOne({_id: req.params._id}, function(err, data) {

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
    Comments.remove({_id: req.params._id}, function(err) {
        if(err) console.log('error');

        Comments.find({}, function(err, data) {
            res.json({message : 'success'});
        });
    });
};
