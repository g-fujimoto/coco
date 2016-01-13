/**
 * POST   /api/like/add              ->  add
 * POST   /api/like/delete           ->  delete
 */

// Dependences Modules
var Items    = require('./../items/items.model');
var Comments = require('./../comments/comments.model');

exports.add = function(req, res) {
    console.log(req.body);
    Comments.update(
        {
            _id: req.body._id,
            itemLikesUsers : {
                $nin : [req.session.loginUser._id]
            }
        },
        {
            $push : {
                itemLikesUsers : req.session.loginUser._id
            }
        },
        function(err, data) {
        if (err) {
            return res.json(data);
        }
        if(!err && data.n === 0) {
            return res.json(data);
        }
        if (!err && data.n > 0) {
            Items.update({_id : req.body.item._id}, {$inc : {"itemLikeCounter.count" : 1}}, function(err, data) {
                // 例外処理
                return res.json(data);
            });
        }
    });
};

// delete
exports.delete = function(req, res) {

  Comments.update({_id: req.body._commentid, likeUsers : {$in : [req.session.loginUser._id]}},
      {$pull :{likeUsers : req.session.loginUser._id}}, function(err, data) {

      // 例外処理

      if (!err && data.n > 0) {
          Items.update({_id : req.body._itemid}, {$inc : {"itemLikeCounter.count" : -1}}, function(err, data) {
              // 例外処理
              res.json(data);
          });
      }
  });
};
