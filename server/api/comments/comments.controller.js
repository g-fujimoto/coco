/**
 * GET     /api/comments              ->  index
 * POST    /api/comments              ->  save
 * GET     /api/comments/:id          ->  show
 * PUT     /api/comments/:id          ->  update
 * DELETE  /api/comments/:id          ->  delete
 */

// Dependences Modules
var Comments = require('./comments.model');
var Items    = require('./../items/items.model');
var Users    = require('./../users/users.model');
var _        = require('lodash');

//index
exports.index = function(req, res) {

    if (req.body.item) {
        req.body.item = {$in : req.body.item};
    }

    Comments.find(req.body)
        .populate('user')
        .populate('item')
        .sort({'created' : -1})
        .exec(function(err, data) {
            if(err) throw Error(err);
            res.json(data);
        });
};

exports.went_items = function(req, res) {

  if (req.body.item) {
      req.body.item = {$in : req.body.item};
  }

  Comments.find(req.body)
      .populate('item')
      .exec(function(err, data) {
          if(err) throw Error(err);
          res.json(data);
      });
};

exports.itemComments = function(req, res) {
    Comments.find({item: req.body._id})
        .populate('user')
        .populate('item')
        .exec(function(err, data) {
            if(err) throw Error(err);
            res.json(data);
        });
};

//get
exports.get = function(req, res) {
    Comments.findOne({_id: req.params._id})
    .populate('user')
    .populate('item')
    .exec(function(err, data) {
        if(err) throw Error(err);
        res.json(data);
    });
};

exports.went = function(req, res) {
    Comments.find({user : req.session.loginUser._id, type : true})
    .populate('item')
    .exec(function(err, data) {
        res.json(data);
    });
}

exports.wantGo = function(req, res) {
    Comments.find({user : req.session.loginUser._id, type : false})
    .populate('item')
    .exec(function(err, data) {
        res.json(data);
    });
}

exports.getByItemID = function(req, res) {

    if (req.body.itemId) {
        req.body.itemId = {$in : req.body.itemId};
    }

    Comments.find(req.body, function(err, data) {
        res.json(data);
    });

}

//create
exports.save = function(req, res) {

    if (req.session.loginUser) {
        req.body.user = req.session.loginUser._id;
    } else {
        return ;
    }

    var newComment = new Comments(req.body);

    newComment.save(function(err) {
        if(err) {
            console.log(err);
            var errData = {
                type    : err.type,
                message : err.message
            };
            console.log(errData);
            res.json(errData);

        } else {

            // ユーザ・行った店
            if (newComment.type) {

                Users.update({_id: newComment.user},
                  {$push : {wentItems : newComment.item}}, function(err, data) {
                    // 例外処理
                  });

                  // 店舗・シーン登録
                  Items.update({_id: newComment.item, sceneNames : {$nin : [newComment.scene.name]}},
                      {$push : {sceneNames : newComment.scene.name}}, function(err, data) {
                      // 例外処理
                  });

            } else {

                // ユーザ・行きたい店
                Users.update({_id: newComment.user},
                  {$push : {wantGoItems : newComment.item}}, function(err, data) {
                    // 例外処理
                  });
            }

            res.json(newComment);

        }
    });
};

exports.update = function(req, res) {
    Users.findOne({_id: req.params._id}, function(err, data) {
        data.itemLikesCounter.count = req.body.itemLikesCounter.count;
        if(!req.session.loginUser) {
            _.extend(data, req.body);
        }
        data.modified = new Date();

        data.save(function(err, data) {
            if(err) {
                console.log(err.message);
            }
            console.log(data);
            res.json(data);
        });

    });
};

// delete
exports.delete = function(req, res) {
    Comments.remove({_id: req.params._id}, function(err) {
        if(err) console.log('error');

        Comments.find({}, function(err, data) {
            res.json({message : 'success'});
        });
    });
};
