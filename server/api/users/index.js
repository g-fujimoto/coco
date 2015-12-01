
var express    = require('express');
var controller = require('./users.controller');

var router     = express.Router();

// Routes

router.get('/', controller.index);
router.get('/:_id', controller.get);
router.post('/', controller.create);
router.delete('/:_id', controller.delete);
router.put('/:_id', controller.update);

router.post('/login', controller.login);

module.exports = router;
