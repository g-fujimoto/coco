'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('./../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _angular = angular;
var copy = _angular.copy;
var isElement = _angular.isElement;
var isString = _angular.isString;

exports.default = function () {
    var FileLikeObject = function () {
        /**
         * Creates an instance of FileLikeObject
         * @param {File|HTMLInputElement|Object} fileOrInput
         * @constructor
         */

        function FileLikeObject(fileOrInput) {
            _classCallCheck(this, FileLikeObject);

            var isInput = isElement(fileOrInput);
            var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
            var postfix = isString(fakePathOrObject) ? 'FakePath' : 'Object';
            var method = '_createFrom' + postfix;
            this[method](fakePathOrObject);
        }
        /**
         * Creates file like object from fake path string
         * @param {String} path
         * @private
         */

        _createClass(FileLikeObject, [{
            key: '_createFromFakePath',
            value: function _createFromFakePath(path) {
                this.lastModifiedDate = null;
                this.size = null;
                this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
                this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
            }
            /**
             * Creates file like object from object
             * @param {File|FileLikeObject} object
             * @private
             */

        }, {
            key: '_createFromObject',
            value: function _createFromObject(object) {
                this.lastModifiedDate = copy(object.lastModifiedDate);
                this.size = object.size;
                this.type = object.type;
                this.name = object.name;
            }
        }]);

        return FileLikeObject;
    }();

    return FileLikeObject;
};

module.exports.$inject = [];