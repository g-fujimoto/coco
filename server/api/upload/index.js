// モジュールの依存関係を取得
var express = require('express');
var controller = require('./upload.controller');
//Stores専用ルーティングオブジェクトの作成
var router = express.Router();
//ルーティング処理
router.post('/user', controller.user);
router.post('/comment', controller.comment);
router.post('/item', controller.item);
module.exports = router;
