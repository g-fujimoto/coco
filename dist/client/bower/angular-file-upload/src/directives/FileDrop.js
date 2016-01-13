'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('./../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function ($parse, FileUploader, FileDrop) {

    return {
        link: function link(scope, element, attributes) {
            var uploader = scope.$eval(attributes.uploader);

            if (!(uploader instanceof FileUploader)) {
                throw new TypeError('"Uploader" must be an instance of FileUploader');
            }

            if (!uploader.isHTML5) return;

            var object = new FileDrop({
                uploader: uploader,
                element: element
            });

            object.getOptions = $parse(attributes.options).bind(object, scope);
            object.getFilters = function () {
                return attributes.filters;
            };
        }
    };
};

module.exports.$inject = ['$parse', 'FileUploader', 'FileDrop'];