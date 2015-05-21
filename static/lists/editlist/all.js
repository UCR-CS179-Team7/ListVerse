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
	            var QUOTE_RE = /`([. "\n"]+)`/g;
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTQ5ZDg3ZWRlMGQwNTkzY2NjMmEiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvbGlzdHMvZWRpdGxpc3QvY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2l0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2NvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9saXN0cy9zZXJ2aWNlcy9saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztvRENyQ2lELENBQWU7Ozs7QUFEaEUsYUFBWSxDQUFDOztBQUdiLFFBQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQ2xCLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUNyQyxjQUFjLEVBRWQsYUFBYSx1Q0FHaEIsQ0FBQyxDQUNDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVuQixVQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN2QyxVQUFTLFNBQVMsQ0FBQyxjQUFjLEVBQUU7QUFDL0IsbUJBQWMsQ0FBQyxJQUFJLENBQUMs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VUFDOUM7OztZQTNJQyxXQUFXOzs7QUE4SWpCLFlBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7S0FFckQsY0FBYztjQUFkLGNBQWM7K0JBQWQsY0FBYzs7Ozs7OztlQUFkLGNBQWM7O2tCQUFkLGNBQWM7O2dCQUNWLGtCQUFHO0FBQ0wsK0NBRkYsY0FBYyx3Q0FFUSxZQUFZLEVBQUU7VUFDckM7OztZQUhDLGNBQWM7SUFBUyxXQUFXOztLQU1sQyxlQUFlO2NBQWYsZUFBZTsrQkFBZixlQUFlOzs7Ozs7O2VBQWYsZUFBZTs7a0JBQWYsZUFBZTs7Z0JBQ2IsY0FBQyxDQUFDLEVBQUU7QUFDSixpQkFBRyxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUM7QUFDckIscUJBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2NBQ3RCO0FBQ0Qsb0JBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztVQUN6Qjs7O2dCQUVLLGtCQUFHO0FBQ0wsK0NBVEYsZUFBZSx3Q0FTTyxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFO1VBQ3JEOzs7WUFWQyxlQUFlO0lBQVMsV0FBVzs7U0FhakMsY0FBYyxHQUFkLGNBQWM7U0FBRSxlQUFlLEdBQWYsZUFBZSxDIiwiZmlsZSI6IjU0OWQ4N2VkZTBkMDU5M2NjYzJhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA1NDlkODdlZGUwZDA1OTNjY2MyYVxuICoqLyIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCB7ZGVmYXVsdCBhcyBjb250cm9sbGVyc19tb2R1bGVfbmFtZX0gZnJvbSAnLi9jb250cm9sbGVycyc7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICAgJ25nUm91dGUnLCAnbmdTYW5pdGl6ZScsICduZ01lc3NhZ2VzJyxcbiAgICAndWkuYm9vdHN0cmFwJywgXG5cbiAgICAnbmdUYWdzSW5wdXQnLFxuXG4gICAgY29udHJvbGxlcnNfbW9kdWxlX25hbWUsXG5dKVxuICAuY29uZmlnKEFwcFJvdXRlcilcbiAgLmNvbmZpZyhTZXRDU0ZSKTtcblxuQXBwUm91dGVyLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5mdW5jdGlvbiBBcHBSb3V0ZXIoJHJvdXRlUHJvdmlkZXIpIHtcbiAgICAkcm91dGVQcm92aWRlci53aGVuKCcvJywge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9saXN0Lmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTGlzdENvbnRyb2xsZXInLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGxvYWQ6IExvYWRMaXN0LFxuICAgICAgICB9XG4gICAgfSlcbiAgICAud2hlbignL2l0ZW0vOm51bWJlcicsIHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvaXRlbS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0l0ZW1Db250cm9sbGVyJyxcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBsb2FkOiBOZXdMaXN0T25SZWZyZXNoLFxuICAgICAgICB9LFxuICAgIH0pXG4gICAgLndoZW4oJy9jb25maXJtJywge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9jb25maXJtLmh0bWwnLCBcbiAgICAgICAgY29udHJvbGxlcjogJ0NvbmZpcm1Db250cm9sbGVyJyxcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBsb2FkOiBOZXdMaXN0T25SZWZyZXNoLFxuICAgICAgICB9LFxuICAgIH0pO1xufVxuXG5TZXRDU0ZSLiRpbmplY3QgPSBbJyRodHRwUHJvdmlkZXInXTtcbmZ1bmN0aW9uIFNldENTRlIoJGh0dHBQcm92aWRlcikge1xuICAgICRodHRwUHJvdmlkZXIuZGVmYXVsdHMueHNyZkNvb2tpZU5hbWUgPSAnY3NyZnRva2VuJztcbiAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLnhzcmZIZWFkZXJOYW1lID0gJ1gtQ1NSRlRva2VuJztcbn1cblxuTmV3TGlzdE9uUmVmcmVzaC4kaW5qZWN0ID0gWyckcScsICckbG9jYXRpb24nLCAnbGlzdCddO1xuZnVuY3Rpb24gTmV3TGlzdE9uUmVmcmVzaCgkcSwgJGxvY2F0aW9uLCBsaXN0KSB7XG4gICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgaWYgKGxpc3QudGl0bGUoKSA9PT0gJycpIHtcbiAgICAgICAgLy9sb2dpYyBpcyBpZiB0aGUgbGlzdCBoYXMgbm8gdGl0bGUsIHRoZW5cbiAgICAgICAgLy90aGUgcGFnZSBtdXN0IGhhdmUgYmVlbiBtYW51YWxseSByZWZyZXNoZWRcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgICB9XG59XG5cbkxvYWRMaXN0LiRpbmplY3QgPSBbJyRxJywgJyRodHRwJywgJyRsb2NhdGlvbicsICdsaXN0J107XG5mdW5jdGlvbiBMb2FkTGlzdCgkcSwgJGh0dHAsICRsb2NhdGlvbiwgbGlzdCkge1xuICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICBcbiAgICB2YXIgc2x1Z193aXRoX2hhc2ggPSAkbG9jYXRpb24uYWJzVXJsKCkuc3BsaXQoJ2VkaXQvJylbMV07XG4gICAgdmFyIHNsdWcgPSBzbHVnX3dpdGhfaGFzaC5zdWJzdHJpbmcoMCwgc2x1Z193aXRoX2hhc2gubGVuZ3RoIC0yKTtcbiAgICBcbiAgICAkaHR0cC5nZXQoJy9saXN0cy9qc29uLycgKyBzbHVnKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgIGxpc3QucmVzZXQoKTtcbiAgICAgICB2YXIgbGlzdF9kYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICBsaXN0LnRpdGxlKGxpc3RfZGF0YS50aXRsZSk7XG4gICAgICAgbGlzdC5jYXBhY2l0eShsaXN0X2RhdGEubnVtYmVyKTtcbiAgICAgICBsaXN0LnNsdWcoc2x1Zyk7XG4gICAgICAgZm9yIChsZXQgdGFnX2lkIG9mIGxpc3RfZGF0YS50YWdzKSB7XG4gICAgICAgICAgICBsaXN0LmFkZFRhZ0J5SWQodGFnX2lkKTtcbiAgICAgICB9XG5cbiAgICAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3RfZGF0YS5saXN0KSB7XG4gICAgICAgICAgICBsZXQgX2l0ZW0gPSBsaXN0Lm5ld0l0ZW0oaXRlbS50aXRsZSwgaXRlbS5kZXNjcmlwdGlvbl9tZXRhKTtcbiAgICAgICAgICAgIGxpc3QucHVzaChfaXRlbSk7XG4gICAgICAgfVxuICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICB9LCBkZWZlcnJlZC5yZWplY3QpO1xuXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9lZGl0bGlzdC9hcHAuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7ZGVmYXVsdCBhcyBMaXN0Q29udHJvbGxlcn0gZnJvbSAnLi4vY29udHJvbGxlcnMvbGlzdCdcbmltcG9ydCB7ZGVmYXVsdCBhcyBJdGVtQ29udHJvbGxlcn0gZnJvbSAnLi4vY29udHJvbGxlcnMvaXRlbSdcbmltcG9ydCB7ZGVmYXVsdCBhcyBDb25maXJtQ29udHJvbGxlcn0gZnJvbSAnLi4vY29udHJvbGxlcnMvY29uZmlybSdcbmltcG9ydCB7ZGVmYXVsdCBhcyBzZXJ2aWNlc19tb2R1bGVfbmFtZX0gZnJvbSAnLi9zZXJ2aWNlcycgXG5cbnZhciBjb250cm9sbGVyc19tb2R1bGVfbmFtZSA9ICdhcHAuY29udHJvbGxlcnMnO1xuXG5hbmd1bGFyLm1vZHVsZShjb250cm9sbGVyc19tb2R1bGVfbmFtZSwgW1xuICAgIHNlcnZpY2VzX21vZHVsZV9uYW1lXG5dKVxuICAuY29udHJvbGxlcignTGlzdENvbnRyb2xsZXInLCBMaXN0Q29udHJvbGxlcilcbiAgLmNvbnRyb2xsZXIoJ0l0ZW1Db250cm9sbGVyJywgSXRlbUNvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdDb25maXJtQ29udHJvbGxlcicsIENvbmZpcm1Db250cm9sbGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgY29udHJvbGxlcnNfbW9kdWxlX25hbWU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9lZGl0bGlzdC9jb250cm9sbGVycy5qc1xuICoqLyIsIiBjbGFzcyBMaXN0Q29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoJGxvY2F0aW9uLCBsaXN0KSB7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgICB0aGlzLmxpc3QgPSBsaXN0O1xuXG4gICAgICAgIHRoaXMudG9wX24gPSB0aGlzLmxpc3QuY2FwYWNpdHkoKTtcbiAgICAgICAgdGhpcy5saXN0X3RpdGxlID0gdGhpcy5saXN0LnRpdGxlKCk7XG4gICAgICAgIHRoaXMudGFncyA9IHRoaXMubGlzdC50YWdzKCk7XG4gICAgfVxuXG4gICAgcG9zc2libGVfdGFncyhxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LnBvc3NpYmxlVGFncygpO1xuICAgIH1cblxuICAgIG5leHQoKSB7XG4gICAgICAgIHRoaXMubGlzdC5jbGVhclRhZ3MoKTtcbiAgICAgICAgZm9yKGxldCB0YWcgb2YgdGhpcy50YWdzKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3QuYWRkVGFnKHRhZyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0LnRpdGxlKHRoaXMubGlzdF90aXRsZSk7XG4gICAgICAgIHRoaXMubGlzdC5jYXBhY2l0eSh0aGlzLnRvcF9uKTtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aCgnL2l0ZW0vMScpO1xuICAgIH1cbn1cbkxpc3RDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2NhdGlvbicsICdsaXN0J107XG5leHBvcnQgZGVmYXVsdCBMaXN0Q29udHJvbGxlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2xpc3QuanNcbiAqKi8iLCIgY2xhc3MgSXRlbUNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKCRyb3V0ZSwgJGxvY2F0aW9uLCBsaXN0KSB7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgICB0aGlzLmxpc3QgPSBsaXN0O1xuXG4gICAgICAgIHRoaXMudG9wX24gPSBsaXN0LmNhcGFjaXR5KCk7XG4gICAgICAgIHRoaXMubGlzdF90aXRsZSA9IGxpc3QudGl0bGUoKTtcbiAgICBcbiAgICAgICAgdGhpcy5udW1iZXIgPSBwYXJzZUludCgkcm91dGUuY3VycmVudC5wYXJhbXMubnVtYmVyKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3X3JhZGlvID0gJ2VkaXQnO1xuICAgICAgICB0aGlzLmVkaXRvciA9IG5ldyBRdWlsbCgnI2VkaXRvcicsIHtcbiAgICAgICAgICAgIG1vZHVsZXM6IHtcbiAgICAgICAgICAgICAgICAndG9vbGJhcic6IHtjb250YWluZXI6ICcjdG9vbGJhcid9LFxuICAgICAgICAgICAgICAgICdpbWFnZS10b29sdGlwJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAnbGluay10b29sdGlwJzogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGVtZTogJ3Nub3cnLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlkeCA9IHRoaXMubnVtYmVyIC0gMTtcbiAgICAgICAgdGhpcy5pdGVtID0gbGlzdC5pdGVtKHRoaXMuaWR4KTtcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuaXRlbSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbSA9IHRoaXMubGlzdC5uZXdJdGVtKCk7XG4gICAgICAgICAgICBpZih0aGlzLmxpc3Quc2l6ZSgpIDwgdGhpcy5saXN0LmNhcGFjaXR5KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QucHVzaCh0aGlzLml0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXRlbV90aXRsZSA9IHRoaXMuaXRlbS50aXRsZSgpO1xuICAgICAgICB0aGlzLnByZXZpZXdfaHRtbCA9IHRoaXMuaXRlbS5wcmV2aWV3KCk7XG4gICAgICAgIHRoaXMuZWRpdG9yLnNldEhUTUwodGhpcy5pdGVtLmVkaXQoKSk7XG4gICAgfVxuICAgIFxuICAgIHNob3dfcHJldmlldygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJldmlld19yYWRpbyA9PT0gJ3ByZXZpZXcnO1xuICAgIH1cbiAgICBcbiAgICBnZW5lcmF0ZV9wcmV2aWV3KCkge1xuICAgICAgICB0aGlzLml0ZW0uZWRpdCh0aGlzLmVkaXRvci5nZXRIVE1MKCkpO1xuICAgICAgICB0aGlzLmh0bWxfcHJldmlldyA9IHRoaXMuaXRlbS5wcmV2aWV3KCk7XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5pdGVtLmVkaXQodGhpcy5lZGl0b3IuZ2V0SFRNTCgpKTtcbiAgICAgICAgdGhpcy5pdGVtLnRpdGxlKHRoaXMuaXRlbV90aXRsZSk7XG4gICAgICAgIHRoaXMubGlzdC5pdGVtKHRoaXMuaWR4LCB0aGlzLml0ZW0pOyBcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICB0aGlzLnNhdmUoKTtcbiAgICAgICAgaWYgKHRoaXMubnVtYmVyIDwgdGhpcy50b3BfbikgeyAgICBcbiAgICAgICAgICAgIHZhciBuZXh0X251bWJlciA9ICh0aGlzLm51bWJlciArIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi5wYXRoKCcvaXRlbS8nICsgbmV4dF9udW1iZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aCgnL2NvbmZpcm0nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJhY2soKSB7XG4gICAgICAgIHRoaXMuc2F2ZSgpOyAgXG4gICAgICAgIGlmICh0aGlzLmlkeCA+IDApIHsgICAgXG4gICAgICAgICAgICB2YXIgbmV4dF9udW1iZXIgPSAodGhpcy5udW1iZXIgLSAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aCgnL2l0ZW0vJyArIG5leHRfbnVtYmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgICAgICAgfSBcbiAgICB9XG59XG5cbkl0ZW1Db250cm9sbGVyLiRpbmplY3QgPSBbJyRyb3V0ZScsICckbG9jYXRpb24nLCAnbGlzdCddO1xuXG5leHBvcnQgZGVmYXVsdCBJdGVtQ29udHJvbGxlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2l0ZW0uanNcbiAqKi8iLCIgY2xhc3MgQ29uZmlybUNvbnRyb2xsZXIge1xuICAgY29uc3RydWN0b3IoJGxvY2F0aW9uLCAkd2luZG93LCBsaXN0KSB7XG4gICAgICAgdGhpcy4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgICAgdGhpcy4kd2luZG93ID0gJHdpbmRvdztcbiAgICAgICB0aGlzLmxpc3QgPSBsaXN0O1xuICAgICAgIFxuICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLmxpc3QuaXRlbXMoKTtcbiAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSB0aGlzLmxpc3QudGl0bGUoKTtcbiAgICAgICB0aGlzLnRvcF9uID0gdGhpcy5saXN0LmNhcGFjaXR5KCk7XG4gICAgICAgdGhpcy50YWdzID0gdGhpcy5saXN0LnRhZ3MoKTtcbiAgIH1cblxuICAgYmFjaygpIHtcbiAgICAgICAgdmFyIG5leHRfbnVtYmVyID0gdGhpcy50b3Bfbi50b1N0cmluZygpO1xuICAgICAgICB0aGlzLiRsb2NhdGlvbi51cmwoJy9pdGVtLycgKyBuZXh0X251bWJlcik7XG4gICB9XG5cbiAgIGZpbmlzaCgpIHtcbiAgICAgICAgdGhpcy5saXN0LnVwbG9hZCgpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdmFyIHNsdWcgPSByZXNwb25zZS5kYXRhLnNsdWc7XG4gICAgICAgICAgICAvL3RoaXMubGlzdC5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy4kd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2xpc3RzL2RldGFpbC8nICsgc2x1ZztcbiAgICAgICAgfSk7XG4gICB9XG59XG5cbkNvbmZpcm1Db250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2NhdGlvbicsICckd2luZG93JywgJ2xpc3QnXTtcblxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybUNvbnRyb2xsZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9jb250cm9sbGVycy9jb25maXJtLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge0VkaXRMaXN0U2VydmljZSBhcyBMaXN0U2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvbGlzdCc7ICAgIFxuXG52YXIgc2VydmljZXNfbW9kdWxlX25hbWUgPSAnYXBwLnNlcnZpY2VzJztcblxuYW5ndWxhci5tb2R1bGUoc2VydmljZXNfbW9kdWxlX25hbWUsIFtdKVxuICAuc2VydmljZSgnbGlzdCcsIExpc3RTZXJ2aWNlKTtcblxuZXhwb3J0IGRlZmF1bHQgc2VydmljZXNfbW9kdWxlX25hbWU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9lZGl0bGlzdC9zZXJ2aWNlcy5qc1xuICoqLyIsImNsYXNzIExpc3RJdGVtIHtcbiAgICBjb25zdHJ1Y3Rvcigkc2NlLCB0aXRsZT0nJywgcmF3X2h0bWw9JycpIHtcbiAgICAgICAgdGhpcy4kc2NlID0gJHNjZTtcbiAgICAgICAgdGhpcy50aXRsZSh0aXRsZSk7XG4gICAgICAgIHRoaXMuZWRpdChyYXdfaHRtbCk7XG4gICAgfVxuXG4gICAgX3JlcGxhY2VDbHlwSXRMaW5rcyhodG1sKSB7XG4gICAgICAgIGxldCBDSV9MSU5LX1JFID0gLyg/Omh0dHBzPzpcXC9cXC8pPyg/Ond3d1xcLik/KD86Y2x5cFxcLml0KVxcLygoXFx3KXs4fSkvZztcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlX2xpbmtzKF8sIHNvdW5kX2lkKXtcbiAgICAgICAgICAgIHJldHVybiBgPGlmcmFtZSB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxNjBcIiBcbiAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9jbHlwLml0LyR7c291bmRfaWR9L3dpZGdldFwiIFxuICAgICAgICAgICBmcmFtZWJvcmRlcj1cIjBcIj48L2lmcmFtZT5gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoQ0lfTElOS19SRSwgcmVwbGFjZV9saW5rcyk7XG4gICAgfVxuXG4gICAgX3JlcGxhY2VRdW90ZUJsb2NrcyhodG1sKSB7XG4gICAgICAgbGV0IFFVT1RFX1JFID0gL2AoWy4gXCJcXG5cIl0rKWAvZztcbiAgICAgICBcbiAgICAgICBmdW5jdGlvbiByZXBsYWNlX3F1b3RlcyhfLCBtYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIGA8YmxvY2txdW90ZT4ke21hdGNofTwvYmxvY2txdW90ZT5gO1xuICAgICAgIH1cbiAgICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKFFVT1RFX1JFLCByZXBsYWNlX3F1b3Rlcyk7XG4gICAgfVxuXG4gICAgX3JlcGxhY2VZb3VUdWJlTGlua3MoaHRtbCkgeyAgICAgICAgIFxuICAgICAgICBsZXQgWVRfTElOS19SRSA9IC8oPzpodHRwcz86XFwvXFwvKT8oPzp3d3dcXC4pPyg/OnlvdXR1XFwuYmVcXC98eW91dHViZVxcLmNvbVxcLyg/OmVtYmVkXFwvfHZcXC98d2F0Y2hcXD92PXx3YXRjaFxcPy4rJnY9KSkoKFxcd3wtKXsxMX0pL2c7XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlX2xpbmtzKF8sIHZpZGVvX2lkKSB7ICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gYDxpZnJhbWUgd2lkdGg9XCI1NjBcIiBoZWlnaHQ9XCIzMTVcIlxuICAgICAgICAgICAgICBzcmM9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3ZpZGVvX2lkfVwiXG4gICAgICAgICAgICAgIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93ZnVsbHNjcmVlbj5cbiAgICAgICAgICAgICAgPC9pZnJhbWU+YDtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoWVRfTElOS19SRSwgcmVwbGFjZV9saW5rcyk7XG4gICAgfVxuICAgIFxuICAgIF9wcm9jZXNzKHJhd19odG1sKSB7XG4gICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IHRoaXMuX3JlcGxhY2VRdW90ZUJsb2NrcyhyYXdfaHRtbCk7IFxuICAgICAgICBkZXNjcmlwdGlvbiA9IHRoaXMuX3JlcGxhY2VZb3VUdWJlTGlua3MoZGVzY3JpcHRpb24pO1xuICAgICAgICBkZXNjcmlwdGlvbiA9IHRoaXMuX3JlcGxhY2VDbHlwSXRMaW5rcyhkZXNjcmlwdGlvbik7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICB0aXRsZSh0aXRsZSkge1xuICAgICAgICBpZih0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1fdGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtX3RpdGxlO1xuICAgIH1cblxuICAgIGVkaXQocmF3X2h0bWwpIHtcbiAgICAgICAgaWYodHlwZW9mIHJhd19odG1sID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5yYXdfaHRtbCA9IHJhd19odG1sO1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWRfaHRtbCA9IHRoaXMuX3Byb2Nlc3MocmF3X2h0bWwpOyAgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmF3X2h0bWw7XG4gICAgfVxuXG4gICAgcHJldmlldyh0cnVzdEFzPXRydWUpIHtcbiAgICAgICAgaWYodHJ1c3RBcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjZS50cnVzdEFzSHRtbCh0aGlzLnByb2Nlc3NlZF9odG1sKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NlZF9odG1sO1xuICAgICAgICB9XG4gICAgfSBcblxuICAgIHJlcHIoKSB7XG4gICAgICAgIHZhciBfb2JqID0ge307XG4gICAgICAgIF9vYmoudGl0bGUgPSB0aGlzLnRpdGxlKCk7XG4gICAgICAgIF9vYmouZGVzY3JpcHRpb24gPSB0aGlzLmVkaXQoKTtcbiAgICAgICAgX29iai5kZXNjcmlwdGlvbl9tZXRhID0gdGhpcy5wcmV2aWV3KGZhbHNlKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBfb2JqO1xuICAgfVxuXG59XG5cbmNsYXNzIExpc3RTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigkaHR0cCwgJHNjZSwgJGxvY2F0aW9uLCAkcSkge1xuICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gICAgICAgIHRoaXMuJHNjZSA9ICRzY2U7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgICB0aGlzLiRxID0gJHE7XG5cbiAgICAgICAgdGhpcy50b3BfbiA9IDEwO1xuICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSAnJztcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zID0gW107XG5cbiAgICAgICAgdGhpcy5wb3NzaWJsZV90YWdzID0gW3tcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgdGV4dDogJ011c2ljJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogMixcbiAgICAgICAgICAgIHRleHQ6ICdNb3ZpZXMnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAzLFxuICAgICAgICAgICAgdGV4dDogJ1RWJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogNCxcbiAgICAgICAgICAgIHRleHQ6ICdTY2llbmNlJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogNSxcbiAgICAgICAgICAgIHRleHQ6ICdQb2xpdGljcydcbiAgICAgICAgfV07XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxpc3RfdGFncyA9IFtdOyBcbiAgICB9XG4gXG4gICAgcG9zc2libGVUYWdzKCkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSB0aGlzLiRxLmRlZmVyKCk7XG5cbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7XG4gICAgICAgICAgICBkYXRhOnRoaXMucG9zc2libGVfdGFnc1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9XG5cbiAgICBpdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdF9pdGVtcztcbiAgICB9XG5cbiAgICB0YWdzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0X3RhZ3Muc2xpY2UoKTtcbiAgICB9XG4gICAgXG4gICAgYWRkVGFnQnlJZChpZCkge1xuICAgICAgICBmb3IobGV0IF9wb3NzaWJsZV90YWcgb2YgdGhpcy5wb3NzaWJsZV90YWdzKSB7XG4gICAgICAgICAgICBpZihfcG9zc2libGVfdGFnLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdF90YWdzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBfcG9zc2libGVfdGFnLnRleHQsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBfcG9zc2libGVfdGFnLmlkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFRhZyh0YWcpIHtcbiAgICAgICAgZm9yKGxldCBfdGFnIG9mIHRoaXMubGlzdF90YWdzKSB7XG4gICAgICAgICAgICBpZihfdGFnLnRleHQgPT09IHRhZy50ZXh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBfcG9zc2libGVfdGFnIG9mIHRoaXMucG9zc2libGVfdGFncykge1xuICAgICAgICAgICAgaWYoX3Bvc3NpYmxlX3RhZy50ZXh0ID09PSB0YWcudGV4dCkge1xuICAgICAgICAgICAgICAgIHRhZy5pZCA9IF9wb3NzaWJsZV90YWcuaWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0X3RhZ3MucHVzaCh0YWcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyVGFncyh0YWcpIHtcbiAgICAgICAgdGhpcy5saXN0X3RhZ3MgPSBbXTtcbiAgICB9XG5cbiAgICB0aXRsZSh0aXRsZSkge1xuICAgICAgICBpZih0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5saXN0X3RpdGxlO1xuICAgIH1cblxuICAgIG5ld0l0ZW0odGl0bGUsIHJhd19odG1sKSB7XG4gICAgICAgIHJldHVybiBuZXcgTGlzdEl0ZW0odGhpcy4kc2NlLCB0aXRsZSwgcmF3X2h0bWwpO1xuICAgIH1cbiAgICBcbiAgICBfaW5ib3VuZHMoaWR4KSB7XG4gICAgICAgIHJldHVybiBpZHggPCB0aGlzLnNpemUoKSAmJiBpZHggPj0gMDtcbiAgICB9XG5cbiAgICBpdGVtKGlkeCwgaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5faW5ib3VuZHMoaWR4KSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdF9pdGVtc1tpZHhdID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RfaXRlbXNbaWR4XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gXG5cbiAgICBwdXNoKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zLnB1c2goaXRlbSk7ICAgIFxuICAgIH1cblxuICAgIHBvcCgpIHtcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zLnBvcCgpO1xuICAgIH1cblxuICAgIGNhcGFjaXR5KG4pIHtcbiAgICAgICAgaWYodHlwZW9mIG4gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLnRvcF9uID0gbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50b3BfbjtcbiAgICB9XG5cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0X2l0ZW1zLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5saXN0X3RpdGxlID0gJyc7XG4gICAgICAgIHRoaXMudG9wX24gPSA1O1xuICAgICAgICB0aGlzLmxpc3RfaXRlbXMgPSBbXTtcbiAgICB9XG5cbiAgICB1cGxvYWQoZW5kcG9pbnQpIHtcbiAgICAgICAgdmFyIF9wYXlsb2FkID0ge307XG4gICAgICAgIF9wYXlsb2FkLmxpc3QgPSB0aGlzLmxpc3RfaXRlbXMubWFwKChfaXRlbSkgPT4gX2l0ZW0ucmVwcigpKTtcbiAgICAgICAgX3BheWxvYWQubnVtYmVyID0gdGhpcy50b3BfbjtcbiAgICAgICAgX3BheWxvYWQudGl0bGUgPSB0aGlzLmxpc3RfdGl0bGU7XG4gICAgICAgIF9wYXlsb2FkLnRhZ3MgPSB0aGlzLmxpc3RfdGFncy5tYXAoKF9pdGVtKSA9PiBfaXRlbS5pZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKF9wYXlsb2FkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAucG9zdChlbmRwb2ludCwgX3BheWxvYWQpO1xuICAgIH1cbn1cblxuTGlzdFNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJHNjZScsICckbG9jYXRpb24nLCAnJHEnXTtcblxuY2xhc3MgQWRkTGlzdFNlcnZpY2UgZXh0ZW5kcyBMaXN0U2VydmljZSB7XG4gICAgdXBsb2FkKCkge1xuICAgICAgICByZXR1cm4gc3VwZXIudXBsb2FkKCcvbGlzdHMvbmV3Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBFZGl0TGlzdFNlcnZpY2UgZXh0ZW5kcyBMaXN0U2VydmljZSB7XG4gICAgc2x1ZyhzKSB7XG4gICAgICAgIGlmKHR5cGVvZiBzID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICB0aGlzLmxpc3Rfc2x1ZyA9IHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdF9zbHVnO1xuICAgIH1cbiAgICBcbiAgICB1cGxvYWQoKSB7XG4gICAgICAgIHJldHVybiBzdXBlci51cGxvYWQoJy9saXN0cy9lZGl0LycgKyB0aGlzLnNsdWcoKSk7XG4gICAgfVxufVxuXG5leHBvcnQge0FkZExpc3RTZXJ2aWNlLCBFZGl0TGlzdFNlcnZpY2V9O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvc2VydmljZXMvbGlzdC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=
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
	            var QUOTE_RE = /`([. \n]+)`/g;
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2MzZWU3Yzg4MmRmOTVkZWMyMzMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvbGlzdHMvZWRpdGxpc3QvY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2l0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2NvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9saXN0cy9zZXJ2aWNlcy9saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztvRENyQ2lELENBQWU7Ozs7QUFEaEUsYUFBWSxDQUFDOztBQUdiLFFBQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQ2xCLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUNyQyxjQUFjLEVBRWQsYUFBYSx1Q0FHaEIsQ0FBQyxDQUNDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVuQixVQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN2QyxVQUFTLFNBQVMsQ0FBQyxjQUFjLEVBQUU7QUFDL0IsbUJBQWMsQ0FBQyxJQUFJLENBQUMs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QzlDOzs7WUEzSUMsV0FBVzs7O0FBOElqQixZQUFXLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7O0tBRXJELGNBQWM7Y0FBZCxjQUFjOytCQUFkLGNBQWM7Ozs7Ozs7ZUFBZCxjQUFjOztrQkFBZCxjQUFjOztnQkFDVixrQkFBRztBQUNMLCtDQUZGLGNBQWMsd0NBRVEsWUFBWSxFQUFFO1VBQ3JDOzs7WUFIQyxjQUFjO0lBQVMsV0FBVzs7S0FNbEMsZUFBZTtjQUFmLGVBQWU7K0JBQWYsZUFBZTs7Ozs7OztlQUFmLGVBQWU7O2tCQUFmLGVBQWU7O2dCQUNiLGNBQUMsQ0FBQyxFQUFFO0FBQ0osaUJBQUcsT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFDO0FBQ3JCLHFCQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztjQUN0QjtBQUNELG9CQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7VUFDekI7OztnQkFFSyxrQkFBRztBQUNMLCtDQVRGLGVBQWUsd0NBU08sY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRTtVQUNyRDs7O1lBVkMsZUFBZTtJQUFTLFdBQVc7O1NBYWpDLGNBQWMsR0FBZCxjQUFjO1NBQUUsZUFBZSxHQUFmLGVBQWUsQyIsImZpbGUiOiI3YzNlZTdjODgyZGY5NWRlYzIzMy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgN2MzZWU3Yzg4MmRmOTVkZWMyMzNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQge2RlZmF1bHQgYXMgY29udHJvbGxlcnNfbW9kdWxlX25hbWV9IGZyb20gJy4vY29udHJvbGxlcnMnO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAgICduZ1JvdXRlJywgJ25nU2FuaXRpemUnLCAnbmdNZXNzYWdlcycsXG4gICAgJ3VpLmJvb3RzdHJhcCcsIFxuXG4gICAgJ25nVGFnc0lucHV0JyxcblxuICAgIGNvbnRyb2xsZXJzX21vZHVsZV9uYW1lLFxuXSlcbiAgLmNvbmZpZyhBcHBSb3V0ZXIpXG4gIC5jb25maWcoU2V0Q1NGUik7XG5cbkFwcFJvdXRlci4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuZnVuY3Rpb24gQXBwUm91dGVyKCRyb3V0ZVByb3ZpZGVyKSB7XG4gICAgJHJvdXRlUHJvdmlkZXIud2hlbignLycsIHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbGlzdC5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0xpc3RDb250cm9sbGVyJyxcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBsb2FkOiBMb2FkTGlzdCxcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLndoZW4oJy9pdGVtLzpudW1iZXInLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2l0ZW0uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdJdGVtQ29udHJvbGxlcicsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgbG9hZDogTmV3TGlzdE9uUmVmcmVzaCxcbiAgICAgICAgfSxcbiAgICB9KVxuICAgIC53aGVuKCcvY29uZmlybScsIHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvY29uZmlybS5odG1sJywgXG4gICAgICAgIGNvbnRyb2xsZXI6ICdDb25maXJtQ29udHJvbGxlcicsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgbG9hZDogTmV3TGlzdE9uUmVmcmVzaCxcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cblxuU2V0Q1NGUi4kaW5qZWN0ID0gWyckaHR0cFByb3ZpZGVyJ107XG5mdW5jdGlvbiBTZXRDU0ZSKCRodHRwUHJvdmlkZXIpIHtcbiAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLnhzcmZDb29raWVOYW1lID0gJ2NzcmZ0b2tlbic7XG4gICAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy54c3JmSGVhZGVyTmFtZSA9ICdYLUNTUkZUb2tlbic7XG59XG5cbk5ld0xpc3RPblJlZnJlc2guJGluamVjdCA9IFsnJHEnLCAnJGxvY2F0aW9uJywgJ2xpc3QnXTtcbmZ1bmN0aW9uIE5ld0xpc3RPblJlZnJlc2goJHEsICRsb2NhdGlvbiwgbGlzdCkge1xuICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgIGlmIChsaXN0LnRpdGxlKCkgPT09ICcnKSB7XG4gICAgICAgIC8vbG9naWMgaXMgaWYgdGhlIGxpc3QgaGFzIG5vIHRpdGxlLCB0aGVuXG4gICAgICAgIC8vdGhlIHBhZ2UgbXVzdCBoYXZlIGJlZW4gbWFudWFsbHkgcmVmcmVzaGVkXG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgfVxufVxuXG5Mb2FkTGlzdC4kaW5qZWN0ID0gWyckcScsICckaHR0cCcsICckbG9jYXRpb24nLCAnbGlzdCddO1xuZnVuY3Rpb24gTG9hZExpc3QoJHEsICRodHRwLCAkbG9jYXRpb24sIGxpc3QpIHtcbiAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgXG4gICAgdmFyIHNsdWdfd2l0aF9oYXNoID0gJGxvY2F0aW9uLmFic1VybCgpLnNwbGl0KCdlZGl0LycpWzFdO1xuICAgIHZhciBzbHVnID0gc2x1Z193aXRoX2hhc2guc3Vic3RyaW5nKDAsIHNsdWdfd2l0aF9oYXNoLmxlbmd0aCAtMik7XG4gICAgXG4gICAgJGh0dHAuZ2V0KCcvbGlzdHMvanNvbi8nICsgc2x1ZylcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICBsaXN0LnJlc2V0KCk7XG4gICAgICAgdmFyIGxpc3RfZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgbGlzdC50aXRsZShsaXN0X2RhdGEudGl0bGUpO1xuICAgICAgIGxpc3QuY2FwYWNpdHkobGlzdF9kYXRhLm51bWJlcik7XG4gICAgICAgbGlzdC5zbHVnKHNsdWcpO1xuICAgICAgIGZvciAobGV0IHRhZ19pZCBvZiBsaXN0X2RhdGEudGFncykge1xuICAgICAgICAgICAgbGlzdC5hZGRUYWdCeUlkKHRhZ19pZCk7XG4gICAgICAgfVxuXG4gICAgICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0X2RhdGEubGlzdCkge1xuICAgICAgICAgICAgbGV0IF9pdGVtID0gbGlzdC5uZXdJdGVtKGl0ZW0udGl0bGUsIGl0ZW0uZGVzY3JpcHRpb25fbWV0YSk7XG4gICAgICAgICAgICBsaXN0LnB1c2goX2l0ZW0pO1xuICAgICAgIH1cbiAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgfSwgZGVmZXJyZWQucmVqZWN0KTtcblxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvZWRpdGxpc3QvYXBwLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2RlZmF1bHQgYXMgTGlzdENvbnRyb2xsZXJ9IGZyb20gJy4uL2NvbnRyb2xsZXJzL2xpc3QnXG5pbXBvcnQge2RlZmF1bHQgYXMgSXRlbUNvbnRyb2xsZXJ9IGZyb20gJy4uL2NvbnRyb2xsZXJzL2l0ZW0nXG5pbXBvcnQge2RlZmF1bHQgYXMgQ29uZmlybUNvbnRyb2xsZXJ9IGZyb20gJy4uL2NvbnRyb2xsZXJzL2NvbmZpcm0nXG5pbXBvcnQge2RlZmF1bHQgYXMgc2VydmljZXNfbW9kdWxlX25hbWV9IGZyb20gJy4vc2VydmljZXMnIFxuXG52YXIgY29udHJvbGxlcnNfbW9kdWxlX25hbWUgPSAnYXBwLmNvbnRyb2xsZXJzJztcblxuYW5ndWxhci5tb2R1bGUoY29udHJvbGxlcnNfbW9kdWxlX25hbWUsIFtcbiAgICBzZXJ2aWNlc19tb2R1bGVfbmFtZVxuXSlcbiAgLmNvbnRyb2xsZXIoJ0xpc3RDb250cm9sbGVyJywgTGlzdENvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdJdGVtQ29udHJvbGxlcicsIEl0ZW1Db250cm9sbGVyKVxuICAuY29udHJvbGxlcignQ29uZmlybUNvbnRyb2xsZXInLCBDb25maXJtQ29udHJvbGxlcik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRyb2xsZXJzX21vZHVsZV9uYW1lO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvZWRpdGxpc3QvY29udHJvbGxlcnMuanNcbiAqKi8iLCIgY2xhc3MgTGlzdENvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKCRsb2NhdGlvbiwgbGlzdCkge1xuICAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgICAgdGhpcy5saXN0ID0gbGlzdDtcblxuICAgICAgICB0aGlzLnRvcF9uID0gdGhpcy5saXN0LmNhcGFjaXR5KCk7XG4gICAgICAgIHRoaXMubGlzdF90aXRsZSA9IHRoaXMubGlzdC50aXRsZSgpO1xuICAgICAgICB0aGlzLnRhZ3MgPSB0aGlzLmxpc3QudGFncygpO1xuICAgIH1cblxuICAgIHBvc3NpYmxlX3RhZ3MocXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5wb3NzaWJsZVRhZ3MoKTtcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICB0aGlzLmxpc3QuY2xlYXJUYWdzKCk7XG4gICAgICAgIGZvcihsZXQgdGFnIG9mIHRoaXMudGFncykge1xuICAgICAgICAgICAgdGhpcy5saXN0LmFkZFRhZyh0YWcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdC50aXRsZSh0aGlzLmxpc3RfdGl0bGUpO1xuICAgICAgICB0aGlzLmxpc3QuY2FwYWNpdHkodGhpcy50b3Bfbik7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9pdGVtLzEnKTtcbiAgICB9XG59XG5MaXN0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9jYXRpb24nLCAnbGlzdCddO1xuZXhwb3J0IGRlZmF1bHQgTGlzdENvbnRyb2xsZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9jb250cm9sbGVycy9saXN0LmpzXG4gKiovIiwiIGNsYXNzIEl0ZW1Db250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcigkcm91dGUsICRsb2NhdGlvbiwgbGlzdCkge1xuICAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgICAgdGhpcy5saXN0ID0gbGlzdDtcblxuICAgICAgICB0aGlzLnRvcF9uID0gbGlzdC5jYXBhY2l0eSgpO1xuICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSBsaXN0LnRpdGxlKCk7XG4gICAgXG4gICAgICAgIHRoaXMubnVtYmVyID0gcGFyc2VJbnQoJHJvdXRlLmN1cnJlbnQucGFyYW1zLm51bWJlcik7XG4gICAgICAgIHRoaXMucHJldmlld19yYWRpbyA9ICdlZGl0JztcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBuZXcgUXVpbGwoJyNlZGl0b3InLCB7XG4gICAgICAgICAgICBtb2R1bGVzOiB7XG4gICAgICAgICAgICAgICAgJ3Rvb2xiYXInOiB7Y29udGFpbmVyOiAnI3Rvb2xiYXInfSxcbiAgICAgICAgICAgICAgICAnaW1hZ2UtdG9vbHRpcCc6IHRydWUsXG4gICAgICAgICAgICAgICAgJ2xpbmstdG9vbHRpcCc6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhlbWU6ICdzbm93JyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pZHggPSB0aGlzLm51bWJlciAtIDE7XG4gICAgICAgIHRoaXMuaXRlbSA9IGxpc3QuaXRlbSh0aGlzLmlkeCk7XG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLml0ZW0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW0gPSB0aGlzLmxpc3QubmV3SXRlbSgpO1xuICAgICAgICAgICAgaWYodGhpcy5saXN0LnNpemUoKSA8IHRoaXMubGlzdC5jYXBhY2l0eSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2godGhpcy5pdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLml0ZW1fdGl0bGUgPSB0aGlzLml0ZW0udGl0bGUoKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3X2h0bWwgPSB0aGlzLml0ZW0ucHJldmlldygpO1xuICAgICAgICB0aGlzLmVkaXRvci5zZXRIVE1MKHRoaXMuaXRlbS5lZGl0KCkpO1xuICAgIH1cbiAgICBcbiAgICBzaG93X3ByZXZpZXcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZXZpZXdfcmFkaW8gPT09ICdwcmV2aWV3JztcbiAgICB9XG4gICAgXG4gICAgZ2VuZXJhdGVfcHJldmlldygpIHtcbiAgICAgICAgdGhpcy5pdGVtLmVkaXQodGhpcy5lZGl0b3IuZ2V0SFRNTCgpKTtcbiAgICAgICAgdGhpcy5odG1sX3ByZXZpZXcgPSB0aGlzLml0ZW0ucHJldmlldygpO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIHRoaXMuaXRlbS5lZGl0KHRoaXMuZWRpdG9yLmdldEhUTUwoKSk7XG4gICAgICAgIHRoaXMuaXRlbS50aXRsZSh0aGlzLml0ZW1fdGl0bGUpO1xuICAgICAgICB0aGlzLmxpc3QuaXRlbSh0aGlzLmlkeCwgdGhpcy5pdGVtKTsgXG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgIGlmICh0aGlzLm51bWJlciA8IHRoaXMudG9wX24pIHsgICAgXG4gICAgICAgICAgICB2YXIgbmV4dF9udW1iZXIgPSAodGhpcy5udW1iZXIgKyAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aCgnL2l0ZW0vJyArIG5leHRfbnVtYmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9jb25maXJtJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiYWNrKCkge1xuICAgICAgICB0aGlzLnNhdmUoKTsgIFxuICAgICAgICBpZiAodGhpcy5pZHggPiAwKSB7ICAgIFxuICAgICAgICAgICAgdmFyIG5leHRfbnVtYmVyID0gKHRoaXMubnVtYmVyIC0gMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9pdGVtLycgKyBuZXh0X251bWJlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgICAgIH0gXG4gICAgfVxufVxuXG5JdGVtQ29udHJvbGxlci4kaW5qZWN0ID0gWyckcm91dGUnLCAnJGxvY2F0aW9uJywgJ2xpc3QnXTtcblxuZXhwb3J0IGRlZmF1bHQgSXRlbUNvbnRyb2xsZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9jb250cm9sbGVycy9pdGVtLmpzXG4gKiovIiwiIGNsYXNzIENvbmZpcm1Db250cm9sbGVyIHtcbiAgIGNvbnN0cnVjdG9yKCRsb2NhdGlvbiwgJHdpbmRvdywgbGlzdCkge1xuICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gICAgICAgdGhpcy5saXN0ID0gbGlzdDtcbiAgICAgICBcbiAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5saXN0Lml0ZW1zKCk7XG4gICAgICAgdGhpcy5saXN0X3RpdGxlID0gdGhpcy5saXN0LnRpdGxlKCk7XG4gICAgICAgdGhpcy50b3BfbiA9IHRoaXMubGlzdC5jYXBhY2l0eSgpO1xuICAgICAgIHRoaXMudGFncyA9IHRoaXMubGlzdC50YWdzKCk7XG4gICB9XG5cbiAgIGJhY2soKSB7XG4gICAgICAgIHZhciBuZXh0X251bWJlciA9IHRoaXMudG9wX24udG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24udXJsKCcvaXRlbS8nICsgbmV4dF9udW1iZXIpO1xuICAgfVxuXG4gICBmaW5pc2goKSB7XG4gICAgICAgIHRoaXMubGlzdC51cGxvYWQoKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHZhciBzbHVnID0gcmVzcG9uc2UuZGF0YS5zbHVnO1xuICAgICAgICAgICAgLy90aGlzLmxpc3QucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9saXN0cy9kZXRhaWwvJyArIHNsdWc7XG4gICAgICAgIH0pO1xuICAgfVxufVxuXG5Db25maXJtQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9jYXRpb24nLCAnJHdpbmRvdycsICdsaXN0J107XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1Db250cm9sbGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvY29udHJvbGxlcnMvY29uZmlybS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtFZGl0TGlzdFNlcnZpY2UgYXMgTGlzdFNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2xpc3QnOyAgICBcblxudmFyIHNlcnZpY2VzX21vZHVsZV9uYW1lID0gJ2FwcC5zZXJ2aWNlcyc7XG5cbmFuZ3VsYXIubW9kdWxlKHNlcnZpY2VzX21vZHVsZV9uYW1lLCBbXSlcbiAgLnNlcnZpY2UoJ2xpc3QnLCBMaXN0U2VydmljZSk7XG5cbmV4cG9ydCBkZWZhdWx0IHNlcnZpY2VzX21vZHVsZV9uYW1lO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvZWRpdGxpc3Qvc2VydmljZXMuanNcbiAqKi8iLCJjbGFzcyBMaXN0SXRlbSB7XG4gICAgY29uc3RydWN0b3IoJHNjZSwgdGl0bGU9JycsIHJhd19odG1sPScnKSB7XG4gICAgICAgIHRoaXMuJHNjZSA9ICRzY2U7XG4gICAgICAgIHRoaXMudGl0bGUodGl0bGUpO1xuICAgICAgICB0aGlzLmVkaXQocmF3X2h0bWwpO1xuICAgIH1cblxuICAgIF9yZXBsYWNlQ2x5cEl0TGlua3MoaHRtbCkge1xuICAgICAgICBsZXQgQ0lfTElOS19SRSA9IC8oPzpodHRwcz86XFwvXFwvKT8oPzp3d3dcXC4pPyg/OmNseXBcXC5pdClcXC8oKFxcdyl7OH0pL2c7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZV9saW5rcyhfLCBzb3VuZF9pZCl7XG4gICAgICAgICAgICByZXR1cm4gYDxpZnJhbWUgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTYwXCIgXG4gICAgICAgICAgIHNyYz1cImh0dHBzOi8vY2x5cC5pdC8ke3NvdW5kX2lkfS93aWRnZXRcIiBcbiAgICAgICAgICAgZnJhbWVib3JkZXI9XCIwXCI+PC9pZnJhbWU+YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKENJX0xJTktfUkUsIHJlcGxhY2VfbGlua3MpO1xuICAgIH1cblxuICAgIF9yZXBsYWNlUXVvdGVCbG9ja3MoaHRtbCkge1xuICAgICAgIGxldCBRVU9URV9SRSA9IC9gKFsuIFxcbl0rKWAvZztcbiAgICAgICBcbiAgICAgICBmdW5jdGlvbiByZXBsYWNlX3F1b3RlcyhfLCBtYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIGA8YmxvY2txdW90ZT4ke21hdGNofTwvYmxvY2txdW90ZT5gO1xuICAgICAgIH1cbiAgICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKFFVT1RFX1JFLCByZXBsYWNlX3F1b3Rlcyk7XG4gICAgfVxuXG4gICAgX3JlcGxhY2VZb3VUdWJlTGlua3MoaHRtbCkgeyAgICAgICAgIFxuICAgICAgICBsZXQgWVRfTElOS19SRSA9IC8oPzpodHRwcz86XFwvXFwvKT8oPzp3d3dcXC4pPyg/OnlvdXR1XFwuYmVcXC98eW91dHViZVxcLmNvbVxcLyg/OmVtYmVkXFwvfHZcXC98d2F0Y2hcXD92PXx3YXRjaFxcPy4rJnY9KSkoKFxcd3wtKXsxMX0pL2c7XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlX2xpbmtzKF8sIHZpZGVvX2lkKSB7ICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gYDxpZnJhbWUgd2lkdGg9XCI1NjBcIiBoZWlnaHQ9XCIzMTVcIlxuICAgICAgICAgICAgICBzcmM9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3ZpZGVvX2lkfVwiXG4gICAgICAgICAgICAgIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93ZnVsbHNjcmVlbj5cbiAgICAgICAgICAgICAgPC9pZnJhbWU+YDtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoWVRfTElOS19SRSwgcmVwbGFjZV9saW5rcyk7XG4gICAgfVxuICAgIFxuICAgIF9wcm9jZXNzKHJhd19odG1sKSB7XG4gICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IHRoaXMuX3JlcGxhY2VRdW90ZUJsb2NrcyhyYXdfaHRtbCk7IFxuICAgICAgICBkZXNjcmlwdGlvbiA9IHRoaXMuX3JlcGxhY2VZb3VUdWJlTGlua3MoZGVzY3JpcHRpb24pO1xuICAgICAgICBkZXNjcmlwdGlvbiA9IHRoaXMuX3JlcGxhY2VDbHlwSXRMaW5rcyhkZXNjcmlwdGlvbik7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICB0aXRsZSh0aXRsZSkge1xuICAgICAgICBpZih0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1fdGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtX3RpdGxlO1xuICAgIH1cblxuICAgIGVkaXQocmF3X2h0bWwpIHtcbiAgICAgICAgaWYodHlwZW9mIHJhd19odG1sID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5yYXdfaHRtbCA9IHJhd19odG1sO1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWRfaHRtbCA9IHRoaXMuX3Byb2Nlc3MocmF3X2h0bWwpOyAgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmF3X2h0bWw7XG4gICAgfVxuXG4gICAgcHJldmlldyh0cnVzdEFzPXRydWUpIHtcbiAgICAgICAgaWYodHJ1c3RBcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjZS50cnVzdEFzSHRtbCh0aGlzLnByb2Nlc3NlZF9odG1sKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NlZF9odG1sO1xuICAgICAgICB9XG4gICAgfSBcblxuICAgIHJlcHIoKSB7XG4gICAgICAgIHZhciBfb2JqID0ge307XG4gICAgICAgIF9vYmoudGl0bGUgPSB0aGlzLnRpdGxlKCk7XG4gICAgICAgIF9vYmouZGVzY3JpcHRpb24gPSB0aGlzLmVkaXQoKTtcbiAgICAgICAgX29iai5kZXNjcmlwdGlvbl9tZXRhID0gdGhpcy5wcmV2aWV3KGZhbHNlKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBfb2JqO1xuICAgfVxuXG59XG5cbmNsYXNzIExpc3RTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigkaHR0cCwgJHNjZSwgJGxvY2F0aW9uLCAkcSkge1xuICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gICAgICAgIHRoaXMuJHNjZSA9ICRzY2U7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgICB0aGlzLiRxID0gJHE7XG5cbiAgICAgICAgdGhpcy50b3BfbiA9IDEwO1xuICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSAnJztcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zID0gW107XG5cbiAgICAgICAgdGhpcy5wb3NzaWJsZV90YWdzID0gW3tcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgdGV4dDogJ011c2ljJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogMixcbiAgICAgICAgICAgIHRleHQ6ICdNb3ZpZXMnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAzLFxuICAgICAgICAgICAgdGV4dDogJ1RWJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogNCxcbiAgICAgICAgICAgIHRleHQ6ICdTY2llbmNlJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogNSxcbiAgICAgICAgICAgIHRleHQ6ICdQb2xpdGljcydcbiAgICAgICAgfV07XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxpc3RfdGFncyA9IFtdOyBcbiAgICB9XG4gXG4gICAgcG9zc2libGVUYWdzKCkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSB0aGlzLiRxLmRlZmVyKCk7XG5cbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7XG4gICAgICAgICAgICBkYXRhOnRoaXMucG9zc2libGVfdGFnc1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9XG5cbiAgICBpdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdF9pdGVtcztcbiAgICB9XG5cbiAgICB0YWdzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0X3RhZ3Muc2xpY2UoKTtcbiAgICB9XG4gICAgXG4gICAgYWRkVGFnQnlJZChpZCkge1xuICAgICAgICBmb3IobGV0IF9wb3NzaWJsZV90YWcgb2YgdGhpcy5wb3NzaWJsZV90YWdzKSB7XG4gICAgICAgICAgICBpZihfcG9zc2libGVfdGFnLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdF90YWdzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBfcG9zc2libGVfdGFnLnRleHQsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBfcG9zc2libGVfdGFnLmlkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFRhZyh0YWcpIHtcbiAgICAgICAgZm9yKGxldCBfdGFnIG9mIHRoaXMubGlzdF90YWdzKSB7XG4gICAgICAgICAgICBpZihfdGFnLnRleHQgPT09IHRhZy50ZXh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBfcG9zc2libGVfdGFnIG9mIHRoaXMucG9zc2libGVfdGFncykge1xuICAgICAgICAgICAgaWYoX3Bvc3NpYmxlX3RhZy50ZXh0ID09PSB0YWcudGV4dCkge1xuICAgICAgICAgICAgICAgIHRhZy5pZCA9IF9wb3NzaWJsZV90YWcuaWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0X3RhZ3MucHVzaCh0YWcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyVGFncyh0YWcpIHtcbiAgICAgICAgdGhpcy5saXN0X3RhZ3MgPSBbXTtcbiAgICB9XG5cbiAgICB0aXRsZSh0aXRsZSkge1xuICAgICAgICBpZih0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5saXN0X3RpdGxlO1xuICAgIH1cblxuICAgIG5ld0l0ZW0odGl0bGUsIHJhd19odG1sKSB7XG4gICAgICAgIHJldHVybiBuZXcgTGlzdEl0ZW0odGhpcy4kc2NlLCB0aXRsZSwgcmF3X2h0bWwpO1xuICAgIH1cbiAgICBcbiAgICBfaW5ib3VuZHMoaWR4KSB7XG4gICAgICAgIHJldHVybiBpZHggPCB0aGlzLnNpemUoKSAmJiBpZHggPj0gMDtcbiAgICB9XG5cbiAgICBpdGVtKGlkeCwgaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5faW5ib3VuZHMoaWR4KSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdF9pdGVtc1tpZHhdID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RfaXRlbXNbaWR4XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gXG5cbiAgICBwdXNoKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zLnB1c2goaXRlbSk7ICAgIFxuICAgIH1cblxuICAgIHBvcCgpIHtcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zLnBvcCgpO1xuICAgIH1cblxuICAgIGNhcGFjaXR5KG4pIHtcbiAgICAgICAgaWYodHlwZW9mIG4gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLnRvcF9uID0gbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50b3BfbjtcbiAgICB9XG5cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0X2l0ZW1zLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5saXN0X3RpdGxlID0gJyc7XG4gICAgICAgIHRoaXMudG9wX24gPSA1O1xuICAgICAgICB0aGlzLmxpc3RfaXRlbXMgPSBbXTtcbiAgICB9XG5cbiAgICB1cGxvYWQoZW5kcG9pbnQpIHtcbiAgICAgICAgdmFyIF9wYXlsb2FkID0ge307XG4gICAgICAgIF9wYXlsb2FkLmxpc3QgPSB0aGlzLmxpc3RfaXRlbXMubWFwKChfaXRlbSkgPT4gX2l0ZW0ucmVwcigpKTtcbiAgICAgICAgX3BheWxvYWQubnVtYmVyID0gdGhpcy50b3BfbjtcbiAgICAgICAgX3BheWxvYWQudGl0bGUgPSB0aGlzLmxpc3RfdGl0bGU7XG4gICAgICAgIF9wYXlsb2FkLnRhZ3MgPSB0aGlzLmxpc3RfdGFncy5tYXAoKF9pdGVtKSA9PiBfaXRlbS5pZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKF9wYXlsb2FkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAucG9zdChlbmRwb2ludCwgX3BheWxvYWQpO1xuICAgIH1cbn1cblxuTGlzdFNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJHNjZScsICckbG9jYXRpb24nLCAnJHEnXTtcblxuY2xhc3MgQWRkTGlzdFNlcnZpY2UgZXh0ZW5kcyBMaXN0U2VydmljZSB7XG4gICAgdXBsb2FkKCkge1xuICAgICAgICByZXR1cm4gc3VwZXIudXBsb2FkKCcvbGlzdHMvbmV3Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBFZGl0TGlzdFNlcnZpY2UgZXh0ZW5kcyBMaXN0U2VydmljZSB7XG4gICAgc2x1ZyhzKSB7XG4gICAgICAgIGlmKHR5cGVvZiBzID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICB0aGlzLmxpc3Rfc2x1ZyA9IHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdF9zbHVnO1xuICAgIH1cbiAgICBcbiAgICB1cGxvYWQoKSB7XG4gICAgICAgIHJldHVybiBzdXBlci51cGxvYWQoJy9saXN0cy9lZGl0LycgKyB0aGlzLnNsdWcoKSk7XG4gICAgfVxufVxuXG5leHBvcnQge0FkZExpc3RTZXJ2aWNlLCBFZGl0TGlzdFNlcnZpY2V9O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvc2VydmljZXMvbGlzdC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=
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
	            var QUOTE_RE = /`([\s\S]+)`/g;
	
	            function replace_quotes(_, match) {
	                var match_nl = match.replace(/<\/div\s*><div\s*>/gi, '<br>');
	                console.log(match_nl);
	                return '<div><blockquote>' + match_nl + '</blockquote></div>';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2U4NzU5OTM4Mzc2NmFjNDUyMjgiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvbGlzdHMvZWRpdGxpc3QvY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2l0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2NvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9saXN0cy9zZXJ2aWNlcy9saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztvRENyQ2lELENBQWU7Ozs7QUFEaEUsYUFBWSxDQUFDOztBQUdiLFFBQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQ2xCLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUNyQyxjQUFjLEVBRWQsYUFBYSx1Q0FHaEIsQ0FBQyxDQUNDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVuQixVQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN2QyxVQUFTLFNBQVMsQ0FBQyxjQUFjLEVBQUU7QUFDL0IsbUJBQWMsQ0FBQyxJQUFJLENBQUMs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QUFDeEQsb0JBQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEIsb0JBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1VBQzlDOzs7WUEzSUMsV0FBVzs7O0FBOElqQixZQUFXLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7O0tBRXJELGNBQWM7Y0FBZCxjQUFjOytCQUFkLGNBQWM7Ozs7Ozs7ZUFBZCxjQUFjOztrQkFBZCxjQUFjOztnQkFDVixrQkFBRztBQUNMLCtDQUZGLGNBQWMsd0NBRVEsWUFBWSxFQUFFO1VBQ3JDOzs7WUFIQyxjQUFjO0lBQVMsV0FBVzs7S0FNbEMsZUFBZTtjQUFmLGVBQWU7K0JBQWYsZUFBZTs7Ozs7OztlQUFmLGVBQWU7O2tCQUFmLGVBQWU7O2dCQUNiLGNBQUMsQ0FBQyxFQUFFO0FBQ0osaUJBQUcsT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFDO0FBQ3JCLHFCQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztjQUN0QjtBQUNELG9CQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7VUFDekI7OztnQkFFSyxrQkFBRztBQUNMLCtDQVRGLGVBQWUsd0NBU08sY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRTtVQUNyRDs7O1lBVkMsZUFBZTtJQUFTLFdBQVc7O1NBYWpDLGNBQWMsR0FBZCxjQUFjO1NBQUUsZUFBZSxHQUFmLGVBQWUsQyIsImZpbGUiOiJjZTg3NTk5MzgzNzY2YWM0NTIyOC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgY2U4NzU5OTM4Mzc2NmFjNDUyMjhcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQge2RlZmF1bHQgYXMgY29udHJvbGxlcnNfbW9kdWxlX25hbWV9IGZyb20gJy4vY29udHJvbGxlcnMnO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAgICduZ1JvdXRlJywgJ25nU2FuaXRpemUnLCAnbmdNZXNzYWdlcycsXG4gICAgJ3VpLmJvb3RzdHJhcCcsIFxuXG4gICAgJ25nVGFnc0lucHV0JyxcblxuICAgIGNvbnRyb2xsZXJzX21vZHVsZV9uYW1lLFxuXSlcbiAgLmNvbmZpZyhBcHBSb3V0ZXIpXG4gIC5jb25maWcoU2V0Q1NGUik7XG5cbkFwcFJvdXRlci4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuZnVuY3Rpb24gQXBwUm91dGVyKCRyb3V0ZVByb3ZpZGVyKSB7XG4gICAgJHJvdXRlUHJvdmlkZXIud2hlbignLycsIHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbGlzdC5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0xpc3RDb250cm9sbGVyJyxcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBsb2FkOiBMb2FkTGlzdCxcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLndoZW4oJy9pdGVtLzpudW1iZXInLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2l0ZW0uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdJdGVtQ29udHJvbGxlcicsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgbG9hZDogTmV3TGlzdE9uUmVmcmVzaCxcbiAgICAgICAgfSxcbiAgICB9KVxuICAgIC53aGVuKCcvY29uZmlybScsIHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvY29uZmlybS5odG1sJywgXG4gICAgICAgIGNvbnRyb2xsZXI6ICdDb25maXJtQ29udHJvbGxlcicsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgbG9hZDogTmV3TGlzdE9uUmVmcmVzaCxcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cblxuU2V0Q1NGUi4kaW5qZWN0ID0gWyckaHR0cFByb3ZpZGVyJ107XG5mdW5jdGlvbiBTZXRDU0ZSKCRodHRwUHJvdmlkZXIpIHtcbiAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLnhzcmZDb29raWVOYW1lID0gJ2NzcmZ0b2tlbic7XG4gICAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy54c3JmSGVhZGVyTmFtZSA9ICdYLUNTUkZUb2tlbic7XG59XG5cbk5ld0xpc3RPblJlZnJlc2guJGluamVjdCA9IFsnJHEnLCAnJGxvY2F0aW9uJywgJ2xpc3QnXTtcbmZ1bmN0aW9uIE5ld0xpc3RPblJlZnJlc2goJHEsICRsb2NhdGlvbiwgbGlzdCkge1xuICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgIGlmIChsaXN0LnRpdGxlKCkgPT09ICcnKSB7XG4gICAgICAgIC8vbG9naWMgaXMgaWYgdGhlIGxpc3QgaGFzIG5vIHRpdGxlLCB0aGVuXG4gICAgICAgIC8vdGhlIHBhZ2UgbXVzdCBoYXZlIGJlZW4gbWFudWFsbHkgcmVmcmVzaGVkXG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgfVxufVxuXG5Mb2FkTGlzdC4kaW5qZWN0ID0gWyckcScsICckaHR0cCcsICckbG9jYXRpb24nLCAnbGlzdCddO1xuZnVuY3Rpb24gTG9hZExpc3QoJHEsICRodHRwLCAkbG9jYXRpb24sIGxpc3QpIHtcbiAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgXG4gICAgdmFyIHNsdWdfd2l0aF9oYXNoID0gJGxvY2F0aW9uLmFic1VybCgpLnNwbGl0KCdlZGl0LycpWzFdO1xuICAgIHZhciBzbHVnID0gc2x1Z193aXRoX2hhc2guc3Vic3RyaW5nKDAsIHNsdWdfd2l0aF9oYXNoLmxlbmd0aCAtMik7XG4gICAgXG4gICAgJGh0dHAuZ2V0KCcvbGlzdHMvanNvbi8nICsgc2x1ZylcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICBsaXN0LnJlc2V0KCk7XG4gICAgICAgdmFyIGxpc3RfZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgbGlzdC50aXRsZShsaXN0X2RhdGEudGl0bGUpO1xuICAgICAgIGxpc3QuY2FwYWNpdHkobGlzdF9kYXRhLm51bWJlcik7XG4gICAgICAgbGlzdC5zbHVnKHNsdWcpO1xuICAgICAgIGZvciAobGV0IHRhZ19pZCBvZiBsaXN0X2RhdGEudGFncykge1xuICAgICAgICAgICAgbGlzdC5hZGRUYWdCeUlkKHRhZ19pZCk7XG4gICAgICAgfVxuXG4gICAgICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0X2RhdGEubGlzdCkge1xuICAgICAgICAgICAgbGV0IF9pdGVtID0gbGlzdC5uZXdJdGVtKGl0ZW0udGl0bGUsIGl0ZW0uZGVzY3JpcHRpb25fbWV0YSk7XG4gICAgICAgICAgICBsaXN0LnB1c2goX2l0ZW0pO1xuICAgICAgIH1cbiAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgfSwgZGVmZXJyZWQucmVqZWN0KTtcblxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvZWRpdGxpc3QvYXBwLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2RlZmF1bHQgYXMgTGlzdENvbnRyb2xsZXJ9IGZyb20gJy4uL2NvbnRyb2xsZXJzL2xpc3QnXG5pbXBvcnQge2RlZmF1bHQgYXMgSXRlbUNvbnRyb2xsZXJ9IGZyb20gJy4uL2NvbnRyb2xsZXJzL2l0ZW0nXG5pbXBvcnQge2RlZmF1bHQgYXMgQ29uZmlybUNvbnRyb2xsZXJ9IGZyb20gJy4uL2NvbnRyb2xsZXJzL2NvbmZpcm0nXG5pbXBvcnQge2RlZmF1bHQgYXMgc2VydmljZXNfbW9kdWxlX25hbWV9IGZyb20gJy4vc2VydmljZXMnIFxuXG52YXIgY29udHJvbGxlcnNfbW9kdWxlX25hbWUgPSAnYXBwLmNvbnRyb2xsZXJzJztcblxuYW5ndWxhci5tb2R1bGUoY29udHJvbGxlcnNfbW9kdWxlX25hbWUsIFtcbiAgICBzZXJ2aWNlc19tb2R1bGVfbmFtZVxuXSlcbiAgLmNvbnRyb2xsZXIoJ0xpc3RDb250cm9sbGVyJywgTGlzdENvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdJdGVtQ29udHJvbGxlcicsIEl0ZW1Db250cm9sbGVyKVxuICAuY29udHJvbGxlcignQ29uZmlybUNvbnRyb2xsZXInLCBDb25maXJtQ29udHJvbGxlcik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRyb2xsZXJzX21vZHVsZV9uYW1lO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvZWRpdGxpc3QvY29udHJvbGxlcnMuanNcbiAqKi8iLCIgY2xhc3MgTGlzdENvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKCRsb2NhdGlvbiwgbGlzdCkge1xuICAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgICAgdGhpcy5saXN0ID0gbGlzdDtcblxuICAgICAgICB0aGlzLnRvcF9uID0gdGhpcy5saXN0LmNhcGFjaXR5KCk7XG4gICAgICAgIHRoaXMubGlzdF90aXRsZSA9IHRoaXMubGlzdC50aXRsZSgpO1xuICAgICAgICB0aGlzLnRhZ3MgPSB0aGlzLmxpc3QudGFncygpO1xuICAgIH1cblxuICAgIHBvc3NpYmxlX3RhZ3MocXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5wb3NzaWJsZVRhZ3MoKTtcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICB0aGlzLmxpc3QuY2xlYXJUYWdzKCk7XG4gICAgICAgIGZvcihsZXQgdGFnIG9mIHRoaXMudGFncykge1xuICAgICAgICAgICAgdGhpcy5saXN0LmFkZFRhZyh0YWcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdC50aXRsZSh0aGlzLmxpc3RfdGl0bGUpO1xuICAgICAgICB0aGlzLmxpc3QuY2FwYWNpdHkodGhpcy50b3Bfbik7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9pdGVtLzEnKTtcbiAgICB9XG59XG5MaXN0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9jYXRpb24nLCAnbGlzdCddO1xuZXhwb3J0IGRlZmF1bHQgTGlzdENvbnRyb2xsZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9jb250cm9sbGVycy9saXN0LmpzXG4gKiovIiwiIGNsYXNzIEl0ZW1Db250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcigkcm91dGUsICRsb2NhdGlvbiwgbGlzdCkge1xuICAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgICAgdGhpcy5saXN0ID0gbGlzdDtcblxuICAgICAgICB0aGlzLnRvcF9uID0gbGlzdC5jYXBhY2l0eSgpO1xuICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSBsaXN0LnRpdGxlKCk7XG4gICAgXG4gICAgICAgIHRoaXMubnVtYmVyID0gcGFyc2VJbnQoJHJvdXRlLmN1cnJlbnQucGFyYW1zLm51bWJlcik7XG4gICAgICAgIHRoaXMucHJldmlld19yYWRpbyA9ICdlZGl0JztcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBuZXcgUXVpbGwoJyNlZGl0b3InLCB7XG4gICAgICAgICAgICBtb2R1bGVzOiB7XG4gICAgICAgICAgICAgICAgJ3Rvb2xiYXInOiB7Y29udGFpbmVyOiAnI3Rvb2xiYXInfSxcbiAgICAgICAgICAgICAgICAnaW1hZ2UtdG9vbHRpcCc6IHRydWUsXG4gICAgICAgICAgICAgICAgJ2xpbmstdG9vbHRpcCc6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhlbWU6ICdzbm93JyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pZHggPSB0aGlzLm51bWJlciAtIDE7XG4gICAgICAgIHRoaXMuaXRlbSA9IGxpc3QuaXRlbSh0aGlzLmlkeCk7XG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLml0ZW0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW0gPSB0aGlzLmxpc3QubmV3SXRlbSgpO1xuICAgICAgICAgICAgaWYodGhpcy5saXN0LnNpemUoKSA8IHRoaXMubGlzdC5jYXBhY2l0eSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2godGhpcy5pdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLml0ZW1fdGl0bGUgPSB0aGlzLml0ZW0udGl0bGUoKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3X2h0bWwgPSB0aGlzLml0ZW0ucHJldmlldygpO1xuICAgICAgICB0aGlzLmVkaXRvci5zZXRIVE1MKHRoaXMuaXRlbS5lZGl0KCkpO1xuICAgIH1cbiAgICBcbiAgICBzaG93X3ByZXZpZXcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZXZpZXdfcmFkaW8gPT09ICdwcmV2aWV3JztcbiAgICB9XG4gICAgXG4gICAgZ2VuZXJhdGVfcHJldmlldygpIHtcbiAgICAgICAgdGhpcy5pdGVtLmVkaXQodGhpcy5lZGl0b3IuZ2V0SFRNTCgpKTtcbiAgICAgICAgdGhpcy5odG1sX3ByZXZpZXcgPSB0aGlzLml0ZW0ucHJldmlldygpO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIHRoaXMuaXRlbS5lZGl0KHRoaXMuZWRpdG9yLmdldEhUTUwoKSk7XG4gICAgICAgIHRoaXMuaXRlbS50aXRsZSh0aGlzLml0ZW1fdGl0bGUpO1xuICAgICAgICB0aGlzLmxpc3QuaXRlbSh0aGlzLmlkeCwgdGhpcy5pdGVtKTsgXG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgIGlmICh0aGlzLm51bWJlciA8IHRoaXMudG9wX24pIHsgICAgXG4gICAgICAgICAgICB2YXIgbmV4dF9udW1iZXIgPSAodGhpcy5udW1iZXIgKyAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aCgnL2l0ZW0vJyArIG5leHRfbnVtYmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9jb25maXJtJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiYWNrKCkge1xuICAgICAgICB0aGlzLnNhdmUoKTsgIFxuICAgICAgICBpZiAodGhpcy5pZHggPiAwKSB7ICAgIFxuICAgICAgICAgICAgdmFyIG5leHRfbnVtYmVyID0gKHRoaXMubnVtYmVyIC0gMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9pdGVtLycgKyBuZXh0X251bWJlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgICAgIH0gXG4gICAgfVxufVxuXG5JdGVtQ29udHJvbGxlci4kaW5qZWN0ID0gWyckcm91dGUnLCAnJGxvY2F0aW9uJywgJ2xpc3QnXTtcblxuZXhwb3J0IGRlZmF1bHQgSXRlbUNvbnRyb2xsZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9jb250cm9sbGVycy9pdGVtLmpzXG4gKiovIiwiIGNsYXNzIENvbmZpcm1Db250cm9sbGVyIHtcbiAgIGNvbnN0cnVjdG9yKCRsb2NhdGlvbiwgJHdpbmRvdywgbGlzdCkge1xuICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gICAgICAgdGhpcy5saXN0ID0gbGlzdDtcbiAgICAgICBcbiAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5saXN0Lml0ZW1zKCk7XG4gICAgICAgdGhpcy5saXN0X3RpdGxlID0gdGhpcy5saXN0LnRpdGxlKCk7XG4gICAgICAgdGhpcy50b3BfbiA9IHRoaXMubGlzdC5jYXBhY2l0eSgpO1xuICAgICAgIHRoaXMudGFncyA9IHRoaXMubGlzdC50YWdzKCk7XG4gICB9XG5cbiAgIGJhY2soKSB7XG4gICAgICAgIHZhciBuZXh0X251bWJlciA9IHRoaXMudG9wX24udG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24udXJsKCcvaXRlbS8nICsgbmV4dF9udW1iZXIpO1xuICAgfVxuXG4gICBmaW5pc2goKSB7XG4gICAgICAgIHRoaXMubGlzdC51cGxvYWQoKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHZhciBzbHVnID0gcmVzcG9uc2UuZGF0YS5zbHVnO1xuICAgICAgICAgICAgLy90aGlzLmxpc3QucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9saXN0cy9kZXRhaWwvJyArIHNsdWc7XG4gICAgICAgIH0pO1xuICAgfVxufVxuXG5Db25maXJtQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9jYXRpb24nLCAnJHdpbmRvdycsICdsaXN0J107XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1Db250cm9sbGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvY29udHJvbGxlcnMvY29uZmlybS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtFZGl0TGlzdFNlcnZpY2UgYXMgTGlzdFNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2xpc3QnOyAgICBcblxudmFyIHNlcnZpY2VzX21vZHVsZV9uYW1lID0gJ2FwcC5zZXJ2aWNlcyc7XG5cbmFuZ3VsYXIubW9kdWxlKHNlcnZpY2VzX21vZHVsZV9uYW1lLCBbXSlcbiAgLnNlcnZpY2UoJ2xpc3QnLCBMaXN0U2VydmljZSk7XG5cbmV4cG9ydCBkZWZhdWx0IHNlcnZpY2VzX21vZHVsZV9uYW1lO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvZWRpdGxpc3Qvc2VydmljZXMuanNcbiAqKi8iLCJjbGFzcyBMaXN0SXRlbSB7XG4gICAgY29uc3RydWN0b3IoJHNjZSwgdGl0bGU9JycsIHJhd19odG1sPScnKSB7XG4gICAgICAgIHRoaXMuJHNjZSA9ICRzY2U7XG4gICAgICAgIHRoaXMudGl0bGUodGl0bGUpO1xuICAgICAgICB0aGlzLmVkaXQocmF3X2h0bWwpO1xuICAgIH1cblxuICAgIF9yZXBsYWNlQ2x5cEl0TGlua3MoaHRtbCkge1xuICAgICAgICBsZXQgQ0lfTElOS19SRSA9IC8oPzpodHRwcz86XFwvXFwvKT8oPzp3d3dcXC4pPyg/OmNseXBcXC5pdClcXC8oKFxcdyl7OH0pL2c7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZV9saW5rcyhfLCBzb3VuZF9pZCl7XG4gICAgICAgICAgICByZXR1cm4gYDxpZnJhbWUgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTYwXCIgXG4gICAgICAgICAgIHNyYz1cImh0dHBzOi8vY2x5cC5pdC8ke3NvdW5kX2lkfS93aWRnZXRcIiBcbiAgICAgICAgICAgZnJhbWVib3JkZXI9XCIwXCI+PC9pZnJhbWU+YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKENJX0xJTktfUkUsIHJlcGxhY2VfbGlua3MpO1xuICAgIH1cblxuICAgIF9yZXBsYWNlUXVvdGVCbG9ja3MoaHRtbCkge1xuICAgICAgIGxldCBRVU9URV9SRSA9IC9gKFtcXHNcXFNdKylgL2c7XG4gICAgICAgXG4gICAgICAgZnVuY3Rpb24gcmVwbGFjZV9xdW90ZXMoXywgbWF0Y2gpIHtcbiAgICAgICAgICAgIGxldCBtYXRjaF9ubCA9IG1hdGNoLnJlcGxhY2UoLzxcXC9kaXZcXHMqPjxkaXZcXHMqPi9naSwgJzxicj4nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1hdGNoX25sKTtcbiAgICAgICAgICAgIHJldHVybiBgPGRpdj48YmxvY2txdW90ZT4ke21hdGNoX25sfTwvYmxvY2txdW90ZT48L2Rpdj5gO1xuICAgICAgIH1cbiAgICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKFFVT1RFX1JFLCByZXBsYWNlX3F1b3Rlcyk7XG4gICAgfVxuXG4gICAgX3JlcGxhY2VZb3VUdWJlTGlua3MoaHRtbCkgeyAgICAgICAgIFxuICAgICAgICBsZXQgWVRfTElOS19SRSA9IC8oPzpodHRwcz86XFwvXFwvKT8oPzp3d3dcXC4pPyg/OnlvdXR1XFwuYmVcXC98eW91dHViZVxcLmNvbVxcLyg/OmVtYmVkXFwvfHZcXC98d2F0Y2hcXD92PXx3YXRjaFxcPy4rJnY9KSkoKFxcd3wtKXsxMX0pL2c7XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlX2xpbmtzKF8sIHZpZGVvX2lkKSB7ICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gYDxpZnJhbWUgd2lkdGg9XCI1NjBcIiBoZWlnaHQ9XCIzMTVcIlxuICAgICAgICAgICAgICBzcmM9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3ZpZGVvX2lkfVwiXG4gICAgICAgICAgICAgIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93ZnVsbHNjcmVlbj5cbiAgICAgICAgICAgICAgPC9pZnJhbWU+YDtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoWVRfTElOS19SRSwgcmVwbGFjZV9saW5rcyk7XG4gICAgfVxuICAgIFxuICAgIF9wcm9jZXNzKHJhd19odG1sKSB7XG4gICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IHRoaXMuX3JlcGxhY2VRdW90ZUJsb2NrcyhyYXdfaHRtbCk7IFxuICAgICAgICBkZXNjcmlwdGlvbiA9IHRoaXMuX3JlcGxhY2VZb3VUdWJlTGlua3MoZGVzY3JpcHRpb24pO1xuICAgICAgICBkZXNjcmlwdGlvbiA9IHRoaXMuX3JlcGxhY2VDbHlwSXRMaW5rcyhkZXNjcmlwdGlvbik7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICB0aXRsZSh0aXRsZSkge1xuICAgICAgICBpZih0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1fdGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtX3RpdGxlO1xuICAgIH1cblxuICAgIGVkaXQocmF3X2h0bWwpIHtcbiAgICAgICAgaWYodHlwZW9mIHJhd19odG1sID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5yYXdfaHRtbCA9IHJhd19odG1sO1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWRfaHRtbCA9IHRoaXMuX3Byb2Nlc3MocmF3X2h0bWwpOyAgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmF3X2h0bWw7XG4gICAgfVxuXG4gICAgcHJldmlldyh0cnVzdEFzPXRydWUpIHtcbiAgICAgICAgaWYodHJ1c3RBcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNjZS50cnVzdEFzSHRtbCh0aGlzLnByb2Nlc3NlZF9odG1sKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NlZF9odG1sO1xuICAgICAgICB9XG4gICAgfSBcblxuICAgIHJlcHIoKSB7XG4gICAgICAgIHZhciBfb2JqID0ge307XG4gICAgICAgIF9vYmoudGl0bGUgPSB0aGlzLnRpdGxlKCk7XG4gICAgICAgIF9vYmouZGVzY3JpcHRpb24gPSB0aGlzLmVkaXQoKTtcbiAgICAgICAgX29iai5kZXNjcmlwdGlvbl9tZXRhID0gdGhpcy5wcmV2aWV3KGZhbHNlKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBfb2JqO1xuICAgfVxuXG59XG5cbmNsYXNzIExpc3RTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigkaHR0cCwgJHNjZSwgJGxvY2F0aW9uLCAkcSkge1xuICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gICAgICAgIHRoaXMuJHNjZSA9ICRzY2U7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgICB0aGlzLiRxID0gJHE7XG5cbiAgICAgICAgdGhpcy50b3BfbiA9IDEwO1xuICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSAnJztcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zID0gW107XG5cbiAgICAgICAgdGhpcy5wb3NzaWJsZV90YWdzID0gW3tcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgdGV4dDogJ011c2ljJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogMixcbiAgICAgICAgICAgIHRleHQ6ICdNb3ZpZXMnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAzLFxuICAgICAgICAgICAgdGV4dDogJ1RWJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogNCxcbiAgICAgICAgICAgIHRleHQ6ICdTY2llbmNlJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogNSxcbiAgICAgICAgICAgIHRleHQ6ICdQb2xpdGljcydcbiAgICAgICAgfV07XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxpc3RfdGFncyA9IFtdOyBcbiAgICB9XG4gXG4gICAgcG9zc2libGVUYWdzKCkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSB0aGlzLiRxLmRlZmVyKCk7XG5cbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7XG4gICAgICAgICAgICBkYXRhOnRoaXMucG9zc2libGVfdGFnc1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9XG5cbiAgICBpdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdF9pdGVtcztcbiAgICB9XG5cbiAgICB0YWdzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0X3RhZ3Muc2xpY2UoKTtcbiAgICB9XG4gICAgXG4gICAgYWRkVGFnQnlJZChpZCkge1xuICAgICAgICBmb3IobGV0IF9wb3NzaWJsZV90YWcgb2YgdGhpcy5wb3NzaWJsZV90YWdzKSB7XG4gICAgICAgICAgICBpZihfcG9zc2libGVfdGFnLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdF90YWdzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBfcG9zc2libGVfdGFnLnRleHQsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBfcG9zc2libGVfdGFnLmlkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFRhZyh0YWcpIHtcbiAgICAgICAgZm9yKGxldCBfdGFnIG9mIHRoaXMubGlzdF90YWdzKSB7XG4gICAgICAgICAgICBpZihfdGFnLnRleHQgPT09IHRhZy50ZXh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBfcG9zc2libGVfdGFnIG9mIHRoaXMucG9zc2libGVfdGFncykge1xuICAgICAgICAgICAgaWYoX3Bvc3NpYmxlX3RhZy50ZXh0ID09PSB0YWcudGV4dCkge1xuICAgICAgICAgICAgICAgIHRhZy5pZCA9IF9wb3NzaWJsZV90YWcuaWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0X3RhZ3MucHVzaCh0YWcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyVGFncyh0YWcpIHtcbiAgICAgICAgdGhpcy5saXN0X3RhZ3MgPSBbXTtcbiAgICB9XG5cbiAgICB0aXRsZSh0aXRsZSkge1xuICAgICAgICBpZih0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5saXN0X3RpdGxlO1xuICAgIH1cblxuICAgIG5ld0l0ZW0odGl0bGUsIHJhd19odG1sKSB7XG4gICAgICAgIHJldHVybiBuZXcgTGlzdEl0ZW0odGhpcy4kc2NlLCB0aXRsZSwgcmF3X2h0bWwpO1xuICAgIH1cbiAgICBcbiAgICBfaW5ib3VuZHMoaWR4KSB7XG4gICAgICAgIHJldHVybiBpZHggPCB0aGlzLnNpemUoKSAmJiBpZHggPj0gMDtcbiAgICB9XG5cbiAgICBpdGVtKGlkeCwgaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5faW5ib3VuZHMoaWR4KSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdF9pdGVtc1tpZHhdID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RfaXRlbXNbaWR4XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gXG5cbiAgICBwdXNoKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zLnB1c2goaXRlbSk7ICAgIFxuICAgIH1cblxuICAgIHBvcCgpIHtcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zLnBvcCgpO1xuICAgIH1cblxuICAgIGNhcGFjaXR5KG4pIHtcbiAgICAgICAgaWYodHlwZW9mIG4gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLnRvcF9uID0gbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50b3BfbjtcbiAgICB9XG5cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0X2l0ZW1zLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5saXN0X3RpdGxlID0gJyc7XG4gICAgICAgIHRoaXMudG9wX24gPSA1O1xuICAgICAgICB0aGlzLmxpc3RfaXRlbXMgPSBbXTtcbiAgICB9XG5cbiAgICB1cGxvYWQoZW5kcG9pbnQpIHtcbiAgICAgICAgdmFyIF9wYXlsb2FkID0ge307XG4gICAgICAgIF9wYXlsb2FkLmxpc3QgPSB0aGlzLmxpc3RfaXRlbXMubWFwKChfaXRlbSkgPT4gX2l0ZW0ucmVwcigpKTtcbiAgICAgICAgX3BheWxvYWQubnVtYmVyID0gdGhpcy50b3BfbjtcbiAgICAgICAgX3BheWxvYWQudGl0bGUgPSB0aGlzLmxpc3RfdGl0bGU7XG4gICAgICAgIF9wYXlsb2FkLnRhZ3MgPSB0aGlzLmxpc3RfdGFncy5tYXAoKF9pdGVtKSA9PiBfaXRlbS5pZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKF9wYXlsb2FkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAucG9zdChlbmRwb2ludCwgX3BheWxvYWQpO1xuICAgIH1cbn1cblxuTGlzdFNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJHNjZScsICckbG9jYXRpb24nLCAnJHEnXTtcblxuY2xhc3MgQWRkTGlzdFNlcnZpY2UgZXh0ZW5kcyBMaXN0U2VydmljZSB7XG4gICAgdXBsb2FkKCkge1xuICAgICAgICByZXR1cm4gc3VwZXIudXBsb2FkKCcvbGlzdHMvbmV3Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBFZGl0TGlzdFNlcnZpY2UgZXh0ZW5kcyBMaXN0U2VydmljZSB7XG4gICAgc2x1ZyhzKSB7XG4gICAgICAgIGlmKHR5cGVvZiBzID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICB0aGlzLmxpc3Rfc2x1ZyA9IHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdF9zbHVnO1xuICAgIH1cbiAgICBcbiAgICB1cGxvYWQoKSB7XG4gICAgICAgIHJldHVybiBzdXBlci51cGxvYWQoJy9saXN0cy9lZGl0LycgKyB0aGlzLnNsdWcoKSk7XG4gICAgfVxufVxuXG5leHBvcnQge0FkZExpc3RTZXJ2aWNlLCBFZGl0TGlzdFNlcnZpY2V9O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvc2VydmljZXMvbGlzdC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=
angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("templates/confirm.html","<h1>Preview: Your List - {{vm.top_n}} {{vm.list_title}}</h1><div ng-repeat=\"item in vm.items\"><h2>{{$index + 1}}. {{item.title()}}</h2><div ng-bind-html=item.preview()></div></div><div class=\"form btn-group\"><input class=btn value=Back type=Submit ng-click=vm.back()> <input class=\"btn btn-success\" type=Submit value=Finish ng-click=vm.finish()></div>");
$templateCache.put("templates/item.html","<h1>{{vm.top_n}} {{vm.list_title}}</h1><h2>Number {{vm.number}}: {{vm.item_title}}</h2><div class=row><div class=\"col-md-6 form-group\"><label for=itemtitle>Item Title</label> <input ng-model=vm.item_title type=text class=form-control id=itemtitle placeholder=\"Episode 4: A New Hope\" name=title ng-model-options=\"{updateOn: \'blur default\', debounce: {\'blur\': 0, \'default\': 500}}\" ng-trim=\"\" ng-maxlength=128 required></div></div><label for=toolbar>Description</label><div ng-hide=vm.show_preview()><div id=toolbar class=\"toolbar ql-toolbar ql-snow\"><span class=ql-format-group><span title=Link class=\"ql-format-button ql-link\"></span> <span class=ql-format-separator></span> <span title=Image class=\"ql-format-button ql-image\"></span></span></div><div style=\"height: 300px; border: 1px solid #ccc; border-radius: 4px;\"><div id=editor class=\"editor ql-container ql-snow\"></div></div></div><div ng-show=vm.show_preview()><p ng-bind-html=vm.html_preview></p></div><div class=btn-group><label class=\"btn btn-primary\" ng-model=vm.preview_radio btn-radio=\"\'edit\'\" uncheckable=\"\">edit</label> <label class=\"btn primary\" ng-model=vm.preview_radio ng-change=vm.generate_preview() btn-radio=\"\'preview\'\" uncheckable=\"\">preview</label></div><hr><div class=\"footer btn-group\"><input class=btn value=Back type=Submit ng-click=vm.back()> <input class=btn value=Next type=Submit ng-click=vm.next()></div>");
$templateCache.put("templates/list.html","<form name=newlist novalidate><h1>Your List: {{vm.top_n}} {{vm.list_title}}</h1><div class=row><div class=\"col-md-6 form-group\"><label for=listnumber>Title</label> <input ng-model=vm.list_title type=text class=form-control id=listtitle placeholder=\"StarWars movies\" name=title ng-model-options=\"{updateOn: \'blur default\', debounce: {\'blur\': 0, \'default\': 500}}\" ng-trim=\"\" ng-maxlength=128 required></div></div><div class=row><div class=\"col-md-6 form-group\"><label for=listnumber>Number</label> <input ng-model=vm.top_n type=number class=form-control id=listnumber name=number min=1 max=100></div></div><div class=row style=\"height: 50px;\"><div class=\"col-sm-6 form-group\" style=\"margin-bottom: 15px;\"><label for=listtags>Tags</label><tags-input id=listtags class=input-sm style=\"height: 100%\" ng-model=vm.tags add-from-autocomplete-only=true><auto-complete source=vm.possible_tags($query)></auto-complete></tags-input></div></div><div class=footer style=\"clear: both;\"><input class=btn value=Next type=Submit ng-click=vm.next()></div></form>");}]);