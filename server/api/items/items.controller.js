/**
 * GET     /api/items              ->  index
 * POST    /api/items              ->  create
 * GET     /api/items/:id          ->  show
 * PUT     /api/items/:id          ->  update
 * DELETE  /api/items/:id          ->  delete
 */

// Dependences Modules
var Items = require('./items.model');
var _ = require('lodash');

//index
exports.index = function(req, res) {

    if (req.body.itemName) {
        req.body.itemName = new RegExp('^' + req.body.itemName);
    }

    Items.find(req.body, function(err, data) {
        res.json(data);
    });
};

//create
exports.create = function(req, res) {

    var date = {
        created  : new Date(),
        modified : new Date()
    };

    var sendData = _.merge(req.body, date);

    var newItem = new Items(sendData);

    newItem.save(function(err) {
        if(err) {
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
            console.log('error');
        }
        Items.find({}, function(err, data) {
            res.json(data);
        });
    });
};
