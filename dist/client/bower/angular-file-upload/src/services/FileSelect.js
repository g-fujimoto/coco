'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('./../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _angular = angular;
var extend = _angular.extend;

exports.default = function (FileDirective) {
    var FileSelect = function (_FileDirective) {
        _inherits(FileSelect, _FileDirective);

        /**
         * Creates instance of {FileSelect} object
         * @param {Object} options
         * @constructor
         */

        function FileSelect(options) {
            _classCallCheck(this, FileSelect);

            var extendedOptions = extend(options, {
                // Map of events
                events: {
                    $destroy: 'destroy',
                    change: 'onChange'
                },
                // Name of property inside uploader._directive object
                prop: 'select'
            });

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FileSelect).call(this, extendedOptions));

            if (!_this.uploader.isHTML5) {
                _this.element.removeAttr('multiple');
            }
            _this.element.prop('value', null); // FF fix
            return _this;
        }
        /**
         * Returns options
         * @return {Object|undefined}
         */

        _createClass(FileSelect, [{
            key: 'getOptions',
            value: function getOptions() {}
            /**
             * Returns filters
             * @return {Array<Function>|String|undefined}
             */

        }, {
            key: 'getFilters',
            value: function getFilters() {}
            /**
             * If returns "true" then HTMLInputElement will be cleared
             * @returns {Boolean}
             */

        }, {
            key: 'isEmptyAfterSelection',
            value: function isEmptyAfterSelection() {
                return !!this.element.attr('multiple');
            }
            /**
             * Event handler
             */

        }, {
            key: 'onChange',
            value: function onChange() {
                var files = this.uploader.isHTML5 ? this.element[0].files : this.element[0];
                var options = this.getOptions();
                var filters = this.getFilters();

                if (!this.uploader.isHTML5) this.destroy();
                this.uploader.addToQueue(files, options, filters);
                if (this.isEmptyAfterSelection()) {
                    this.element.prop('value', null);
                    this.element.replaceWith(this.element = this.element.clone(true)); // IE fix
                }
            }
        }]);

        return FileSelect;
    }(FileDirective);

    return FileSelect;
};

module.exports.$inject = ['FileDirective'];