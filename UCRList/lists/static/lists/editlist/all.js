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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _controllers = __webpack_require__(1);
	
	var _controllers2 = _interopRequireDefault(_controllers);
	
	angular.module('app', ['ngRoute', 'ngSanitize', 'ngMessages', 'ui.bootstrap', 'ui.select', _controllers2['default']]).config(AppRouter).config(SetCSFR);
	
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _controllersList = __webpack_require__(2);
	
	var _controllersList2 = _interopRequireDefault(_controllersList);
	
	var _controllersItem = __webpack_require__(3);
	
	var _controllersItem2 = _interopRequireDefault(_controllersItem);
	
	var _controllersConfirm = __webpack_require__(4);
	
	var _controllersConfirm2 = _interopRequireDefault(_controllersConfirm);
	
	var _services = __webpack_require__(5);
	
	var _services2 = _interopRequireDefault(_services);
	
	var controllers_module_name = 'app.controllers';
	
	angular.module(controllers_module_name, [_services2['default']]).controller('ListController', _controllersList2['default']).controller('ItemController', _controllersItem2['default']).controller('ConfirmController', _controllersConfirm2['default']);
	
	exports['default'] = controllers_module_name;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
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
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
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
	                'toolbar': { container: '#toolbar' },
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
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
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
	
	var _servicesList = __webpack_require__(6);
	
	var services_module_name = 'app.services';
	
	angular.module(services_module_name, []).service('list', _servicesList.EditListService);
	
	exports['default'] = services_module_name;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
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
	        value: function title(_title) {
	            if (typeof _title === 'string') {
	                this.item_title = _title;
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
	        value: function title(_title2) {
	            if (typeof _title2 === 'string') {
	                this.list_title = _title2;
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
	        value: function item(idx, _item2) {
	            if (this._inbounds(idx)) {
	                if (typeof _item2 !== 'undefined') {
	                    this.list_items[idx] = _item2;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2Q4ZjhlNDQ3OGQzNjdkZjk2OWUiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvbGlzdHMvZWRpdGxpc3QvY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2l0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2NvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9saXN0cy9zZXJ2aWNlcy9saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLGFBQVksQ0FBQzs7Ozt3Q0FDb0MsQ0FBZTs7OztBQUVoRSxRQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUNsQixTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFDckMsY0FBYyxFQUFFLFdBQVcsMkJBRzlCLENBQUMsQ0FDQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQ2pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFbkIsVUFBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDdkMsVUFBUyxTQUFTLENBQUMsY0FBYyxFQUFFO0FBQy9CLG1CQUFjLENBQUMsSUFBSSxDQUFDLEdB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QUFRLENBQUMsQ0FBQztBQUN0QixvQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7VUFDOUM7OztZQWpJQyxXQUFXOzs7QUFvSWpCLFlBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7S0FFckQsY0FBYztjQUFkLGNBQWM7K0JBQWQsY0FBYzs7Ozs7OztlQUFkLGNBQWM7O2tCQUFkLGNBQWM7O2dCQUNWLGtCQUFHO0FBQ0wsK0NBRkYsY0FBYyx3Q0FFUSxZQUFZLEVBQUU7VUFDckM7OztnQkFFTSxtQkFBRztBQUNOLG9CQUFPLEtBQUssQ0FBQztVQUNoQjs7O1lBUEMsY0FBYztJQUFTLFdBQVc7O0tBVWxDLGVBQWU7Y0FBZixlQUFlOytCQUFmLGVBQWU7Ozs7Ozs7ZUFBZixlQUFlOztrQkFBZixlQUFlOztnQkFDYixjQUFDLENBQUMsRUFBRTtBQUNKLGlCQUFHLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBQztBQUNyQixxQkFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7Y0FDdEI7QUFDRCxvQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1VBQ3pCOzs7Z0JBRU0sbUJBQUc7QUFDTixvQkFBTyxJQUFJLENBQUM7VUFDZjs7O2dCQUVLLGtCQUFHO0FBQ0wsK0NBYkYsZUFBZSx3Q0FhTyxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFO1VBQ3JEOzs7WUFkQyxlQUFlO0lBQVMsV0FBVzs7U0FpQmpDLGNBQWMsR0FBZCxjQUFjO1NBQUUsZUFBZSxHQUFmLGVBQWUsQyIsImZpbGUiOiIzZDhmOGU0NDc4ZDM2N2RmOTY5ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgM2Q4ZjhlNDQ3OGQzNjdkZjk2OWVcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQge2RlZmF1bHQgYXMgY29udHJvbGxlcnNfbW9kdWxlX25hbWV9IGZyb20gJy4vY29udHJvbGxlcnMnO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAgICduZ1JvdXRlJywgJ25nU2FuaXRpemUnLCAnbmdNZXNzYWdlcycsXG4gICAgJ3VpLmJvb3RzdHJhcCcsICd1aS5zZWxlY3QnLCBcblxuICAgIGNvbnRyb2xsZXJzX21vZHVsZV9uYW1lLFxuXSlcbiAgLmNvbmZpZyhBcHBSb3V0ZXIpXG4gIC5jb25maWcoU2V0Q1NGUik7XG5cbkFwcFJvdXRlci4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuZnVuY3Rpb24gQXBwUm91dGVyKCRyb3V0ZVByb3ZpZGVyKSB7XG4gICAgJHJvdXRlUHJvdmlkZXIud2hlbignLycsIHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbGlzdC5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0xpc3RDb250cm9sbGVyJyxcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBsb2FkOiBMb2FkTGlzdCxcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLndoZW4oJy9pdGVtLzpudW1iZXInLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2l0ZW0uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdJdGVtQ29udHJvbGxlcicsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgbG9hZDogTmV3TGlzdE9uUmVmcmVzaCxcbiAgICAgICAgfSxcbiAgICB9KVxuICAgIC53aGVuKCcvY29uZmlybScsIHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvY29uZmlybS5odG1sJywgXG4gICAgICAgIGNvbnRyb2xsZXI6ICdDb25maXJtQ29udHJvbGxlcicsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgbG9hZDogTmV3TGlzdE9uUmVmcmVzaCxcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cblxuU2V0Q1NGUi4kaW5qZWN0ID0gWyckaHR0cFByb3ZpZGVyJ107XG5mdW5jdGlvbiBTZXRDU0ZSKCRodHRwUHJvdmlkZXIpIHtcbiAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLnhzcmZDb29raWVOYW1lID0gJ2NzcmZ0b2tlbic7XG4gICAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy54c3JmSGVhZGVyTmFtZSA9ICdYLUNTUkZUb2tlbic7XG59XG5cbk5ld0xpc3RPblJlZnJlc2guJGluamVjdCA9IFsnJHEnLCAnJGxvY2F0aW9uJywgJ2xpc3QnXTtcbmZ1bmN0aW9uIE5ld0xpc3RPblJlZnJlc2goJHEsICRsb2NhdGlvbiwgbGlzdCkge1xuICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgIGlmIChsaXN0LnRpdGxlKCkgPT09ICcnKSB7XG4gICAgICAgIC8vbG9naWMgaXMgaWYgdGhlIGxpc3QgaGFzIG5vIHRpdGxlLCB0aGVuXG4gICAgICAgIC8vdGhlIHBhZ2UgbXVzdCBoYXZlIGJlZW4gbWFudWFsbHkgcmVmcmVzaGVkXG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgfVxufVxuXG5Mb2FkTGlzdC4kaW5qZWN0ID0gWyckcScsICckaHR0cCcsICckbG9jYXRpb24nLCAnbGlzdCddO1xuZnVuY3Rpb24gTG9hZExpc3QoJHEsICRodHRwLCAkbG9jYXRpb24sIGxpc3QpIHtcbiAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgXG4gICAgdmFyIHNsdWdfd2l0aF9oYXNoID0gJGxvY2F0aW9uLmFic1VybCgpLnNwbGl0KCdlZGl0LycpWzFdO1xuICAgIHZhciBzbHVnID0gc2x1Z193aXRoX2hhc2guc3Vic3RyaW5nKDAsIHNsdWdfd2l0aF9oYXNoLmxlbmd0aCAtMik7XG4gICAgXG4gICAgJGh0dHAuZ2V0KCcvbGlzdHMvanNvbi8nICsgc2x1ZylcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICBsaXN0LnJlc2V0KCk7XG4gICAgICAgdmFyIGxpc3RfZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgbGlzdC50aXRsZShsaXN0X2RhdGEudGl0bGUpO1xuICAgICAgIGxpc3QuY2FwYWNpdHkobGlzdF9kYXRhLm51bWJlcik7XG4gICAgICAgbGlzdC5wcml2YWN5KGxpc3RfZGF0YS5wcml2YWN5KTtcbiAgICAgICBsaXN0LnNsdWcoc2x1Zyk7XG4gICAgICAgZm9yIChsZXQgdGFnX2lkIG9mIGxpc3RfZGF0YS50YWdzKSB7XG4gICAgICAgICAgICBsaXN0LmFkZFRhZ0J5SWQodGFnX2lkKTtcbiAgICAgICB9XG5cbiAgICAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3RfZGF0YS5saXN0KSB7XG4gICAgICAgICAgICBsZXQgX2l0ZW0gPSBsaXN0Lm5ld0l0ZW0oaXRlbS50aXRsZSwgaXRlbS5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBsaXN0LnB1c2goX2l0ZW0pO1xuICAgICAgIH1cbiAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgfSwgZGVmZXJyZWQucmVqZWN0KTtcblxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvZWRpdGxpc3QvYXBwLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2RlZmF1bHQgYXMgTGlzdENvbnRyb2xsZXJ9IGZyb20gJy4uL2NvbnRyb2xsZXJzL2xpc3QnXG5pbXBvcnQge2RlZmF1bHQgYXMgSXRlbUNvbnRyb2xsZXJ9IGZyb20gJy4uL2NvbnRyb2xsZXJzL2l0ZW0nXG5pbXBvcnQge2RlZmF1bHQgYXMgQ29uZmlybUNvbnRyb2xsZXJ9IGZyb20gJy4uL2NvbnRyb2xsZXJzL2NvbmZpcm0nXG5pbXBvcnQge2RlZmF1bHQgYXMgc2VydmljZXNfbW9kdWxlX25hbWV9IGZyb20gJy4vc2VydmljZXMnIFxuXG52YXIgY29udHJvbGxlcnNfbW9kdWxlX25hbWUgPSAnYXBwLmNvbnRyb2xsZXJzJztcblxuYW5ndWxhci5tb2R1bGUoY29udHJvbGxlcnNfbW9kdWxlX25hbWUsIFtcbiAgICBzZXJ2aWNlc19tb2R1bGVfbmFtZVxuXSlcbiAgLmNvbnRyb2xsZXIoJ0xpc3RDb250cm9sbGVyJywgTGlzdENvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdJdGVtQ29udHJvbGxlcicsIEl0ZW1Db250cm9sbGVyKVxuICAuY29udHJvbGxlcignQ29uZmlybUNvbnRyb2xsZXInLCBDb25maXJtQ29udHJvbGxlcik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRyb2xsZXJzX21vZHVsZV9uYW1lO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvZWRpdGxpc3QvY29udHJvbGxlcnMuanNcbiAqKi8iLCIgY2xhc3MgTGlzdENvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKCRsb2NhdGlvbiwgJHdpbmRvdywgbGlzdCkge1xuICAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgICAgdGhpcy4kd2luZG93ID0gJHdpbmRvdztcbiAgICAgICAgdGhpcy5saXN0ID0gbGlzdDtcblxuICAgICAgICB0aGlzLnRvcF9uID0gdGhpcy5saXN0LmNhcGFjaXR5KCk7XG4gICAgICAgIHRoaXMubGlzdF90aXRsZSA9IHRoaXMubGlzdC50aXRsZSgpO1xuICAgICAgICB0aGlzLnByaXZhY3lfbGV2ZWwgPSB0aGlzLmxpc3QucHJpdmFjeSgpO1xuICAgICAgICB0aGlzLnRhZ3MgPSB0aGlzLmxpc3QudGFncygpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5QUklWQUNZX0xFVkVMUyA9IHRoaXMubGlzdC5hbGxfcHJpdmFjeV9sZXZlbHMoKTtcbiAgICAgICAgdGhpcy5UQUdTID0gdGhpcy5saXN0LmFsbF90YWdzKCk7XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IHRoaXMubGlzdC5lZGl0aW5nKCk7XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5saXN0LmNsZWFyVGFncygpO1xuICAgICAgICBmb3IobGV0IHRhZyBvZiB0aGlzLnRhZ3MpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdC5hZGRUYWcodGFnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3QudGl0bGUodGhpcy5saXN0X3RpdGxlKTtcbiAgICAgICAgdGhpcy5saXN0LmNhcGFjaXR5KHRoaXMudG9wX24pO1xuICAgICAgICB0aGlzLmxpc3QucHJpdmFjeSh0aGlzLnByaXZhY3lfbGV2ZWwpO1xuXG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgdGhpcy5zYXZlKClcbiAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aCgnL2l0ZW0vMScpO1xuICAgIH1cbiAgICBcbiAgICBmaW5pc2goKSB7XG4gICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICB0aGlzLmxpc3QudXBsb2FkKClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB2YXIgc2x1ZyA9IHJlc3BvbnNlLmRhdGEuc2x1ZztcbiAgICAgICAgICAgIC8vdGhpcy5saXN0LnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLiR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbGlzdHMvZGV0YWlsLycgKyBzbHVnO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbkxpc3RDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2NhdGlvbicsICckd2luZG93JywgJ2xpc3QnXTtcbmV4cG9ydCBkZWZhdWx0IExpc3RDb250cm9sbGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvY29udHJvbGxlcnMvbGlzdC5qc1xuICoqLyIsIiBjbGFzcyBJdGVtQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoJHJvdXRlLCAkbG9jYXRpb24sICR3aW5kb3csIGxpc3QpIHtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gICAgICAgIHRoaXMubGlzdCA9IGxpc3Q7XG5cbiAgICAgICAgdGhpcy50b3BfbiA9IGxpc3QuY2FwYWNpdHkoKTtcbiAgICAgICAgdGhpcy5saXN0X3RpdGxlID0gbGlzdC50aXRsZSgpO1xuICAgIFxuICAgICAgICB0aGlzLm51bWJlciA9IHBhcnNlSW50KCRyb3V0ZS5jdXJyZW50LnBhcmFtcy5udW1iZXIpO1xuICAgICAgICB0aGlzLnByZXZpZXdfcmFkaW8gPSAnZWRpdCc7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gbmV3IFF1aWxsKCcjZWRpdG9yJywge1xuICAgICAgICAgICAgbW9kdWxlczoge1xuICAgICAgICAgICAgICAgICd0b29sYmFyJzoge2NvbnRhaW5lcjogJyN0b29sYmFyJ30sXG4gICAgICAgICAgICAgICAgJ2ltYWdlLXRvb2x0aXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICdsaW5rLXRvb2x0aXAnOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoZW1lOiAnc25vdycsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaWR4ID0gdGhpcy5udW1iZXIgLSAxO1xuICAgICAgICB0aGlzLml0ZW0gPSBsaXN0Lml0ZW0odGhpcy5pZHgpO1xuICAgICAgICBpZih0eXBlb2YgdGhpcy5pdGVtID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5pdGVtID0gdGhpcy5saXN0Lm5ld0l0ZW0oKTtcbiAgICAgICAgICAgIGlmKHRoaXMubGlzdC5zaXplKCkgPCB0aGlzLmxpc3QuY2FwYWNpdHkoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKHRoaXMuaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pdGVtX3RpdGxlID0gdGhpcy5pdGVtLnRpdGxlKCk7XG4gICAgICAgIHRoaXMucHJldmlld19odG1sID0gdGhpcy5pdGVtLnByZXZpZXcoKTtcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0SFRNTCh0aGlzLml0ZW0uZWRpdCgpKTtcbiAgICBcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gdGhpcy5saXN0LmVkaXRpbmcoKTtcbiAgICB9XG4gICAgXG4gICAgc2hvd19wcmV2aWV3KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmV2aWV3X3JhZGlvID09PSAncHJldmlldyc7XG4gICAgfVxuICAgIFxuICAgIGdlbmVyYXRlX3ByZXZpZXcoKSB7XG4gICAgICAgIHRoaXMuaXRlbS5lZGl0KHRoaXMuZWRpdG9yLmdldEhUTUwoKSk7XG4gICAgICAgIHRoaXMuaHRtbF9wcmV2aWV3ID0gdGhpcy5pdGVtLnByZXZpZXcoKTtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICB0aGlzLml0ZW0uZWRpdCh0aGlzLmVkaXRvci5nZXRIVE1MKCkpO1xuICAgICAgICB0aGlzLml0ZW0udGl0bGUodGhpcy5pdGVtX3RpdGxlKTtcbiAgICAgICAgdGhpcy5saXN0Lml0ZW0odGhpcy5pZHgsIHRoaXMuaXRlbSk7IFxuICAgIH1cblxuICAgIG5leHQoKSB7XG4gICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICBsZXQgbmV4dF9sb2NhdGlvbiA9IHRoaXMuX25leHRfbG9jYXRpb24odGhpcy5udW1iZXIsIHRoaXMudG9wX24sIGZhbHNlKTtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aChuZXh0X2xvY2F0aW9uKTtcbiAgICB9IFxuXG4gICAgYmFjaygpIHtcbiAgICAgICAgdGhpcy5zYXZlKCk7ICBcbiAgICAgICAgbGV0IG5leHRfbG9jYXRpb24gPSB0aGlzLl9uZXh0X2xvY2F0aW9uKHRoaXMubnVtYmVyLCB0aGlzLnRvcF9uLCB0cnVlKVxuICAgICAgICB0aGlzLiRsb2NhdGlvbi5wYXRoKG5leHRfbG9jYXRpb24pO1xuICAgIH1cblxuICAgIF9uZXh0X2xvY2F0aW9uKGlkeCwgbnVtX2l0ZW1zLCBiYWNrPXRydWUpIHtcbiAgICAgICAgbGV0IG5leHRfaWR4ID0gaWR4O1xuICAgIFxuICAgICAgICBpZihiYWNrKSB7XG4gICAgICAgICAgICBuZXh0X2lkeCA9IGlkeCAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0X2lkeCA9IGlkeCArIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZihuZXh0X2lkeCA+IDAgJiYgbmV4dF9pZHggPD0gbnVtX2l0ZW1zKSB7XG4gICAgICAgICAgICBsZXQgcHJlZml4ID0gJy9pdGVtLyc7XG4gICAgICAgICAgICBsZXQgc3VmZml4ID0gbmV4dF9pZHgudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHJldHVybiBwcmVmaXggKyBzdWZmaXg7XG4gICAgICAgIH0gZWxzZSBpZiAobmV4dF9pZHggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuICcvJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnL2NvbmZpcm0nO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZpbmlzaCgpIHtcbiAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgIHRoaXMubGlzdC51cGxvYWQoKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHZhciBzbHVnID0gcmVzcG9uc2UuZGF0YS5zbHVnO1xuICAgICAgICAgICAgLy90aGlzLmxpc3QucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9saXN0cy9kZXRhaWwvJyArIHNsdWc7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuSXRlbUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHJvdXRlJywgJyRsb2NhdGlvbicsICckd2luZG93JywgJ2xpc3QnXTtcblxuZXhwb3J0IGRlZmF1bHQgSXRlbUNvbnRyb2xsZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9jb250cm9sbGVycy9pdGVtLmpzXG4gKiovIiwiIGNsYXNzIENvbmZpcm1Db250cm9sbGVyIHtcbiAgIGNvbnN0cnVjdG9yKCRsb2NhdGlvbiwgJHdpbmRvdywgbGlzdCkge1xuICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gICAgICAgdGhpcy5saXN0ID0gbGlzdDtcbiAgICAgICBcbiAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5saXN0Lml0ZW1zKCk7XG4gICAgICAgdGhpcy5saXN0X3RpdGxlID0gdGhpcy5saXN0LnRpdGxlKCk7XG4gICAgICAgdGhpcy50b3BfbiA9IHRoaXMubGlzdC5jYXBhY2l0eSgpO1xuICAgICAgIHRoaXMudGFncyA9IHRoaXMubGlzdC50YWdzKCk7XG4gICBcbiAgICAgICB0aGlzLmVkaXRpbmcgPSB0aGlzLmxpc3QuZWRpdGluZygpO1xuICAgfVxuXG4gICBiYWNrKCkge1xuICAgICAgICB2YXIgbmV4dF9udW1iZXIgPSB0aGlzLnRvcF9uLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uLnVybCgnL2l0ZW0vJyArIG5leHRfbnVtYmVyKTtcbiAgIH1cblxuICAgZmluaXNoKCkge1xuICAgICAgICB0aGlzLmxpc3QudXBsb2FkKClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB2YXIgc2x1ZyA9IHJlc3BvbnNlLmRhdGEuc2x1ZztcbiAgICAgICAgICAgIC8vdGhpcy5saXN0LnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLiR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbGlzdHMvZGV0YWlsLycgKyBzbHVnO1xuICAgICAgICB9KTtcbiAgIH1cbn1cblxuQ29uZmlybUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvY2F0aW9uJywgJyR3aW5kb3cnLCAnbGlzdCddO1xuXG5leHBvcnQgZGVmYXVsdCBDb25maXJtQ29udHJvbGxlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2NvbmZpcm0uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7RWRpdExpc3RTZXJ2aWNlIGFzIExpc3RTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9saXN0JzsgICAgXG5cbnZhciBzZXJ2aWNlc19tb2R1bGVfbmFtZSA9ICdhcHAuc2VydmljZXMnO1xuXG5hbmd1bGFyLm1vZHVsZShzZXJ2aWNlc19tb2R1bGVfbmFtZSwgW10pXG4gIC5zZXJ2aWNlKCdsaXN0JywgTGlzdFNlcnZpY2UpO1xuXG5leHBvcnQgZGVmYXVsdCBzZXJ2aWNlc19tb2R1bGVfbmFtZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L3NlcnZpY2VzLmpzXG4gKiovIiwiY2xhc3MgTGlzdEl0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKCRzY2UsIHRpdGxlPScnLCByYXdfaHRtbD0nJykge1xuICAgICAgICB0aGlzLiRzY2UgPSAkc2NlO1xuICAgICAgICB0aGlzLnRpdGxlKHRpdGxlKTtcbiAgICAgICAgdGhpcy5lZGl0KHJhd19odG1sKTtcbiAgICB9XG5cbiAgICBfcmVwbGFjZUNseXBJdExpbmtzKGh0bWwpIHtcbiAgICAgICAgbGV0IENJX0xJTktfUkUgPSAvKD86aHR0cHM/OlxcL1xcLyk/KD86d3d3XFwuKT8oPzpjbHlwXFwuaXQpXFwvKChcXHcpezh9KS9nO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2VfbGlua3MoXywgc291bmRfaWQpe1xuICAgICAgICAgICAgcmV0dXJuIGA8aWZyYW1lIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjE2MFwiIFxuICAgICAgICAgICBzcmM9XCJodHRwczovL2NseXAuaXQvJHtzb3VuZF9pZH0vd2lkZ2V0XCIgXG4gICAgICAgICAgIGZyYW1lYm9yZGVyPVwiMFwiPjwvaWZyYW1lPmA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZShDSV9MSU5LX1JFLCByZXBsYWNlX2xpbmtzKTtcbiAgICB9XG5cbiAgICBfcmVwbGFjZVF1b3RlQmxvY2tzKGh0bWwpIHtcbiAgICAgICBsZXQgUVVPVEVfUkUgPSAvYChbXFxzXFxTXSspYC9nO1xuICAgICAgIFxuICAgICAgIGZ1bmN0aW9uIHJlcGxhY2VfcXVvdGVzKF8sIG1hdGNoKSB7XG4gICAgICAgICAgICBsZXQgbWF0Y2hfbmwgPSBtYXRjaC5yZXBsYWNlKC88XFwvZGl2XFxzKj48ZGl2XFxzKj4vZ2ksICc8YnI+Jyk7XG4gICAgICAgICAgICByZXR1cm4gYDxkaXY+PGJsb2NrcXVvdGU+JHttYXRjaF9ubH08L2Jsb2NrcXVvdGU+PC9kaXY+YDtcbiAgICAgICB9XG4gICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZShRVU9URV9SRSwgcmVwbGFjZV9xdW90ZXMpO1xuICAgIH1cblxuICAgIF9yZXBsYWNlWW91VHViZUxpbmtzKGh0bWwpIHsgICAgICAgICBcbiAgICAgICAgbGV0IFlUX0xJTktfUkUgPSAvKD86aHR0cHM/OlxcL1xcLyk/KD86d3d3XFwuKT8oPzp5b3V0dVxcLmJlXFwvfHlvdXR1YmVcXC5jb21cXC8oPzplbWJlZFxcL3x2XFwvfHdhdGNoXFw/dj18d2F0Y2hcXD8uKyZ2PSkpKChcXHd8LSl7MTF9KS9nO1xuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZV9saW5rcyhfLCB2aWRlb19pZCkgeyAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGA8aWZyYW1lIHdpZHRoPVwiNTYwXCIgaGVpZ2h0PVwiMzE1XCJcbiAgICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJHt2aWRlb19pZH1cIlxuICAgICAgICAgICAgICBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4+XG4gICAgICAgICAgICAgIDwvaWZyYW1lPmA7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKFlUX0xJTktfUkUsIHJlcGxhY2VfbGlua3MpO1xuICAgIH1cbiAgICBcbiAgICBfcHJvY2VzcyhyYXdfaHRtbCkge1xuICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSB0aGlzLl9yZXBsYWNlUXVvdGVCbG9ja3MocmF3X2h0bWwpOyBcbiAgICAgICAgZGVzY3JpcHRpb24gPSB0aGlzLl9yZXBsYWNlWW91VHViZUxpbmtzKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgZGVzY3JpcHRpb24gPSB0aGlzLl9yZXBsYWNlQ2x5cEl0TGlua3MoZGVzY3JpcHRpb24pO1xuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgdGl0bGUodGl0bGUpIHtcbiAgICAgICAgaWYodHlwZW9mIHRpdGxlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5pdGVtX3RpdGxlID0gdGl0bGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbV90aXRsZTtcbiAgICB9XG5cbiAgICBlZGl0KHJhd19odG1sKSB7XG4gICAgICAgIGlmKHR5cGVvZiByYXdfaHRtbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMucmF3X2h0bWwgPSByYXdfaHRtbDtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc2VkX2h0bWwgPSB0aGlzLl9wcm9jZXNzKHJhd19odG1sKTsgIFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJhd19odG1sO1xuICAgIH1cblxuICAgIHByZXZpZXcodHJ1c3RBcz10cnVlKSB7XG4gICAgICAgIGlmKHRydXN0QXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY2UudHJ1c3RBc0h0bWwodGhpcy5wcm9jZXNzZWRfaHRtbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzZWRfaHRtbDtcbiAgICAgICAgfVxuICAgIH0gXG5cbiAgICByZXByKCkge1xuICAgICAgICB2YXIgX29iaiA9IHt9O1xuICAgICAgICBfb2JqLnRpdGxlID0gdGhpcy50aXRsZSgpO1xuICAgICAgICBfb2JqLmRlc2NyaXB0aW9uID0gdGhpcy5lZGl0KCk7XG4gICAgICAgIF9vYmouZGVzY3JpcHRpb25fbWV0YSA9IHRoaXMucHJldmlldyhmYWxzZSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gX29iajtcbiAgIH1cblxufVxuXG5jb25zdCBUQUdTID0gW1xuICAgICdNdXNpYycsXG4gICAgJ01vdmllcycsXG4gICAgJ1RWJyxcbiAgICAnU2NpZW5jZScsXG4gICAgJ1BvbGl0aWNzJ1xuXTtcblxuY29uc3QgUFJJVkFDWV9MRVZFTFNfS0VZUyA9IFtcbiAgICAnUFVCTElDJywgXG4gICAgJ1BSSVZBVEUnLCBcbiAgICAnRlJJRU5EUycsXG5dO1xuXG5jb25zdCBQUklWQUNZX0xFVkVMU19MSVNUID0gW3tcbiAgICBpZDogMSxcbiAgICBpY29uOiAnPGkgY2xhc3M9XCJmYSBmYS1nbG9iZVwiPjwvaT4nLFxuICAgIG5hbWU6ICdQdWJsaWMnLFxuICAgIGRlc2NyaXB0aW9uOiAnQW55b25lIGNhbiBzZWUgdGhpcyBsaXN0LicsXG59LCB7XG4gICAgaWQ6IDIsXG4gICAgaWNvbjogJzxpIGNsYXNzPVwiZmEgZmEtbG9ja1wiPjwvaT4nLFxuICAgIG5hbWU6ICdQcml2YXRlJyxcbiAgICBkZXNjcmlwdGlvbjogJ09ubHkgeW91IGNhbiBzZWUgdGhpcyBsaXN0LicsXG59LCB7XG4gICAgaWQ6IDMsXG4gICAgaWNvbjogJzxpIGNsYXNzPVwiZmEgZmEtdXNlcnNcIj48L2k+JywgXG4gICAgbmFtZTogJ0ZyaWVuZHMnLFxuICAgIGRlc2NyaXB0aW9uOiAnT25seSB5b3VyIGZyaWVuZHMgY2FuIHNlZSB0aGlzIGxpc3QuJyxcbn1dO1xuXG5jb25zdCBQUklWQUNZX0xFVkVMUyA9ICgoKSA9PiB7XG4gICAgbGV0IF9QUklWQUNZX0xFVkVMUyA9IHt9O1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKGxldCBrZXkgb2YgUFJJVkFDWV9MRVZFTFNfS0VZUykge1xuICAgICAgIF9QUklWQUNZX0xFVkVMU1trZXldID0gUFJJVkFDWV9MRVZFTFNfTElTVFtpXTsgXG4gICAgICAgaSArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gX1BSSVZBQ1lfTEVWRUxTO1xufSkoKTtcblxuY2xhc3MgTGlzdFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCRodHRwLCAkc2NlLCAkbG9jYXRpb24sICRxKSB7XG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgICAgICAgdGhpcy4kc2NlID0gJHNjZTtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcblxuICAgICAgICB0aGlzLnRvcF9uID0gMTA7XG4gICAgICAgIHRoaXMubGlzdF90aXRsZSA9ICcnO1xuICAgICAgICB0aGlzLmxpc3RfaXRlbXMgPSBbXTtcblxuICAgICAgICB0aGlzLlBSSVZBQ1lfTEVWRUxTID0gUFJJVkFDWV9MRVZFTFM7XG4gICAgICAgIHRoaXMuUFJJVkFDWV9MRVZFTFNfTElTVCA9IFBSSVZBQ1lfTEVWRUxTX0xJU1Q7XG4gICAgICAgIFxuICAgICAgICAvLyBwcml2YWN5IGxldmVsIGlzIHB1YmxpYyBieSBkZWZhdWx0XG4gICAgICAgIHRoaXMucHJpdmFjeV9sZXZlbCA9IFBSSVZBQ1lfTEVWRUxTLlBVQkxJQztcbiAgICAgICAgXG4gICAgICAgIHRoaXMudGFnX2lkcyA9IFtdO1xuICAgIH1cbiBcbiAgICBwcml2YWN5KGxldmVsKSB7XG4gICAgICAgIGlmKHR5cGVvZiBsZXZlbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMucHJpdmFjeV9sZXZlbCA9IGxldmVsOyAgICAgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJpdmFjeV9sZXZlbDtcbiAgICB9XG5cbiAgICBpdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdF9pdGVtcztcbiAgICB9XG5cbiAgICB0YWdzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50YWdfaWRzLm1hcChfaWQgPT4gVEFHU1tfaWQgLSAxXSk7XG4gICAgfVxuICAgIFxuICAgIGFkZFRhZ0J5SWQoaWQpIHtcbiAgICAgICAgaWYoaWQgPiAwICYmIGlkIDw9IFRBR1MubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBfaWQgb2YgdGhpcy50YWdfaWRzKSB7XG4gICAgICAgICAgICAgICAgaWYoaWQgPT09IF9pZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBkdXAsIGRvbid0IGFkZFxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50YWdfaWRzLnB1c2goaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkVGFnKHRhZykgeyAgICAgICAgXG4gICAgICAgIGxldCBpZCA9IDE7XG4gICAgICAgIGZvcihsZXQgX3RhZyBvZiBUQUdTKSB7XG4gICAgICAgICAgICBpZih0YWcgPT0gX3RhZykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkVGFnQnlJZChpZCk7ICAgIFxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGxfcHJpdmFjeV9sZXZlbHMoKSB7XG4gICAgICAgIHJldHVybiBQUklWQUNZX0xFVkVMU19MSVNUO1xuICAgIH1cblxuICAgIGFsbF90YWdzKCkge1xuICAgICAgICByZXR1cm4gVEFHUztcbiAgICB9XG5cbiAgICBjbGVhclRhZ3ModGFnKSB7XG4gICAgICAgIHRoaXMudGFnX2lkcyA9IFtdO1xuICAgIH1cblxuICAgIHRpdGxlKHRpdGxlKSB7XG4gICAgICAgIGlmKHR5cGVvZiB0aXRsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdF90aXRsZSA9IHRpdGxlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RfdGl0bGU7XG4gICAgfVxuXG4gICAgbmV3SXRlbSh0aXRsZSwgcmF3X2h0bWwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMaXN0SXRlbSh0aGlzLiRzY2UsIHRpdGxlLCByYXdfaHRtbCk7XG4gICAgfVxuICAgIFxuICAgIF9pbmJvdW5kcyhpZHgpIHtcbiAgICAgICAgcmV0dXJuIGlkeCA8IHRoaXMuc2l6ZSgpICYmIGlkeCA+PSAwO1xuICAgIH1cblxuICAgIGl0ZW0oaWR4LCBpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbmJvdW5kcyhpZHgpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0X2l0ZW1zW2lkeF0gPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdF9pdGVtc1tpZHhdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBcblxuICAgIHB1c2goaXRlbSkge1xuICAgICAgICB0aGlzLmxpc3RfaXRlbXMucHVzaChpdGVtKTsgICAgXG4gICAgfVxuXG4gICAgcG9wKCkge1xuICAgICAgICB0aGlzLmxpc3RfaXRlbXMucG9wKCk7XG4gICAgfVxuXG4gICAgY2FwYWNpdHkobikge1xuICAgICAgICBpZih0eXBlb2YgbiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMudG9wX24gPSBuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRvcF9uO1xuICAgIH1cblxuICAgIHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RfaXRlbXMubGVuZ3RoO1xuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSAnJztcbiAgICAgICAgdGhpcy50b3BfbiA9IDU7XG4gICAgICAgIHRoaXMubGlzdF9pdGVtcyA9IFtdO1xuICAgIH1cblxuICAgIHVwbG9hZChlbmRwb2ludCkge1xuICAgICAgICB2YXIgX3BheWxvYWQgPSB7fTtcbiAgICAgICAgX3BheWxvYWQubGlzdCA9IHRoaXMubGlzdF9pdGVtcy5tYXAoX2l0ZW0gPT4gX2l0ZW0ucmVwcigpKTtcbiAgICAgICAgX3BheWxvYWQubnVtYmVyID0gdGhpcy50b3BfbjtcbiAgICAgICAgX3BheWxvYWQudGl0bGUgPSB0aGlzLmxpc3RfdGl0bGU7XG4gICAgICAgIF9wYXlsb2FkLnRhZ3MgPSB0aGlzLnRhZ19pZHM7XG4gICAgICAgIF9wYXlsb2FkLnByaXZhY3kgPSB0aGlzLnByaXZhY3lfbGV2ZWwuaWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKF9wYXlsb2FkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAucG9zdChlbmRwb2ludCwgX3BheWxvYWQpO1xuICAgIH1cbn1cblxuTGlzdFNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJHNjZScsICckbG9jYXRpb24nLCAnJHEnXTtcblxuY2xhc3MgQWRkTGlzdFNlcnZpY2UgZXh0ZW5kcyBMaXN0U2VydmljZSB7XG4gICAgdXBsb2FkKCkge1xuICAgICAgICByZXR1cm4gc3VwZXIudXBsb2FkKCcvbGlzdHMvbmV3Jyk7XG4gICAgfVxuXG4gICAgZWRpdGluZygpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuY2xhc3MgRWRpdExpc3RTZXJ2aWNlIGV4dGVuZHMgTGlzdFNlcnZpY2Uge1xuICAgIHNsdWcocykge1xuICAgICAgICBpZih0eXBlb2YgcyA9PT0gJ3N0cmluZycpe1xuICAgICAgICAgICAgdGhpcy5saXN0X3NsdWcgPSBzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Rfc2x1ZztcbiAgICB9XG5cbiAgICBlZGl0aW5nKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgdXBsb2FkKCkge1xuICAgICAgICByZXR1cm4gc3VwZXIudXBsb2FkKCcvbGlzdHMvZWRpdC8nICsgdGhpcy5zbHVnKCkpO1xuICAgIH1cbn1cblxuZXhwb3J0IHtBZGRMaXN0U2VydmljZSwgRWRpdExpc3RTZXJ2aWNlfTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXNzZXRzL2xpc3RzL3NlcnZpY2VzL2xpc3QuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9
angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("templates/confirm.html","<h1>Preview: Your List - {{vm.top_n}} {{vm.list_title}}</h1><div ng-repeat=\"item in vm.items\"><h2>{{$index + 1}}. {{item.title()}}</h2><div ng-bind-html=item.preview()></div></div><div class=\"form btn-group\"><input class=btn value=Back type=Submit ng-click=vm.back()> <input class=\"btn btn-success\" type=Submit value=Finish ng-click=vm.finish()></div>");
$templateCache.put("templates/item.html","<h1>{{vm.top_n}} {{vm.list_title}}</h1><h2>Number {{vm.number}}: {{vm.item_title}}</h2><div class=row><div class=\"col-md-6 form-group\"><label for=itemtitle>Item Title</label> <input ng-model=vm.item_title type=text class=form-control id=itemtitle placeholder=\"Episode 4: A New Hope\" name=title ng-model-options=\"{updateOn: \'blur default\', debounce: {\'blur\': 0, \'default\': 500}}\" ng-trim ng-maxlength=128 required></div></div><label for=toolbar>Description</label><div ng-hide=vm.show_preview()><div id=toolbar class=\"toolbar ql-toolbar ql-snow\"><span class=ql-format-group><span title=Link class=\"ql-format-button ql-link\"></span> <span class=ql-format-separator></span> <span title=Image class=\"ql-format-button ql-image\"></span></span></div><div style=\"height: 300px; border: 1px solid #ccc; border-radius: 4px;\"><div id=editor class=\"editor ql-container ql-snow\"></div></div></div><div ng-show=vm.show_preview()><p ng-bind-html=vm.html_preview></p></div><div class=btn-group><label class=\"btn btn-primary\" ng-model=vm.preview_radio btn-radio=\"\'edit\'\" uncheckable>edit</label> <label class=\"btn primary\" ng-model=vm.preview_radio ng-change=vm.generate_preview() btn-radio=\"\'preview\'\" uncheckable>preview</label></div><hr><div class=\"footer btn-group\"><input class=btn value=Back type=Submit ng-click=vm.back()> <input class=btn value=Next type=Submit ng-click=vm.next()><br><br><input class=\"btn btn-success\" ng-if=vm.editing type=Submit value=Finish ng-click=vm.finish()></div>");
$templateCache.put("templates/list.html","<form name=newlist novalidate><h1>Your List: {{vm.top_n}} {{vm.list_title}}</h1><div class=row><div class=\"col-md-6 form-group\"><label for=listnumber>Title</label> <input ng-model=vm.list_title type=text class=form-control id=listtitle placeholder=\"StarWars movies\" name=title ng-model-options=\"{updateOn: \'blur default\', debounce: {\'blur\': 0, \'default\': 500}}\" ng-trim ng-maxlength=128 required></div></div><div class=row><div class=\"col-md-6 form-group\"><label for=listnumber>Number</label> <input ng-model=vm.top_n type=number class=form-control id=listnumber name=number min=1 max=100></div></div><div class=row><div class=col-md-6><label for=privacy>Privacy</label><ui-select id=privacy ng-model=vm.privacy_level theme=bootstrap><ui-select-match placeholder=\"Who can see this?\"><span ng-bind-html=$select.selected.icon></span> {{$select.selected.name}}</ui-select-match><ui-select-choices repeat=\"level in vm.PRIVACY_LEVELS | filter : {name: $select.search}\"><span ng-bind-html=\"level.icon | highlight: $select.search\"></span> <span ng-bind-html=\"level.name | highlight : $select.search\"></span><br><small>{{level.description}}</small></ui-select-choices></ui-select></div></div><br><div class=row><div class=col-md-6><label for=listtags>Tags</label><ui-select multiple tagging id=listtags theme=bootstrap tagging-label=false ng-model=vm.tags><ui-select-match placeholder=\"Add Related Tags\">{{$item}}</ui-select-match><ui-select-choices repeat=\"tag in vm.TAGS\">{{tag}}</ui-select-choices></ui-select></div></div><div class=footer style=\"clear: both;\"><input class=btn value=Next type=Submit ng-click=vm.next()> <input class=\"btn btn-success\" ng-if=vm.editing type=Submit value=Finish ng-click=vm.finish()></div></form>");}]);