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
var forEach = _angular.forEach;
var isObject = _angular.isObject;
var isNumber = _angular.isNumber;
var isDefined = _angular.isDefined;
var isArray = _angular.isArray;
var element = _angular.element;

exports.default = function (fileUploaderOptions, $rootScope, $http, $window, FileLikeObject, FileItem) {
    var File = $window.File;
    var FormData = $window.FormData;

    var FileUploader = function () {
        /**********************
         * PUBLIC
         **********************/
        /**
         * Creates an instance of FileUploader
         * @param {Object} [options]
         * @constructor
         */

        function FileUploader(options) {
            _classCallCheck(this, FileUploader);

            var settings = copy(fileUploaderOptions);

            extend(this, settings, options, {
                isUploading: false,
                _nextIndex: 0,
                _failFilterIndex: -1,
                _directives: { select: [], drop: [], over: [] }
            });

            // add default filters
            this.filters.unshift({ name: 'queueLimit', fn: this._queueLimitFilter });
            this.filters.unshift({ name: 'folder', fn: this._folderFilter });
        }
        /**
         * Adds items to the queue
         * @param {File|HTMLInputElement|Object|FileList|Array<Object>} files
         * @param {Object} [options]
         * @param {Array<Function>|String} filters
         */

        _createClass(FileUploader, [{
            key: 'addToQueue',
            value: function addToQueue(files, options, filters) {
                var _this = this;

                var list = this.isArrayLikeObject(files) ? files : [files];
                var arrayOfFilters = this._getFilters(filters);
                var count = this.queue.length;
                var addedFileItems = [];

                forEach(list, function (some /*{File|HTMLInputElement|Object}*/) {
                    var temp = new FileLikeObject(some);

                    if (_this._isValidFile(temp, arrayOfFilters, options)) {
                        var fileItem = new FileItem(_this, some, options);
                        addedFileItems.push(fileItem);
                        _this.queue.push(fileItem);
                        _this._onAfterAddingFile(fileItem);
                    } else {
                        var filter = arrayOfFilters[_this._failFilterIndex];
                        _this._onWhenAddingFileFailed(temp, filter, options);
                    }
                });

                if (this.queue.length !== count) {
                    this._onAfterAddingAll(addedFileItems);
                    this.progress = this._getTotalProgress();
                }

                this._render();
                if (this.autoUpload) this.uploadAll();
            }
            /**
             * Remove items from the queue. Remove last: index = -1
             * @param {FileItem|Number} value
             */

        }, {
            key: 'removeFromQueue',
            value: function removeFromQueue(value) {
                var index = this.getIndexOfItem(value);
                var item = this.queue[index];
                if (item.isUploading) item.cancel();
                this.queue.splice(index, 1);
                item._destroy();
                this.progress = this._getTotalProgress();
            }
            /**
             * Clears the queue
             */

        }, {
            key: 'clearQueue',
            value: function clearQueue() {
                while (this.queue.length) {
                    this.queue[0].remove();
                }
                this.progress = 0;
            }
            /**
             * Uploads a item from the queue
             * @param {FileItem|Number} value
             */

        }, {
            key: 'uploadItem',
            value: function uploadItem(value) {
                var index = this.getIndexOfItem(value);
                var item = this.queue[index];
                var transport = this.isHTML5 ? '_xhrTransport' : '_iframeTransport';

                item._prepareToUploading();
                if (this.isUploading) return;

                this.isUploading = true;
                this[transport](item);
            }
            /**
             * Cancels uploading of item from the queue
             * @param {FileItem|Number} value
             */

        }, {
            key: 'cancelItem',
            value: function cancelItem(value) {
                var index = this.getIndexOfItem(value);
                var item = this.queue[index];
                var prop = this.isHTML5 ? '_xhr' : '_form';
                if (item && item.isUploading) item[prop].abort();
            }
            /**
             * Uploads all not uploaded items of queue
             */

        }, {
            key: 'uploadAll',
            value: function uploadAll() {
                var items = this.getNotUploadedItems().filter(function (item) {
                    return !item.isUploading;
                });
                if (!items.length) return;

                forEach(items, function (item) {
                    return item._prepareToUploading();
                });
                items[0].upload();
            }
            /**
             * Cancels all uploads
             */

        }, {
            key: 'cancelAll',
            value: function cancelAll() {
                var items = this.getNotUploadedItems();
                forEach(items, function (item) {
                    return item.cancel();
                });
            }
            /**
             * Returns "true" if value an instance of File
             * @param {*} value
             * @returns {Boolean}
             * @private
             */

        }, {
            key: 'isFile',
            value: function isFile(value) {
                return this.constructor.isFile(value);
            }
            /**
             * Returns "true" if value an instance of FileLikeObject
             * @param {*} value
             * @returns {Boolean}
             * @private
             */

        }, {
            key: 'isFileLikeObject',
            value: function isFileLikeObject(value) {
                return this.constructor.isFileLikeObject(value);
            }
            /**
             * Returns "true" if value is array like object
             * @param {*} value
             * @returns {Boolean}
             */

        }, {
            key: 'isArrayLikeObject',
            value: function isArrayLikeObject(value) {
                return this.constructor.isArrayLikeObject(value);
            }
            /**
             * Returns a index of item from the queue
             * @param {Item|Number} value
             * @returns {Number}
             */

        }, {
            key: 'getIndexOfItem',
            value: function getIndexOfItem(value) {
                return isNumber(value) ? value : this.queue.indexOf(value);
            }
            /**
             * Returns not uploaded items
             * @returns {Array}
             */

        }, {
            key: 'getNotUploadedItems',
            value: function getNotUploadedItems() {
                return this.queue.filter(function (item) {
                    return !item.isUploaded;
                });
            }
            /**
             * Returns items ready for upload
             * @returns {Array}
             */

        }, {
            key: 'getReadyItems',
            value: function getReadyItems() {
                return this.queue.filter(function (item) {
                    return item.isReady && !item.isUploading;
                }).sort(function (item1, item2) {
                    return item1.index - item2.index;
                });
            }
            /**
             * Destroys instance of FileUploader
             */

        }, {
            key: 'destroy',
            value: function destroy() {
                var _this2 = this;

                forEach(this._directives, function (key) {
                    forEach(_this2._directives[key], function (object) {
                        object.destroy();
                    });
                });
            }
            /**
             * Callback
             * @param {Array} fileItems
             */

        }, {
            key: 'onAfterAddingAll',
            value: function onAfterAddingAll(fileItems) {}
            /**
             * Callback
             * @param {FileItem} fileItem
             */

        }, {
            key: 'onAfterAddingFile',
            value: function onAfterAddingFile(fileItem) {}
            /**
             * Callback
             * @param {File|Object} item
             * @param {Object} filter
             * @param {Object} options
             */

        }, {
            key: 'onWhenAddingFileFailed',
            value: function onWhenAddingFileFailed(item, filter, options) {}
            /**
             * Callback
             * @param {FileItem} fileItem
             */

        }, {
            key: 'onBeforeUploadItem',
            value: function onBeforeUploadItem(fileItem) {}
            /**
             * Callback
             * @param {FileItem} fileItem
             * @param {Number} progress
             */

        }, {
            key: 'onProgressItem',
            value: function onProgressItem(fileItem, progress) {}
            /**
             * Callback
             * @param {Number} progress
             */

        }, {
            key: 'onProgressAll',
            value: function onProgressAll(progress) {}
            /**
             * Callback
             * @param {FileItem} item
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             */

        }, {
            key: 'onSuccessItem',
            value: function onSuccessItem(item, response, status, headers) {}
            /**
             * Callback
             * @param {FileItem} item
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             */

        }, {
            key: 'onErrorItem',
            value: function onErrorItem(item, response, status, headers) {}
            /**
             * Callback
             * @param {FileItem} item
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             */

        }, {
            key: 'onCancelItem',
            value: function onCancelItem(item, response, status, headers) {}
            /**
             * Callback
             * @param {FileItem} item
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             */

        }, {
            key: 'onCompleteItem',
            value: function onCompleteItem(item, response, status, headers) {}
            /**
             * Callback
             */

        }, {
            key: 'onCompleteAll',
            value: function onCompleteAll() {}
            /**********************
             * PRIVATE
             **********************/
            /**
             * Returns the total progress
             * @param {Number} [value]
             * @returns {Number}
             * @private
             */

        }, {
            key: '_getTotalProgress',
            value: function _getTotalProgress(value) {
                if (this.removeAfterUpload) return value || 0;

                var notUploaded = this.getNotUploadedItems().length;
                var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
                var ratio = 100 / this.queue.length;
                var current = (value || 0) * ratio / 100;

                return Math.round(uploaded * ratio + current);
            }
            /**
             * Returns array of filters
             * @param {Array<Function>|String} filters
             * @returns {Array<Function>}
             * @private
             */

        }, {
            key: '_getFilters',
            value: function _getFilters(filters) {
                if (!filters) return this.filters;
                if (isArray(filters)) return filters;
                var names = filters.match(/[^\s,]+/g);
                return this.filters.filter(function (filter) {
                    return names.indexOf(filter.name) !== -1;
                });
            }
            /**
             * Updates html
             * @private
             */

        }, {
            key: '_render',
            value: function _render() {
                if (!$rootScope.$$phase) $rootScope.$apply();
            }
            /**
             * Returns "true" if item is a file (not folder)
             * @param {File|FileLikeObject} item
             * @returns {Boolean}
             * @private
             */

        }, {
            key: '_folderFilter',
            value: function _folderFilter(item) {
                return !!(item.size || item.type);
            }
            /**
             * Returns "true" if the limit has not been reached
             * @returns {Boolean}
             * @private
             */

        }, {
            key: '_queueLimitFilter',
            value: function _queueLimitFilter() {
                return this.queue.length < this.queueLimit;
            }
            /**
             * Returns "true" if file pass all filters
             * @param {File|Object} file
             * @param {Array<Function>} filters
             * @param {Object} options
             * @returns {Boolean}
             * @private
             */

        }, {
            key: '_isValidFile',
            value: function _isValidFile(file, filters, options) {
                var _this3 = this;

                this._failFilterIndex = -1;
                return !filters.length ? true : filters.every(function (filter) {
                    _this3._failFilterIndex++;
                    return filter.fn.call(_this3, file, options);
                });
            }
            /**
             * Checks whether upload successful
             * @param {Number} status
             * @returns {Boolean}
             * @private
             */

        }, {
            key: '_isSuccessCode',
            value: function _isSuccessCode(status) {
                return status >= 200 && status < 300 || status === 304;
            }
            /**
             * Transforms the server response
             * @param {*} response
             * @param {Object} headers
             * @returns {*}
             * @private
             */

        }, {
            key: '_transformResponse',
            value: function _transformResponse(response, headers) {
                var headersGetter = this._headersGetter(headers);
                forEach($http.defaults.transformResponse, function (transformFn) {
                    response = transformFn(response, headersGetter);
                });
                return response;
            }
            /**
             * Parsed response headers
             * @param headers
             * @returns {Object}
             * @see https://github.com/angular/angular.js/blob/master/src/ng/http.js
             * @private
             */

        }, {
            key: '_parseHeaders',
            value: function _parseHeaders(headers) {
                var parsed = {},
                    key,
                    val,
                    i;

                if (!headers) return parsed;

                forEach(headers.split('\n'), function (line) {
                    i = line.indexOf(':');
                    key = line.slice(0, i).trim().toLowerCase();
                    val = line.slice(i + 1).trim();

                    if (key) {
                        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
                    }
                });

                return parsed;
            }
            /**
             * Returns function that returns headers
             * @param {Object} parsedHeaders
             * @returns {Function}
             * @private
             */

        }, {
            key: '_headersGetter',
            value: function _headersGetter(parsedHeaders) {
                return function (name) {
                    if (name) {
                        return parsedHeaders[name.toLowerCase()] || null;
                    }
                    return parsedHeaders;
                };
            }
            /**
             * The XMLHttpRequest transport
             * @param {FileItem} item
             * @private
             */

        }, {
            key: '_xhrTransport',
            value: function _xhrTransport(item) {
                var _this4 = this;

                var xhr = item._xhr = new XMLHttpRequest();
                var form = new FormData();

                this._onBeforeUploadItem(item);

                forEach(item.formData, function (obj) {
                    forEach(obj, function (value, key) {
                        form.append(key, value);
                    });
                });

                if (typeof item._file.size != 'number') {
                    throw new TypeError('The file specified is no longer valid');
                }

                form.append(item.alias, item._file, item.file.name);

                xhr.upload.onprogress = function (event) {
                    var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
                    _this4._onProgressItem(item, progress);
                };

                xhr.onload = function () {
                    var headers = _this4._parseHeaders(xhr.getAllResponseHeaders());
                    var response = _this4._transformResponse(xhr.response, headers);
                    var gist = _this4._isSuccessCode(xhr.status) ? 'Success' : 'Error';
                    var method = '_on' + gist + 'Item';
                    _this4[method](item, response, xhr.status, headers);
                    _this4._onCompleteItem(item, response, xhr.status, headers);
                };

                xhr.onerror = function () {
                    var headers = _this4._parseHeaders(xhr.getAllResponseHeaders());
                    var response = _this4._transformResponse(xhr.response, headers);
                    _this4._onErrorItem(item, response, xhr.status, headers);
                    _this4._onCompleteItem(item, response, xhr.status, headers);
                };

                xhr.onabort = function () {
                    var headers = _this4._parseHeaders(xhr.getAllResponseHeaders());
                    var response = _this4._transformResponse(xhr.response, headers);
                    _this4._onCancelItem(item, response, xhr.status, headers);
                    _this4._onCompleteItem(item, response, xhr.status, headers);
                };

                xhr.open(item.method, item.url, true);

                xhr.withCredentials = item.withCredentials;

                forEach(item.headers, function (value, name) {
                    xhr.setRequestHeader(name, value);
                });

                xhr.send(form);
                this._render();
            }
            /**
             * The IFrame transport
             * @param {FileItem} item
             * @private
             */

        }, {
            key: '_iframeTransport',
            value: function _iframeTransport(item) {
                var _this5 = this;

                var form = element('<form style="display: none;" />');
                var iframe = element('<iframe name="iframeTransport' + Date.now() + '">');
                var input = item._input;

                if (item._form) item._form.replaceWith(input); // remove old form
                item._form = form; // save link to new form

                this._onBeforeUploadItem(item);

                input.prop('name', item.alias);

                forEach(item.formData, function (obj) {
                    forEach(obj, function (value, key) {
                        var element_ = element('<input type="hidden" name="' + key + '" />');
                        element_.val(value);
                        form.append(element_);
                    });
                });

                form.prop({
                    action: item.url,
                    method: 'POST',
                    target: iframe.prop('name'),
                    enctype: 'multipart/form-data',
                    encoding: 'multipart/form-data' // old IE
                });

                iframe.bind('load', function () {
                    var html = '';
                    var status = 200;

                    try {
                        // Fix for legacy IE browsers that loads internal error page
                        // when failed WS response received. In consequence iframe
                        // content access denied error is thrown becouse trying to
                        // access cross domain page. When such thing occurs notifying
                        // with empty response object. See more info at:
                        // http://stackoverflow.com/questions/151362/access-is-denied-error-on-accessing-iframe-document-object
                        // Note that if non standard 4xx or 5xx error code returned
                        // from WS then response content can be accessed without error
                        // but 'XHR' status becomes 200. In order to avoid confusion
                        // returning response via same 'success' event handler.

                        // fixed angular.contents() for iframes
                        html = iframe[0].contentDocument.body.innerHTML;
                    } catch (e) {
                        // in case we run into the access-is-denied error or we have another error on the server side
                        // (intentional 500,40... errors), we at least say 'something went wrong' -> 500
                        status = 500;
                    }

                    var xhr = { response: html, status: status, dummy: true };
                    var headers = {};
                    var response = _this5._transformResponse(xhr.response, headers);

                    _this5._onSuccessItem(item, response, xhr.status, headers);
                    _this5._onCompleteItem(item, response, xhr.status, headers);
                });

                form.abort = function () {
                    var xhr = { status: 0, dummy: true };
                    var headers = {};
                    var response;

                    iframe.unbind('load').prop('src', 'javascript:false;');
                    form.replaceWith(input);

                    _this5._onCancelItem(item, response, xhr.status, headers);
                    _this5._onCompleteItem(item, response, xhr.status, headers);
                };

                input.after(form);
                form.append(input).append(iframe);

                form[0].submit();
                this._render();
            }
            /**
             * Inner callback
             * @param {File|Object} item
             * @param {Object} filter
             * @param {Object} options
             * @private
             */

        }, {
            key: '_onWhenAddingFileFailed',
            value: function _onWhenAddingFileFailed(item, filter, options) {
                this.onWhenAddingFileFailed(item, filter, options);
            }
            /**
             * Inner callback
             * @param {FileItem} item
             */

        }, {
            key: '_onAfterAddingFile',
            value: function _onAfterAddingFile(item) {
                this.onAfterAddingFile(item);
            }
            /**
             * Inner callback
             * @param {Array<FileItem>} items
             */

        }, {
            key: '_onAfterAddingAll',
            value: function _onAfterAddingAll(items) {
                this.onAfterAddingAll(items);
            }
            /**
             *  Inner callback
             * @param {FileItem} item
             * @private
             */

        }, {
            key: '_onBeforeUploadItem',
            value: function _onBeforeUploadItem(item) {
                item._onBeforeUpload();
                this.onBeforeUploadItem(item);
            }
            /**
             * Inner callback
             * @param {FileItem} item
             * @param {Number} progress
             * @private
             */

        }, {
            key: '_onProgressItem',
            value: function _onProgressItem(item, progress) {
                var total = this._getTotalProgress(progress);
                this.progress = total;
                item._onProgress(progress);
                this.onProgressItem(item, progress);
                this.onProgressAll(total);
                this._render();
            }
            /**
             * Inner callback
             * @param {FileItem} item
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             * @private
             */

        }, {
            key: '_onSuccessItem',
            value: function _onSuccessItem(item, response, status, headers) {
                item._onSuccess(response, status, headers);
                this.onSuccessItem(item, response, status, headers);
            }
            /**
             * Inner callback
             * @param {FileItem} item
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             * @private
             */

        }, {
            key: '_onErrorItem',
            value: function _onErrorItem(item, response, status, headers) {
                item._onError(response, status, headers);
                this.onErrorItem(item, response, status, headers);
            }
            /**
             * Inner callback
             * @param {FileItem} item
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             * @private
             */

        }, {
            key: '_onCancelItem',
            value: function _onCancelItem(item, response, status, headers) {
                item._onCancel(response, status, headers);
                this.onCancelItem(item, response, status, headers);
            }
            /**
             * Inner callback
             * @param {FileItem} item
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             * @private
             */

        }, {
            key: '_onCompleteItem',
            value: function _onCompleteItem(item, response, status, headers) {
                item._onComplete(response, status, headers);
                this.onCompleteItem(item, response, status, headers);

                var nextItem = this.getReadyItems()[0];
                this.isUploading = false;

                if (isDefined(nextItem)) {
                    nextItem.upload();
                    return;
                }

                this.onCompleteAll();
                this.progress = this._getTotalProgress();
                this._render();
            }
            /**********************
             * STATIC
             **********************/
            /**
             * Returns "true" if value an instance of File
             * @param {*} value
             * @returns {Boolean}
             * @private
             */

        }], [{
            key: 'isFile',
            value: function isFile(value) {
                return File && value instanceof File;
            }
            /**
             * Returns "true" if value an instance of FileLikeObject
             * @param {*} value
             * @returns {Boolean}
             * @private
             */

        }, {
            key: 'isFileLikeObject',
            value: function isFileLikeObject(value) {
                return value instanceof FileLikeObject;
            }
            /**
             * Returns "true" if value is array like object
             * @param {*} value
             * @returns {Boolean}
             */

        }, {
            key: 'isArrayLikeObject',
            value: function isArrayLikeObject(value) {
                return isObject(value) && 'length' in value;
            }
            /**
             * Inherits a target (Class_1) by a source (Class_2)
             * @param {Function} target
             * @param {Function} source
             */

        }, {
            key: 'inherit',
            value: function inherit(target, source) {
                target.prototype = Object.create(source.prototype);
                target.prototype.constructor = target;
                target.super_ = source;
            }
        }]);

        return FileUploader;
    }();

    /**********************
     * PUBLIC
     **********************/
    /**
     * Checks a support the html5 uploader
     * @returns {Boolean}
     * @readonly
     */

    FileUploader.prototype.isHTML5 = !!(File && FormData);
    /**********************
     * STATIC
     **********************/
    /**
     * @borrows FileUploader.prototype.isHTML5
     */
    FileUploader.isHTML5 = FileUploader.prototype.isHTML5;

    return FileUploader;
};

module.exports.$inject = ['fileUploaderOptions', '$rootScope', '$http', '$window', 'FileLikeObject', 'FileItem'];