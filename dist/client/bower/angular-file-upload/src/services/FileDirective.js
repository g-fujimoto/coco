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
var extend = _angular.extend;

exports.default = function () {
    var FileDirective = function () {
        /**
         * Creates instance of {FileDirective} object
         * @param {Object} options
         * @param {Object} options.uploader
         * @param {HTMLElement} options.element
         * @param {Object} options.events
         * @param {String} options.prop
         * @constructor
         */

        function FileDirective(options) {
            _classCallCheck(this, FileDirective);

            extend(this, options);
            this.uploader._directives[this.prop].push(this);
            this._saveLinks();
            this.bind();
        }
        /**
         * Binds events handles
         */

        _createClass(FileDirective, [{
            key: 'bind',
            value: function bind() {
                for (var key in this.events) {
                    var prop = this.events[key];
                    this.element.bind(key, this[prop]);
                }
            }
            /**
             * Unbinds events handles
             */

        }, {
            key: 'unbind',
            value: function unbind() {
                for (var key in this.events) {
                    this.element.unbind(key, this.events[key]);
                }
            }
            /**
             * Destroys directive
             */

        }, {
            key: 'destroy',
            value: function destroy() {
                var index = this.uploader._directives[this.prop].indexOf(this);
                this.uploader._directives[this.prop].splice(index, 1);
                this.unbind();
                // this.element = null;
            }
            /**
             * Saves links to functions
             * @private
             */

        }, {
            key: '_saveLinks',
            value: function _saveLinks() {
                for (var key in this.events) {
                    var prop = this.events[key];
                    this[prop] = this[prop].bind(this);
                }
            }
        }]);

        return FileDirective;
    }();

    /**
     * Map of events
     * @type {Object}
     */

    FileDirective.prototype.events = {};

    return FileDirective;
};

module.exports.$inject = [];