
var express    = require('express');
var controller = require('./items.controller');

var router     = express.Router();

// Routes

router.get('/', controller.index);
router.post('/', controller.create);
router.delete('/:id', controller.delete);
router.put('/:id', controller.update);

module.exports = router;
