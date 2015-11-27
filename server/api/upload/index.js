// モジュールの依存関係を取得
var express = require('express');
var controller = require('./upload.controller');

//Stores専用ルーティングオブジェクトの作成
var router = express.Router();

//ルーティング処理
router.get('/', controller.index);
router.post('/', controller.create);
router.put('/:_id', controller.update);
router.delete('/:_id', controller.destroy);

module.exports = router;
