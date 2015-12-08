/**
 * GET     /api/users              ->  index
 * GET     /api/users/:_id              ->  index
 * POST    /api/users              ->  create
 * GET     /api/users/:_id          ->  show
 * PUT     /api/users/:_id          ->  update
 * DELETE  /api/users/:_id          ->  delete
 */

// Dependences Modules
var Users = require('./users.model');
var _ = require('lodash');

//index
exports.index = function(req, res) {

    if (req.body.userName) {
        req.body.userName = new RegExp('^' + req.body.userName);
    }

    Users.find({}, function(err, data) {
        if(err) throw Error(err);
        res.json(data);
    });

};

exports.login = function(req, res) {
    Users.findOne({email: req.body.email, password:req.body.password}, function(err, data) {
        req.session.loginUser = data;

        if(err) {
         return res.json({login: 'Error!!!'});
        }
        if (data) {
            return res.json({login: true});
        } else {
            return res.json({login: false});
        }
    });
};

//get
exports.get = function(req, res) {

    Users.findOne({_id: req.params._id}, function(err, data) {
        if(err) throw Error(err);
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

    var newUser = new Users(sendData);

    newUser.save(function(err) {
        if(err) {
            var errData = {
                type    : err.type,
                message : err.message
            };

            res.json(errData);

        } else {

            res.json(newUser);

        }
    });
};

exports.update = function(req, res) {
    Users.findOne({_id: req.params._id}, function(err, data) {

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
    Users.remove({_id: req.params._id}, function(err) {
        if(err) {
            res.json(err);
        }
        res.json({message: 'success'});
    });
};
