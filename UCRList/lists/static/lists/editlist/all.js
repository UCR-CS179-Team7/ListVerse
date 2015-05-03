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
	        value: function possible_tags() {
	            return this.list.possible_tags();
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            this.list.clear_tags();
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = this.tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var tag = _step.value;
	
	                    this.list.add_tags(tag);
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
	                return '<blockquote>${match}</blockquote>';
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
	    function ListService($http, $sce, $location) {
	        _classCallCheck(this, ListService);
	
	        this.$http = $http;
	        this.$sce = $sce;
	        this.$location = $location;
	
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
	        key: 'possible_tags',
	        value: function possible_tags() {
	            return this.tags_list;
	        }
	    }, {
	        key: 'items',
	        value: function items() {
	            return this.list_items;
	        }
	    }, {
	        key: 'tags',
	        value: function tags() {
	            return this.list_tags;
	        }
	    }, {
	        key: 'add_tag',
	        value: function add_tag(tag) {
	            if (this.possible_tags().some(function (_other_tag) {
	                return tag === _other_tag;
	            })) {
	                this.list_tags.push(tag);
	            }
	        }
	    }, {
	        key: 'clear_tags',
	        value: function clear_tags(tag) {
	            this.tags = [];
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
	            return this.$http.post(endpoint, _payload);
	        }
	    }]);
	
	    return ListService;
	})();
	
	ListService.$inject = ['$http', '$sce', '$location'];
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWI3NmMyYWY0ZmEzMDAwYzYyYmIiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvbGlzdHMvZWRpdGxpc3QvY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2l0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2NvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9saXN0cy9zZXJ2aWNlcy9saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztvRENyQ2lELENBQWU7Ozs7QUFEaEUsYUFBWSxDQUFDOztBQUdiLFFBQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQ2xCLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUNyQyxjQUFjLEVBRWQsYUFBYSx1Q0FHaEIsQ0FBQyxDQUNDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVuQixVQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN2QyxVQUFTLFNBQVMsQ0FBQyxjQUFjLEVBQUU7QUFDL0IsbUJBQWMsQ0FBQyxJQUFJLENBQUMs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d0NBRVEsWUFBWSxFQUFFO1VBQ3JDOzs7WUFIQyxjQUFjO0lBQVMsV0FBVzs7S0FNbEMsZUFBZTtjQUFmLGVBQWU7K0JBQWYsZUFBZTs7Ozs7OztlQUFmLGVBQWU7O2tCQUFmLGVBQWU7O2dCQUNYLGtCQUFHO0FBQ0wsK0NBRkYsZUFBZSx3Q0FFTyxhQUFhLEVBQUU7VUFDdEM7OztZQUhDLGVBQWU7SUFBUyxXQUFXOztTQU1qQyxjQUFjLEdBQWQsY0FBYztTQUFFLGVBQWUsR0FBZixlQUFlLEMiLCJmaWxlIjoiOWI3NmMyYWY0ZmEzMDAwYzYyYmIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDliNzZjMmFmNGZhMzAwMGM2MmJiXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHtkZWZhdWx0IGFzIGNvbnRyb2xsZXJzX21vZHVsZV9uYW1lfSBmcm9tICcuL2NvbnRyb2xsZXJzJztcblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgICAnbmdSb3V0ZScsICduZ1Nhbml0aXplJywgJ25nTWVzc2FnZXMnLFxuICAgICd1aS5ib290c3RyYXAnLCBcblxuICAgICduZ1RhZ3NJbnB1dCcsXG5cbiAgICBjb250cm9sbGVyc19tb2R1bGVfbmFtZSxcbl0pXG4gIC5jb25maWcoQXBwUm91dGVyKVxuICAuY29uZmlnKFNldENTRlIpO1xuXG5BcHBSb3V0ZXIuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcbmZ1bmN0aW9uIEFwcFJvdXRlcigkcm91dGVQcm92aWRlcikge1xuICAgICRyb3V0ZVByb3ZpZGVyLndoZW4oJy8nLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2xpc3QuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdMaXN0Q29udHJvbGxlcicsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgbG9hZDogTG9hZExpc3QsXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC53aGVuKCcvaXRlbS86bnVtYmVyJywge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9pdGVtLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSXRlbUNvbnRyb2xsZXInLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGxvYWQ6IE5ld0xpc3RPblJlZnJlc2gsXG4gICAgICAgIH0sXG4gICAgfSlcbiAgICAud2hlbignL2NvbmZpcm0nLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2NvbmZpcm0uaHRtbCcsIFxuICAgICAgICBjb250cm9sbGVyOiAnQ29uZmlybUNvbnRyb2xsZXInLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGxvYWQ6IE5ld0xpc3RPblJlZnJlc2gsXG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5cblNldENTRlIuJGluamVjdCA9IFsnJGh0dHBQcm92aWRlciddO1xuZnVuY3Rpb24gU2V0Q1NGUigkaHR0cFByb3ZpZGVyKSB7XG4gICAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy54c3JmQ29va2llTmFtZSA9ICdjc3JmdG9rZW4nO1xuICAgICRodHRwUHJvdmlkZXIuZGVmYXVsdHMueHNyZkhlYWRlck5hbWUgPSAnWC1DU1JGVG9rZW4nO1xufVxuXG5OZXdMaXN0T25SZWZyZXNoLiRpbmplY3QgPSBbJyRxJywgJyRsb2NhdGlvbicsICdsaXN0J107XG5mdW5jdGlvbiBOZXdMaXN0T25SZWZyZXNoKCRxLCAkbG9jYXRpb24sIGxpc3QpIHtcbiAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICBpZiAobGlzdC50aXRsZSgpID09PSAnJykge1xuICAgICAgICAvL2xvZ2ljIGlzIGlmIHRoZSBsaXN0IGhhcyBubyB0aXRsZSwgdGhlblxuICAgICAgICAvL3RoZSBwYWdlIG11c3QgaGF2ZSBiZWVuIG1hbnVhbGx5IHJlZnJlc2hlZFxuICAgICAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xuICAgIH1cbn1cblxuTG9hZExpc3QuJGluamVjdCA9IFsnJHEnLCAnJGh0dHAnLCAnJGxvY2F0aW9uJywgJ2xpc3QnXTtcbmZ1bmN0aW9uIExvYWRMaXN0KCRxLCAkaHR0cCwgJGxvY2F0aW9uLCBsaXN0KSB7XG4gICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgIFxuICAgIHZhciBzbHVnX3dpdGhfaGFzaCA9ICRsb2NhdGlvbi5hYnNVcmwoKS5zcGxpdCgnZWRpdC8nKVsxXTtcbiAgICB2YXIgc2x1ZyA9IHNsdWdfd2l0aF9oYXNoLnN1YnN0cmluZygwLCBzbHVnX3dpdGhfaGFzaC5sZW5ndGggLTIpO1xuICAgIFxuICAgICRodHRwLmdldCgnL2xpc3RzL2pzb24vJyArIHNsdWcpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgbGlzdC5yZXNldCgpO1xuICAgICAgIHZhciBsaXN0X2RhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgIGxpc3QudGl0bGUobGlzdF9kYXRhLnRpdGxlKTtcbiAgICAgICBsaXN0LmNhcGFjaXR5KGxpc3RfZGF0YS5udW1iZXIpO1xuICAgICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdF9kYXRhLmxpc3QpIHtcbiAgICAgICAgICAgIGxldCBfaXRlbSA9IGxpc3QubmV3SXRlbShpdGVtLnRpdGxlLCBpdGVtLmRlc2NyaXB0aW9uX21ldGEpO1xuICAgICAgICAgICAgbGlzdC5wdXNoKF9pdGVtKTtcbiAgICAgICB9XG4gICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgIH0sIGRlZmVycmVkLnJlamVjdCk7XG5cbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L2FwcC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtkZWZhdWx0IGFzIExpc3RDb250cm9sbGVyfSBmcm9tICcuLi9jb250cm9sbGVycy9saXN0J1xuaW1wb3J0IHtkZWZhdWx0IGFzIEl0ZW1Db250cm9sbGVyfSBmcm9tICcuLi9jb250cm9sbGVycy9pdGVtJ1xuaW1wb3J0IHtkZWZhdWx0IGFzIENvbmZpcm1Db250cm9sbGVyfSBmcm9tICcuLi9jb250cm9sbGVycy9jb25maXJtJ1xuaW1wb3J0IHtkZWZhdWx0IGFzIHNlcnZpY2VzX21vZHVsZV9uYW1lfSBmcm9tICcuL3NlcnZpY2VzJyBcblxudmFyIGNvbnRyb2xsZXJzX21vZHVsZV9uYW1lID0gJ2FwcC5jb250cm9sbGVycyc7XG5cbmFuZ3VsYXIubW9kdWxlKGNvbnRyb2xsZXJzX21vZHVsZV9uYW1lLCBbXG4gICAgc2VydmljZXNfbW9kdWxlX25hbWVcbl0pXG4gIC5jb250cm9sbGVyKCdMaXN0Q29udHJvbGxlcicsIExpc3RDb250cm9sbGVyKVxuICAuY29udHJvbGxlcignSXRlbUNvbnRyb2xsZXInLCBJdGVtQ29udHJvbGxlcilcbiAgLmNvbnRyb2xsZXIoJ0NvbmZpcm1Db250cm9sbGVyJywgQ29uZmlybUNvbnRyb2xsZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBjb250cm9sbGVyc19tb2R1bGVfbmFtZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L2NvbnRyb2xsZXJzLmpzXG4gKiovIiwiIGNsYXNzIExpc3RDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigkbG9jYXRpb24sIGxpc3QpIHtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgICAgIHRoaXMubGlzdCA9IGxpc3Q7XG5cbiAgICAgICAgdGhpcy50b3BfbiA9IHRoaXMubGlzdC5jYXBhY2l0eSgpO1xuICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSB0aGlzLmxpc3QudGl0bGUoKTtcbiAgICAgICAgdGhpcy50YWdzID0gdGhpcy5saXN0LnRhZ3MoKTtcbiAgICB9XG5cbiAgICBwb3NzaWJsZV90YWdzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LnBvc3NpYmxlX3RhZ3MoKTtcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICB0aGlzLmxpc3QuY2xlYXJfdGFncygpO1xuICAgICAgICBmb3IobGV0IHRhZyBvZiB0aGlzLnRhZ3MpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdC5hZGRfdGFncyh0YWcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdC50aXRsZSh0aGlzLmxpc3RfdGl0bGUpO1xuICAgICAgICB0aGlzLmxpc3QuY2FwYWNpdHkodGhpcy50b3Bfbik7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9pdGVtLzEnKTtcbiAgICB9XG59XG5MaXN0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9jYXRpb24nLCAnbGlzdCddO1xuZXhwb3J0IGRlZmF1bHQgTGlzdENvbnRyb2xsZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9jb250cm9sbGVycy9saXN0LmpzXG4gKiovIiwiIGNsYXNzIEl0ZW1Db250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcigkcm91dGUsICRsb2NhdGlvbiwgbGlzdCkge1xuICAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgICAgdGhpcy5saXN0ID0gbGlzdDtcblxuICAgICAgICB0aGlzLnRvcF9uID0gbGlzdC5jYXBhY2l0eSgpO1xuICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSBsaXN0LnRpdGxlKCk7XG4gICAgXG4gICAgICAgIHRoaXMubnVtYmVyID0gcGFyc2VJbnQoJHJvdXRlLmN1cnJlbnQucGFyYW1zLm51bWJlcik7XG4gICAgICAgIHRoaXMucHJldmlld19yYWRpbyA9ICdlZGl0JztcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBuZXcgUXVpbGwoJyNlZGl0b3InLCB7XG4gICAgICAgICAgICBtb2R1bGVzOiB7XG4gICAgICAgICAgICAgICAgJ3Rvb2xiYXInOiB7Y29udGFpbmVyOiAnI3Rvb2xiYXInfSxcbiAgICAgICAgICAgICAgICAnaW1hZ2UtdG9vbHRpcCc6IHRydWUsXG4gICAgICAgICAgICAgICAgJ2xpbmstdG9vbHRpcCc6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhlbWU6ICdzbm93JyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pZHggPSB0aGlzLm51bWJlciAtIDE7XG4gICAgICAgIHRoaXMuaXRlbSA9IGxpc3QuaXRlbSh0aGlzLmlkeCk7XG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLml0ZW0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW0gPSB0aGlzLmxpc3QubmV3SXRlbSgpO1xuICAgICAgICAgICAgaWYodGhpcy5saXN0LnNpemUoKSA8IHRoaXMubGlzdC5jYXBhY2l0eSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2godGhpcy5pdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLml0ZW1fdGl0bGUgPSB0aGlzLml0ZW0udGl0bGUoKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3X2h0bWwgPSB0aGlzLml0ZW0ucHJldmlldygpO1xuICAgICAgICB0aGlzLmVkaXRvci5zZXRIVE1MKHRoaXMuaXRlbS5lZGl0KCkpO1xuICAgIH1cbiAgICBcbiAgICBzaG93X3ByZXZpZXcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZXZpZXdfcmFkaW8gPT09ICdwcmV2aWV3JztcbiAgICB9XG4gICAgXG4gICAgZ2VuZXJhdGVfcHJldmlldygpIHtcbiAgICAgICAgdGhpcy5pdGVtLmVkaXQodGhpcy5lZGl0b3IuZ2V0SFRNTCgpKTtcbiAgICAgICAgdGhpcy5odG1sX3ByZXZpZXcgPSB0aGlzLml0ZW0ucHJldmlldygpO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIHRoaXMuaXRlbS5lZGl0KHRoaXMuZWRpdG9yLmdldEhUTUwoKSk7XG4gICAgICAgIHRoaXMuaXRlbS50aXRsZSh0aGlzLml0ZW1fdGl0bGUpO1xuICAgICAgICB0aGlzLmxpc3QuaXRlbSh0aGlzLmlkeCwgdGhpcy5pdGVtKTsgXG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgIGlmICh0aGlzLm51bWJlciA8IHRoaXMudG9wX24pIHsgICAgXG4gICAgICAgICAgICB2YXIgbmV4dF9udW1iZXIgPSAodGhpcy5udW1iZXIgKyAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aCgnL2l0ZW0vJyArIG5leHRfbnVtYmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9jb25maXJtJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiYWNrKCkge1xuICAgICAgICB0aGlzLnNhdmUoKTsgIFxuICAgICAgICBpZiAodGhpcy5pZHggPiAwKSB7ICAgIFxuICAgICAgICAgICAgdmFyIG5leHRfbnVtYmVyID0gKHRoaXMubnVtYmVyIC0gMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9pdGVtLycgKyBuZXh0X251bWJlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgICAgIH0gXG4gICAgfVxufVxuXG5JdGVtQ29udHJvbGxlci4kaW5qZWN0ID0gWyckcm91dGUnLCAnJGxvY2F0aW9uJywgJ2xpc3QnXTtcblxuZXhwb3J0IGRlZmF1bHQgSXRlbUNvbnRyb2xsZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9jb250cm9sbGVycy9pdGVtLmpzXG4gKiovIiwiIGNsYXNzIENvbmZpcm1Db250cm9sbGVyIHtcbiAgIGNvbnN0cnVjdG9yKCRsb2NhdGlvbiwgJHdpbmRvdywgbGlzdCkge1xuICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gICAgICAgdGhpcy5saXN0ID0gbGlzdDtcbiAgICAgICBcbiAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5saXN0Lml0ZW1zKCk7XG4gICAgICAgdGhpcy5saXN0X3RpdGxlID0gdGhpcy5saXN0LnRpdGxlKCk7XG4gICAgICAgdGhpcy50b3BfbiA9IHRoaXMubGlzdC5jYXBhY2l0eSgpO1xuICAgfVxuXG4gICBiYWNrKCkge1xuICAgICAgICB2YXIgbmV4dF9udW1iZXIgPSB0aGlzLnRvcF9uLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uLnVybCgnL2l0ZW0vJyArIG5leHRfbnVtYmVyKTtcbiAgIH1cblxuICAgZmluaXNoKCkge1xuICAgICAgICB0aGlzLmxpc3QudXBsb2FkKClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB2YXIgc2x1ZyA9IHJlc3BvbnNlLmRhdGEuc2x1ZztcbiAgICAgICAgICAgIC8vdGhpcy5saXN0LnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLiR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbGlzdHMvZGV0YWlsLycgKyBzbHVnO1xuICAgICAgICB9KTtcbiAgIH1cbn1cblxuQ29uZmlybUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvY2F0aW9uJywgJyR3aW5kb3cnLCAnbGlzdCddO1xuXG5leHBvcnQgZGVmYXVsdCBDb25maXJtQ29udHJvbGxlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2NvbmZpcm0uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7ZGVmYXVsdCBhcyBMaXN0U2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvbGlzdCc7ICAgIFxuXG52YXIgc2VydmljZXNfbW9kdWxlX25hbWUgPSAnYXBwLnNlcnZpY2VzJztcblxuYW5ndWxhci5tb2R1bGUoc2VydmljZXNfbW9kdWxlX25hbWUsIFtdKVxuICAuc2VydmljZSgnbGlzdCcsIExpc3RTZXJ2aWNlKTtcblxuZXhwb3J0IGRlZmF1bHQgc2VydmljZXNfbW9kdWxlX25hbWU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9lZGl0bGlzdC9zZXJ2aWNlcy5qc1xuICoqLyIsImNsYXNzIExpc3RJdGVtIHtcbiAgICBjb25zdHJ1Y3Rvcigkc2NlLCB0aXRsZT0nJywgcmF3X2h0bWw9JycpIHtcbiAgICAgICAgdGhpcy4kc2NlID0gJHNjZTtcbiAgICAgICAgdGhpcy50aXRsZSh0aXRsZSk7XG4gICAgICAgIHRoaXMuZWRpdChyYXdfaHRtbCk7XG4gICAgfVxuXG4gICAgX3JlcGxhY2VDbHlwSXRMaW5rcyhodG1sKSB7XG4gICAgICAgIGxldCBDSV9MSU5LX1JFID0gLyg/Omh0dHBzPzpcXC9cXC8pPyg/Ond3d1xcLik/KD86Y2x5cFxcLml0KVxcLygoXFx3KXs4fSkvZztcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlX2xpbmtzKF8sIHNvdW5kX2lkKXtcbiAgICAgICAgICAgIHJldHVybiBgPGlmcmFtZSB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxNjBcIiBcbiAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9jbHlwLml0LyR7c291bmRfaWR9L3dpZGdldFwiIFxuICAgICAgICAgICBmcmFtZWJvcmRlcj1cIjBcIj48L2lmcmFtZT5gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoQ0lfTElOS19SRSwgcmVwbGFjZV9saW5rcyk7XG4gICAgfVxuXG4gICAgX3JlcGxhY2VRdW90ZUJsb2NrcyhodG1sKSB7XG4gICAgICAgbGV0IFFVT1RFX1JFID0gL2AoLispYC9nO1xuICAgICAgIFxuICAgICAgIGZ1bmN0aW9uIHJlcGxhY2VfcXVvdGVzKF8sIG1hdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gJzxibG9ja3F1b3RlPiR7bWF0Y2h9PC9ibG9ja3F1b3RlPic7XG4gICAgICAgfVxuICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoUVVPVEVfUkUsIHJlcGxhY2VfcXVvdGVzKTtcbiAgICB9XG5cbiAgICBfcmVwbGFjZVlvdVR1YmVMaW5rcyhodG1sKSB7ICAgICAgICAgXG4gICAgICAgIGxldCBZVF9MSU5LX1JFID0gLyg/Omh0dHBzPzpcXC9cXC8pPyg/Ond3d1xcLik/KD86eW91dHVcXC5iZVxcL3x5b3V0dWJlXFwuY29tXFwvKD86ZW1iZWRcXC98dlxcL3x3YXRjaFxcP3Y9fHdhdGNoXFw/Lismdj0pKSgoXFx3fC0pezExfSkvZztcbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2VfbGlua3MoXywgdmlkZW9faWQpIHsgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBgPGlmcmFtZSB3aWR0aD1cIjU2MFwiIGhlaWdodD1cIjMxNVwiXG4gICAgICAgICAgICAgIHNyYz1cImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7dmlkZW9faWR9XCJcbiAgICAgICAgICAgICAgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3dmdWxsc2NyZWVuPlxuICAgICAgICAgICAgICA8L2lmcmFtZT5gO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZShZVF9MSU5LX1JFLCByZXBsYWNlX2xpbmtzKTtcbiAgICB9XG4gICAgXG4gICAgX3Byb2Nlc3MocmF3X2h0bWwpIHtcbiAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gdGhpcy5fcmVwbGFjZVF1b3RlQmxvY2tzKHJhd19odG1sKTsgXG4gICAgICAgIGRlc2NyaXB0aW9uID0gdGhpcy5fcmVwbGFjZVlvdVR1YmVMaW5rcyhkZXNjcmlwdGlvbik7XG4gICAgICAgIGRlc2NyaXB0aW9uID0gdGhpcy5fcmVwbGFjZUNseXBJdExpbmtzKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIHRpdGxlKHRpdGxlKSB7XG4gICAgICAgIGlmKHR5cGVvZiB0aXRsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbV90aXRsZSA9IHRpdGxlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1fdGl0bGU7XG4gICAgfVxuXG4gICAgZWRpdChyYXdfaHRtbCkge1xuICAgICAgICBpZih0eXBlb2YgcmF3X2h0bWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLnJhd19odG1sID0gcmF3X2h0bWw7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NlZF9odG1sID0gdGhpcy5fcHJvY2VzcyhyYXdfaHRtbCk7ICBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yYXdfaHRtbDtcbiAgICB9XG5cbiAgICBwcmV2aWV3KHRydXN0QXM9dHJ1ZSkge1xuICAgICAgICBpZih0cnVzdEFzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NlLnRydXN0QXNIdG1sKHRoaXMucHJvY2Vzc2VkX2h0bWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc2VkX2h0bWw7XG4gICAgICAgIH1cbiAgICB9IFxuXG4gICAgcmVwcigpIHtcbiAgICAgICAgdmFyIF9vYmogPSB7fTtcbiAgICAgICAgX29iai50aXRsZSA9IHRoaXMudGl0bGUoKTtcbiAgICAgICAgX29iai5kZXNjcmlwdGlvbiA9IHRoaXMuZWRpdCgpO1xuICAgICAgICBfb2JqLmRlc2NyaXB0aW9uX21ldGEgPSB0aGlzLnByZXZpZXcoZmFsc2UpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIF9vYmo7XG4gICB9XG5cbn1cblxuY2xhc3MgTGlzdFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCRodHRwLCAkc2NlLCAkbG9jYXRpb24pIHtcbiAgICAgICAgdGhpcy4kaHR0cCA9ICRodHRwO1xuICAgICAgICB0aGlzLiRzY2UgPSAkc2NlO1xuICAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcblxuICAgICAgICB0aGlzLnRvcF9uID0gMTA7XG4gICAgICAgIHRoaXMubGlzdF90aXRsZSA9ICcnO1xuICAgICAgICB0aGlzLmxpc3RfaXRlbXMgPSBbXTtcblxuICAgICAgICB0aGlzLnBvc3NpYmxlX3RhZ3MgPSBbe1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICB0ZXh0OiAnTXVzaWMnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgdGV4dDogJ01vdmllcydcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IDMsXG4gICAgICAgICAgICB0ZXh0OiAnVFYnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiA0LFxuICAgICAgICAgICAgdGV4dDogJ1NjaWVuY2UnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiA1LFxuICAgICAgICAgICAgdGV4dDogJ1BvbGl0aWNzJ1xuICAgICAgICB9XTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubGlzdF90YWdzID0gW107IFxuICAgIH1cbiBcbiAgICBwb3NzaWJsZV90YWdzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50YWdzX2xpc3Q7XG4gICAgfVxuXG4gICAgaXRlbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RfaXRlbXM7XG4gICAgfVxuXG4gICAgdGFncygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdF90YWdzO1xuICAgIH1cbiAgICBcbiAgICBhZGRfdGFnKHRhZykge1xuICAgICAgICBpZih0aGlzLnBvc3NpYmxlX3RhZ3MoKS5zb21lKChfb3RoZXJfdGFnKSA9PiB0YWcgPT09IF9vdGhlcl90YWcpKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RfdGFncy5wdXNoKHRhZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhcl90YWdzKHRhZykge1xuICAgICAgICB0aGlzLnRhZ3MgPSBbXTtcbiAgICB9XG5cblxuICAgIHRpdGxlKHRpdGxlKSB7XG4gICAgICAgIGlmKHR5cGVvZiB0aXRsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdF90aXRsZSA9IHRpdGxlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RfdGl0bGU7XG4gICAgfVxuXG4gICAgbmV3SXRlbSh0aXRsZSwgcmF3X2h0bWwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMaXN0SXRlbSh0aGlzLiRzY2UsIHRpdGxlLCByYXdfaHRtbCk7XG4gICAgfVxuICAgIFxuICAgIF9pbmJvdW5kcyhpZHgpIHtcbiAgICAgICAgcmV0dXJuIGlkeCA8IHRoaXMuc2l6ZSgpICYmIGlkeCA+PSAwO1xuICAgIH1cblxuICAgIGl0ZW0oaWR4LCBpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbmJvdW5kcyhpZHgpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0X2l0ZW1zW2lkeF0gPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdF9pdGVtc1tpZHhdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBcblxuICAgIHB1c2goaXRlbSkge1xuICAgICAgICB0aGlzLmxpc3RfaXRlbXMucHVzaChpdGVtKTsgICAgXG4gICAgfVxuXG4gICAgcG9wKCkge1xuICAgICAgICB0aGlzLmxpc3RfaXRlbXMucG9wKCk7XG4gICAgfVxuXG4gICAgY2FwYWNpdHkobikge1xuICAgICAgICBpZih0eXBlb2YgbiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMudG9wX24gPSBuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRvcF9uO1xuICAgIH1cblxuICAgIHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RfaXRlbXMubGVuZ3RoO1xuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSAnJztcbiAgICAgICAgdGhpcy50b3BfbiA9IDU7XG4gICAgICAgIHRoaXMubGlzdF9pdGVtcyA9IFtdO1xuICAgIH1cblxuICAgIHVwbG9hZChlbmRwb2ludCkge1xuICAgICAgICB2YXIgX3BheWxvYWQgPSB7fTtcbiAgICAgICAgX3BheWxvYWQubGlzdCA9IHRoaXMubGlzdF9pdGVtcy5tYXAoKF9pdGVtKSA9PiBfaXRlbS5yZXByKCkpO1xuICAgICAgICBfcGF5bG9hZC5udW1iZXIgPSB0aGlzLnRvcF9uO1xuICAgICAgICBfcGF5bG9hZC50aXRsZSA9IHRoaXMubGlzdF90aXRsZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAucG9zdChlbmRwb2ludCwgX3BheWxvYWQpO1xuICAgIH1cbn1cblxuTGlzdFNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJHNjZScsICckbG9jYXRpb24nXTtcblxuY2xhc3MgQWRkTGlzdFNlcnZpY2UgZXh0ZW5kcyBMaXN0U2VydmljZSB7XG4gICAgdXBsb2FkKCkge1xuICAgICAgICByZXR1cm4gc3VwZXIudXBsb2FkKCcvbGlzdHMvbmV3Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBFZGl0TGlzdFNlcnZpY2UgZXh0ZW5kcyBMaXN0U2VydmljZSB7XG4gICAgdXBsb2FkKCkge1xuICAgICAgICByZXR1cm4gc3VwZXIudXBsb2FkKCcvbGlzdHMvZWRpdCcpO1xuICAgIH1cbn1cblxuZXhwb3J0IHtBZGRMaXN0U2VydmljZSwgRWRpdExpc3RTZXJ2aWNlfVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvc2VydmljZXMvbGlzdC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=
angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("templates/confirm.html","<h1>Preview: Your List - {{vm.top_n}} {{vm.list_title}}</h1><div ng-repeat=\"item in vm.items\"><h2>{{$index + 1}}. {{item.title()}}</h2><div ng-bind-html=item.preview()></div></div><div class=\"form btn-group\"><input class=btn value=Back type=Submit ng-click=vm.back()> <input class=\"btn btn-success\" type=Submit value=Finish ng-click=vm.finish()></div>");
$templateCache.put("templates/item.html","<h1>{{vm.top_n}} {{vm.list_title}}</h1><h2>Number {{vm.number}}: {{vm.item_title}}</h2><div class=row><div class=\"col-md-6 form-group\"><label for=itemtitle>Item Title</label> <input ng-model=vm.item_title type=text class=form-control id=itemtitle placeholder=\"Episode 4: A New Hope\" name=title ng-model-options=\"{updateOn: \'blur default\', debounce: {\'blur\': 0, \'default\': 500}}\" ng-trim=\"\" ng-maxlength=128 required></div></div><label for=toolbar>Description</label><div ng-hide=vm.show_preview()><div id=toolbar class=\"toolbar ql-toolbar ql-snow\"><span class=ql-format-group><span title=Link class=\"ql-format-button ql-link\"></span> <span class=ql-format-separator></span> <span title=Image class=\"ql-format-button ql-image\"></span></span></div><div id=editor class=\"editor ql-container ql-snow\"></div></div><div ng-show=vm.show_preview()><p ng-bind-html=vm.html_preview></p></div><div class=btn-group><label class=\"btn btn-primary\" ng-model=vm.preview_radio btn-radio=\"\'edit\'\" uncheckable=\"\">edit</label> <label class=\"btn primary\" ng-model=vm.preview_radio ng-change=vm.generate_preview() btn-radio=\"\'preview\'\" uncheckable=\"\">preview</label></div><hr><div class=\"footer btn-group\"><input class=btn value=Back type=Submit ng-click=vm.back()> <input class=btn value=Next type=Submit ng-click=vm.next()></div>");
$templateCache.put("templates/list.html","<form name=newlist novalidate><h1>Your List: {{vm.top_n}} {{vm.list_title}}</h1><div class=row><div class=\"col-md-6 form-group\"><label for=listnumber>Title</label> <input ng-model=vm.list_title type=text class=form-control id=listtitle placeholder=\"StarWars movies\" name=title ng-model-options=\"{updateOn: \'blur default\', debounce: {\'blur\': 0, \'default\': 500}}\" ng-trim=\"\" ng-maxlength=128 required></div></div><div class=row><div class=\"col-md-6 form-group\"><label for=listnumber>Number</label> <input ng-model=vm.top_n type=number class=form-control id=listnumber name=number min=1 max=100></div></div><div class=row><label for=listtags>Tags</label><tags-input id=listtags ng-model=vm.tags><autocomplete source=vm.possible_tags($query)></autocomplete></tags-input></div><div class=footer><input class=btn value=Next type=Submit ng-click=vm.next()></div></form>");}]);