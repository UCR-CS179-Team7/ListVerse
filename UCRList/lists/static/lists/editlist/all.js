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
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = list_data.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var item = _step.value;
	
	                var _item = list.newItem(item.title, item.description_meta);
	                list.push(_item);
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
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _ListService = __webpack_require__(6);
	
	var _ListService2 = _interopRequireDefault(_ListService);
	
	'use strict';
	
	var services_module_name = 'app.services';
	
	angular.module(services_module_name, []).service('list', _ListService2['default']);
	
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
	        key: 'addTag',
	        value: function addTag(tag) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = this.list_tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var _tag = _step.value;
	
	                    if (_tag.text === tag.text) {
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
	
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = this.possible_tags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var _possible_tag = _step2.value;
	
	                    if (_possible_tag.text === tag.text) {
	                        tag.id = _possible_tag.id;
	                        this.list_tags.push(tag);
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
	        key: 'upload',
	        value: function upload() {
	            return _get(Object.getPrototypeOf(EditListService.prototype), 'upload', this).call(this, '/lists/edit');
	        }
	    }]);
	
	    return EditListService;
	})(ListService);
	
	exports.AddListService = AddListService;
	exports.EditListService = EditListService;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTlhZTFkZDZhZmQwNDBiZmU4ZDgiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvbGlzdHMvZWRpdGxpc3QvY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2l0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2NvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9saXN0cy9zZXJ2aWNlcy9saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztvRENyQ2lELENBQWU7Ozs7QUFEaEUsYUFBWSxDQUFDOztBQUdiLFFBQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQ2xCLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUNyQyxjQUFjLEVBRWQsYUFBYSx1Q0FHaEIsQ0FBQyxDQUNDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVuQixVQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN2QyxVQUFTLFNBQVMsQ0FBQyxjQUFjLEVBQUU7QUFDL0IsbUJBQWMsQ0FBQyxJQUFJLENBQUMs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ZDguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDE5YWUxZGQ2YWZkMDQwYmZlOGQ4XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHtkZWZhdWx0IGFzIGNvbnRyb2xsZXJzX21vZHVsZV9uYW1lfSBmcm9tICcuL2NvbnRyb2xsZXJzJztcblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgICAnbmdSb3V0ZScsICduZ1Nhbml0aXplJywgJ25nTWVzc2FnZXMnLFxuICAgICd1aS5ib290c3RyYXAnLCBcblxuICAgICduZ1RhZ3NJbnB1dCcsXG5cbiAgICBjb250cm9sbGVyc19tb2R1bGVfbmFtZSxcbl0pXG4gIC5jb25maWcoQXBwUm91dGVyKVxuICAuY29uZmlnKFNldENTRlIpO1xuXG5BcHBSb3V0ZXIuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcbmZ1bmN0aW9uIEFwcFJvdXRlcigkcm91dGVQcm92aWRlcikge1xuICAgICRyb3V0ZVByb3ZpZGVyLndoZW4oJy8nLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2xpc3QuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdMaXN0Q29udHJvbGxlcicsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgbG9hZDogTG9hZExpc3QsXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC53aGVuKCcvaXRlbS86bnVtYmVyJywge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9pdGVtLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSXRlbUNvbnRyb2xsZXInLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGxvYWQ6IE5ld0xpc3RPblJlZnJlc2gsXG4gICAgICAgIH0sXG4gICAgfSlcbiAgICAud2hlbignL2NvbmZpcm0nLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2NvbmZpcm0uaHRtbCcsIFxuICAgICAgICBjb250cm9sbGVyOiAnQ29uZmlybUNvbnRyb2xsZXInLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGxvYWQ6IE5ld0xpc3RPblJlZnJlc2gsXG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5cblNldENTRlIuJGluamVjdCA9IFsnJGh0dHBQcm92aWRlciddO1xuZnVuY3Rpb24gU2V0Q1NGUigkaHR0cFByb3ZpZGVyKSB7XG4gICAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy54c3JmQ29va2llTmFtZSA9ICdjc3JmdG9rZW4nO1xuICAgICRodHRwUHJvdmlkZXIuZGVmYXVsdHMueHNyZkhlYWRlck5hbWUgPSAnWC1DU1JGVG9rZW4nO1xufVxuXG5OZXdMaXN0T25SZWZyZXNoLiRpbmplY3QgPSBbJyRxJywgJyRsb2NhdGlvbicsICdsaXN0J107XG5mdW5jdGlvbiBOZXdMaXN0T25SZWZyZXNoKCRxLCAkbG9jYXRpb24sIGxpc3QpIHtcbiAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICBpZiAobGlzdC50aXRsZSgpID09PSAnJykge1xuICAgICAgICAvL2xvZ2ljIGlzIGlmIHRoZSBsaXN0IGhhcyBubyB0aXRsZSwgdGhlblxuICAgICAgICAvL3RoZSBwYWdlIG11c3QgaGF2ZSBiZWVuIG1hbnVhbGx5IHJlZnJlc2hlZFxuICAgICAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xuICAgIH1cbn1cblxuTG9hZExpc3QuJGluamVjdCA9IFsnJHEnLCAnJGh0dHAnLCAnJGxvY2F0aW9uJywgJ2xpc3QnXTtcbmZ1bmN0aW9uIExvYWRMaXN0KCRxLCAkaHR0cCwgJGxvY2F0aW9uLCBsaXN0KSB7XG4gICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgIFxuICAgIHZhciBzbHVnX3dpdGhfaGFzaCA9ICRsb2NhdGlvbi5hYnNVcmwoKS5zcGxpdCgnZWRpdC8nKVsxXTtcbiAgICB2YXIgc2x1ZyA9IHNsdWdfd2l0aF9oYXNoLnN1YnN0cmluZygwLCBzbHVnX3dpdGhfaGFzaC5sZW5ndGggLTIpO1xuICAgIFxuICAgICRodHRwLmdldCgnL2xpc3RzL2pzb24vJyArIHNsdWcpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgbGlzdC5yZXNldCgpO1xuICAgICAgIHZhciBsaXN0X2RhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgIGxpc3QudGl0bGUobGlzdF9kYXRhLnRpdGxlKTtcbiAgICAgICBsaXN0LmNhcGFjaXR5KGxpc3RfZGF0YS5udW1iZXIpO1xuICAgICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdF9kYXRhLmxpc3QpIHtcbiAgICAgICAgICAgIGxldCBfaXRlbSA9IGxpc3QubmV3SXRlbShpdGVtLnRpdGxlLCBpdGVtLmRlc2NyaXB0aW9uX21ldGEpO1xuICAgICAgICAgICAgbGlzdC5wdXNoKF9pdGVtKTtcbiAgICAgICB9XG4gICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgIH0sIGRlZmVycmVkLnJlamVjdCk7XG5cbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L2FwcC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtkZWZhdWx0IGFzIExpc3RDb250cm9sbGVyfSBmcm9tICcuLi9jb250cm9sbGVycy9saXN0J1xuaW1wb3J0IHtkZWZhdWx0IGFzIEl0ZW1Db250cm9sbGVyfSBmcm9tICcuLi9jb250cm9sbGVycy9pdGVtJ1xuaW1wb3J0IHtkZWZhdWx0IGFzIENvbmZpcm1Db250cm9sbGVyfSBmcm9tICcuLi9jb250cm9sbGVycy9jb25maXJtJ1xuaW1wb3J0IHtkZWZhdWx0IGFzIHNlcnZpY2VzX21vZHVsZV9uYW1lfSBmcm9tICcuL3NlcnZpY2VzJyBcblxudmFyIGNvbnRyb2xsZXJzX21vZHVsZV9uYW1lID0gJ2FwcC5jb250cm9sbGVycyc7XG5cbmFuZ3VsYXIubW9kdWxlKGNvbnRyb2xsZXJzX21vZHVsZV9uYW1lLCBbXG4gICAgc2VydmljZXNfbW9kdWxlX25hbWVcbl0pXG4gIC5jb250cm9sbGVyKCdMaXN0Q29udHJvbGxlcicsIExpc3RDb250cm9sbGVyKVxuICAuY29udHJvbGxlcignSXRlbUNvbnRyb2xsZXInLCBJdGVtQ29udHJvbGxlcilcbiAgLmNvbnRyb2xsZXIoJ0NvbmZpcm1Db250cm9sbGVyJywgQ29uZmlybUNvbnRyb2xsZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBjb250cm9sbGVyc19tb2R1bGVfbmFtZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L2NvbnRyb2xsZXJzLmpzXG4gKiovIiwiIGNsYXNzIExpc3RDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigkbG9jYXRpb24sIGxpc3QpIHtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgICAgIHRoaXMubGlzdCA9IGxpc3Q7XG5cbiAgICAgICAgdGhpcy50b3BfbiA9IHRoaXMubGlzdC5jYXBhY2l0eSgpO1xuICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSB0aGlzLmxpc3QudGl0bGUoKTtcbiAgICAgICAgdGhpcy50YWdzID0gdGhpcy5saXN0LnRhZ3MoKTtcbiAgICB9XG5cbiAgICBwb3NzaWJsZV90YWdzKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QucG9zc2libGVUYWdzKCk7XG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgdGhpcy5saXN0LmNsZWFyVGFncygpO1xuICAgICAgICBmb3IobGV0IHRhZyBvZiB0aGlzLnRhZ3MpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdC5hZGRUYWcodGFnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3QudGl0bGUodGhpcy5saXN0X3RpdGxlKTtcbiAgICAgICAgdGhpcy5saXN0LmNhcGFjaXR5KHRoaXMudG9wX24pO1xuICAgICAgICB0aGlzLiRsb2NhdGlvbi5wYXRoKCcvaXRlbS8xJyk7XG4gICAgfVxufVxuTGlzdENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvY2F0aW9uJywgJ2xpc3QnXTtcbmV4cG9ydCBkZWZhdWx0IExpc3RDb250cm9sbGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvY29udHJvbGxlcnMvbGlzdC5qc1xuICoqLyIsIiBjbGFzcyBJdGVtQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoJHJvdXRlLCAkbG9jYXRpb24sIGxpc3QpIHtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgICAgIHRoaXMubGlzdCA9IGxpc3Q7XG5cbiAgICAgICAgdGhpcy50b3BfbiA9IGxpc3QuY2FwYWNpdHkoKTtcbiAgICAgICAgdGhpcy5saXN0X3RpdGxlID0gbGlzdC50aXRsZSgpO1xuICAgIFxuICAgICAgICB0aGlzLm51bWJlciA9IHBhcnNlSW50KCRyb3V0ZS5jdXJyZW50LnBhcmFtcy5udW1iZXIpO1xuICAgICAgICB0aGlzLnByZXZpZXdfcmFkaW8gPSAnZWRpdCc7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gbmV3IFF1aWxsKCcjZWRpdG9yJywge1xuICAgICAgICAgICAgbW9kdWxlczoge1xuICAgICAgICAgICAgICAgICd0b29sYmFyJzoge2NvbnRhaW5lcjogJyN0b29sYmFyJ30sXG4gICAgICAgICAgICAgICAgJ2ltYWdlLXRvb2x0aXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICdsaW5rLXRvb2x0aXAnOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoZW1lOiAnc25vdycsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaWR4ID0gdGhpcy5udW1iZXIgLSAxO1xuICAgICAgICB0aGlzLml0ZW0gPSBsaXN0Lml0ZW0odGhpcy5pZHgpO1xuICAgICAgICBpZih0eXBlb2YgdGhpcy5pdGVtID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5pdGVtID0gdGhpcy5saXN0Lm5ld0l0ZW0oKTtcbiAgICAgICAgICAgIGlmKHRoaXMubGlzdC5zaXplKCkgPCB0aGlzLmxpc3QuY2FwYWNpdHkoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKHRoaXMuaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pdGVtX3RpdGxlID0gdGhpcy5pdGVtLnRpdGxlKCk7XG4gICAgICAgIHRoaXMucHJldmlld19odG1sID0gdGhpcy5pdGVtLnByZXZpZXcoKTtcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0SFRNTCh0aGlzLml0ZW0uZWRpdCgpKTtcbiAgICB9XG4gICAgXG4gICAgc2hvd19wcmV2aWV3KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmV2aWV3X3JhZGlvID09PSAncHJldmlldyc7XG4gICAgfVxuICAgIFxuICAgIGdlbmVyYXRlX3ByZXZpZXcoKSB7XG4gICAgICAgIHRoaXMuaXRlbS5lZGl0KHRoaXMuZWRpdG9yLmdldEhUTUwoKSk7XG4gICAgICAgIHRoaXMuaHRtbF9wcmV2aWV3ID0gdGhpcy5pdGVtLnByZXZpZXcoKTtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICB0aGlzLml0ZW0uZWRpdCh0aGlzLmVkaXRvci5nZXRIVE1MKCkpO1xuICAgICAgICB0aGlzLml0ZW0udGl0bGUodGhpcy5pdGVtX3RpdGxlKTtcbiAgICAgICAgdGhpcy5saXN0Lml0ZW0odGhpcy5pZHgsIHRoaXMuaXRlbSk7IFxuICAgIH1cblxuICAgIG5leHQoKSB7XG4gICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICBpZiAodGhpcy5udW1iZXIgPCB0aGlzLnRvcF9uKSB7ICAgIFxuICAgICAgICAgICAgdmFyIG5leHRfbnVtYmVyID0gKHRoaXMubnVtYmVyICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9pdGVtLycgKyBuZXh0X251bWJlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi5wYXRoKCcvY29uZmlybScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmFjaygpIHtcbiAgICAgICAgdGhpcy5zYXZlKCk7ICBcbiAgICAgICAgaWYgKHRoaXMuaWR4ID4gMCkgeyAgICBcbiAgICAgICAgICAgIHZhciBuZXh0X251bWJlciA9ICh0aGlzLm51bWJlciAtIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi5wYXRoKCcvaXRlbS8nICsgbmV4dF9udW1iZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aCgnLycpO1xuICAgICAgICB9IFxuICAgIH1cbn1cblxuSXRlbUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHJvdXRlJywgJyRsb2NhdGlvbicsICdsaXN0J107XG5cbmV4cG9ydCBkZWZhdWx0IEl0ZW1Db250cm9sbGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvY29udHJvbGxlcnMvaXRlbS5qc1xuICoqLyIsIiBjbGFzcyBDb25maXJtQ29udHJvbGxlciB7XG4gICBjb25zdHJ1Y3RvcigkbG9jYXRpb24sICR3aW5kb3csIGxpc3QpIHtcbiAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgICB0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuICAgICAgIHRoaXMubGlzdCA9IGxpc3Q7XG4gICAgICAgXG4gICAgICAgdGhpcy5pdGVtcyA9IHRoaXMubGlzdC5pdGVtcygpO1xuICAgICAgIHRoaXMubGlzdF90aXRsZSA9IHRoaXMubGlzdC50aXRsZSgpO1xuICAgICAgIHRoaXMudG9wX24gPSB0aGlzLmxpc3QuY2FwYWNpdHkoKTtcbiAgICAgICB0aGlzLnRhZ3MgPSB0aGlzLmxpc3QudGFncygpO1xuICAgfVxuXG4gICBiYWNrKCkge1xuICAgICAgICB2YXIgbmV4dF9udW1iZXIgPSB0aGlzLnRvcF9uLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uLnVybCgnL2l0ZW0vJyArIG5leHRfbnVtYmVyKTtcbiAgIH1cblxuICAgZmluaXNoKCkge1xuICAgICAgICB0aGlzLmxpc3QudXBsb2FkKClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB2YXIgc2x1ZyA9IHJlc3BvbnNlLmRhdGEuc2x1ZztcbiAgICAgICAgICAgIC8vdGhpcy5saXN0LnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLiR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbGlzdHMvZGV0YWlsLycgKyBzbHVnO1xuICAgICAgICB9KTtcbiAgIH1cbn1cblxuQ29uZmlybUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvY2F0aW9uJywgJyR3aW5kb3cnLCAnbGlzdCddO1xuXG5leHBvcnQgZGVmYXVsdCBDb25maXJtQ29udHJvbGxlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2NvbmZpcm0uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7ZGVmYXVsdCBhcyBMaXN0U2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvbGlzdCc7ICAgIFxuXG52YXIgc2VydmljZXNfbW9kdWxlX25hbWUgPSAnYXBwLnNlcnZpY2VzJztcblxuYW5ndWxhci5tb2R1bGUoc2VydmljZXNfbW9kdWxlX25hbWUsIFtdKVxuICAuc2VydmljZSgnbGlzdCcsIExpc3RTZXJ2aWNlKTtcblxuZXhwb3J0IGRlZmF1bHQgc2VydmljZXNfbW9kdWxlX25hbWU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9lZGl0bGlzdC9zZXJ2aWNlcy5qc1xuICoqLyIsImNsYXNzIExpc3RJdGVtIHtcbiAgICBjb25zdHJ1Y3Rvcigkc2NlLCB0aXRsZT0nJywgcmF3X2h0bWw9JycpIHtcbiAgICAgICAgdGhpcy4kc2NlID0gJHNjZTtcbiAgICAgICAgdGhpcy50aXRsZSh0aXRsZSk7XG4gICAgICAgIHRoaXMuZWRpdChyYXdfaHRtbCk7XG4gICAgfVxuXG4gICAgX3JlcGxhY2VDbHlwSXRMaW5rcyhodG1sKSB7XG4gICAgICAgIGxldCBDSV9MSU5LX1JFID0gLyg/Omh0dHBzPzpcXC9cXC8pPyg/Ond3d1xcLik/KD86Y2x5cFxcLml0KVxcLygoXFx3KXs4fSkvZztcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlX2xpbmtzKF8sIHNvdW5kX2lkKXtcbiAgICAgICAgICAgIHJldHVybiBgPGlmcmFtZSB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxNjBcIiBcbiAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9jbHlwLml0LyR7c291bmRfaWR9L3dpZGdldFwiIFxuICAgICAgICAgICBmcmFtZWJvcmRlcj1cIjBcIj48L2lmcmFtZT5gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoQ0lfTElOS19SRSwgcmVwbGFjZV9saW5rcyk7XG4gICAgfVxuXG4gICAgX3JlcGxhY2VRdW90ZUJsb2NrcyhodG1sKSB7XG4gICAgICAgbGV0IFFVT1RFX1JFID0gL2AoLispYC9nO1xuICAgICAgIFxuICAgICAgIGZ1bmN0aW9uIHJlcGxhY2VfcXVvdGVzKF8sIG1hdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gYDxibG9ja3F1b3RlPiR7bWF0Y2h9PC9ibG9ja3F1b3RlPmA7XG4gICAgICAgfVxuICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoUVVPVEVfUkUsIHJlcGxhY2VfcXVvdGVzKTtcbiAgICB9XG5cbiAgICBfcmVwbGFjZVlvdVR1YmVMaW5rcyhodG1sKSB7ICAgICAgICAgXG4gICAgICAgIGxldCBZVF9MSU5LX1JFID0gLyg/Omh0dHBzPzpcXC9cXC8pPyg/Ond3d1xcLik/KD86eW91dHVcXC5iZVxcL3x5b3V0dWJlXFwuY29tXFwvKD86ZW1iZWRcXC98dlxcL3x3YXRjaFxcP3Y9fHdhdGNoXFw/Lismdj0pKSgoXFx3fC0pezExfSkvZztcbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2VfbGlua3MoXywgdmlkZW9faWQpIHsgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBgPGlmcmFtZSB3aWR0aD1cIjU2MFwiIGhlaWdodD1cIjMxNVwiXG4gICAgICAgICAgICAgIHNyYz1cImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7dmlkZW9faWR9XCJcbiAgICAgICAgICAgICAgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3dmdWxsc2NyZWVuPlxuICAgICAgICAgICAgICA8L2lmcmFtZT5gO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZShZVF9MSU5LX1JFLCByZXBsYWNlX2xpbmtzKTtcbiAgICB9XG4gICAgXG4gICAgX3Byb2Nlc3MocmF3X2h0bWwpIHtcbiAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gdGhpcy5fcmVwbGFjZVF1b3RlQmxvY2tzKHJhd19odG1sKTsgXG4gICAgICAgIGRlc2NyaXB0aW9uID0gdGhpcy5fcmVwbGFjZVlvdVR1YmVMaW5rcyhkZXNjcmlwdGlvbik7XG4gICAgICAgIGRlc2NyaXB0aW9uID0gdGhpcy5fcmVwbGFjZUNseXBJdExpbmtzKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIHRpdGxlKHRpdGxlKSB7XG4gICAgICAgIGlmKHR5cGVvZiB0aXRsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbV90aXRsZSA9IHRpdGxlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1fdGl0bGU7XG4gICAgfVxuXG4gICAgZWRpdChyYXdfaHRtbCkge1xuICAgICAgICBpZih0eXBlb2YgcmF3X2h0bWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLnJhd19odG1sID0gcmF3X2h0bWw7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NlZF9odG1sID0gdGhpcy5fcHJvY2VzcyhyYXdfaHRtbCk7ICBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yYXdfaHRtbDtcbiAgICB9XG5cbiAgICBwcmV2aWV3KHRydXN0QXM9dHJ1ZSkge1xuICAgICAgICBpZih0cnVzdEFzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NlLnRydXN0QXNIdG1sKHRoaXMucHJvY2Vzc2VkX2h0bWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc2VkX2h0bWw7XG4gICAgICAgIH1cbiAgICB9IFxuXG4gICAgcmVwcigpIHtcbiAgICAgICAgdmFyIF9vYmogPSB7fTtcbiAgICAgICAgX29iai50aXRsZSA9IHRoaXMudGl0bGUoKTtcbiAgICAgICAgX29iai5kZXNjcmlwdGlvbiA9IHRoaXMuZWRpdCgpO1xuICAgICAgICBfb2JqLmRlc2NyaXB0aW9uX21ldGEgPSB0aGlzLnByZXZpZXcoZmFsc2UpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIF9vYmo7XG4gICB9XG5cbn1cblxuY2xhc3MgTGlzdFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCRodHRwLCAkc2NlLCAkbG9jYXRpb24sICRxKSB7XG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgICAgICAgdGhpcy4kc2NlID0gJHNjZTtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcblxuICAgICAgICB0aGlzLnRvcF9uID0gMTA7XG4gICAgICAgIHRoaXMubGlzdF90aXRsZSA9ICcnO1xuICAgICAgICB0aGlzLmxpc3RfaXRlbXMgPSBbXTtcblxuICAgICAgICB0aGlzLnBvc3NpYmxlX3RhZ3MgPSBbe1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICB0ZXh0OiAnTXVzaWMnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgdGV4dDogJ01vdmllcydcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IDMsXG4gICAgICAgICAgICB0ZXh0OiAnVFYnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiA0LFxuICAgICAgICAgICAgdGV4dDogJ1NjaWVuY2UnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiA1LFxuICAgICAgICAgICAgdGV4dDogJ1BvbGl0aWNzJ1xuICAgICAgICB9XTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubGlzdF90YWdzID0gW107IFxuICAgIH1cbiBcbiAgICBwb3NzaWJsZVRhZ3MoKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IHRoaXMuJHEuZGVmZXIoKTtcblxuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHtcbiAgICAgICAgICAgIGRhdGE6dGhpcy5wb3NzaWJsZV90YWdzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH1cblxuICAgIGl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0X2l0ZW1zO1xuICAgIH1cblxuICAgIHRhZ3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RfdGFncy5zbGljZSgpO1xuICAgIH1cbiAgICBcbiAgICBhZGRUYWcodGFnKSB7XG4gICAgICAgIGZvcihsZXQgX3RhZyBvZiB0aGlzLmxpc3RfdGFncykge1xuICAgICAgICAgICAgaWYoX3RhZy50ZXh0ID09PSB0YWcudGV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihsZXQgX3Bvc3NpYmxlX3RhZyBvZiB0aGlzLnBvc3NpYmxlX3RhZ3MpIHtcbiAgICAgICAgICAgIGlmKF9wb3NzaWJsZV90YWcudGV4dCA9PT0gdGFnLnRleHQpIHtcbiAgICAgICAgICAgICAgICB0YWcuaWQgPSBfcG9zc2libGVfdGFnLmlkO1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdF90YWdzLnB1c2godGFnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclRhZ3ModGFnKSB7XG4gICAgICAgIHRoaXMubGlzdF90YWdzID0gW107XG4gICAgfVxuXG4gICAgdGl0bGUodGl0bGUpIHtcbiAgICAgICAgaWYodHlwZW9mIHRpdGxlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5saXN0X3RpdGxlID0gdGl0bGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdF90aXRsZTtcbiAgICB9XG5cbiAgICBuZXdJdGVtKHRpdGxlLCByYXdfaHRtbCkge1xuICAgICAgICByZXR1cm4gbmV3IExpc3RJdGVtKHRoaXMuJHNjZSwgdGl0bGUsIHJhd19odG1sKTtcbiAgICB9XG4gICAgXG4gICAgX2luYm91bmRzKGlkeCkge1xuICAgICAgICByZXR1cm4gaWR4IDwgdGhpcy5zaXplKCkgJiYgaWR4ID49IDA7XG4gICAgfVxuXG4gICAgaXRlbShpZHgsIGl0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMuX2luYm91bmRzKGlkeCkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RfaXRlbXNbaWR4XSA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0X2l0ZW1zW2lkeF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IFxuXG4gICAgcHVzaChpdGVtKSB7XG4gICAgICAgIHRoaXMubGlzdF9pdGVtcy5wdXNoKGl0ZW0pOyAgICBcbiAgICB9XG5cbiAgICBwb3AoKSB7XG4gICAgICAgIHRoaXMubGlzdF9pdGVtcy5wb3AoKTtcbiAgICB9XG5cbiAgICBjYXBhY2l0eShuKSB7XG4gICAgICAgIGlmKHR5cGVvZiBuID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy50b3BfbiA9IG47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudG9wX247XG4gICAgfVxuXG4gICAgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdF9pdGVtcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMubGlzdF90aXRsZSA9ICcnO1xuICAgICAgICB0aGlzLnRvcF9uID0gNTtcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zID0gW107XG4gICAgfVxuXG4gICAgdXBsb2FkKGVuZHBvaW50KSB7XG4gICAgICAgIHZhciBfcGF5bG9hZCA9IHt9O1xuICAgICAgICBfcGF5bG9hZC5saXN0ID0gdGhpcy5saXN0X2l0ZW1zLm1hcCgoX2l0ZW0pID0+IF9pdGVtLnJlcHIoKSk7XG4gICAgICAgIF9wYXlsb2FkLm51bWJlciA9IHRoaXMudG9wX247XG4gICAgICAgIF9wYXlsb2FkLnRpdGxlID0gdGhpcy5saXN0X3RpdGxlO1xuICAgICAgICBfcGF5bG9hZC50YWdzID0gdGhpcy5saXN0X3RhZ3MubWFwKChfaXRlbSkgPT4gX2l0ZW0uaWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhfcGF5bG9hZCk7XG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwLnBvc3QoZW5kcG9pbnQsIF9wYXlsb2FkKTtcbiAgICB9XG59XG5cbkxpc3RTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJyRzY2UnLCAnJGxvY2F0aW9uJywgJyRxJ107XG5cbmNsYXNzIEFkZExpc3RTZXJ2aWNlIGV4dGVuZHMgTGlzdFNlcnZpY2Uge1xuICAgIHVwbG9hZCgpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnVwbG9hZCgnL2xpc3RzL25ldycpO1xuICAgIH1cbn1cblxuY2xhc3MgRWRpdExpc3RTZXJ2aWNlIGV4dGVuZHMgTGlzdFNlcnZpY2Uge1xuICAgIHVwbG9hZCgpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnVwbG9hZCgnL2xpc3RzL2VkaXQnKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7QWRkTGlzdFNlcnZpY2UsIEVkaXRMaXN0U2VydmljZX1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXNzZXRzL2xpc3RzL3NlcnZpY2VzL2xpc3QuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9
angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("templates/confirm.html","<h1>Preview: Your List - {{vm.top_n}} {{vm.list_title}}</h1><div ng-repeat=\"item in vm.items\"><h2>{{$index + 1}}. {{item.title()}}</h2><div ng-bind-html=item.preview()></div></div><div class=\"form btn-group\"><input class=btn value=Back type=Submit ng-click=vm.back()> <input class=\"btn btn-success\" type=Submit value=Finish ng-click=vm.finish()></div>");
$templateCache.put("templates/item.html","<h1>{{vm.top_n}} {{vm.list_title}}</h1><h2>Number {{vm.number}}: {{vm.item_title}}</h2><div class=row><div class=\"col-md-6 form-group\"><label for=itemtitle>Item Title</label> <input ng-model=vm.item_title type=text class=form-control id=itemtitle placeholder=\"Episode 4: A New Hope\" name=title ng-model-options=\"{updateOn: \'blur default\', debounce: {\'blur\': 0, \'default\': 500}}\" ng-trim=\"\" ng-maxlength=128 required></div></div><label for=toolbar>Description</label><div ng-hide=vm.show_preview()><div id=toolbar class=\"toolbar ql-toolbar ql-snow\"><span class=ql-format-group><span title=Link class=\"ql-format-button ql-link\"></span> <span class=ql-format-separator></span> <span title=Image class=\"ql-format-button ql-image\"></span></span></div><div id=editor class=\"editor ql-container ql-snow\"></div></div><div ng-show=vm.show_preview()><p ng-bind-html=vm.html_preview></p></div><div class=btn-group><label class=\"btn btn-primary\" ng-model=vm.preview_radio btn-radio=\"\'edit\'\" uncheckable=\"\">edit</label> <label class=\"btn primary\" ng-model=vm.preview_radio ng-change=vm.generate_preview() btn-radio=\"\'preview\'\" uncheckable=\"\">preview</label></div><hr><div class=\"footer btn-group\"><input class=btn value=Back type=Submit ng-click=vm.back()> <input class=btn value=Next type=Submit ng-click=vm.next()></div>");
$templateCache.put("templates/list.html","<form name=newlist novalidate><h1>Your List: {{vm.top_n}} {{vm.list_title}}</h1><div class=row><div class=\"col-md-6 form-group\"><label for=listnumber>Title</label> <input ng-model=vm.list_title type=text class=form-control id=listtitle placeholder=\"StarWars movies\" name=title ng-model-options=\"{updateOn: \'blur default\', debounce: {\'blur\': 0, \'default\': 500}}\" ng-trim=\"\" ng-maxlength=128 required></div></div><div class=row><div class=\"col-md-6 form-group\"><label for=listnumber>Number</label> <input ng-model=vm.top_n type=number class=form-control id=listnumber name=number min=1 max=100></div></div><div class=row><div class=col-sm-6><label for=listtags>Tags</label><tags-input id=listtags class=input-sm ng-model=vm.tags add-from-autocomplete-only=true><auto-complete source=vm.possible_tags($query)></auto-complete></tags-input></div></div><div class=footer><input class=btn value=Next type=Submit ng-click=vm.next()></div></form>");}]);