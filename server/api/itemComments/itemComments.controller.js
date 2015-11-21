// Dependences Modules
var ItemsComments = require('./itemComments.model');

//index
exports.index = function(req, res) {
    ItemsComments.find({}, function(err, data) {

      // 擬似的に、1秒間ウェイト
      var time = new Date().getTime();
      while (new Date().getTime() < time + 2000);

        console.log(data);
        console.log(err);
        res.json(data);
    });
};

//create
exports.create = function(req, res) {

};
