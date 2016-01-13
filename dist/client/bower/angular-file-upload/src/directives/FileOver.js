'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('./../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (FileUploader, FileOver) {

    return {
        link: function link(scope, element, attributes) {
            var uploader = scope.$eval(attributes.uploader);

            if (!(uploader instanceof FileUploader)) {
                throw new TypeError('"Uploader" must be an instance of FileUploader');
            }

            var object = new FileOver({
                uploader: uploader,
                element: element
            });

            object.getOverClass = function () {
                return attributes.overClass || object.overClass;
            };
        }
    };
};

module.exports.$inject = ['FileUploader', 'FileOver'];