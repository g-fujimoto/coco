/**
<<<<<<< HEAD
 * GET     /api/Area              ->  index
 * POST    /api/Area              ->  create
 * GET     /api/Area/:id          ->  show
 * PUT     /api/Area/:id          ->  update
 * DELETE  /api/Area/:id          ->  delete
=======
 * GET     /api/area              ->  index
 * POST    /api/area              ->  create
 * GET     /api/area/:id          ->  show
 * PUT     /api/area/:id          ->  update
 * DELETE  /api/area/:id          ->  delete
>>>>>>> 7c9c3b70045532e63e46fb6716b8b8a4b1c9d2ea
 */

// Dependences Modules
var Area = require('./area.model');
var _ = require('lodash');

//index
exports.index = function(req, res) {

    if (req.body.itemName) {
        req.body.itemName = new RegExp('^' + req.body.itemName);
    }

    Area.find(req.body, function(err, data) {
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

    var newArea = new Area(sendData);

    newArea.save(function(err) {
        if(err) {
            var errData = {
                type    : err.type,
                message : err.message
            };

            res.json(errData);

        } else {

            res.json(newArea);

        }
    });
};

exports.update = function(req, res) {
    Area.findOne({_id: req.params._id}, function(err, data) {

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
    Area.remove({_id: req.params._id}, function(err) {
        if(err) {
            console.log('error');
        }
        Area.find({}, function(err, data) {
            res.json(data);
        });
    });
};
