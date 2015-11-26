/**
 * GET     /api/items              ->  index
 * POST    /api/items              ->  create
 * GET     /api/items/:id          ->  show
 * PUT     /api/items/:id          ->  update
 * DELETE  /api/items/:id          ->  delete
 */

// Dependences Modules
var Items = require('./items.model');
var _ = require('lodash');
//index
exports.index = function(req, res) {

    if (req.body.itemName) {
        req.body.itemName = new RegExp('^' + req.body.itemName);
    }

    Items.find(req.body, function(err, data) {
        res.json(data);
    });
};

//create
exports.create = function(req, res) {


    var scene;
    switch(req.body.scene.name) {
        case '高級接待':
            scene = {
                name      : req.body.scene.name,
                luxury    : req.body.scene.value1,
                excitement: req.body.scene.value2,
                staff     : req.body.scene.value3,
                privacy   : req.body.scene.value4,
                invalid   : req.body.scene.value5
            };
            break;
        case '通常接待':
            scene = {
                name        : req.body.scene.name,
                menu        : req.body.scene.value1,
                privacy     : req.body.scene.value2,
                staff       : req.body.scene.value3,
                originality : req.body.scene.value4,
                cost        : req.body.scene.value5
            };
            break;
        case '社内利用':
        scene = {
            name   : req.body.scene.name,
            cost   : req.body.scene.value1,
            menu   : req.body.scene.value2,
            staff  : req.body.scene.value3,
            room   : req.body.scene.value4,
            access : req.body.scene.value5
        };
            break;
        case '家族利用':
        scene = {
            name     : req.body.scene.name,
            room     : req.body.scene.value1,
            menu     : req.body.scene.value2,
            staff    : req.body.scene.value3,
            children : req.body.scene.value4,
            old      : req.body.scene.value5
        };
            break;
        case 'お土産利用':
        scene = {
            name       : req.body.scene.name,
            cost       : req.body.scene.value1,
            rare       : req.body.scene.value2,
            goodDegree : req.body.scene.value3,
            package    : req.body.scene.value4,
            difficulty : req.body.scene.value5
        };
            break;
        case '一人利用':
        scene = {
            name       : req.body.scene.name,
            taste      : req.body.scene.value1,
            oneself    : req.body.scene.value2,
            menu       : req.body.scene.value3,
            utility    : req.body.scene.value4,
            goodDegree : req.body.scene.value5
        };
            break;
        case 'デート利用':
        scene = {
            name      : req.body.scene.name,
            interior  : req.body.scene.value1,
            atmosphere: req.body.scene.value2,
            staff     : req.body.scene.value3,
            privacy   : req.body.scene.value4,
            views     : req.body.scene.value5
        };
            break;
        default :
            break;
    }


    var newItem = new Items({
        itemName        : req.body.itemName,
        itemKana        : req.body.itemKana,
        itemBranch      : req.body.itemBranch,
        itemOtherName   : req.body.itemOtherName,
        itemTel         : req.body.itemTel,
        itemIntroduction: req.body.itemIntroduction,
        address         : req.body.address,
        genre           : req.body.genre,
        scene           : req.body.scene,
        created         : new Date(),
        modified        : new Date()
    });


    newItem.save(function(err) {
        if(err) {
            res.send('error');
        } else {
            res.json(newItem);
        }
    });
};

exports.update = function(req, res) {
    Items.findOne({_id: req.params._id}, function(err, data) {

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
    Items.remove({_id: req.params._id}, function(err) {
        if(err) {
            console.log('error');
        }
        Items.find({}, function(err, data) {
            res.json(data);
        });
    });
};
