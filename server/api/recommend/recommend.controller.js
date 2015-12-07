/**
 * POST    /api/recommend/add              ->  add
 * POST   /api/recommend/delete           ->  delete
 */

// Dependences Modules
var Items = require('./../items/items.model');
var Users = require('./../users/users.model');

var _ = require('lodash');

//index
exports.add = function(req, res) {

    Users.update({_id: req.session.user._id}, {$push : {recommendItems : req.body._itemid}}, function(err, data) {
        // 例外処理
    });

    Items.update({_id : req.body._itemid}, {$inc : {"itemRecommendCounter.count" : 1}}, function(err, data) {
        // 例外処理
        res.json(data);
    });
};

// delete
exports.delete = function(req, res) {

    User.remove({_id: req.session.user._id}, {recommendItems : req.body._item_id}, function(err, data) {
        // 例外処理
    });

    Items.update({_id : req.body._itemid}, {$inc : {"itemRecommendCounter.count" : -1}}, function(err, data) {
        // 例外処理
    });
};
