
var express    = require('express');
var controller = require('./recommend.controller');

var router     = express.Router();

// Routes

router.post('/add', controller.add);
router.post('/delete', controller.delete);
router.post('/userRecommend', controller.userRecommend);

module.exports = router;
