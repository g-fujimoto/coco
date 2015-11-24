/**
 * GET     /api/items              ->  index
 * POST    /api/items              ->  create
 * GET     /api/items/:id          ->  show
 * PUT     /api/items/:id          ->  update
 * DELETE  /api/items/:id          ->  destroy
 */

// Dependences Modules
var Items = require('./items.model');

//index
exports.index = function(req, res) {

console.log(req.body);

    if (req.body.itemName) {
        req.body.itemName = new RegExp('^' + req.body.itemName);
    }

    Items.find(req.body, function(err, data) {
        res.json(data);
    });
};

//create
exports.create = function(req, res) {

    console.log(req.body.scene);
    console.log(req.body.genre);

    // var newItem = new Items({
    //     itemName        : req.body.itemName,
    //     itemKana        : req.body.itemKana,
    //     itemBranch      : req.body.itemBranch,
    //     itemOtherName   : req.body.itemOtherName,
    //     itemTel         : req.body.itemTel,
    //     itemIntroduction: req.body.itemIntroduction,
    //     address         : req.body.address
    // });
    //
    //
    // newItem.save(function(err) {
    //     if(err) {
    //         res.send('error');
    //     } else {
    //         res.json(newItem);
    //     }
    // });
};

//update
exports.update = function(req, res) {
    Items.findOne({_id: req.params._id})
        .populate('itemWants')
        .exec(function(err, data) {
            console.log(req.body);
            data.email = req.body.email;
            data.password = req.body.password;
            data.modified = new Date();
            data.save();
            res.json(data);
        });
};

//destroy
exports.destroy = function(req, res) {
    console.log(req.params._id);
    Items.remove({_id: req.params._id}, function(err) {
        if(err) {
            console.log('error');
        }
        Items.find()
            .populate('itemWants')
            .exec(function(err, data) {
                if(err) res.send('error');
                res.json(data);
            });
    });
};
