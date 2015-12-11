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
