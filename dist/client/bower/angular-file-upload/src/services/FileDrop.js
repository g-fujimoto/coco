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
var forEach = _angular.forEach;

exports.default = function (FileDirective) {
    var FileDrop = function (_FileDirective) {
        _inherits(FileDrop, _FileDirective);

        /**
         * Creates instance of {FileDrop} object
         * @param {Object} options
         * @constructor
         */

        function FileDrop(options) {
            _classCallCheck(this, FileDrop);

            var extendedOptions = extend(options, {
                // Map of events
                events: {
                    $destroy: 'destroy',
                    drop: 'onDrop',
                    dragover: 'onDragOver',
                    dragleave: 'onDragLeave'
                },
                // Name of property inside uploader._directive object
                prop: 'drop'
            });

            return _possibleConstructorReturn(this, Object.getPrototypeOf(FileDrop).call(this, extendedOptions));
        }
        /**
         * Returns options
         * @return {Object|undefined}
         */

        _createClass(FileDrop, [{
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
             * Event handler
             */

        }, {
            key: 'onDrop',
            value: function onDrop(event) {
                var transfer = this._getTransfer(event);
                if (!transfer) return;
                var options = this.getOptions();
                var filters = this.getFilters();
                this._preventAndStop(event);
                forEach(this.uploader._directives.over, this._removeOverClass, this);
                this.uploader.addToQueue(transfer.files, options, filters);
            }
            /**
             * Event handler
             */

        }, {
            key: 'onDragOver',
            value: function onDragOver(event) {
                var transfer = this._getTransfer(event);
                if (!this._haveFiles(transfer.types)) return;
                transfer.dropEffect = 'copy';
                this._preventAndStop(event);
                forEach(this.uploader._directives.over, this._addOverClass, this);
            }
            /**
             * Event handler
             */

        }, {
            key: 'onDragLeave',
            value: function onDragLeave(event) {
                if (event.currentTarget === this.element[0]) return;
                this._preventAndStop(event);
                forEach(this.uploader._directives.over, this._removeOverClass, this);
            }
            /**
             * Helper
             */

        }, {
            key: '_getTransfer',
            value: function _getTransfer(event) {
                return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
            }
            /**
             * Helper
             */

        }, {
            key: '_preventAndStop',
            value: function _preventAndStop(event) {
                event.preventDefault();
                event.stopPropagation();
            }
            /**
             * Returns "true" if types contains files
             * @param {Object} types
             */

        }, {
            key: '_haveFiles',
            value: function _haveFiles(types) {
                if (!types) return false;
                if (types.indexOf) {
                    return types.indexOf('Files') !== -1;
                } else if (types.contains) {
                    return types.contains('Files');
                } else {
                    return false;
                }
            }
            /**
             * Callback
             */

        }, {
            key: '_addOverClass',
            value: function _addOverClass(item) {
                item.addOverClass();
            }
            /**
             * Callback
             */

        }, {
            key: '_removeOverClass',
            value: function _removeOverClass(item) {
                item.removeOverClass();
            }
        }]);

        return FileDrop;
    }(FileDirective);

    return FileDrop;
};

module.exports.$inject = ['FileDirective'];