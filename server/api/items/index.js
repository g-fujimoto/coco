
var express    = require('express');
var controller = require('./items.controller');

var router     = express.Router();

// Routes

router.get('/', controller.index);
router.post('/find', controller.index);
router.post('/', controller.create);

module.exports = router;
