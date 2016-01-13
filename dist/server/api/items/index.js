
var express    = require('express');
var controller = require('./items.controller');

var router     = express.Router();

// Routes

router.get('/', controller.index);
router.post('/find', controller.index);
router.post('/fiximage', controller.fiximage);
router.get('/findOne/:_id', controller.findOne);
router.post('/', controller.create);
router.delete('/:_id', controller.delete);
router.put('/:_id', controller.update);
router.post('/recommend_item', controller.recommend_item);

module.exports = router;
