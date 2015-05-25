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
	
	angular.module('app', ['ngRoute', 'ngSanitize', 'ngMessages', 'ui.bootstrap', 'ui.select', _controllers_module_name2['default']]).config(AppRouter).config(SetCSFR);
	
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
	        list.privacy(list_data.privacy);
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
	
	                var _item = list.newItem(item.title, item.description);
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
	    function ListController($location, $window, list) {
	        _classCallCheck(this, ListController);
	
	        this.$location = $location;
	        this.$window = $window;
	        this.list = list;
	
	        this.top_n = this.list.capacity();
	        this.list_title = this.list.title();
	        this.privacy_level = this.list.privacy();
	        this.tags = this.list.tags();
	
	        this.PRIVACY_LEVELS = this.list.all_privacy_levels();
	        this.TAGS = this.list.all_tags();
	        this.editing = this.list.editing();
	    }
	
	    _createClass(ListController, [{
	        key: 'save',
	        value: function save() {
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
	            this.list.privacy(this.privacy_level);
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            this.save();
	            this.$location.path('/item/1');
	        }
	    }, {
	        key: 'finish',
	        value: function finish() {
	            var _this = this;
	
	            this.save();
	            this.list.upload().then(function (response) {
	                var slug = response.data.slug;
	                //this.list.reset();
	                _this.$window.location.href = '/lists/detail/' + slug;
	            });
	        }
	    }]);
	
	    return ListController;
	})();
	
	ListController.$inject = ['$location', '$window', 'list'];
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
	    function ItemController($route, $location, $window, list) {
	        _classCallCheck(this, ItemController);
	
	        this.$location = $location;
	        this.$window = $window;
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
	
	        this.editing = this.list.editing();
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
	            var next_location = this._next_location(this.number, this.top_n, false);
	            this.$location.path(next_location);
	        }
	    }, {
	        key: 'back',
	        value: function back() {
	            this.save();
	            var next_location = this._next_location(this.number, this.top_n, true);
	            this.$location.path(next_location);
	        }
	    }, {
	        key: '_next_location',
	        value: function _next_location(idx, num_items) {
	            var back = arguments[2] === undefined ? true : arguments[2];
	
	            var next_idx = idx;
	
	            if (back) {
	                next_idx = idx - 1;
	            } else {
	                next_idx = idx + 1;
	            }
	
	            if (next_idx > 0 && next_idx <= num_items) {
	                var prefix = '/item/';
	                var suffix = next_idx.toString();
	                return prefix + suffix;
	            } else if (next_idx <= 0) {
	                return '/';
	            } else {
	                return '/confirm';
	            }
	        }
	    }, {
	        key: 'finish',
	        value: function finish() {
	            var _this = this;
	
	            this.save();
	            this.list.upload().then(function (response) {
	                var slug = response.data.slug;
	                //this.list.reset();
	                _this.$window.location.href = '/lists/detail/' + slug;
	            });
	        }
	    }]);
	
	    return ItemController;
	})();
	
	ItemController.$inject = ['$route', '$location', '$window', 'list'];
	
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
	
	        this.editing = this.list.editing();
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
	
	var TAGS = ['Music', 'Movies', 'TV', 'Science', 'Politics'];
	
	var PRIVACY_LEVELS_KEYS = ['PUBLIC', 'PRIVATE', 'FRIENDS'];
	
	var PRIVACY_LEVELS_LIST = [{
	    id: 1,
	    icon: '<i class="fa fa-globe"></i>',
	    name: 'Public',
	    description: 'Anyone can see this list.' }, {
	    id: 2,
	    icon: '<i class="fa fa-lock"></i>',
	    name: 'Private',
	    description: 'Only you can see this list.' }, {
	    id: 3,
	    icon: '<i class="fa fa-users"></i>',
	    name: 'Friends',
	    description: 'Only your friends can see this list.' }];
	
	var PRIVACY_LEVELS = (function () {
	    var _PRIVACY_LEVELS = {};
	    var i = 0;
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = PRIVACY_LEVELS_KEYS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var key = _step.value;
	
	            _PRIVACY_LEVELS[key] = PRIVACY_LEVELS_LIST[i];
	            i += 1;
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
	
	    return _PRIVACY_LEVELS;
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
	
	        this.PRIVACY_LEVELS = PRIVACY_LEVELS;
	        this.PRIVACY_LEVELS_LIST = PRIVACY_LEVELS_LIST;
	
	        // privacy level is public by default
	        this.privacy_level = PRIVACY_LEVELS.PUBLIC;
	
	        this.tag_ids = [];
	    }
	
	    _createClass(ListService, [{
	        key: 'privacy',
	        value: function privacy(level) {
	            if (typeof level !== 'undefined') {
	                this.privacy_level = level;
	            }
	            return this.privacy_level;
	        }
	    }, {
	        key: 'items',
	        value: function items() {
	            return this.list_items;
	        }
	    }, {
	        key: 'tags',
	        value: function tags() {
	            return this.tag_ids.map(function (_id) {
	                return TAGS[_id - 1];
	            });
	        }
	    }, {
	        key: 'addTagById',
	        value: function addTagById(id) {
	            if (id > 0 && id <= TAGS.length) {
	                var _iteratorNormalCompletion2 = true;
	                var _didIteratorError2 = false;
	                var _iteratorError2 = undefined;
	
	                try {
	                    for (var _iterator2 = this.tag_ids[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                        var _id = _step2.value;
	
	                        if (id === _id) {
	                            // dup, don't add
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
	
	                this.tag_ids.push(id);
	            }
	        }
	    }, {
	        key: 'addTag',
	        value: function addTag(tag) {
	            var id = 1;
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = TAGS[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var _tag = _step3.value;
	
	                    if (tag == _tag) {
	                        this.addTagById(id);
	                        return;
	                    }
	                    id += 1;
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
	        key: 'all_privacy_levels',
	        value: function all_privacy_levels() {
	            return PRIVACY_LEVELS_LIST;
	        }
	    }, {
	        key: 'all_tags',
	        value: function all_tags() {
	            return TAGS;
	        }
	    }, {
	        key: 'clearTags',
	        value: function clearTags(tag) {
	            this.tag_ids = [];
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
	            _payload.tags = this.tag_ids;
	            _payload.privacy = this.privacy_level.id;
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
	    }, {
	        key: 'editing',
	        value: function editing() {
	            return false;
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
	        key: 'editing',
	        value: function editing() {
	            return true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDkwZTczYzY2MjgzNTY1OWFjMWMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvbGlzdHMvZWRpdGxpc3QvY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2l0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2NvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9saXN0cy9zZXJ2aWNlcy9saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztvRENyQ2lELENBQWU7Ozs7QUFEaEUsYUFBWSxDQUFDOztBQUdiLFFBQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQ2xCLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUNyQyxjQUFjLEVBQUUsV0FBVyx1Q0FHOUIsQ0FBQyxDQUNDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVuQixVQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN2QyxVQUFTLFNBQVMsQ0FBQyxjQUFjLEVBQUU7QUFDL0IsbUJBQWMsQ0FBQyxJQUFJLENBQUMs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USxDQUFDLENBQUM7QUFDdEIsb0JBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1VBQzlDOzs7WUFqSUMsV0FBVzs7O0FBb0lqQixZQUFXLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7O0tBRXJELGNBQWM7Y0FBZCxjQUFjOytCQUFkLGNBQWM7Ozs7Ozs7ZUFBZCxjQUFjOztrQkFBZCxjQUFjOztnQkFDVixrQkFBRztBQUNMLCtDQUZGLGNBQWMsd0NBRVEsWUFBWSxFQUFFO1VBQ3JDOzs7Z0JBRU0sbUJBQUc7QUFDTixvQkFBTyxLQUFLLENBQUM7VUFDaEI7OztZQVBDLGNBQWM7SUFBUyxXQUFXOztLQVVsQyxlQUFlO2NBQWYsZUFBZTsrQkFBZixlQUFlOzs7Ozs7O2VBQWYsZUFBZTs7a0JBQWYsZUFBZTs7Z0JBQ2IsY0FBQyxDQUFDLEVBQUU7QUFDSixpQkFBRyxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUM7QUFDckIscUJBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2NBQ3RCO0FBQ0Qsb0JBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztVQUN6Qjs7O2dCQUVNLG1CQUFHO0FBQ04sb0JBQU8sSUFBSSxDQUFDO1VBQ2Y7OztnQkFFSyxrQkFBRztBQUNMLCtDQWJGLGVBQWUsd0NBYU8sY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRTtVQUNyRDs7O1lBZEMsZUFBZTtJQUFTLFdBQVc7O1NBaUJqQyxjQUFjLEdBQWQsY0FBYztTQUFFLGVBQWUsR0FBZixlQUFlLEMiLCJmaWxlIjoiZDkwZTczYzY2MjgzNTY1OWFjMWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGQ5MGU3M2M2NjI4MzU2NTlhYzFjXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHtkZWZhdWx0IGFzIGNvbnRyb2xsZXJzX21vZHVsZV9uYW1lfSBmcm9tICcuL2NvbnRyb2xsZXJzJztcblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgICAnbmdSb3V0ZScsICduZ1Nhbml0aXplJywgJ25nTWVzc2FnZXMnLFxuICAgICd1aS5ib290c3RyYXAnLCAndWkuc2VsZWN0JywgXG5cbiAgICBjb250cm9sbGVyc19tb2R1bGVfbmFtZSxcbl0pXG4gIC5jb25maWcoQXBwUm91dGVyKVxuICAuY29uZmlnKFNldENTRlIpO1xuXG5BcHBSb3V0ZXIuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcbmZ1bmN0aW9uIEFwcFJvdXRlcigkcm91dGVQcm92aWRlcikge1xuICAgICRyb3V0ZVByb3ZpZGVyLndoZW4oJy8nLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2xpc3QuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdMaXN0Q29udHJvbGxlcicsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgbG9hZDogTG9hZExpc3QsXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC53aGVuKCcvaXRlbS86bnVtYmVyJywge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9pdGVtLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSXRlbUNvbnRyb2xsZXInLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGxvYWQ6IE5ld0xpc3RPblJlZnJlc2gsXG4gICAgICAgIH0sXG4gICAgfSlcbiAgICAud2hlbignL2NvbmZpcm0nLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2NvbmZpcm0uaHRtbCcsIFxuICAgICAgICBjb250cm9sbGVyOiAnQ29uZmlybUNvbnRyb2xsZXInLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGxvYWQ6IE5ld0xpc3RPblJlZnJlc2gsXG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5cblNldENTRlIuJGluamVjdCA9IFsnJGh0dHBQcm92aWRlciddO1xuZnVuY3Rpb24gU2V0Q1NGUigkaHR0cFByb3ZpZGVyKSB7XG4gICAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy54c3JmQ29va2llTmFtZSA9ICdjc3JmdG9rZW4nO1xuICAgICRodHRwUHJvdmlkZXIuZGVmYXVsdHMueHNyZkhlYWRlck5hbWUgPSAnWC1DU1JGVG9rZW4nO1xufVxuXG5OZXdMaXN0T25SZWZyZXNoLiRpbmplY3QgPSBbJyRxJywgJyRsb2NhdGlvbicsICdsaXN0J107XG5mdW5jdGlvbiBOZXdMaXN0T25SZWZyZXNoKCRxLCAkbG9jYXRpb24sIGxpc3QpIHtcbiAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICBpZiAobGlzdC50aXRsZSgpID09PSAnJykge1xuICAgICAgICAvL2xvZ2ljIGlzIGlmIHRoZSBsaXN0IGhhcyBubyB0aXRsZSwgdGhlblxuICAgICAgICAvL3RoZSBwYWdlIG11c3QgaGF2ZSBiZWVuIG1hbnVhbGx5IHJlZnJlc2hlZFxuICAgICAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xuICAgIH1cbn1cblxuTG9hZExpc3QuJGluamVjdCA9IFsnJHEnLCAnJGh0dHAnLCAnJGxvY2F0aW9uJywgJ2xpc3QnXTtcbmZ1bmN0aW9uIExvYWRMaXN0KCRxLCAkaHR0cCwgJGxvY2F0aW9uLCBsaXN0KSB7XG4gICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgIFxuICAgIHZhciBzbHVnX3dpdGhfaGFzaCA9ICRsb2NhdGlvbi5hYnNVcmwoKS5zcGxpdCgnZWRpdC8nKVsxXTtcbiAgICB2YXIgc2x1ZyA9IHNsdWdfd2l0aF9oYXNoLnN1YnN0cmluZygwLCBzbHVnX3dpdGhfaGFzaC5sZW5ndGggLTIpO1xuICAgIFxuICAgICRodHRwLmdldCgnL2xpc3RzL2pzb24vJyArIHNsdWcpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgbGlzdC5yZXNldCgpO1xuICAgICAgIHZhciBsaXN0X2RhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgIGxpc3QudGl0bGUobGlzdF9kYXRhLnRpdGxlKTtcbiAgICAgICBsaXN0LmNhcGFjaXR5KGxpc3RfZGF0YS5udW1iZXIpO1xuICAgICAgIGxpc3QucHJpdmFjeShsaXN0X2RhdGEucHJpdmFjeSk7XG4gICAgICAgbGlzdC5zbHVnKHNsdWcpO1xuICAgICAgIGZvciAobGV0IHRhZ19pZCBvZiBsaXN0X2RhdGEudGFncykge1xuICAgICAgICAgICAgbGlzdC5hZGRUYWdCeUlkKHRhZ19pZCk7XG4gICAgICAgfVxuXG4gICAgICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0X2RhdGEubGlzdCkge1xuICAgICAgICAgICAgbGV0IF9pdGVtID0gbGlzdC5uZXdJdGVtKGl0ZW0udGl0bGUsIGl0ZW0uZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgbGlzdC5wdXNoKF9pdGVtKTtcbiAgICAgICB9XG4gICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgIH0sIGRlZmVycmVkLnJlamVjdCk7XG5cbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L2FwcC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtkZWZhdWx0IGFzIExpc3RDb250cm9sbGVyfSBmcm9tICcuLi9jb250cm9sbGVycy9saXN0J1xuaW1wb3J0IHtkZWZhdWx0IGFzIEl0ZW1Db250cm9sbGVyfSBmcm9tICcuLi9jb250cm9sbGVycy9pdGVtJ1xuaW1wb3J0IHtkZWZhdWx0IGFzIENvbmZpcm1Db250cm9sbGVyfSBmcm9tICcuLi9jb250cm9sbGVycy9jb25maXJtJ1xuaW1wb3J0IHtkZWZhdWx0IGFzIHNlcnZpY2VzX21vZHVsZV9uYW1lfSBmcm9tICcuL3NlcnZpY2VzJyBcblxudmFyIGNvbnRyb2xsZXJzX21vZHVsZV9uYW1lID0gJ2FwcC5jb250cm9sbGVycyc7XG5cbmFuZ3VsYXIubW9kdWxlKGNvbnRyb2xsZXJzX21vZHVsZV9uYW1lLCBbXG4gICAgc2VydmljZXNfbW9kdWxlX25hbWVcbl0pXG4gIC5jb250cm9sbGVyKCdMaXN0Q29udHJvbGxlcicsIExpc3RDb250cm9sbGVyKVxuICAuY29udHJvbGxlcignSXRlbUNvbnRyb2xsZXInLCBJdGVtQ29udHJvbGxlcilcbiAgLmNvbnRyb2xsZXIoJ0NvbmZpcm1Db250cm9sbGVyJywgQ29uZmlybUNvbnRyb2xsZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBjb250cm9sbGVyc19tb2R1bGVfbmFtZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L2NvbnRyb2xsZXJzLmpzXG4gKiovIiwiIGNsYXNzIExpc3RDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigkbG9jYXRpb24sICR3aW5kb3csIGxpc3QpIHtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gICAgICAgIHRoaXMubGlzdCA9IGxpc3Q7XG5cbiAgICAgICAgdGhpcy50b3BfbiA9IHRoaXMubGlzdC5jYXBhY2l0eSgpO1xuICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSB0aGlzLmxpc3QudGl0bGUoKTtcbiAgICAgICAgdGhpcy5wcml2YWN5X2xldmVsID0gdGhpcy5saXN0LnByaXZhY3koKTtcbiAgICAgICAgdGhpcy50YWdzID0gdGhpcy5saXN0LnRhZ3MoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuUFJJVkFDWV9MRVZFTFMgPSB0aGlzLmxpc3QuYWxsX3ByaXZhY3lfbGV2ZWxzKCk7XG4gICAgICAgIHRoaXMuVEFHUyA9IHRoaXMubGlzdC5hbGxfdGFncygpO1xuICAgICAgICB0aGlzLmVkaXRpbmcgPSB0aGlzLmxpc3QuZWRpdGluZygpO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIHRoaXMubGlzdC5jbGVhclRhZ3MoKTtcbiAgICAgICAgZm9yKGxldCB0YWcgb2YgdGhpcy50YWdzKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3QuYWRkVGFnKHRhZyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0LnRpdGxlKHRoaXMubGlzdF90aXRsZSk7XG4gICAgICAgIHRoaXMubGlzdC5jYXBhY2l0eSh0aGlzLnRvcF9uKTtcbiAgICAgICAgdGhpcy5saXN0LnByaXZhY3kodGhpcy5wcml2YWN5X2xldmVsKTtcblxuICAgIH1cblxuICAgIG5leHQoKSB7XG4gICAgICAgIHRoaXMuc2F2ZSgpXG4gICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9pdGVtLzEnKTtcbiAgICB9XG4gICAgXG4gICAgZmluaXNoKCkge1xuICAgICAgICB0aGlzLnNhdmUoKTtcbiAgICAgICAgdGhpcy5saXN0LnVwbG9hZCgpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdmFyIHNsdWcgPSByZXNwb25zZS5kYXRhLnNsdWc7XG4gICAgICAgICAgICAvL3RoaXMubGlzdC5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy4kd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2xpc3RzL2RldGFpbC8nICsgc2x1ZztcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5MaXN0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9jYXRpb24nLCAnJHdpbmRvdycsICdsaXN0J107XG5leHBvcnQgZGVmYXVsdCBMaXN0Q29udHJvbGxlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2xpc3QuanNcbiAqKi8iLCIgY2xhc3MgSXRlbUNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKCRyb3V0ZSwgJGxvY2F0aW9uLCAkd2luZG93LCBsaXN0KSB7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgICB0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuICAgICAgICB0aGlzLmxpc3QgPSBsaXN0O1xuXG4gICAgICAgIHRoaXMudG9wX24gPSBsaXN0LmNhcGFjaXR5KCk7XG4gICAgICAgIHRoaXMubGlzdF90aXRsZSA9IGxpc3QudGl0bGUoKTtcbiAgICBcbiAgICAgICAgdGhpcy5udW1iZXIgPSBwYXJzZUludCgkcm91dGUuY3VycmVudC5wYXJhbXMubnVtYmVyKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3X3JhZGlvID0gJ2VkaXQnO1xuICAgICAgICB0aGlzLmVkaXRvciA9IG5ldyBRdWlsbCgnI2VkaXRvcicsIHtcbiAgICAgICAgICAgIG1vZHVsZXM6IHtcbiAgICAgICAgICAgICAgICAndG9vbGJhcic6IHtjb250YWluZXI6ICcjdG9vbGJhcid9LFxuICAgICAgICAgICAgICAgICdpbWFnZS10b29sdGlwJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAnbGluay10b29sdGlwJzogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGVtZTogJ3Nub3cnLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlkeCA9IHRoaXMubnVtYmVyIC0gMTtcbiAgICAgICAgdGhpcy5pdGVtID0gbGlzdC5pdGVtKHRoaXMuaWR4KTtcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuaXRlbSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbSA9IHRoaXMubGlzdC5uZXdJdGVtKCk7XG4gICAgICAgICAgICBpZih0aGlzLmxpc3Quc2l6ZSgpIDwgdGhpcy5saXN0LmNhcGFjaXR5KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QucHVzaCh0aGlzLml0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXRlbV90aXRsZSA9IHRoaXMuaXRlbS50aXRsZSgpO1xuICAgICAgICB0aGlzLnByZXZpZXdfaHRtbCA9IHRoaXMuaXRlbS5wcmV2aWV3KCk7XG4gICAgICAgIHRoaXMuZWRpdG9yLnNldEhUTUwodGhpcy5pdGVtLmVkaXQoKSk7XG4gICAgXG4gICAgICAgIHRoaXMuZWRpdGluZyA9IHRoaXMubGlzdC5lZGl0aW5nKCk7XG4gICAgfVxuICAgIFxuICAgIHNob3dfcHJldmlldygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJldmlld19yYWRpbyA9PT0gJ3ByZXZpZXcnO1xuICAgIH1cbiAgICBcbiAgICBnZW5lcmF0ZV9wcmV2aWV3KCkge1xuICAgICAgICB0aGlzLml0ZW0uZWRpdCh0aGlzLmVkaXRvci5nZXRIVE1MKCkpO1xuICAgICAgICB0aGlzLmh0bWxfcHJldmlldyA9IHRoaXMuaXRlbS5wcmV2aWV3KCk7XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5pdGVtLmVkaXQodGhpcy5lZGl0b3IuZ2V0SFRNTCgpKTtcbiAgICAgICAgdGhpcy5pdGVtLnRpdGxlKHRoaXMuaXRlbV90aXRsZSk7XG4gICAgICAgIHRoaXMubGlzdC5pdGVtKHRoaXMuaWR4LCB0aGlzLml0ZW0pOyBcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICB0aGlzLnNhdmUoKTtcbiAgICAgICAgbGV0IG5leHRfbG9jYXRpb24gPSB0aGlzLl9uZXh0X2xvY2F0aW9uKHRoaXMubnVtYmVyLCB0aGlzLnRvcF9uLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgobmV4dF9sb2NhdGlvbik7XG4gICAgfSBcblxuICAgIGJhY2soKSB7XG4gICAgICAgIHRoaXMuc2F2ZSgpOyAgXG4gICAgICAgIGxldCBuZXh0X2xvY2F0aW9uID0gdGhpcy5fbmV4dF9sb2NhdGlvbih0aGlzLm51bWJlciwgdGhpcy50b3BfbiwgdHJ1ZSlcbiAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aChuZXh0X2xvY2F0aW9uKTtcbiAgICB9XG5cbiAgICBfbmV4dF9sb2NhdGlvbihpZHgsIG51bV9pdGVtcywgYmFjaz10cnVlKSB7XG4gICAgICAgIGxldCBuZXh0X2lkeCA9IGlkeDtcbiAgICBcbiAgICAgICAgaWYoYmFjaykge1xuICAgICAgICAgICAgbmV4dF9pZHggPSBpZHggLSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dF9pZHggPSBpZHggKyAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobmV4dF9pZHggPiAwICYmIG5leHRfaWR4IDw9IG51bV9pdGVtcykge1xuICAgICAgICAgICAgbGV0IHByZWZpeCA9ICcvaXRlbS8nO1xuICAgICAgICAgICAgbGV0IHN1ZmZpeCA9IG5leHRfaWR4LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4ICsgc3VmZml4O1xuICAgICAgICB9IGVsc2UgaWYgKG5leHRfaWR4IDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiAnLyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJy9jb25maXJtJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmaW5pc2goKSB7XG4gICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICB0aGlzLmxpc3QudXBsb2FkKClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB2YXIgc2x1ZyA9IHJlc3BvbnNlLmRhdGEuc2x1ZztcbiAgICAgICAgICAgIC8vdGhpcy5saXN0LnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLiR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbGlzdHMvZGV0YWlsLycgKyBzbHVnO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbkl0ZW1Db250cm9sbGVyLiRpbmplY3QgPSBbJyRyb3V0ZScsICckbG9jYXRpb24nLCAnJHdpbmRvdycsICdsaXN0J107XG5cbmV4cG9ydCBkZWZhdWx0IEl0ZW1Db250cm9sbGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvY29udHJvbGxlcnMvaXRlbS5qc1xuICoqLyIsIiBjbGFzcyBDb25maXJtQ29udHJvbGxlciB7XG4gICBjb25zdHJ1Y3RvcigkbG9jYXRpb24sICR3aW5kb3csIGxpc3QpIHtcbiAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgICB0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuICAgICAgIHRoaXMubGlzdCA9IGxpc3Q7XG4gICAgICAgXG4gICAgICAgdGhpcy5pdGVtcyA9IHRoaXMubGlzdC5pdGVtcygpO1xuICAgICAgIHRoaXMubGlzdF90aXRsZSA9IHRoaXMubGlzdC50aXRsZSgpO1xuICAgICAgIHRoaXMudG9wX24gPSB0aGlzLmxpc3QuY2FwYWNpdHkoKTtcbiAgICAgICB0aGlzLnRhZ3MgPSB0aGlzLmxpc3QudGFncygpO1xuICAgXG4gICAgICAgdGhpcy5lZGl0aW5nID0gdGhpcy5saXN0LmVkaXRpbmcoKTtcbiAgIH1cblxuICAgYmFjaygpIHtcbiAgICAgICAgdmFyIG5leHRfbnVtYmVyID0gdGhpcy50b3Bfbi50b1N0cmluZygpO1xuICAgICAgICB0aGlzLiRsb2NhdGlvbi51cmwoJy9pdGVtLycgKyBuZXh0X251bWJlcik7XG4gICB9XG5cbiAgIGZpbmlzaCgpIHtcbiAgICAgICAgdGhpcy5saXN0LnVwbG9hZCgpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdmFyIHNsdWcgPSByZXNwb25zZS5kYXRhLnNsdWc7XG4gICAgICAgICAgICAvL3RoaXMubGlzdC5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy4kd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2xpc3RzL2RldGFpbC8nICsgc2x1ZztcbiAgICAgICAgfSk7XG4gICB9XG59XG5cbkNvbmZpcm1Db250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2NhdGlvbicsICckd2luZG93JywgJ2xpc3QnXTtcblxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybUNvbnRyb2xsZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9jb250cm9sbGVycy9jb25maXJtLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge0VkaXRMaXN0U2VydmljZSBhcyBMaXN0U2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvbGlzdCc7ICAgIFxuXG52YXIgc2VydmljZXNfbW9kdWxlX25hbWUgPSAnYXBwLnNlcnZpY2VzJztcblxuYW5ndWxhci5tb2R1bGUoc2VydmljZXNfbW9kdWxlX25hbWUsIFtdKVxuICAuc2VydmljZSgnbGlzdCcsIExpc3RTZXJ2aWNlKTtcblxuZXhwb3J0IGRlZmF1bHQgc2VydmljZXNfbW9kdWxlX25hbWU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9lZGl0bGlzdC9zZXJ2aWNlcy5qc1xuICoqLyIsImNsYXNzIExpc3RJdGVtIHtcbiAgICBjb25zdHJ1Y3Rvcigkc2NlLCB0aXRsZT0nJywgcmF3X2h0bWw9JycpIHtcbiAgICAgICAgdGhpcy4kc2NlID0gJHNjZTtcbiAgICAgICAgdGhpcy50aXRsZSh0aXRsZSk7XG4gICAgICAgIHRoaXMuZWRpdChyYXdfaHRtbCk7XG4gICAgfVxuXG4gICAgX3JlcGxhY2VDbHlwSXRMaW5rcyhodG1sKSB7XG4gICAgICAgIGxldCBDSV9MSU5LX1JFID0gLyg/Omh0dHBzPzpcXC9cXC8pPyg/Ond3d1xcLik/KD86Y2x5cFxcLml0KVxcLygoXFx3KXs4fSkvZztcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlX2xpbmtzKF8sIHNvdW5kX2lkKXtcbiAgICAgICAgICAgIHJldHVybiBgPGlmcmFtZSB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxNjBcIiBcbiAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9jbHlwLml0LyR7c291bmRfaWR9L3dpZGdldFwiIFxuICAgICAgICAgICBmcmFtZWJvcmRlcj1cIjBcIj48L2lmcmFtZT5gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoQ0lfTElOS19SRSwgcmVwbGFjZV9saW5rcyk7XG4gICAgfVxuXG4gICAgX3JlcGxhY2VRdW90ZUJsb2NrcyhodG1sKSB7XG4gICAgICAgbGV0IFFVT1RFX1JFID0gL2AoW1xcc1xcU10rKWAvZztcbiAgICAgICBcbiAgICAgICBmdW5jdGlvbiByZXBsYWNlX3F1b3RlcyhfLCBtYXRjaCkge1xuICAgICAgICAgICAgbGV0IG1hdGNoX25sID0gbWF0Y2gucmVwbGFjZSgvPFxcL2Rpdlxccyo+PGRpdlxccyo+L2dpLCAnPGJyPicpO1xuICAgICAgICAgICAgcmV0dXJuIGA8ZGl2PjxibG9ja3F1b3RlPiR7bWF0Y2hfbmx9PC9ibG9ja3F1b3RlPjwvZGl2PmA7XG4gICAgICAgfVxuICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoUVVPVEVfUkUsIHJlcGxhY2VfcXVvdGVzKTtcbiAgICB9XG5cbiAgICBfcmVwbGFjZVlvdVR1YmVMaW5rcyhodG1sKSB7ICAgICAgICAgXG4gICAgICAgIGxldCBZVF9MSU5LX1JFID0gLyg/Omh0dHBzPzpcXC9cXC8pPyg/Ond3d1xcLik/KD86eW91dHVcXC5iZVxcL3x5b3V0dWJlXFwuY29tXFwvKD86ZW1iZWRcXC98dlxcL3x3YXRjaFxcP3Y9fHdhdGNoXFw/Lismdj0pKSgoXFx3fC0pezExfSkvZztcbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2VfbGlua3MoXywgdmlkZW9faWQpIHsgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBgPGlmcmFtZSB3aWR0aD1cIjU2MFwiIGhlaWdodD1cIjMxNVwiXG4gICAgICAgICAgICAgIHNyYz1cImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7dmlkZW9faWR9XCJcbiAgICAgICAgICAgICAgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3dmdWxsc2NyZWVuPlxuICAgICAgICAgICAgICA8L2lmcmFtZT5gO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZShZVF9MSU5LX1JFLCByZXBsYWNlX2xpbmtzKTtcbiAgICB9XG4gICAgXG4gICAgX3Byb2Nlc3MocmF3X2h0bWwpIHtcbiAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gdGhpcy5fcmVwbGFjZVF1b3RlQmxvY2tzKHJhd19odG1sKTsgXG4gICAgICAgIGRlc2NyaXB0aW9uID0gdGhpcy5fcmVwbGFjZVlvdVR1YmVMaW5rcyhkZXNjcmlwdGlvbik7XG4gICAgICAgIGRlc2NyaXB0aW9uID0gdGhpcy5fcmVwbGFjZUNseXBJdExpbmtzKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIHRpdGxlKHRpdGxlKSB7XG4gICAgICAgIGlmKHR5cGVvZiB0aXRsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbV90aXRsZSA9IHRpdGxlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1fdGl0bGU7XG4gICAgfVxuXG4gICAgZWRpdChyYXdfaHRtbCkge1xuICAgICAgICBpZih0eXBlb2YgcmF3X2h0bWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLnJhd19odG1sID0gcmF3X2h0bWw7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NlZF9odG1sID0gdGhpcy5fcHJvY2VzcyhyYXdfaHRtbCk7ICBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yYXdfaHRtbDtcbiAgICB9XG5cbiAgICBwcmV2aWV3KHRydXN0QXM9dHJ1ZSkge1xuICAgICAgICBpZih0cnVzdEFzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2NlLnRydXN0QXNIdG1sKHRoaXMucHJvY2Vzc2VkX2h0bWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc2VkX2h0bWw7XG4gICAgICAgIH1cbiAgICB9IFxuXG4gICAgcmVwcigpIHtcbiAgICAgICAgdmFyIF9vYmogPSB7fTtcbiAgICAgICAgX29iai50aXRsZSA9IHRoaXMudGl0bGUoKTtcbiAgICAgICAgX29iai5kZXNjcmlwdGlvbiA9IHRoaXMuZWRpdCgpO1xuICAgICAgICBfb2JqLmRlc2NyaXB0aW9uX21ldGEgPSB0aGlzLnByZXZpZXcoZmFsc2UpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIF9vYmo7XG4gICB9XG5cbn1cblxuY29uc3QgVEFHUyA9IFtcbiAgICAnTXVzaWMnLFxuICAgICdNb3ZpZXMnLFxuICAgICdUVicsXG4gICAgJ1NjaWVuY2UnLFxuICAgICdQb2xpdGljcydcbl07XG5cbmNvbnN0IFBSSVZBQ1lfTEVWRUxTX0tFWVMgPSBbXG4gICAgJ1BVQkxJQycsIFxuICAgICdQUklWQVRFJywgXG4gICAgJ0ZSSUVORFMnLFxuXTtcblxuY29uc3QgUFJJVkFDWV9MRVZFTFNfTElTVCA9IFt7XG4gICAgaWQ6IDEsXG4gICAgaWNvbjogJzxpIGNsYXNzPVwiZmEgZmEtZ2xvYmVcIj48L2k+JyxcbiAgICBuYW1lOiAnUHVibGljJyxcbiAgICBkZXNjcmlwdGlvbjogJ0FueW9uZSBjYW4gc2VlIHRoaXMgbGlzdC4nLFxufSwge1xuICAgIGlkOiAyLFxuICAgIGljb246ICc8aSBjbGFzcz1cImZhIGZhLWxvY2tcIj48L2k+JyxcbiAgICBuYW1lOiAnUHJpdmF0ZScsXG4gICAgZGVzY3JpcHRpb246ICdPbmx5IHlvdSBjYW4gc2VlIHRoaXMgbGlzdC4nLFxufSwge1xuICAgIGlkOiAzLFxuICAgIGljb246ICc8aSBjbGFzcz1cImZhIGZhLXVzZXJzXCI+PC9pPicsIFxuICAgIG5hbWU6ICdGcmllbmRzJyxcbiAgICBkZXNjcmlwdGlvbjogJ09ubHkgeW91ciBmcmllbmRzIGNhbiBzZWUgdGhpcyBsaXN0LicsXG59XTtcblxuY29uc3QgUFJJVkFDWV9MRVZFTFMgPSAoKCkgPT4ge1xuICAgIGxldCBfUFJJVkFDWV9MRVZFTFMgPSB7fTtcbiAgICBsZXQgaSA9IDA7XG4gICAgZm9yIChsZXQga2V5IG9mIFBSSVZBQ1lfTEVWRUxTX0tFWVMpIHtcbiAgICAgICBfUFJJVkFDWV9MRVZFTFNba2V5XSA9IFBSSVZBQ1lfTEVWRUxTX0xJU1RbaV07IFxuICAgICAgIGkgKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIF9QUklWQUNZX0xFVkVMUztcbn0pKCk7XG5cbmNsYXNzIExpc3RTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigkaHR0cCwgJHNjZSwgJGxvY2F0aW9uLCAkcSkge1xuICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gICAgICAgIHRoaXMuJHNjZSA9ICRzY2U7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgICB0aGlzLiRxID0gJHE7XG5cbiAgICAgICAgdGhpcy50b3BfbiA9IDEwO1xuICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSAnJztcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zID0gW107XG5cbiAgICAgICAgdGhpcy5QUklWQUNZX0xFVkVMUyA9IFBSSVZBQ1lfTEVWRUxTO1xuICAgICAgICB0aGlzLlBSSVZBQ1lfTEVWRUxTX0xJU1QgPSBQUklWQUNZX0xFVkVMU19MSVNUO1xuICAgICAgICBcbiAgICAgICAgLy8gcHJpdmFjeSBsZXZlbCBpcyBwdWJsaWMgYnkgZGVmYXVsdFxuICAgICAgICB0aGlzLnByaXZhY3lfbGV2ZWwgPSBQUklWQUNZX0xFVkVMUy5QVUJMSUM7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnRhZ19pZHMgPSBbXTtcbiAgICB9XG4gXG4gICAgcHJpdmFjeShsZXZlbCkge1xuICAgICAgICBpZih0eXBlb2YgbGV2ZWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLnByaXZhY3lfbGV2ZWwgPSBsZXZlbDsgICAgIFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnByaXZhY3lfbGV2ZWw7XG4gICAgfVxuXG4gICAgaXRlbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RfaXRlbXM7XG4gICAgfVxuXG4gICAgdGFncygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFnX2lkcy5tYXAoX2lkID0+IFRBR1NbX2lkIC0gMV0pO1xuICAgIH1cbiAgICBcbiAgICBhZGRUYWdCeUlkKGlkKSB7XG4gICAgICAgIGlmKGlkID4gMCAmJiBpZCA8PSBUQUdTLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgX2lkIG9mIHRoaXMudGFnX2lkcykge1xuICAgICAgICAgICAgICAgIGlmKGlkID09PSBfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZHVwLCBkb24ndCBhZGRcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudGFnX2lkcy5wdXNoKGlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFRhZyh0YWcpIHsgICAgICAgIFxuICAgICAgICBsZXQgaWQgPSAxO1xuICAgICAgICBmb3IobGV0IF90YWcgb2YgVEFHUykge1xuICAgICAgICAgICAgaWYodGFnID09IF90YWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRhZ0J5SWQoaWQpOyAgICBcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZCArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxsX3ByaXZhY3lfbGV2ZWxzKCkge1xuICAgICAgICByZXR1cm4gUFJJVkFDWV9MRVZFTFNfTElTVDtcbiAgICB9XG5cbiAgICBhbGxfdGFncygpIHtcbiAgICAgICAgcmV0dXJuIFRBR1M7XG4gICAgfVxuXG4gICAgY2xlYXJUYWdzKHRhZykge1xuICAgICAgICB0aGlzLnRhZ19pZHMgPSBbXTtcbiAgICB9XG5cbiAgICB0aXRsZSh0aXRsZSkge1xuICAgICAgICBpZih0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5saXN0X3RpdGxlO1xuICAgIH1cblxuICAgIG5ld0l0ZW0odGl0bGUsIHJhd19odG1sKSB7XG4gICAgICAgIHJldHVybiBuZXcgTGlzdEl0ZW0odGhpcy4kc2NlLCB0aXRsZSwgcmF3X2h0bWwpO1xuICAgIH1cbiAgICBcbiAgICBfaW5ib3VuZHMoaWR4KSB7XG4gICAgICAgIHJldHVybiBpZHggPCB0aGlzLnNpemUoKSAmJiBpZHggPj0gMDtcbiAgICB9XG5cbiAgICBpdGVtKGlkeCwgaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5faW5ib3VuZHMoaWR4KSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdF9pdGVtc1tpZHhdID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RfaXRlbXNbaWR4XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gXG5cbiAgICBwdXNoKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zLnB1c2goaXRlbSk7ICAgIFxuICAgIH1cblxuICAgIHBvcCgpIHtcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zLnBvcCgpO1xuICAgIH1cblxuICAgIGNhcGFjaXR5KG4pIHtcbiAgICAgICAgaWYodHlwZW9mIG4gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLnRvcF9uID0gbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50b3BfbjtcbiAgICB9XG5cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0X2l0ZW1zLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5saXN0X3RpdGxlID0gJyc7XG4gICAgICAgIHRoaXMudG9wX24gPSA1O1xuICAgICAgICB0aGlzLmxpc3RfaXRlbXMgPSBbXTtcbiAgICB9XG5cbiAgICB1cGxvYWQoZW5kcG9pbnQpIHtcbiAgICAgICAgdmFyIF9wYXlsb2FkID0ge307XG4gICAgICAgIF9wYXlsb2FkLmxpc3QgPSB0aGlzLmxpc3RfaXRlbXMubWFwKF9pdGVtID0+IF9pdGVtLnJlcHIoKSk7XG4gICAgICAgIF9wYXlsb2FkLm51bWJlciA9IHRoaXMudG9wX247XG4gICAgICAgIF9wYXlsb2FkLnRpdGxlID0gdGhpcy5saXN0X3RpdGxlO1xuICAgICAgICBfcGF5bG9hZC50YWdzID0gdGhpcy50YWdfaWRzO1xuICAgICAgICBfcGF5bG9hZC5wcml2YWN5ID0gdGhpcy5wcml2YWN5X2xldmVsLmlkO1xuICAgICAgICBjb25zb2xlLmxvZyhfcGF5bG9hZCk7XG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwLnBvc3QoZW5kcG9pbnQsIF9wYXlsb2FkKTtcbiAgICB9XG59XG5cbkxpc3RTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJyRzY2UnLCAnJGxvY2F0aW9uJywgJyRxJ107XG5cbmNsYXNzIEFkZExpc3RTZXJ2aWNlIGV4dGVuZHMgTGlzdFNlcnZpY2Uge1xuICAgIHVwbG9hZCgpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnVwbG9hZCgnL2xpc3RzL25ldycpO1xuICAgIH1cblxuICAgIGVkaXRpbmcoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmNsYXNzIEVkaXRMaXN0U2VydmljZSBleHRlbmRzIExpc3RTZXJ2aWNlIHtcbiAgICBzbHVnKHMpIHtcbiAgICAgICAgaWYodHlwZW9mIHMgPT09ICdzdHJpbmcnKXtcbiAgICAgICAgICAgIHRoaXMubGlzdF9zbHVnID0gcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5saXN0X3NsdWc7XG4gICAgfVxuXG4gICAgZWRpdGluZygpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIFxuICAgIHVwbG9hZCgpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnVwbG9hZCgnL2xpc3RzL2VkaXQvJyArIHRoaXMuc2x1ZygpKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7QWRkTGlzdFNlcnZpY2UsIEVkaXRMaXN0U2VydmljZX07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9zZXJ2aWNlcy9saXN0LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==
angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("templates/confirm.html","<h1>Preview: Your List - {{vm.top_n}} {{vm.list_title}}</h1><div ng-repeat=\"item in vm.items\"><h2>{{$index + 1}}. {{item.title()}}</h2><div ng-bind-html=item.preview()></div></div><div class=\"form btn-group\"><input class=btn value=Back type=Submit ng-click=vm.back()> <input class=\"btn btn-success\" type=Submit value=Finish ng-click=vm.finish()></div>");
$templateCache.put("templates/item.html","<h1>{{vm.top_n}} {{vm.list_title}}</h1><h2>Number {{vm.number}}: {{vm.item_title}}</h2><div class=row><div class=\"col-md-6 form-group\"><label for=itemtitle>Item Title</label> <input ng-model=vm.item_title type=text class=form-control id=itemtitle placeholder=\"Episode 4: A New Hope\" name=title ng-model-options=\"{updateOn: \'blur default\', debounce: {\'blur\': 0, \'default\': 500}}\" ng-trim=\"\" ng-maxlength=128 required></div></div><label for=toolbar>Description</label><div ng-hide=vm.show_preview()><div id=toolbar class=\"toolbar ql-toolbar ql-snow\"><span class=ql-format-group><span title=Link class=\"ql-format-button ql-link\"></span> <span class=ql-format-separator></span> <span title=Image class=\"ql-format-button ql-image\"></span></span></div><div style=\"height: 300px; border: 1px solid #ccc; border-radius: 4px;\"><div id=editor class=\"editor ql-container ql-snow\"></div></div></div><div ng-show=vm.show_preview()><p ng-bind-html=vm.html_preview></p></div><div class=btn-group><label class=\"btn btn-primary\" ng-model=vm.preview_radio btn-radio=\"\'edit\'\" uncheckable=\"\">edit</label> <label class=\"btn primary\" ng-model=vm.preview_radio ng-change=vm.generate_preview() btn-radio=\"\'preview\'\" uncheckable=\"\">preview</label></div><hr><div class=\"footer btn-group\"><input class=btn value=Back type=Submit ng-click=vm.back()> <input class=btn value=Next type=Submit ng-click=vm.next()><br><br><input class=\"btn btn-success\" ng-if=vm.editing type=Submit value=Finish ng-click=vm.finish()></div>");
$templateCache.put("templates/list.html","<form name=newlist novalidate><h1>Your List: {{vm.top_n}} {{vm.list_title}}</h1><div class=row><div class=\"col-md-6 form-group\"><label for=listnumber>Title</label> <input ng-model=vm.list_title type=text class=form-control id=listtitle placeholder=\"StarWars movies\" name=title ng-model-options=\"{updateOn: \'blur default\', debounce: {\'blur\': 0, \'default\': 500}}\" ng-trim=\"\" ng-maxlength=128 required></div></div><div class=row><div class=\"col-md-6 form-group\"><label for=listnumber>Number</label> <input ng-model=vm.top_n type=number class=form-control id=listnumber name=number min=1 max=100></div></div><div class=row><div class=col-md-6><label for=privacy>Privacy</label><ui-select id=privacy ng-model=vm.privacy_level theme=bootstrap><ui-select-match placeholder=\"Who can see this?\"><span ng-bind-html=$select.selected.icon></span> {{$select.selected.name}}</ui-select-match><ui-select-choices repeat=\"level in vm.PRIVACY_LEVELS | filter : {name: $select.search}\"><span ng-bind-html=\"level.icon | highlight: $select.search\"></span> <span ng-bind-html=\"level.name | highlight : $select.search\"></span><br><small>{{level.description}}</small></ui-select-choices></ui-select></div></div><br><div class=row><div class=col-md-6><label for=listtags>Tags</label><ui-select multiple=\"\" tagging=\"\" id=listtags theme=bootstrap tagging-label=false ng-model=vm.tags><ui-select-match placeholder=\"Add Related Tags\">{{$item}}</ui-select-match><ui-select-choices repeat=\"tag in vm.TAGS\">{{tag}}</ui-select-choices></ui-select></div></div><div class=footer style=\"clear: both;\"><input class=btn value=Next type=Submit ng-click=vm.next()> <input class=\"btn btn-success\" ng-if=vm.editing type=Submit value=Finish ng-click=vm.finish()></div></form>");}]);