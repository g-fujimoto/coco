// Dependences Modules
var ItemsComments = require('./itemComments.model');

//index
exports.index = function(req, res) {
    ItemsComments.find({}, function(err, data) {

        console.log(data);
        console.log(err);
        res.json(data);
    });
};

//create
exports.create = function(req, res) {

};
