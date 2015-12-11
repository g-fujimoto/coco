
var express    = require('express');
var controller = require('./items.controller');

var router     = express.Router();

// Routes

router.get('/', controller.index);
router.post('/find', controller.index);
router.get('/findOne/:_id', controller.findOne);
router.post('/', controller.create);
router.delete('/:_id', controller.delete);
router.put('/:_id', controller.update);
router.put('/recommendItem', controller.recommendItem);

module.exports = router;
