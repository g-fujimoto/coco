
var express    = require('express');
var controller = require('./itemComments.controller');

var router     = express.Router();

// Routes

router.get('/', controller.index);
router.post('/', controller.create);

module.exports = router;
