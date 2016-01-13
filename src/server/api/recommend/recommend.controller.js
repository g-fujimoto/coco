/**
 * POST    /api/recommend/add              ->  add
 * POST   /api/recommend/delete           ->  delete
 */

// Dependences Modules
var Items = require('./../items/items.model');
var Users = require('./../users/users.model');


exports.userRecommend = function(req, res) {

    Items.find({_id: {$in: req.body}}, function(err, data) {
        res.json(data);
    });
};

//index
exports.add = function(req, res) {

    Users.findOne({_id: req.session.loginUser._id}, function(err, data) {
        if(data.recommendItems.length >= 10) {
            return res.json({message: 'over'});
        }
    });

    Users.update({_id: req.session.loginUser._id, recommendItems : {$nin : [req.body._itemid]}},
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


    Users.update({_id: req.session.loginUser._id, recommendItems : {$in : [req.body._itemid]}},
        {$pull : {recommendItems : req.body._itemid}}, function(err, data) {

        // 例外処理

        if (!err && data.n > 0) {
            Items.update({_id : req.body._itemid}, {$inc : {"itemRecommendCounter.count" : -1}}, function(err, data) {
                // 例外処理
                res.json(data);
            });
        }
    });
};
