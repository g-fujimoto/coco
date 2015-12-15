/**
 * GET     /api/users               ->  index
 * GET     /api/users/:_id          ->  get
 * POST    /api/users               ->  create
 * GET     /api/users/:_id          ->  show
 * PUT     /api/users/:_id          ->  update
 * DELETE  /api/users/:_id          ->  delete
 */

// Dependences Modules
var Users = require('./users.model');
var _     = require('lodash');

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
    Users.findOne({email: req.body.email, password: req.body.password}, function(err, data) {
        req.session.loginUser = data;

        if(err) {
         return res.json({isLogin: 'Error!!!'});
        }

        if (data) {
            data.email = '';
            data.password = '';
            return res.json(data);
        } else {
            return res.json(data);
        }
    });
};

exports.adminLogin = function(req, res) {
    Users.findOne({email: req.body.email, password: req.body.password, admin: 1}, function(err, data) {
        req.session.adminLoginUser = data;

        if(err) {
            return res.json({isAdminLogin: 'Error!'});
        }
        if(data) {
            data.email = '';
            data.password = '';
            return res.json(data);
        } else {
            return res.json(data);
        }
    });
};

exports.logout = function(req, res) {
    req.session.loginUser = '';
    req.session.adminLoginUser = '';
    res.json({isLogin: false});
};

exports.stateCheck = function(req, res) {
    if(req.session.adminLoginUser) {
        return res.json({session: req.session.adminLoginUser});
    } else if(req.session.loginUser) {
        return res.json({session: req.session.loginUser});
    } else {
        return res.json({session: false});
    }
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
        if(req.body.updateFlg) {
            console.log('update');
            var email    = data.email;
            var password = data.password;
            data = _.extend(data, req.body);

            req.session.loginUser = data;

            data.email            = email;
            data.password         = password;

            data.save(function(err, data) {
                if(err) {
                    console.log(err.message);
                } else {
                    res.json(data);
                }
            });
        } else {

            data.itemRegisterCounter.count = req.body.itemRegisterCounter.count;
            if(!req.session.loginUser) {
                _.extend(data, req.body);
            }

            data.modified = new Date();

            data.save(function(err, data) {
                if(err) {
                    console.log(err.message);
                }
                if(req.session.loginUser) {
                    req.session.loginUser = data;
                }
                res.json(data);
            });
        }
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

exports.checkPassword = function(req, res) {
    Users.findOne({'_id': req.session.loginUser._id}, function(err, data) {
        if(req.body.oldPassword === data.password) {
            res.json({
                message: 'success'
            });
        } else {
            res.json({
                message: 'notMatch'
            });
        }
    });
};

exports.check = function(req, res) {
    console.log(req.body);
    Users.findOne({'_id': req.session.loginUser._id}, function(err, data) {
        data.password = req.body.newPassword;
        data.save(function(err, data) {
            if(err) {
                res.json(err.message);
            } else {
                req.session.loginUser.password = undefined;
                res.json(req.session.loginUser);
            }
        });
    });
};
