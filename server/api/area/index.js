<<<<<<< HEAD

=======
>>>>>>> 7c9c3b70045532e63e46fb6716b8b8a4b1c9d2ea
var express    = require('express');
var controller = require('./area.controller');

var router     = express.Router();

// Routes

router.get('/', controller.index);
<<<<<<< HEAD
router.post('/find', controller.index);
=======
>>>>>>> 7c9c3b70045532e63e46fb6716b8b8a4b1c9d2ea
router.post('/', controller.create);
router.delete('/:_id', controller.delete);
router.put('/:_id', controller.update);

module.exports = router;
