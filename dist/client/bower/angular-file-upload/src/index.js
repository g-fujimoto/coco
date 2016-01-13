'use strict';

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _options = require('./values/options');

var _options2 = _interopRequireDefault(_options);

var _FileUploader = require('./services/FileUploader');

var _FileUploader2 = _interopRequireDefault(_FileUploader);

var _FileLikeObject = require('./services/FileLikeObject');

var _FileLikeObject2 = _interopRequireDefault(_FileLikeObject);

var _FileItem = require('./services/FileItem');

var _FileItem2 = _interopRequireDefault(_FileItem);

var _FileDirective = require('./services/FileDirective');

var _FileDirective2 = _interopRequireDefault(_FileDirective);

var _FileSelect = require('./services/FileSelect');

var _FileSelect2 = _interopRequireDefault(_FileSelect);

var _FileDrop = require('./services/FileDrop');

var _FileDrop2 = _interopRequireDefault(_FileDrop);

var _FileOver = require('./services/FileOver');

var _FileOver2 = _interopRequireDefault(_FileOver);

var _FileSelect3 = require('./directives/FileSelect');

var _FileSelect4 = _interopRequireDefault(_FileSelect3);

var _FileDrop3 = require('./directives/FileDrop');

var _FileDrop4 = _interopRequireDefault(_FileDrop3);

var _FileOver3 = require('./directives/FileOver');

var _FileOver4 = _interopRequireDefault(_FileOver3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module(_config2.default.name, []).value('fileUploaderOptions', _options2.default).factory('FileUploader', _FileUploader2.default).factory('FileLikeObject', _FileLikeObject2.default).factory('FileItem', _FileItem2.default).factory('FileDirective', _FileDirective2.default).factory('FileSelect', _FileSelect2.default).factory('FileDrop', _FileDrop2.default).factory('FileOver', _FileOver2.default).directive('nvFileSelect', _FileSelect4.default).directive('nvFileDrop', _FileDrop4.default).directive('nvFileOver', _FileOver4.default).run(['FileUploader', 'FileLikeObject', 'FileItem', 'FileDirective', 'FileSelect', 'FileDrop', 'FileOver', function (FileUploader, FileLikeObject, FileItem, FileDirective, FileSelect, FileDrop, FileOver) {
    // only for compatibility
    FileUploader.FileLikeObject = FileLikeObject;
    FileUploader.FileItem = FileItem;
    FileUploader.FileDirective = FileDirective;
    FileUploader.FileSelect = FileSelect;
    FileUploader.FileDrop = FileDrop;
    FileUploader.FileOver = FileOver;
}]);