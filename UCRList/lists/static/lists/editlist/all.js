/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _controllers_module_name = __webpack_require__(1);
	
	var _controllers_module_name2 = _interopRequireDefault(_controllers_module_name);
	
	'use strict';
	
	angular.module('app', ['ngRoute', 'ngSanitize', 'ngMessages', 'ui.bootstrap', 'ngTagsInput', _controllers_module_name2['default']]).config(AppRouter).config(SetCSFR);
	
	AppRouter.$inject = ['$routeProvider'];
	function AppRouter($routeProvider) {
	    $routeProvider.when('/', {
	        templateUrl: 'templates/list.html',
	        controller: 'ListController',
	        controllerAs: 'vm',
	        resolve: {
	            load: LoadList }
	    }).when('/item/:number', {
	        templateUrl: 'templates/item.html',
	        controller: 'ItemController',
	        controllerAs: 'vm',
	        resolve: {
	            load: NewListOnRefresh } }).when('/confirm', {
	        templateUrl: 'templates/confirm.html',
	        controller: 'ConfirmController',
	        controllerAs: 'vm',
	        resolve: {
	            load: NewListOnRefresh } });
	}
	
	SetCSFR.$inject = ['$httpProvider'];
	function SetCSFR($httpProvider) {
	    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
	    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	}
	
	NewListOnRefresh.$inject = ['$q', '$location', 'list'];
	function NewListOnRefresh($q, $location, list) {
	    var deferred = $q.defer();
	    deferred.resolve();
	    if (list.title() === '') {
	        //logic is if the list has no title, then
	        //the page must have been manually refreshed
	        $location.path('/');
	    }
	}
	
	LoadList.$inject = ['$q', '$http', '$location', 'list'];
	function LoadList($q, $http, $location, list) {
	    var deferred = $q.defer();
	
	    var slug_with_hash = $location.absUrl().split('edit/')[1];
	    var slug = slug_with_hash.substring(0, slug_with_hash.length - 2);
	
	    $http.get('/lists/json/' + slug).then(function (response) {
	        list.reset();
	        var list_data = response.data;
	        list.title(list_data.title);
	        list.capacity(list_data.number);
	        list.slug(slug);
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = list_data.tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var tag_id = _step.value;
	
	                list.addTagById(tag_id);
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator['return']) {
	                    _iterator['return']();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;
	
	        try {
	            for (var _iterator2 = list_data.list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                var item = _step2.value;
	
	                var _item = list.newItem(item.title, item.description_meta);
	                list.push(_item);
	            }
	        } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
	                    _iterator2['return']();
	                }
	            } finally {
	                if (_didIteratorError2) {
	                    throw _iteratorError2;
	                }
	            }
	        }
	
	        deferred.resolve();
	    }, deferred.reject);
	
	    return deferred.promise;
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _ListController = __webpack_require__(2);
	
	var _ListController2 = _interopRequireDefault(_ListController);
	
	var _ItemController = __webpack_require__(3);
	
	var _ItemController2 = _interopRequireDefault(_ItemController);
	
	var _ConfirmController = __webpack_require__(4);
	
	var _ConfirmController2 = _interopRequireDefault(_ConfirmController);
	
	var _services_module_name = __webpack_require__(5);
	
	var _services_module_name2 = _interopRequireDefault(_services_module_name);
	
	'use strict';
	
	var controllers_module_name = 'app.controllers';
	
	angular.module(controllers_module_name, [_services_module_name2['default']]).controller('ListController', _ListController2['default']).controller('ItemController', _ItemController2['default']).controller('ConfirmController', _ConfirmController2['default']);
	
	exports['default'] = controllers_module_name;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var ListController = (function () {
	    function ListController($location, list) {
	        _classCallCheck(this, ListController);
	
	        this.$location = $location;
	        this.list = list;
	
	        this.top_n = this.list.capacity();
	        this.list_title = this.list.title();
	        this.tags = this.list.tags();
	    }
	
	    _createClass(ListController, [{
	        key: 'possible_tags',
	        value: function possible_tags(query) {
	            return this.list.possibleTags();
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            this.list.clearTags();
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = this.tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var tag = _step.value;
	
	                    this.list.addTag(tag);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator['return']) {
	                        _iterator['return']();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            this.list.title(this.list_title);
	            this.list.capacity(this.top_n);
	            this.$location.path('/item/1');
	        }
	    }]);
	
	    return ListController;
	})();
	
	ListController.$inject = ['$location', 'list'];
	exports['default'] = ListController;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var ItemController = (function () {
	    function ItemController($route, $location, list) {
	        _classCallCheck(this, ItemController);
	
	        this.$location = $location;
	        this.list = list;
	
	        this.top_n = list.capacity();
	        this.list_title = list.title();
	
	        this.number = parseInt($route.current.params.number);
	        this.preview_radio = 'edit';
	        this.editor = new Quill('#editor', {
	            modules: {
	                toolbar: { container: '#toolbar' },
	                'image-tooltip': true,
	                'link-tooltip': true },
	            theme: 'snow' });
	
	        this.idx = this.number - 1;
	        this.item = list.item(this.idx);
	        if (typeof this.item === 'undefined') {
	            this.item = this.list.newItem();
	            if (this.list.size() < this.list.capacity()) {
	                this.list.push(this.item);
	            }
	        }
	        this.item_title = this.item.title();
	        this.preview_html = this.item.preview();
	        this.editor.setHTML(this.item.edit());
	    }
	
	    _createClass(ItemController, [{
	        key: 'show_preview',
	        value: function show_preview() {
	            return this.preview_radio === 'preview';
	        }
	    }, {
	        key: 'generate_preview',
	        value: function generate_preview() {
	            this.item.edit(this.editor.getHTML());
	            this.html_preview = this.item.preview();
	        }
	    }, {
	        key: 'save',
	        value: function save() {
	            this.item.edit(this.editor.getHTML());
	            this.item.title(this.item_title);
	            this.list.item(this.idx, this.item);
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            this.save();
	            if (this.number < this.top_n) {
	                var next_number = (this.number + 1).toString();
	                this.$location.path('/item/' + next_number);
	            } else {
	                this.$location.path('/confirm');
	            }
	        }
	    }, {
	        key: 'back',
	        value: function back() {
	            this.save();
	            if (this.idx > 0) {
	                var next_number = (this.number - 1).toString();
	                this.$location.path('/item/' + next_number);
	            } else {
	                this.$location.path('/');
	            }
	        }
	    }]);
	
	    return ItemController;
	})();
	
	ItemController.$inject = ['$route', '$location', 'list'];
	
	exports['default'] = ItemController;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var ConfirmController = (function () {
	    function ConfirmController($location, $window, list) {
	        _classCallCheck(this, ConfirmController);
	
	        this.$location = $location;
	        this.$window = $window;
	        this.list = list;
	
	        this.items = this.list.items();
	        this.list_title = this.list.title();
	        this.top_n = this.list.capacity();
	        this.tags = this.list.tags();
	    }
	
	    _createClass(ConfirmController, [{
	        key: 'back',
	        value: function back() {
	            var next_number = this.top_n.toString();
	            this.$location.url('/item/' + next_number);
	        }
	    }, {
	        key: 'finish',
	        value: function finish() {
	            var _this = this;
	
	            this.list.upload().then(function (response) {
	                var slug = response.data.slug;
	                //this.list.reset();
	                _this.$window.location.href = '/lists/detail/' + slug;
	            });
	        }
	    }]);
	
	    return ConfirmController;
	})();
	
	ConfirmController.$inject = ['$location', '$window', 'list'];
	
	exports['default'] = ConfirmController;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _ListService = __webpack_require__(6);
	
	'use strict';
	
	var services_module_name = 'app.services';
	
	angular.module(services_module_name, []).service('list', _ListService.EditListService);
	
	exports['default'] = services_module_name;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x4,
	    property = _x5,
	    receiver = _x6; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var ListItem = (function () {
	    function ListItem($sce) {
	        var title = arguments[1] === undefined ? '' : arguments[1];
	        var raw_html = arguments[2] === undefined ? '' : arguments[2];
	
	        _classCallCheck(this, ListItem);
	
	        this.$sce = $sce;
	        this.title(title);
	        this.edit(raw_html);
	    }
	
	    _createClass(ListItem, [{
	        key: '_replaceClypItLinks',
	        value: function _replaceClypItLinks(html) {
	            var CI_LINK_RE = /(?:https?:\/\/)?(?:www\.)?(?:clyp\.it)\/((\w){8})/g;
	
	            function replace_links(_, sound_id) {
	                return '<iframe width="100%" height="160" \n           src="https://clyp.it/' + sound_id + '/widget" \n           frameborder="0"></iframe>';
	            }
	            return html.replace(CI_LINK_RE, replace_links);
	        }
	    }, {
	        key: '_replaceQuoteBlocks',
	        value: function _replaceQuoteBlocks(html) {
	            var QUOTE_RE = /`(.+)`/g;
	
	            function replace_quotes(_, match) {
	                return '<blockquote>' + match + '</blockquote>';
	            }
	            return html.replace(QUOTE_RE, replace_quotes);
	        }
	    }, {
	        key: '_replaceYouTubeLinks',
	        value: function _replaceYouTubeLinks(html) {
	            var YT_LINK_RE = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/g;
	
	            function replace_links(_, video_id) {
	                return '<iframe width="560" height="315"\n              src="https://www.youtube.com/embed/' + video_id + '"\n              frameborder="0" allowfullscreen>\n              </iframe>';
	            };
	
	            return html.replace(YT_LINK_RE, replace_links);
	        }
	    }, {
	        key: '_process',
	        value: function _process(raw_html) {
	            var description = this._replaceQuoteBlocks(raw_html);
	            description = this._replaceYouTubeLinks(description);
	            description = this._replaceClypItLinks(description);
	            return description;
	        }
	    }, {
	        key: 'title',
	        value: function title(title) {
	            if (typeof title === 'string') {
	                this.item_title = title;
	            }
	            return this.item_title;
	        }
	    }, {
	        key: 'edit',
	        value: function edit(raw_html) {
	            if (typeof raw_html === 'string') {
	                this.raw_html = raw_html;
	                this.processed_html = this._process(raw_html);
	            }
	            return this.raw_html;
	        }
	    }, {
	        key: 'preview',
	        value: function preview() {
	            var trustAs = arguments[0] === undefined ? true : arguments[0];
	
	            if (trustAs) {
	                return this.$sce.trustAsHtml(this.processed_html);
	            } else {
	                return this.processed_html;
	            }
	        }
	    }, {
	        key: 'repr',
	        value: function repr() {
	            var _obj = {};
	            _obj.title = this.title();
	            _obj.description = this.edit();
	            _obj.description_meta = this.preview(false);
	
	            return _obj;
	        }
	    }]);
	
	    return ListItem;
	})();
	
	var ListService = (function () {
	    function ListService($http, $sce, $location, $q) {
	        _classCallCheck(this, ListService);
	
	        this.$http = $http;
	        this.$sce = $sce;
	        this.$location = $location;
	        this.$q = $q;
	
	        this.top_n = 10;
	        this.list_title = '';
	        this.list_items = [];
	
	        this.possible_tags = [{
	            id: 1,
	            text: 'Music'
	        }, {
	            id: 2,
	            text: 'Movies'
	        }, {
	            id: 3,
	            text: 'TV'
	        }, {
	            id: 4,
	            text: 'Science'
	        }, {
	            id: 5,
	            text: 'Politics'
	        }];
	
	        this.list_tags = [];
	    }
	
	    _createClass(ListService, [{
	        key: 'possibleTags',
	        value: function possibleTags() {
	            var deferred = this.$q.defer();
	
	            deferred.resolve({
	                data: this.possible_tags
	            });
	
	            return deferred.promise;
	        }
	    }, {
	        key: 'items',
	        value: function items() {
	            return this.list_items;
	        }
	    }, {
	        key: 'tags',
	        value: function tags() {
	            return this.list_tags.slice();
	        }
	    }, {
	        key: 'addTagById',
	        value: function addTagById(id) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = this.possible_tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var _possible_tag = _step.value;
	
	                    if (_possible_tag.id === id) {
	                        this.list_tags.push({
	                            text: _possible_tag.text,
	                            id: _possible_tag.id });
	                        return;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator['return']) {
	                        _iterator['return']();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'addTag',
	        value: function addTag(tag) {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = this.list_tags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var _tag = _step2.value;
	
	                    if (_tag.text === tag.text) {
	                        return;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
	                        _iterator2['return']();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = this.possible_tags[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var _possible_tag = _step3.value;
	
	                    if (_possible_tag.text === tag.text) {
	                        tag.id = _possible_tag.id;
	                        this.list_tags.push(tag);
	                        return;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3['return']) {
	                        _iterator3['return']();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'clearTags',
	        value: function clearTags(tag) {
	            this.list_tags = [];
	        }
	    }, {
	        key: 'title',
	        value: function title(title) {
	            if (typeof title === 'string') {
	                this.list_title = title;
	            }
	            return this.list_title;
	        }
	    }, {
	        key: 'newItem',
	        value: function newItem(title, raw_html) {
	            return new ListItem(this.$sce, title, raw_html);
	        }
	    }, {
	        key: '_inbounds',
	        value: function _inbounds(idx) {
	            return idx < this.size() && idx >= 0;
	        }
	    }, {
	        key: 'item',
	        value: function item(idx, item) {
	            if (this._inbounds(idx)) {
	                if (typeof item !== 'undefined') {
	                    this.list_items[idx] = item;
	                }
	                return this.list_items[idx];
	            }
	            return undefined;
	        }
	    }, {
	        key: 'push',
	        value: function push(item) {
	            this.list_items.push(item);
	        }
	    }, {
	        key: 'pop',
	        value: function pop() {
	            this.list_items.pop();
	        }
	    }, {
	        key: 'capacity',
	        value: function capacity(n) {
	            if (typeof n === 'number') {
	                this.top_n = n;
	            }
	            return this.top_n;
	        }
	    }, {
	        key: 'size',
	        value: function size() {
	            return this.list_items.length;
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this.list_title = '';
	            this.top_n = 5;
	            this.list_items = [];
	        }
	    }, {
	        key: 'upload',
	        value: function upload(endpoint) {
	            var _payload = {};
	            _payload.list = this.list_items.map(function (_item) {
	                return _item.repr();
	            });
	            _payload.number = this.top_n;
	            _payload.title = this.list_title;
	            _payload.tags = this.list_tags.map(function (_item) {
	                return _item.id;
	            });
	            console.log(_payload);
	            return this.$http.post(endpoint, _payload);
	        }
	    }]);
	
	    return ListService;
	})();
	
	ListService.$inject = ['$http', '$sce', '$location', '$q'];
	
	var AddListService = (function (_ListService) {
	    function AddListService() {
	        _classCallCheck(this, AddListService);
	
	        if (_ListService != null) {
	            _ListService.apply(this, arguments);
	        }
	    }
	
	    _inherits(AddListService, _ListService);
	
	    _createClass(AddListService, [{
	        key: 'upload',
	        value: function upload() {
	            return _get(Object.getPrototypeOf(AddListService.prototype), 'upload', this).call(this, '/lists/new');
	        }
	    }]);
	
	    return AddListService;
	})(ListService);
	
	var EditListService = (function (_ListService2) {
	    function EditListService() {
	        _classCallCheck(this, EditListService);
	
	        if (_ListService2 != null) {
	            _ListService2.apply(this, arguments);
	        }
	    }
	
	    _inherits(EditListService, _ListService2);
	
	    _createClass(EditListService, [{
	        key: 'slug',
	        value: function slug(s) {
	            if (typeof s === 'string') {
	                this.list_slug = s;
	            }
	            return this.list_slug;
	        }
	    }, {
	        key: 'upload',
	        value: function upload() {
	            return _get(Object.getPrototypeOf(EditListService.prototype), 'upload', this).call(this, '/lists/edit/' + this.slug());
	        }
	    }]);
	
	    return EditListService;
	})(ListService);
	
	exports.AddListService = AddListService;
	exports.EditListService = EditListService;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjhmZjAyMThmOWNmZjk3YzBhMmUiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvbGlzdHMvZWRpdGxpc3QvY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2l0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2NvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9saXN0cy9zZXJ2aWNlcy9saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztvRENyQ2lELENBQWU7Ozs7QUFEaEUsYUFBWSxDQUFDOztBQUdiLFFBQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQ2xCLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUNyQyxjQUFjLEVBRWQsYUFBYSx1Q0FHaEIsQ0FBQyxDQUNDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVuQixVQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN2QyxVQUFTLFNBQVMsQ0FBQyxjQUFjLEVBQUU7QUFDL0IsbUJBQWMsQ0FBQyxJQUFJLENBQUMs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QzlDOzs7WUEzSUMsV0FBVzs7O0FBOElqQixZQUFXLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7O0tBRXJELGNBQWM7Y0FBZCxjQUFjOytCQUFkLGNBQWM7Ozs7Ozs7ZUFBZCxjQUFjOztrQkFBZCxjQUFjOztnQkFDVixrQkFBRztBQUNMLCtDQUZGLGNBQWMsd0NBRVEsWUFBWSxFQUFFO1VBQ3JDOzs7WUFIQyxjQUFjO0lBQVMsV0FBVzs7S0FNbEMsZUFBZTtjQUFmLGVBQWU7K0JBQWYsZUFBZTs7Ozs7OztlQUFmLGVBQWU7O2tCQUFmLGVBQWU7O2dCQUNiLGNBQUMsQ0FBQyxFQUFFO0FBQ0osaUJBQUcsT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFDO0FBQ3JCLHFCQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztjQUN0QjtBQUNELG9CQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7VUFDekI7OztnQkFFSyxrQkFBRztBQUNMLCtDQVRGLGVBQWUsd0NBU08sY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRTtVQUNyRDs7O1lBVkMsZUFBZTtJQUFTLFdBQVc7O1NBYWpDLGNBQWMsR0FBZCxjQUFjO1NBQUUsZUFBZSxHQUFmLGVBQWUsQyIsImZpbGUiOiJmOGZmMDIxOGY5Y2ZmOTdjMGEyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZjhmZjAyMThmOWNmZjk3YzBhMmVcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQge2RlZmF1bHQgYXMgY29udHJvbGxlcnNfbW9kdWxlX25hbWV9IGZyb20gJy4vY29udHJvbGxlcnMnO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAgICduZ1JvdXRlJywgJ25nU2FuaXRpemUnLCAnbmdNZXNzYWdlcycsXG4gICAgJ3VpLmJvb3RzdHJhcCcsIFxuXG4gICAgJ25nVGFnc0lucHV0JyxcblxuICAgIGNvbnRyb2xsZXJzX21vZHVsZV9uYW1lLFxuXSlcbiAgLmNvbmZpZyhBcHBSb3V0ZXIpXG4gIC5jb25maWcoU2V0Q1NGUik7XG5cbkFwcFJvdXRlci4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuZnVuY3Rpb24gQXBwUm91dGVyKCRyb3V0ZVByb3ZpZGVyKSB7XG4gICAgJHJvdXRlUHJvdmlkZXIud2hlbignLycsIHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbGlzdC5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0xpc3RDb250cm9sbGVyJyxcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBsb2FkOiBMb2FkTGlzdCxcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLndoZW4oJy9pdGVtLzpudW1iZXInLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2l0ZW0uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdJdGVtQ29udHJvbGxlcicsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgbG9hZDogTmV3TGlzdE9uUmVmcmVzaCxcbiAgICAgICAgfSxcbiAgICB9KVxuICAgIC53aGVuKCcvY29uZmlybScsIHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvY29uZmlybS5odG1sJywgXG4gICAgICAgIGNvbnRyb2xsZXI6ICdDb25maXJtQ29udHJvbGxlcicsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgbG9hZDogTmV3TGlzdE9uUmVmcmVzaCxcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cblxuU2V0Q1NGUi4kaW5qZWN0ID0gWyckaHR0cFByb3ZpZGVyJ107XG5mdW5jdGlvbiBTZXRDU0ZSKCRodHRwUHJvdmlkZXIpIHtcbiAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLnhzcmZDb29raWVOYW1lID0gJ2NzcmZ0b2tlbic7XG4gICAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy54c3JmSGVhZGVyTmFtZSA9ICdYLUNTUkZUb2tlbic7XG59XG5cbk5ld0xpc3RPblJlZnJlc2guJGluamVjdCA9IFsnJHEnLCAnJGxvY2F0aW9uJywgJ2xpc3QnXTtcbmZ1bmN0aW9uIE5ld0xpc3RPblJlZnJlc2goJHEsICRsb2NhdGlvbiwgbGlzdCkge1xuICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgIGlmIChsaXN0LnRpdGxlKCkgPT09ICcnKSB7XG4gICAgICAgIC8vbG9naWMgaXMgaWYgdGhlIGxpc3QgaGFzIG5vIHRpdGxlLCB0aGVuXG4gICAgICAgIC8vdGhlIHBhZ2UgbXVzdCBoYXZlIGJlZW4gbWFudWFsbHkgcmVmcmVzaGVkXG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgfVxufVxuXG5Mb2FkTGlzdC4kaW5qZWN0ID0gWyckcScsICckaHR0cCcsICckbG9jYXRpb24nLCAnbGlzdCddO1xuZnVuY3Rpb24gTG9hZExpc3QoJHEsICRodHRwLCAkbG9jYXRpb24sIGxpc3QpIHtcbiAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgXG4gICAgdmFyIHNsdWdfd2l0aF9oYXNoID0gJGxvY2F0aW9uLmFic1VybCgpLnNwbGl0KCdlZGl0LycpWzFdO1xuICAgIHZhciBzbHVnID0gc2x1Z193aXRoX2hhc2guc3Vic3RyaW5nKDAsIHNsdWdfd2l0aF9oYXNoLmxlbmd0aCAtMik7XG4gICAgXG4gICAgJGh0dHAuZ2V0KCcvbGlzdHMvanNvbi8nICsgc2x1ZylcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICBsaXN0LnJlc2V0KCk7XG4gICAgICAgdmFyIGxpc3RfZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgbGlzdC50aXRsZShsaXN0X2RhdGEudGl0bGUpO1xuICAgICAgIGxpc3QuY2FwYWNpdHkobGlzdF9kYXRhLm51bWJlcik7XG4gICAgICAgbGlzdC5zbHVnKHNsdWcpO1xuICAgICAgIGZvciAobGV0IHRhZ19pZCBvZiBsaXN0X2RhdGEudGFncykge1xuICAgICAgICAgICAgbGlzdC5hZGRUYWdCeUlkKHRhZ19pZCk7XG4gICAgICAgfVxuXG4gICAgICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0X2RhdGEubGlzdCkge1xuICAgICAgICAgICAgbGV0IF9pdGVtID0gbGlzdC5uZXdJdGVtKGl0ZW0udGl0bGUsIGl0ZW0uZGVzY3JpcHRpb25fbWV0YSk7XG4gICAgICAgICAgICBsaXN0LnB1c2goX2l0ZW0pO1xuICAgICAgIH1cbiAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgfSwgZGVmZXJyZWQucmVqZWN0KTtcblxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvZWRpdGxpc3QvYXBwLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2RlZmF1bHQgYXMgTGlzdENvbnRyb2xsZXJ9IGZyb20gJy4uL2NvbnRyb2xsZXJzL2xpc3QnXG5pbXBvcnQge2RlZmF1bHQgYXMgSXRlbUNvbnRyb2xsZXJ9IGZyb20gJy4uL2NvbnRyb2xsZXJzL2l0ZW0nXG5pbXBvcnQge2RlZmF1bHQgYXMgQ29uZmlybUNvbnRyb2xsZXJ9IGZyb20gJy4uL2NvbnRyb2xsZXJzL2NvbmZpcm0nXG5pbXBvcnQge2RlZmF1bHQgYXMgc2VydmljZXNfbW9kdWxlX25hbWV9IGZyb20gJy4vc2VydmljZXMnIFxuXG52YXIgY29udHJvbGxlcnNfbW9kdWxlX25hbWUgPSAnYXBwLmNvbnRyb2xsZXJzJztcblxuYW5ndWxhci5tb2R1bGUoY29udHJvbGxlcnNfbW9kdWxlX25hbWUsIFtcbiAgICBzZXJ2aWNlc19tb2R1bGVfbmFtZVxuXSlcbiAgLmNvbnRyb2xsZXIoJ0xpc3RDb250cm9sbGVyJywgTGlzdENvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdJdGVtQ29udHJvbGxlcicsIEl0ZW1Db250cm9sbGVyKVxuICAuY29udHJvbGxlcignQ29uZmlybUNvbnRyb2xsZXInLCBDb25maXJtQ29udHJvbGxlcik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRyb2xsZXJzX21vZHVsZV9uYW1lO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvZWRpdGxpc3QvY29udHJvbGxlcnMuanNcbiAqKi8iLCIgY2xhc3MgTGlzdENvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKCRsb2NhdGlvbiwgbGlzdCkge1xuICAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgICAgdGhpcy5saXN0ID0gbGlzdDtcblxuICAgICAgICB0aGlzLnRvcF9uID0gdGhpcy5saXN0LmNhcGFjaXR5KCk7XG4gICAgICAgIHRoaXMubGlzdF90aXRsZSA9IHRoaXMubGlzdC50aXRsZSgpO1xuICAgICAgICB0aGlzLnRhZ3MgPSB0aGlzLmxpc3QudGFncygpO1xuICAgIH1cblxuICAgIHBvc3NpYmxlX3RhZ3MocXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5wb3NzaWJsZVRhZ3MoKTtcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICB0aGlzLmxpc3QuY2xlYXJUYWdzKCk7XG4gICAgICAgIGZvcihsZXQgdGFnIG9mIHRoaXMudGFncykge1xuICAgICAgICAgICAgdGhpcy5saXN0LmFkZFRhZyh0YWcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdC50aXRsZSh0aGlzLmxpc3RfdGl0bGUpO1xuICAgICAgICB0aGlzLmxpc3QuY2FwYWNpdHkodGhpcy50b3Bfbik7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9pdGVtLzEnKTtcbiAgICB9XG59XG5MaXN0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9jYXRpb24nLCAnbGlzdCddO1xuZXhwb3J0IGRlZmF1bHQgTGlzdENvbnRyb2xsZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9jb250cm9sbGVycy9saXN0LmpzXG4gKiovIiwiIGNsYXNzIEl0ZW1Db250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcigkcm91dGUsICRsb2NhdGlvbiwgbGlzdCkge1xuICAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgICAgdGhpcy5saXN0ID0gbGlzdDtcblxuICAgICAgICB0aGlzLnRvcF9uID0gbGlzdC5jYXBhY2l0eSgpO1xuICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSBsaXN0LnRpdGxlKCk7XG4gICAgXG4gICAgICAgIHRoaXMubnVtYmVyID0gcGFyc2VJbnQoJHJvdXRlLmN1cnJlbnQucGFyYW1zLm51bWJlcik7XG4gICAgICAgIHRoaXMucHJldmlld19yYWRpbyA9ICdlZGl0JztcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBuZXcgUXVpbGwoJyNlZGl0b3InLCB7XG4gICAgICAgICAgICBtb2R1bGVzOiB7XG4gICAgICAgICAgICAgICAgJ3Rvb2xiYXInOiB7Y29udGFpbmVyOiAnI3Rvb2xiYXInfSxcbiAgICAgICAgICAgICAgICAnaW1hZ2UtdG9vbHRpcCc6IHRydWUsXG4gICAgICAgICAgICAgICAgJ2xpbmstdG9vbHRpcCc6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhlbWU6ICdzbm93JyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pZHggPSB0aGlzLm51bWJlciAtIDE7XG4gICAgICAgIHRoaXMuaXRlbSA9IGxpc3QuaXRlbSh0aGlzLmlkeCk7XG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLml0ZW0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW0gPSB0aGlzLmxpc3QubmV3SXRlbSgpO1xuICAgICAgICAgICAgaWYodGhpcy5saXN0LnNpemUoKSA8IHRoaXMubGlzdC5jYXBhY2l0eSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2godGhpcy5pdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLml0ZW1fdGl0bGUgPSB0aGlzLml0ZW0udGl0bGUoKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3X2h0bWwgPSB0aGlzLml0ZW0ucHJldmlldygpO1xuICAgICAgICB0aGlzLmVkaXRvci5zZXRIVE1MKHRoaXMuaXRlbS5lZGl0KCkpO1xuICAgIH1cbiAgICBcbiAgICBzaG93X3ByZXZpZXcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZXZpZXdfcmFkaW8gPT09ICdwcmV2aWV3JztcbiAgICB9XG4gICAgXG4gICAgZ2VuZXJhdGVfcHJldmlldygpIHtcbiAgICAgICAgdGhpcy5pdGVtLmVkaXQodGhpcy5lZGl0b3IuZ2V0SFRNTCgpKTtcbiAgICAgICAgdGhpcy5odG1sX3ByZXZpZXcgPSB0aGlzLml0ZW0ucHJldmlldygpO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIHRoaXMuaXRlbS5lZGl0KHRoaXMuZWRpdG9yLmdldEhUTUwoKSk7XG4gICAgICAgIHRoaXMuaXRlbS50aXRsZSh0aGlzLml0ZW1fdGl0bGUpO1xuICAgICAgICB0aGlzLmxpc3QuaXRlbSh0aGlzLmlkeCwgdGhpcy5pdGVtKTsgXG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgIGlmICh0aGlzLm51bWJlciA8IHRoaXMudG9wX24pIHsgICAgXG4gICAgICAgICAgICB2YXIgbmV4dF9udW1iZXIgPSAodGhpcy5udW1iZXIgKyAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aCgnL2l0ZW0vJyArIG5leHRfbnVtYmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9jb25maXJtJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiYWNrKCkge1xuICAgICAgICB0aGlzLnNhdmUoKTsgIFxuICAgICAgICBpZiAodGhpcy5pZHggPiAwKSB7ICAgIFxuICAgICAgICAgICAgdmFyIG5leHRfbnVtYmVyID0gKHRoaXMubnVtYmVyIC0gMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9pdGVtLycgKyBuZXh0X251bWJlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgICAgIH0gXG4gICAgfVxufVxuXG5JdGVtQ29udHJvbGxlci4kaW5qZWN0ID0gWyckcm91dGUnLCAnJGxvY2F0aW9uJywgJ2xpc3QnXTtcblxuZXhwb3J0IGRlZmF1bHQgSXRlbUNvbnRyb2xsZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9jb250cm9sbGVycy9pdGVtLmpzXG4gKiovIiwiIGNsYXNzIENvbmZpcm1Db250cm9sbGVyIHtcbiAgIGNvbnN0cnVjdG9yKCRsb2NhdGlvbiwgJHdpbmRvdywgbGlzdCkge1xuICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gICAgICAgdGhpcy5saXN0ID0gbGlzdDtcbiAgICAgICBcbiAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5saXN0Lml0ZW1zKCk7XG4gICAgICAgdGhpcy5saXN0X3RpdGxlID0gdGhpcy5saXN0LnRpdGxlKCk7XG4gICAgICAgdGhpcy50b3BfbiA9IHRoaXMubGlzdC5jYXBhY2l0eSgpO1xuICAgICAgIHRoaXMudGFncyA9IHRoaXMubGlzdC50YWdzKCk7XG4gICB9XG5cbiAgIGJhY2soKSB7XG4gICAgICAgIHZhciBuZXh0X251bWJlciA9IHRoaXMudG9wX24udG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24udXJsKCcvaXRlbS8nICsgbmV4dF9udW1iZXIpO1xuICAgfVxuXG4gICBmaW5pc2goKSB7XG4gICAgICAgIHRoaXMubGlzdC51cGxvYWQoKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHZhciBzbHVnID0gcmVzcG9uc2UuZGF0YS5zbHVnO1xuICAgICAgICAgICAgLy90aGlzLmxpc3QucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9saXN0cy9kZXRhaWwvJyArIHNsdWc7XG4gICAgICAgIH0pO1xuICAgfVxufVxuXG5Db25maXJtQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9jYXRpb24nLCAnJHdpbmRvdycsICdsaXN0J107XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1Db250cm9sbGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvY29udHJvbGxlcnMvY29uZmlybS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtFZGl0TGlzdFNlcnZpY2UgYXMgTGlzdFNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2xpc3QnOyAgICBcblxudmFyIHNlcnZpY2VzX21vZHVsZV9uYW1lID0gJ2FwcC5zZXJ2aWNlcyc7XG5cbmFuZ3VsYXIubW9kdWxlKHNlcnZpY2VzX21vZHVsZV9uYW1lLCBbXSlcbiAgLnNlcnZpY2UoJ2xpc3QnLCBMaXN0U2VydmljZSk7XG5cbmV4cG9ydCBkZWZhdWx0IHNlcnZpY2VzX21vZHVsZV9uYW1lO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvZWRpdGxpc3Qvc2VydmljZXMuanNcbiAqKi8iLCJjbGFzcyBMaXN0SXRlbSB7XG4gICAgY29uc3RydWN0b3IoJHNjZSwgdGl0bGU9JycsIHJhd19odG1sPScnKSB7XG4gICAgICAgIHRoaXMuJHNjZSA9ICRzY2U7XG4gICAgICAgIHRoaXMudGl0bGUodGl0bGUpO1xuICAgICAgICB0aGlzLmVkaXQocmF3X2h0bWwpO1xuICAgIH1cblxuICAgIF9yZXBsYWNlQ2x5cEl0TGlua3MoaHRtbCkge1xuICAgICAgICBsZXQgQ0lfTElOS19SRSA9IC8oPzpodHRwcz86XFwvXFwvKT8oPzp3d3dcXC4pPyg/OmNseXBcXC5pdClcXC8oKFxcdyl7OH0pL2c7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZV9saW5rcyhfLCBzb3VuZF9pZCl7XG4gICAgICAgICAgICByZXR1cm4gYDxpZnJhbWUgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTYwXCIgXG4gICAgICAgICAgIHNyYz1cImh0dHBzOi8vY2x5cC5pdC8ke3NvdW5kX2lkfS93aWRnZXRcIiBcbiAgICAgICAgICAgZnJhbWVib3JkZXI9XCIwXCI+PC9pZnJhbWU+YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKENJX0xJTktfUkUsIHJlcGxhY2VfbGlua3MpO1xuICAgIH1cblxuICAgIF9yZXBsYWNlUXVvdGVCbG9ja3MoaHRtbCkge1xuICAgICAgIGxldCBRVU9URV9SRSA9IC9gKC4rKWAvZztcbiAgICAgICBcbiAgICAgICBmdW5jdGlvbiByZXBsYWNlX3F1b3RlcyhfLCBtYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIGA8YmxvY2txdW90ZT4ke21hdGNofTwvYmxvY2txdW90ZT5gO1xuICAgICAgIH1cbiAgICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKFFVT1RFX1JFLCByZXBsYWNlX3F1b3Rlcyk7XG4gICAgfVxuXG4gICAgX3JlcGxhY2VZb3VUdWJlTGlua3MoaHRtbCkgeyAgICAgICAgIFxuICAgICAgICBsZXQgWVRfTElOS19SRSA9IC8oPzpodHRwcz86XFwvXFwvKT8oPzp3d3dcXC4pPyg/OnlvdXR1XFwuYmVcXC98eW91dHViZVxcLmNvbVxcLyg/OmVtYmVkXFwvfHZcXC98d2F0Y2hcXD92PXx3YXRjaFxcPy4rJnY9KSkoKFxcd3wtKXsxMX0pL2c7XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlX2xpbmtzKF8sIHZpZGVvX2lkKSB7ICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gYDxpZnJhbWUgd2lkdGg9XCI1NjBcIiBoZWlnaHQ9XCIzMTVcIlxuICAgICAgICAgICAgICBzcmM9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3ZpZGVvX2lkfVwiXG4gICAgICAgICAgICAgIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93ZnVsbHNjcmVlbj5cbiAgICAgICAgICAgICAgPC9pZnJhbWU+YDtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoWVRfTElOS19SRSwgcmVwbGFjZV9saW5rcyk7XG4gICAgfVxuICAgIFxuICAgIF9wcm9jZXNzKHJhd19odG1sKSB7XG4gICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IHRoaXMuX3JlcGxhY2VRdW90ZUJsb2NrcyhyYXdfaHRtbCk7IFxuICAgICAgICBkZXNjcmlwdGlvbiA9IHRoaXMuX3JlcGxhY2VZb3VUdWJlTGlua3MoZGVzY3JpcHRpb24pO1xuICAgICAgICBkZXNjcmlwdGlvbiA9IHRoaXMuX3JlcGxhY2VDbHlwSXRMaW5rcyhkZXNjcmlwdGlvbik7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICB0aXRsZSh0aXRsZSkge1xuICAgICAgICBpZih0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1fdGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtX3RpdGxlO1xuICAgIH1cblxuICAgIGVkaXQocmF3X2h0bWwpIHtcbiAgICAgICAgaWYodHlwZW9mIHJhd19odG1sID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5yYXdfaHRtbCA9IHJhd19odG1sO1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWRfaHRtbCA9IHRoaXMuX3Byb2Nlc3MocmF3X2h0bWwpOyAgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmF3X2h0bWw7XG4gICAgfVxuXG4gICAgcHJldmlldyh0cnVzdEFzPXRydWUpIHtcbiAgICAgICAgaWYodHJ1c3RBcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjZS50cnVzdEFzSHRtbCh0aGlzLnByb2Nlc3NlZF9odG1sKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NlZF9odG1sO1xuICAgICAgICB9XG4gICAgfSBcblxuICAgIHJlcHIoKSB7XG4gICAgICAgIHZhciBfb2JqID0ge307XG4gICAgICAgIF9vYmoudGl0bGUgPSB0aGlzLnRpdGxlKCk7XG4gICAgICAgIF9vYmouZGVzY3JpcHRpb24gPSB0aGlzLmVkaXQoKTtcbiAgICAgICAgX29iai5kZXNjcmlwdGlvbl9tZXRhID0gdGhpcy5wcmV2aWV3KGZhbHNlKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBfb2JqO1xuICAgfVxuXG59XG5cbmNsYXNzIExpc3RTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigkaHR0cCwgJHNjZSwgJGxvY2F0aW9uLCAkcSkge1xuICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gICAgICAgIHRoaXMuJHNjZSA9ICRzY2U7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgICB0aGlzLiRxID0gJHE7XG5cbiAgICAgICAgdGhpcy50b3BfbiA9IDEwO1xuICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSAnJztcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zID0gW107XG5cbiAgICAgICAgdGhpcy5wb3NzaWJsZV90YWdzID0gW3tcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgdGV4dDogJ011c2ljJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogMixcbiAgICAgICAgICAgIHRleHQ6ICdNb3ZpZXMnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAzLFxuICAgICAgICAgICAgdGV4dDogJ1RWJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogNCxcbiAgICAgICAgICAgIHRleHQ6ICdTY2llbmNlJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogNSxcbiAgICAgICAgICAgIHRleHQ6ICdQb2xpdGljcydcbiAgICAgICAgfV07XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxpc3RfdGFncyA9IFtdOyBcbiAgICB9XG4gXG4gICAgcG9zc2libGVUYWdzKCkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSB0aGlzLiRxLmRlZmVyKCk7XG5cbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7XG4gICAgICAgICAgICBkYXRhOnRoaXMucG9zc2libGVfdGFnc1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9XG5cbiAgICBpdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdF9pdGVtcztcbiAgICB9XG5cbiAgICB0YWdzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0X3RhZ3Muc2xpY2UoKTtcbiAgICB9XG4gICAgXG4gICAgYWRkVGFnQnlJZChpZCkge1xuICAgICAgICBmb3IobGV0IF9wb3NzaWJsZV90YWcgb2YgdGhpcy5wb3NzaWJsZV90YWdzKSB7XG4gICAgICAgICAgICBpZihfcG9zc2libGVfdGFnLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdF90YWdzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBfcG9zc2libGVfdGFnLnRleHQsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBfcG9zc2libGVfdGFnLmlkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFRhZyh0YWcpIHtcbiAgICAgICAgZm9yKGxldCBfdGFnIG9mIHRoaXMubGlzdF90YWdzKSB7XG4gICAgICAgICAgICBpZihfdGFnLnRleHQgPT09IHRhZy50ZXh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBfcG9zc2libGVfdGFnIG9mIHRoaXMucG9zc2libGVfdGFncykge1xuICAgICAgICAgICAgaWYoX3Bvc3NpYmxlX3RhZy50ZXh0ID09PSB0YWcudGV4dCkge1xuICAgICAgICAgICAgICAgIHRhZy5pZCA9IF9wb3NzaWJsZV90YWcuaWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0X3RhZ3MucHVzaCh0YWcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyVGFncyh0YWcpIHtcbiAgICAgICAgdGhpcy5saXN0X3RhZ3MgPSBbXTtcbiAgICB9XG5cbiAgICB0aXRsZSh0aXRsZSkge1xuICAgICAgICBpZih0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5saXN0X3RpdGxlO1xuICAgIH1cblxuICAgIG5ld0l0ZW0odGl0bGUsIHJhd19odG1sKSB7XG4gICAgICAgIHJldHVybiBuZXcgTGlzdEl0ZW0odGhpcy4kc2NlLCB0aXRsZSwgcmF3X2h0bWwpO1xuICAgIH1cbiAgICBcbiAgICBfaW5ib3VuZHMoaWR4KSB7XG4gICAgICAgIHJldHVybiBpZHggPCB0aGlzLnNpemUoKSAmJiBpZHggPj0gMDtcbiAgICB9XG5cbiAgICBpdGVtKGlkeCwgaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5faW5ib3VuZHMoaWR4KSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdF9pdGVtc1tpZHhdID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RfaXRlbXNbaWR4XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gXG5cbiAgICBwdXNoKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zLnB1c2goaXRlbSk7ICAgIFxuICAgIH1cblxuICAgIHBvcCgpIHtcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zLnBvcCgpO1xuICAgIH1cblxuICAgIGNhcGFjaXR5KG4pIHtcbiAgICAgICAgaWYodHlwZW9mIG4gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLnRvcF9uID0gbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50b3BfbjtcbiAgICB9XG5cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0X2l0ZW1zLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5saXN0X3RpdGxlID0gJyc7XG4gICAgICAgIHRoaXMudG9wX24gPSA1O1xuICAgICAgICB0aGlzLmxpc3RfaXRlbXMgPSBbXTtcbiAgICB9XG5cbiAgICB1cGxvYWQoZW5kcG9pbnQpIHtcbiAgICAgICAgdmFyIF9wYXlsb2FkID0ge307XG4gICAgICAgIF9wYXlsb2FkLmxpc3QgPSB0aGlzLmxpc3RfaXRlbXMubWFwKChfaXRlbSkgPT4gX2l0ZW0ucmVwcigpKTtcbiAgICAgICAgX3BheWxvYWQubnVtYmVyID0gdGhpcy50b3BfbjtcbiAgICAgICAgX3BheWxvYWQudGl0bGUgPSB0aGlzLmxpc3RfdGl0bGU7XG4gICAgICAgIF9wYXlsb2FkLnRhZ3MgPSB0aGlzLmxpc3RfdGFncy5tYXAoKF9pdGVtKSA9PiBfaXRlbS5pZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKF9wYXlsb2FkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAucG9zdChlbmRwb2ludCwgX3BheWxvYWQpO1xuICAgIH1cbn1cblxuTGlzdFNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJHNjZScsICckbG9jYXRpb24nLCAnJHEnXTtcblxuY2xhc3MgQWRkTGlzdFNlcnZpY2UgZXh0ZW5kcyBMaXN0U2VydmljZSB7XG4gICAgdXBsb2FkKCkge1xuICAgICAgICByZXR1cm4gc3VwZXIudXBsb2FkKCcvbGlzdHMvbmV3Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBFZGl0TGlzdFNlcnZpY2UgZXh0ZW5kcyBMaXN0U2VydmljZSB7XG4gICAgc2x1ZyhzKSB7XG4gICAgICAgIGlmKHR5cGVvZiBzID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICB0aGlzLmxpc3Rfc2x1ZyA9IHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdF9zbHVnO1xuICAgIH1cbiAgICBcbiAgICB1cGxvYWQoKSB7XG4gICAgICAgIHJldHVybiBzdXBlci51cGxvYWQoJy9saXN0cy9lZGl0LycgKyB0aGlzLnNsdWcoKSk7XG4gICAgfVxufVxuXG5leHBvcnQge0FkZExpc3RTZXJ2aWNlLCBFZGl0TGlzdFNlcnZpY2V9O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvc2VydmljZXMvbGlzdC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=
angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("templates/confirm.html","<h1>Preview: Your List - {{vm.top_n}} {{vm.list_title}}</h1><div ng-repeat=\"item in vm.items\"><h2>{{$index + 1}}. {{item.title()}}</h2><div ng-bind-html=item.preview()></div></div><div class=\"form btn-group\"><input class=btn value=Back type=Submit ng-click=vm.back()> <input class=\"btn btn-success\" type=Submit value=Finish ng-click=vm.finish()></div>");
$templateCache.put("templates/item.html","<h1>{{vm.top_n}} {{vm.list_title}}</h1><h2>Number {{vm.number}}: {{vm.item_title}}</h2><div class=row><div class=\"col-md-6 form-group\"><label for=itemtitle>Item Title</label> <input ng-model=vm.item_title type=text class=form-control id=itemtitle placeholder=\"Episode 4: A New Hope\" name=title ng-model-options=\"{updateOn: \'blur default\', debounce: {\'blur\': 0, \'default\': 500}}\" ng-trim=\"\" ng-maxlength=128 required></div></div><label for=toolbar>Description</label><div ng-hide=vm.show_preview()><div id=toolbar class=\"toolbar ql-toolbar ql-snow\"><span class=ql-format-group><span title=Link class=\"ql-format-button ql-link\"></span> <span class=ql-format-separator></span> <span title=Image class=\"ql-format-button ql-image\"></span></span></div><div id=editor class=\"editor ql-container ql-snow\"></div></div><div ng-show=vm.show_preview()><p ng-bind-html=vm.html_preview></p></div><div class=btn-group><label class=\"btn btn-primary\" ng-model=vm.preview_radio btn-radio=\"\'edit\'\" uncheckable=\"\">edit</label> <label class=\"btn primary\" ng-model=vm.preview_radio ng-change=vm.generate_preview() btn-radio=\"\'preview\'\" uncheckable=\"\">preview</label></div><hr><div class=\"footer btn-group\"><input class=btn value=Back type=Submit ng-click=vm.back()> <input class=btn value=Next type=Submit ng-click=vm.next()></div>");
$templateCache.put("templates/list.html","<form name=newlist novalidate><h1>Your List: {{vm.top_n}} {{vm.list_title}}</h1><div class=row><div class=\"col-md-6 form-group\"><label for=listnumber>Title</label> <input ng-model=vm.list_title type=text class=form-control id=listtitle placeholder=\"StarWars movies\" name=title ng-model-options=\"{updateOn: \'blur default\', debounce: {\'blur\': 0, \'default\': 500}}\" ng-trim=\"\" ng-maxlength=128 required></div></div><div class=row><div class=\"col-md-6 form-group\"><label for=listnumber>Number</label> <input ng-model=vm.top_n type=number class=form-control id=listnumber name=number min=1 max=100></div></div><div class=row><div class=col-sm-6><label for=listtags>Tags</label><tags-input id=listtags class=input-sm ng-model=vm.tags add-from-autocomplete-only=true><auto-complete source=vm.possible_tags($query)></auto-complete></tags-input></div></div><div class=footer><input class=btn value=Next type=Submit ng-click=vm.next()></div></form>");}]);