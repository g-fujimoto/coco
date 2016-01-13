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
var extend = _angular.extend;
var element = _angular.element;
var isElement = _angular.isElement;

exports.default = function ($compile, FileLikeObject) {
    var FileItem = function () {
        /**
         * Creates an instance of FileItem
         * @param {FileUploader} uploader
         * @param {File|HTMLInputElement|Object} some
         * @param {Object} options
         * @constructor
         */

        function FileItem(uploader, some, options) {
            _classCallCheck(this, FileItem);

            var isInput = isElement(some);
            var input = isInput ? element(some) : null;
            var file = !isInput ? some : null;

            extend(this, {
                url: uploader.url,
                alias: uploader.alias,
                headers: copy(uploader.headers),
                formData: copy(uploader.formData),
                removeAfterUpload: uploader.removeAfterUpload,
                withCredentials: uploader.withCredentials,
                method: uploader.method
            }, options, {
                uploader: uploader,
                file: new FileLikeObject(some),
                isReady: false,
                isUploading: false,
                isUploaded: false,
                isSuccess: false,
                isCancel: false,
                isError: false,
                progress: 0,
                index: null,
                _file: file,
                _input: input
            });

            if (input) this._replaceNode(input);
        }
        /**********************
         * PUBLIC
         **********************/
        /**
         * Uploads a FileItem
         */

        _createClass(FileItem, [{
            key: 'upload',
            value: function upload() {
                try {
                    this.uploader.uploadItem(this);
                } catch (e) {
                    this.uploader._onCompleteItem(this, '', 0, []);
                    this.uploader._onErrorItem(this, '', 0, []);
                }
            }
            /**
             * Cancels uploading of FileItem
             */

        }, {
            key: 'cancel',
            value: function cancel() {
                this.uploader.cancelItem(this);
            }
            /**
             * Removes a FileItem
             */

        }, {
            key: 'remove',
            value: function remove() {
                this.uploader.removeFromQueue(this);
            }
            /**
             * Callback
             * @private
             */

        }, {
            key: 'onBeforeUpload',
            value: function onBeforeUpload() {}
            /**
             * Callback
             * @param {Number} progress
             * @private
             */

        }, {
            key: 'onProgress',
            value: function onProgress(progress) {}
            /**
             * Callback
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             */

        }, {
            key: 'onSuccess',
            value: function onSuccess(response, status, headers) {}
            /**
             * Callback
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             */

        }, {
            key: 'onError',
            value: function onError(response, status, headers) {}
            /**
             * Callback
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             */

        }, {
            key: 'onCancel',
            value: function onCancel(response, status, headers) {}
            /**
             * Callback
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             */

        }, {
            key: 'onComplete',
            value: function onComplete(response, status, headers) {}
            /**********************
             * PRIVATE
             **********************/
            /**
             * Inner callback
             */

        }, {
            key: '_onBeforeUpload',
            value: function _onBeforeUpload() {
                this.isReady = true;
                this.isUploading = true;
                this.isUploaded = false;
                this.isSuccess = false;
                this.isCancel = false;
                this.isError = false;
                this.progress = 0;
                this.onBeforeUpload();
            }
            /**
             * Inner callback
             * @param {Number} progress
             * @private
             */

        }, {
            key: '_onProgress',
            value: function _onProgress(progress) {
                this.progress = progress;
                this.onProgress(progress);
            }
            /**
             * Inner callback
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             * @private
             */

        }, {
            key: '_onSuccess',
            value: function _onSuccess(response, status, headers) {
                this.isReady = false;
                this.isUploading = false;
                this.isUploaded = true;
                this.isSuccess = true;
                this.isCancel = false;
                this.isError = false;
                this.progress = 100;
                this.index = null;
                this.onSuccess(response, status, headers);
            }
            /**
             * Inner callback
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             * @private
             */

        }, {
            key: '_onError',
            value: function _onError(response, status, headers) {
                this.isReady = false;
                this.isUploading = false;
                this.isUploaded = true;
                this.isSuccess = false;
                this.isCancel = false;
                this.isError = true;
                this.progress = 0;
                this.index = null;
                this.onError(response, status, headers);
            }
            /**
             * Inner callback
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             * @private
             */

        }, {
            key: '_onCancel',
            value: function _onCancel(response, status, headers) {
                this.isReady = false;
                this.isUploading = false;
                this.isUploaded = false;
                this.isSuccess = false;
                this.isCancel = true;
                this.isError = false;
                this.progress = 0;
                this.index = null;
                this.onCancel(response, status, headers);
            }
            /**
             * Inner callback
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             * @private
             */

        }, {
            key: '_onComplete',
            value: function _onComplete(response, status, headers) {
                this.onComplete(response, status, headers);
                if (this.removeAfterUpload) this.remove();
            }
            /**
             * Destroys a FileItem
             */

        }, {
            key: '_destroy',
            value: function _destroy() {
                if (this._input) this._input.remove();
                if (this._form) this._form.remove();
                delete this._form;
                delete this._input;
            }
            /**
             * Prepares to uploading
             * @private
             */

        }, {
            key: '_prepareToUploading',
            value: function _prepareToUploading() {
                this.index = this.index || ++this.uploader._nextIndex;
                this.isReady = true;
            }
            /**
             * Replaces input element on his clone
             * @param {JQLite|jQuery} input
             * @private
             */

        }, {
            key: '_replaceNode',
            value: function _replaceNode(input) {
                var clone = $compile(input.clone())(input.scope());
                clone.prop('value', null); // FF fix
                input.css('display', 'none');
                input.after(clone); // remove jquery dependency
            }
        }]);

        return FileItem;
    }();

    return FileItem;
};

module.exports.$inject = ['$compile', 'FileLikeObject'];