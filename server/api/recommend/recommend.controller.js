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

    Users.update({_id: req.session.user._id, recommendItems : {$nin : [req.body._itemid]}},
        {$push : {recommendItems : req.body._itemid}}, function(err, data) {

        // 例外処理

        if (!err && data.n > 0) {
            Items.update({_id : req.body._itemid}, {$inc : {"itemRecommendCounter.count" : 1}}, function(err, data) {
                // 例外処理
                res.json(data);
            });
        }
    });
};

// delete
exports.delete = function(req, res) {

    Users.update({_id: req.session.user._id, recommendItems : {$in : [req.body._itemid]}},
        {$pull : {recommendItems : req.body._itemid}}, function(err, data) {

        // 例外処理
        console.log(err);
        console.log(data);

        if (!err && data.n > 0) {
            Items.update({_id : req.body._itemid}, {$inc : {"itemRecommendCounter.count" : -1}}, function(err, data) {
                // 例外処理
                res.json(data);
            });
        }
    });
};
