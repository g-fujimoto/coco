// Dependences Modules
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var ItemCommentsSchema = mongoose.Schema({
    userId          : String,
    itemId          : String,
    commentTitle    : String,
    commentBody     : String,
    sceneRate       : String,
    genreRate       : String,
    created         : String,
    images          : [Object],
    commentLikes    : [Object],
    modified        : String
});

ItemCommentsSchema.plugin(autoIncrement.plugin, {model: 'ItemComments', field: '_id'});

module.exports = mongoose.model('ItemComments', ItemCommentsSchema);
