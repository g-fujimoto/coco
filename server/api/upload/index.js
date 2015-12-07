// モジュールの依存関係を取得
var express = require('express');
var controller = require('./upload.controller');

//Stores専用ルーティングオブジェクトの作成
var router = express.Router();

//ルーティング処理
router.post('/', controller.create);
router.post('/user', controller.userimg);
router.post('/', controller.create);
router.delete('/:_id', controller.destroy);

module.exports = router;
