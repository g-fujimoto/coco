
var express    = require('express');
var controller = require('./comments.controller');

var router     = express.Router();

// Routes

router.get('/', controller.index);
router.get('/:_id', controller.get);
router.post('/', controller.save);
router.delete('/:_id', controller.delete);
router.put('/:_id', controller.update);

router.post('/find', controller.index);
router.post('/getByItemID', controller.getByItemID);
router.post('/went', controller.went);
router.post('/wantGo', controller.wantGo);
router.post('/went_items', controller.went_items);

module.exports = router;
