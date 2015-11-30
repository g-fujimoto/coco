/**
 * GET     /api/areas              ->  index
 * POST    /api/areas              ->  create
 * GET     /api/areas/:id          ->  show
 * PUT     /api/areas/:id          ->  update
 * DELETE  /api/areas/:id          ->  delete
 */

// Dependences Modules
var Areas = require('./areas.model');
var _ = require('lodash');

//index
exports.index = function(req, res) {

    req.body.deleteFlg = 0;

    Areas.find(req.body, function(err, data) {
        console.log(err);
        console.log(data);
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

    var newAreas = new Areas(sendData);

    newAreas.save(function(err) {
        if(err) {
            var errData = {
                type    : err.type,
                message : err.message
            };

            res.json(errData);

        } else {

            res.json(newAreas);

        }
    });
};

exports.update = function(req, res) {
    Areas.findOne({_id: req.params._id}, function(err, data) {

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
    Areas.remove({_id: req.params._id}, function(err) {
        if(err) {
            console.log('error');
        }
        Areas.find({}, function(err, data) {
            res.json(data);
        });
    });
};
