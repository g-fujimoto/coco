/**
 * POST   /api/like/add              ->  add
 * POST   /api/like/delete           ->  delete
 */

// Dependences Modules
var Items = require('./../items/items.model');
var Comments = require('./../comments/comments.model');

var _ = require('lodash');

//index
exports.add = function(req, res) {

    Comments.update({_id: req.body._commentid, likeUsers : {$nin : [req.session.user._id]}},
        {$push : {likeUsers : req.session.user._id}}, function(err, data) {

        // 例外処理

        if (!err && data.n > 0) {
            Items.update({_id : req.body._itemid}, {$inc : {"itemLikeCounter.count" : 1}}, function(err, data) {
                // 例外処理
                res.json(data);
            });
        }
    });
};

// delete
exports.delete = function(req, res) {

  Comments.update({_id: req.body._commentid, likeUsers : {$in : [req.session.user._id]}},
      {$pull :{likeUsers : req.session.user._id}}, function(err, data) {

      // 例外処理

      if (!err && data.n > 0) {
          Items.update({_id : req.body._itemid}, {$inc : {"itemLikeCounter.count" : -1}}, function(err, data) {
              // 例外処理
              res.json(data);
          });
      }
  });
};
