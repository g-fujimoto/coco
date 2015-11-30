
var express    = require('express');
var controller = require('./comments.controller');

var router     = express.Router();

// Routes

router.get('/', controller.index);
router.get('/:_id', controller.get);
router.post('/find', controller.index);
router.post('/', controller.create);
router.delete('/:_id', controller.delete);
router.put('/:_id', controller.update);

module.exports = router;
