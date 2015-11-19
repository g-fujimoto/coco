
var express    = require('express');
var controller = require('./items.controller');

var router     = express.Router();

// Routes

router.get('/', controller.index);

module.exports = router;
