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
	
	angular.module('app', ['ngRoute', 'ngSanitize', 'ngMessages', 'ui.bootstrap', _controllers_module_name2['default']]).config(AppRouter).config(SetCSFR);
	
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
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
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
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var ListController = (function () {
	    function ListController($location, list) {
	        _classCallCheck(this, ListController);
	
	        this.$location = $location;
	        this.list = list;
	
	        this.top_n = this.list.capacity();
	        this.list_title = this.list.title();
	    }
	
	    _createClass(ListController, [{
	        key: 'next',
	        value: function next() {
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
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
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
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
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
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
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
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
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
	            var description = this._replaceYouTubeLinks(raw_html);
	            description = this._replaceClypItLinks(description);
	            return description;
	        }
	    }, {
	        key: 'title',
	        value: (function (_title) {
	            function title(_x) {
	                return _title.apply(this, arguments);
	            }
	
	            title.toString = function () {
	                return _title.toString();
	            };
	
	            return title;
	        })(function (title) {
	            if (typeof title === 'string') {
	                this.item_title = title;
	            }
	            return this.item_title;
	        })
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
	    }
	
	    _createClass(ListService, [{
	        key: 'items',
	        value: function items() {
	            return this.list_items;
	        }
	    }, {
	        key: 'title',
	        value: (function (_title2) {
	            function title(_x2) {
	                return _title2.apply(this, arguments);
	            }
	
	            title.toString = function () {
	                return _title2.toString();
	            };
	
	            return title;
	        })(function (title) {
	            if (typeof title === 'string') {
	                this.list_title = title;
	            }
	            return this.list_title;
	        })
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
	        value: (function (_item) {
	            function item(_x3, _x4) {
	                return _item.apply(this, arguments);
	            }
	
	            item.toString = function () {
	                return _item.toString();
	            };
	
	            return item;
	        })(function (idx, item) {
	            if (this._inbounds(idx)) {
	                if (typeof item !== 'undefined') {
	                    this.list_items[idx] = item;
	                }
	                return this.list_items[idx];
	            }
	            return undefined;
	        })
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
	        value: function upload() {
	            var _payload = {};
	            var operation_with_hash = this.$location.absUrls().split('/lists/')[1];
	            var operation = operation_with_hash.substring(0, operation_with_hash.length - 2);
	            var endpoint = '/lists/' + operation;
	            console.log(endpoint);
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
	
	exports['default'] = ListService;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWEzOGVkODlmYTAyYTc2NDJhMzAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2VkaXRsaXN0L2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvbGlzdHMvY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2l0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2NvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xpc3RzL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9saXN0cy9zZXJ2aWNlcy9saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLGFBQVksQ0FBQzs7OztvREFDb0MsQ0FBZ0I7Ozs7QUFFakUsUUFBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FDbEIsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQ3JDLGNBQWMsdUNBR2pCLENBQUMsQ0FDQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQ2pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFbkIsVUFBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDdkMsVUFBUyxTQUFTLENBQUMsY0FBYyxFQUFFO0FBQy9CLG1CQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNyQixvQkFBVyxFQUFFLHFCQUFxQjtBQUNsQyxtQkFBVSxFQUFFLGdCQUFnQjtBQUM1QixxQkFBWSxFQUFFLElBQUk7QUFDbEIsZ0JBQU8sRUFBRTtBQUNMLGlCQUFJLEVBQUUsUUFBUSxFQUNqQjtNQUNKLENBQUMsQ0FDRCxJQUFJLENBQUMsZUFBZSxFQUFFO0FBQ25CLG9CQUFXLEVBQUUscUJBQXFCO0FBQ2xDLG1CQUFVLEVBQUUsZ0JBQWdCO0FBQzVCLHFCQUFZLEVBQUUsSUFBSTtBQUNsQixnQkFBTyxFQUFFO0FBQ0wsaUJBQUksRUFBRSxnQkFBZ0IsRUFDekIsRUFDSixDQUFDLENBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNkLG9CQUFXLEVBQUUsd0JBQXdCO0FBQ3JDLG1CQUFVLEVBQUUsbUJBQW1CO0FBQy9CLHFCQUFZLEVBQUUsSUFBSTtBQUNsQixnQkFBTyxFQUFFO0FBQ0wsaUJBQUksRUFBRSxnQkFBZ0IsRUFDekIsRUFDSixDQUFDLENBQUM7RUFDTjs7QUFFRCxRQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDcEMsVUFBUyxPQUFPLENBQUMsYUFBYSxFQUFFO0FBQzVCLGtCQUFhLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUM7QUFDcEQsa0JBQWEsQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztFQUN6RDs7QUFFRCxpQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZELFVBQVMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUU7QUFDM0MsU0FBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQzFCLGFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNuQixTQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7OztBQUdyQixrQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUN2QjtFQUNKOztBQUVELFNBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN4RCxVQUFTLFFBQVEsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUU7QUFDMUMsU0FBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDOztBQUUxQixTQUFJLGNBQWMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFELFNBQUksSUFBSSxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxNQUFNLEdBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRWpFLFVBQUssQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxDQUMvQixJQUFJLENBQUMsVUFBQyxRQUFRLEVBQUs7QUFDakIsYUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2IsYUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztBQUM5QixhQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QixhQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7O0FBQ2hDLGtDQUFpQixTQUFTLENBQUMsSUFBSSw4SEFBRTtxQkFBeEIsSUFBSTs7QUFDUixxQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzVELHFCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2NBQ3JCOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsaUJBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztNQUNyQixFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFcEIsWUFBTyxRQUFRLENBQUMsT0FBTyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7MkNDM0VZLENBQW9COzs7OzJDQUNwQixDQUFvQjs7Ozs4Q0FDakIsQ0FBdUI7Ozs7aURBQ3BCLENBQVk7Ozs7QUFMMUQsYUFBWSxDQUFDOztBQU9iLEtBQUksdUJBQXVCLEdBQUcsaUJBQWlCLENBQUM7O0FBRWhELFFBQU8sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLEVBQUUsbUNBRXZDLENBQUMsQ0FDQyxVQUFVLENBQUMsZ0JBQWdCLDhCQUFpQixDQUM1QyxVQUFVLENBQUMsZ0JBQWdCLDhCQUFpQixDQUM1QyxVQUFVLENBQUMsbUJBQW1CLGlDQUFvQixDQUFDOztzQkFFdkMsdUJBQXVCOzs7Ozs7Ozs7Ozs7Ozs7OztLQ2hCL0IsY0FBYztBQUNOLGNBRFIsY0FBYyxDQUNMLFNBQVMsRUFBRSxJQUFJLEVBQUU7K0JBRDFCLGNBQWM7O0FBRWIsYUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDM0IsYUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWpCLGFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNsQyxhQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7TUFDdkM7O2tCQVBFLGNBQWM7O2dCQVNiLGdCQUFHO0FBQ0gsaUJBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNqQyxpQkFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLGlCQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztVQUNsQzs7O1lBYkUsY0FBYzs7O0FBZXJCLGVBQWMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7c0JBQ2hDLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7O0tDaEJ0QixjQUFjO0FBQ04sY0FEUixjQUFjLENBQ0wsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUU7K0JBRGxDLGNBQWM7O0FBRWIsYUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDM0IsYUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWpCLGFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQzdCLGFBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDOztBQUUvQixhQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyRCxhQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztBQUM1QixhQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTtBQUMvQixvQkFBTyxFQUFFO0FBQ0wsMEJBQVcsRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFDO0FBQ2xDLGdDQUFlLEVBQUUsSUFBSTtBQUNyQiwrQkFBYyxFQUFFLElBQUksRUFDdkI7QUFDRCxrQkFBSyxFQUFFLE1BQU0sRUFDaEIsQ0FBQyxDQUFDOztBQUVILGFBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDM0IsYUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQyxhQUFHLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7QUFDakMsaUJBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQyxpQkFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7QUFDeEMscUJBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztjQUM3QjtVQUNKO0FBQ0QsYUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3BDLGFBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN4QyxhQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7TUFDekM7O2tCQTlCRSxjQUFjOztnQkFnQ0wsd0JBQUc7QUFDWCxvQkFBTyxJQUFJLENBQUMsYUFBYSxLQUFLLFNBQVMsQ0FBQztVQUMzQzs7O2dCQUVlLDRCQUFHO0FBQ2YsaUJBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUN0QyxpQkFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1VBQzNDOzs7Z0JBRUcsZ0JBQUc7QUFDSCxpQkFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLGlCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDakMsaUJBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1VBQ3ZDOzs7Z0JBRUcsZ0JBQUc7QUFDSCxpQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ1osaUJBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQzFCLHFCQUFJLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDO0FBQy9DLHFCQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLENBQUM7Y0FDL0MsTUFBTTtBQUNILHFCQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztjQUNuQztVQUNKOzs7Z0JBRUcsZ0JBQUc7QUFDSCxpQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ1osaUJBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUU7QUFDZCxxQkFBSSxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQztBQUMvQyxxQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxDQUFDO2NBQy9DLE1BQU07QUFDSCxxQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Y0FDNUI7VUFDSjs7O1lBakVFLGNBQWM7OztBQW9FckIsZUFBYyxDQUFDLE9BQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7O3NCQUUxQyxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7OztLQ3RFdEIsaUJBQWlCO0FBQ1YsY0FEUCxpQkFBaUIsQ0FDVCxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTsrQkFEbEMsaUJBQWlCOztBQUVqQixhQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMzQixhQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUN2QixhQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFakIsYUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQy9CLGFBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNwQyxhQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7TUFDckM7O2tCQVRHLGlCQUFpQjs7Z0JBV2pCLGdCQUFHO0FBQ0YsaUJBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDeEMsaUJBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsQ0FBQztVQUMvQzs7O2dCQUVLLGtCQUFHOzs7QUFDSixpQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FDakIsSUFBSSxDQUFDLFVBQUMsUUFBUSxFQUFLO0FBQ2hCLHFCQUFJLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7QUFFOUIsdUJBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2NBQ3hELENBQUMsQ0FBQztVQUNQOzs7WUF2QkcsaUJBQWlCOzs7QUEwQnhCLGtCQUFpQixDQUFDLE9BQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7O3NCQUU5QyxpQkFBaUI7Ozs7Ozs7Ozs7Ozs7Ozt3Q0MxQkssQ0FBaUI7Ozs7QUFGdEQsYUFBWSxDQUFDOztBQUliLEtBQUksb0JBQW9CLEdBQUcsY0FBYyxDQUFDOztBQUUxQyxRQUFPLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUNyQyxPQUFPLENBQUMsTUFBTSwyQkFBYyxDQUFDOztzQkFFakIsb0JBQW9COzs7Ozs7Ozs7Ozs7Ozs7OztLQ1Q3QixRQUFRO0FBQ0MsY0FEVCxRQUFRLENBQ0UsSUFBSSxFQUF5QjthQUF2QixLQUFLLGdDQUFDLEVBQUU7YUFBRSxRQUFRLGdDQUFDLEVBQUU7OytCQURyQyxRQUFROztBQUVOLGFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLGFBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEIsYUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztNQUN2Qjs7a0JBTEMsUUFBUTs7Z0JBT1MsNkJBQUMsSUFBSSxFQUFFO0FBQ3RCLGlCQUFJLFVBQVUsR0FBRyxvREFBb0QsQ0FBQzs7QUFFdEUsc0JBQVMsYUFBYSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUM7QUFDL0IsaUdBQ3NCLFFBQVEscURBQ0o7Y0FDN0I7QUFDRCxvQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztVQUNsRDs7O2dCQUVtQiw4QkFBQyxJQUFJLEVBQUU7QUFDdkIsaUJBQUksVUFBVSxHQUFHLDZHQUE2RyxDQUFDOztBQUUvSCxzQkFBUyxhQUFhLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRTtBQUNoQyxnSEFDdUMsUUFBUSxnRkFFbEM7Y0FDaEIsQ0FBQzs7QUFFRixvQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztVQUNsRDs7O2dCQUVPLGtCQUFDLFFBQVEsRUFBRTtBQUNmLGlCQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEQsd0JBQVcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEQsb0JBQU8sV0FBVyxDQUFDO1VBQ3RCOzs7Ozs7Ozs7Ozs7O1lBRUksVUFBQyxLQUFLLEVBQUU7QUFDVCxpQkFBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7QUFDMUIscUJBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2NBQzNCO0FBQ0Qsb0JBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztVQUMxQjs7O2dCQUVHLGNBQUMsUUFBUSxFQUFFO0FBQ1gsaUJBQUcsT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO0FBQzdCLHFCQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUN6QixxQkFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2NBQ2pEO0FBQ0Qsb0JBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztVQUN4Qjs7O2dCQUVNLG1CQUFlO2lCQUFkLE9BQU8sZ0NBQUMsSUFBSTs7QUFDaEIsaUJBQUcsT0FBTyxFQUFFO0FBQ1Isd0JBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2NBQ3JELE1BQU07QUFDSCx3QkFBTyxJQUFJLENBQUMsY0FBYyxDQUFDO2NBQzlCO1VBQ0o7OztnQkFFRyxnQkFBRztBQUNILGlCQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZCxpQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDMUIsaUJBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQy9CLGlCQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFNUMsb0JBQU8sSUFBSSxDQUFDO1VBQ2hCOzs7WUFuRUUsUUFBUTs7O0tBdUVSLFdBQVc7QUFDRixjQURULFdBQVcsQ0FDRCxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTsrQkFEbEMsV0FBVzs7QUFFVCxhQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixhQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixhQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzs7QUFFM0IsYUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDaEIsYUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDckIsYUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7TUFDeEI7O2tCQVRDLFdBQVc7O2dCQVdSLGlCQUFHO0FBQ0osb0JBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztVQUMxQjs7Ozs7Ozs7Ozs7OztZQUVJLFVBQUMsS0FBSyxFQUFFO0FBQ1QsaUJBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO0FBQzFCLHFCQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztjQUMzQjtBQUNELG9CQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7VUFDMUI7OztnQkFFTSxpQkFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQ3JCLG9CQUFPLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1VBQ25EOzs7Z0JBRVEsbUJBQUMsR0FBRyxFQUFFO0FBQ1gsb0JBQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO1VBQ3hDOzs7Ozs7Ozs7Ozs7O1lBRUcsVUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQ1osaUJBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNyQixxQkFBSSxPQUFPLElBQUksS0FBSyxXQUFXLEVBQUU7QUFDN0IseUJBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2tCQUMvQjtBQUNELHdCQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7Y0FDL0I7QUFDRCxvQkFBTyxTQUFTLENBQUM7VUFDcEI7OztnQkFFRyxjQUFDLElBQUksRUFBRTtBQUNQLGlCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztVQUM5Qjs7O2dCQUVFLGVBQUc7QUFDRixpQkFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztVQUN6Qjs7O2dCQUVPLGtCQUFDLENBQUMsRUFBRTtBQUNSLGlCQUFHLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtBQUN0QixxQkFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Y0FDbEI7QUFDRCxvQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1VBQ3JCOzs7Z0JBRUcsZ0JBQUc7QUFDSCxvQkFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztVQUNqQzs7O2dCQUVJLGlCQUFHO0FBQ0osaUJBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLGlCQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztBQUNmLGlCQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztVQUN4Qjs7O2dCQUVLLGtCQUFHO0FBQ0wsaUJBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixpQkFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RSxpQkFBSSxTQUFTLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxtQkFBbUIsQ0FBQyxNQUFNLEdBQUUsQ0FBQyxDQUFDLENBQUM7QUFDaEYsaUJBQUksUUFBUSxHQUFHLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDckMsb0JBQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEIscUJBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLO3dCQUFLLEtBQUssQ0FBQyxJQUFJLEVBQUU7Y0FBQSxDQUFDLENBQUM7QUFDN0QscUJBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUM3QixxQkFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQ2pDLG9CQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztVQUM5Qzs7O1lBM0VDLFdBQVc7OztBQThFakIsWUFBVyxDQUFDLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7O3NCQUV0QyxXQUFXIiwiZmlsZSI6IjlhMzhlZDg5ZmEwMmE3NjQyYTMwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5YTM4ZWQ4OWZhMDJhNzY0MmEzMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCB7ZGVmYXVsdCBhcyBjb250cm9sbGVyc19tb2R1bGVfbmFtZX0gZnJvbSAnLi4vY29udHJvbGxlcnMnO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAgICduZ1JvdXRlJywgJ25nU2FuaXRpemUnLCAnbmdNZXNzYWdlcycsXG4gICAgJ3VpLmJvb3RzdHJhcCcsIFxuXG4gICAgY29udHJvbGxlcnNfbW9kdWxlX25hbWUsXG5dKVxuICAuY29uZmlnKEFwcFJvdXRlcilcbiAgLmNvbmZpZyhTZXRDU0ZSKTtcblxuQXBwUm91dGVyLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XG5mdW5jdGlvbiBBcHBSb3V0ZXIoJHJvdXRlUHJvdmlkZXIpIHtcbiAgICAkcm91dGVQcm92aWRlci53aGVuKCcvJywge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9saXN0Lmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTGlzdENvbnRyb2xsZXInLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGxvYWQ6IExvYWRMaXN0LFxuICAgICAgICB9XG4gICAgfSlcbiAgICAud2hlbignL2l0ZW0vOm51bWJlcicsIHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvaXRlbS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0l0ZW1Db250cm9sbGVyJyxcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBsb2FkOiBOZXdMaXN0T25SZWZyZXNoLFxuICAgICAgICB9LFxuICAgIH0pXG4gICAgLndoZW4oJy9jb25maXJtJywge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9jb25maXJtLmh0bWwnLCBcbiAgICAgICAgY29udHJvbGxlcjogJ0NvbmZpcm1Db250cm9sbGVyJyxcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBsb2FkOiBOZXdMaXN0T25SZWZyZXNoLFxuICAgICAgICB9LFxuICAgIH0pO1xufVxuXG5TZXRDU0ZSLiRpbmplY3QgPSBbJyRodHRwUHJvdmlkZXInXTtcbmZ1bmN0aW9uIFNldENTRlIoJGh0dHBQcm92aWRlcikge1xuICAgICRodHRwUHJvdmlkZXIuZGVmYXVsdHMueHNyZkNvb2tpZU5hbWUgPSAnY3NyZnRva2VuJztcbiAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLnhzcmZIZWFkZXJOYW1lID0gJ1gtQ1NSRlRva2VuJztcbn1cblxuTmV3TGlzdE9uUmVmcmVzaC4kaW5qZWN0ID0gWyckcScsICckbG9jYXRpb24nLCAnbGlzdCddO1xuZnVuY3Rpb24gTmV3TGlzdE9uUmVmcmVzaCgkcSwgJGxvY2F0aW9uLCBsaXN0KSB7XG4gICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgaWYgKGxpc3QudGl0bGUoKSA9PT0gJycpIHtcbiAgICAgICAgLy9sb2dpYyBpcyBpZiB0aGUgbGlzdCBoYXMgbm8gdGl0bGUsIHRoZW5cbiAgICAgICAgLy90aGUgcGFnZSBtdXN0IGhhdmUgYmVlbiBtYW51YWxseSByZWZyZXNoZWRcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgICB9XG59XG5cbkxvYWRMaXN0LiRpbmplY3QgPSBbJyRxJywgJyRodHRwJywgJyRsb2NhdGlvbicsICdsaXN0J107XG5mdW5jdGlvbiBMb2FkTGlzdCgkcSwgJGh0dHAsICRsb2NhdGlvbiwgbGlzdCkge1xuICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICBcbiAgICB2YXIgc2x1Z193aXRoX2hhc2ggPSAkbG9jYXRpb24uYWJzVXJsKCkuc3BsaXQoJ2VkaXQvJylbMV07XG4gICAgdmFyIHNsdWcgPSBzbHVnX3dpdGhfaGFzaC5zdWJzdHJpbmcoMCwgc2x1Z193aXRoX2hhc2gubGVuZ3RoIC0yKTtcbiAgICBcbiAgICAkaHR0cC5nZXQoJy9saXN0cy9qc29uLycgKyBzbHVnKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgIGxpc3QucmVzZXQoKTtcbiAgICAgICB2YXIgbGlzdF9kYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICBsaXN0LnRpdGxlKGxpc3RfZGF0YS50aXRsZSk7XG4gICAgICAgbGlzdC5jYXBhY2l0eShsaXN0X2RhdGEubnVtYmVyKTtcbiAgICAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3RfZGF0YS5saXN0KSB7XG4gICAgICAgICAgICBsZXQgX2l0ZW0gPSBsaXN0Lm5ld0l0ZW0oaXRlbS50aXRsZSwgaXRlbS5kZXNjcmlwdGlvbl9tZXRhKTtcbiAgICAgICAgICAgIGxpc3QucHVzaChfaXRlbSk7XG4gICAgICAgfVxuICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICB9LCBkZWZlcnJlZC5yZWplY3QpO1xuXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9lZGl0bGlzdC9hcHAuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7ZGVmYXVsdCBhcyBMaXN0Q29udHJvbGxlcn0gZnJvbSAnLi9jb250cm9sbGVycy9saXN0J1xuaW1wb3J0IHtkZWZhdWx0IGFzIEl0ZW1Db250cm9sbGVyfSBmcm9tICcuL2NvbnRyb2xsZXJzL2l0ZW0nXG5pbXBvcnQge2RlZmF1bHQgYXMgQ29uZmlybUNvbnRyb2xsZXJ9IGZyb20gJy4vY29udHJvbGxlcnMvY29uZmlybSdcbmltcG9ydCB7ZGVmYXVsdCBhcyBzZXJ2aWNlc19tb2R1bGVfbmFtZX0gZnJvbSAnLi9zZXJ2aWNlcycgXG5cbnZhciBjb250cm9sbGVyc19tb2R1bGVfbmFtZSA9ICdhcHAuY29udHJvbGxlcnMnO1xuXG5hbmd1bGFyLm1vZHVsZShjb250cm9sbGVyc19tb2R1bGVfbmFtZSwgW1xuICAgIHNlcnZpY2VzX21vZHVsZV9uYW1lXG5dKVxuICAuY29udHJvbGxlcignTGlzdENvbnRyb2xsZXInLCBMaXN0Q29udHJvbGxlcilcbiAgLmNvbnRyb2xsZXIoJ0l0ZW1Db250cm9sbGVyJywgSXRlbUNvbnRyb2xsZXIpXG4gIC5jb250cm9sbGVyKCdDb25maXJtQ29udHJvbGxlcicsIENvbmZpcm1Db250cm9sbGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgY29udHJvbGxlcnNfbW9kdWxlX25hbWU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9jb250cm9sbGVycy5qc1xuICoqLyIsIiBjbGFzcyBMaXN0Q29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoJGxvY2F0aW9uLCBsaXN0KSB7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgICB0aGlzLmxpc3QgPSBsaXN0O1xuXG4gICAgICAgIHRoaXMudG9wX24gPSB0aGlzLmxpc3QuY2FwYWNpdHkoKTtcbiAgICAgICAgdGhpcy5saXN0X3RpdGxlID0gdGhpcy5saXN0LnRpdGxlKCk7XG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgdGhpcy5saXN0LnRpdGxlKHRoaXMubGlzdF90aXRsZSk7XG4gICAgICAgIHRoaXMubGlzdC5jYXBhY2l0eSh0aGlzLnRvcF9uKTtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aCgnL2l0ZW0vMScpO1xuICAgIH1cbn1cbkxpc3RDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2NhdGlvbicsICdsaXN0J107XG5leHBvcnQgZGVmYXVsdCBMaXN0Q29udHJvbGxlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2xpc3QuanNcbiAqKi8iLCIgY2xhc3MgSXRlbUNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKCRyb3V0ZSwgJGxvY2F0aW9uLCBsaXN0KSB7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgICB0aGlzLmxpc3QgPSBsaXN0O1xuXG4gICAgICAgIHRoaXMudG9wX24gPSBsaXN0LmNhcGFjaXR5KCk7XG4gICAgICAgIHRoaXMubGlzdF90aXRsZSA9IGxpc3QudGl0bGUoKTtcbiAgICBcbiAgICAgICAgdGhpcy5udW1iZXIgPSBwYXJzZUludCgkcm91dGUuY3VycmVudC5wYXJhbXMubnVtYmVyKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3X3JhZGlvID0gJ2VkaXQnO1xuICAgICAgICB0aGlzLmVkaXRvciA9IG5ldyBRdWlsbCgnI2VkaXRvcicsIHtcbiAgICAgICAgICAgIG1vZHVsZXM6IHtcbiAgICAgICAgICAgICAgICAndG9vbGJhcic6IHtjb250YWluZXI6ICcjdG9vbGJhcid9LFxuICAgICAgICAgICAgICAgICdpbWFnZS10b29sdGlwJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAnbGluay10b29sdGlwJzogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGVtZTogJ3Nub3cnLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlkeCA9IHRoaXMubnVtYmVyIC0gMTtcbiAgICAgICAgdGhpcy5pdGVtID0gbGlzdC5pdGVtKHRoaXMuaWR4KTtcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuaXRlbSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbSA9IHRoaXMubGlzdC5uZXdJdGVtKCk7XG4gICAgICAgICAgICBpZih0aGlzLmxpc3Quc2l6ZSgpIDwgdGhpcy5saXN0LmNhcGFjaXR5KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QucHVzaCh0aGlzLml0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXRlbV90aXRsZSA9IHRoaXMuaXRlbS50aXRsZSgpO1xuICAgICAgICB0aGlzLnByZXZpZXdfaHRtbCA9IHRoaXMuaXRlbS5wcmV2aWV3KCk7XG4gICAgICAgIHRoaXMuZWRpdG9yLnNldEhUTUwodGhpcy5pdGVtLmVkaXQoKSk7XG4gICAgfVxuICAgIFxuICAgIHNob3dfcHJldmlldygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJldmlld19yYWRpbyA9PT0gJ3ByZXZpZXcnO1xuICAgIH1cbiAgICBcbiAgICBnZW5lcmF0ZV9wcmV2aWV3KCkge1xuICAgICAgICB0aGlzLml0ZW0uZWRpdCh0aGlzLmVkaXRvci5nZXRIVE1MKCkpO1xuICAgICAgICB0aGlzLmh0bWxfcHJldmlldyA9IHRoaXMuaXRlbS5wcmV2aWV3KCk7XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5pdGVtLmVkaXQodGhpcy5lZGl0b3IuZ2V0SFRNTCgpKTtcbiAgICAgICAgdGhpcy5pdGVtLnRpdGxlKHRoaXMuaXRlbV90aXRsZSk7XG4gICAgICAgIHRoaXMubGlzdC5pdGVtKHRoaXMuaWR4LCB0aGlzLml0ZW0pOyBcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICB0aGlzLnNhdmUoKTtcbiAgICAgICAgaWYgKHRoaXMubnVtYmVyIDwgdGhpcy50b3BfbikgeyAgICBcbiAgICAgICAgICAgIHZhciBuZXh0X251bWJlciA9ICh0aGlzLm51bWJlciArIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi5wYXRoKCcvaXRlbS8nICsgbmV4dF9udW1iZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aCgnL2NvbmZpcm0nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJhY2soKSB7XG4gICAgICAgIHRoaXMuc2F2ZSgpOyAgXG4gICAgICAgIGlmICh0aGlzLmlkeCA+IDApIHsgICAgXG4gICAgICAgICAgICB2YXIgbmV4dF9udW1iZXIgPSAodGhpcy5udW1iZXIgLSAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aCgnL2l0ZW0vJyArIG5leHRfbnVtYmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgICAgICAgfSBcbiAgICB9XG59XG5cbkl0ZW1Db250cm9sbGVyLiRpbmplY3QgPSBbJyRyb3V0ZScsICckbG9jYXRpb24nLCAnbGlzdCddO1xuXG5leHBvcnQgZGVmYXVsdCBJdGVtQ29udHJvbGxlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXNzZXRzL2xpc3RzL2NvbnRyb2xsZXJzL2l0ZW0uanNcbiAqKi8iLCIgY2xhc3MgQ29uZmlybUNvbnRyb2xsZXIge1xuICAgY29uc3RydWN0b3IoJGxvY2F0aW9uLCAkd2luZG93LCBsaXN0KSB7XG4gICAgICAgdGhpcy4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgICAgdGhpcy4kd2luZG93ID0gJHdpbmRvdztcbiAgICAgICB0aGlzLmxpc3QgPSBsaXN0O1xuICAgICAgIFxuICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLmxpc3QuaXRlbXMoKTtcbiAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSB0aGlzLmxpc3QudGl0bGUoKTtcbiAgICAgICB0aGlzLnRvcF9uID0gdGhpcy5saXN0LmNhcGFjaXR5KCk7XG4gICB9XG5cbiAgIGJhY2soKSB7XG4gICAgICAgIHZhciBuZXh0X251bWJlciA9IHRoaXMudG9wX24udG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24udXJsKCcvaXRlbS8nICsgbmV4dF9udW1iZXIpO1xuICAgfVxuXG4gICBmaW5pc2goKSB7XG4gICAgICAgIHRoaXMubGlzdC51cGxvYWQoKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHZhciBzbHVnID0gcmVzcG9uc2UuZGF0YS5zbHVnO1xuICAgICAgICAgICAgLy90aGlzLmxpc3QucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9saXN0cy9kZXRhaWwvJyArIHNsdWc7XG4gICAgICAgIH0pO1xuICAgfVxufVxuXG5Db25maXJtQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9jYXRpb24nLCAnJHdpbmRvdycsICdsaXN0J107XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1Db250cm9sbGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvY29udHJvbGxlcnMvY29uZmlybS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtkZWZhdWx0IGFzIExpc3RTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2VzL2xpc3QnOyAgICBcblxudmFyIHNlcnZpY2VzX21vZHVsZV9uYW1lID0gJ2FwcC5zZXJ2aWNlcyc7XG5cbmFuZ3VsYXIubW9kdWxlKHNlcnZpY2VzX21vZHVsZV9uYW1lLCBbXSlcbiAgLnNlcnZpY2UoJ2xpc3QnLCBMaXN0U2VydmljZSk7XG5cbmV4cG9ydCBkZWZhdWx0IHNlcnZpY2VzX21vZHVsZV9uYW1lO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hc3NldHMvbGlzdHMvc2VydmljZXMuanNcbiAqKi8iLCJjbGFzcyBMaXN0SXRlbSB7XG4gICAgY29uc3RydWN0b3IoJHNjZSwgdGl0bGU9JycsIHJhd19odG1sPScnKSB7XG4gICAgICAgIHRoaXMuJHNjZSA9ICRzY2U7XG4gICAgICAgIHRoaXMudGl0bGUodGl0bGUpO1xuICAgICAgICB0aGlzLmVkaXQocmF3X2h0bWwpO1xuICAgIH1cblxuICAgIF9yZXBsYWNlQ2x5cEl0TGlua3MoaHRtbCkge1xuICAgICAgICBsZXQgQ0lfTElOS19SRSA9IC8oPzpodHRwcz86XFwvXFwvKT8oPzp3d3dcXC4pPyg/OmNseXBcXC5pdClcXC8oKFxcdyl7OH0pL2c7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZV9saW5rcyhfLCBzb3VuZF9pZCl7XG4gICAgICAgICAgICByZXR1cm4gYDxpZnJhbWUgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTYwXCIgXG4gICAgICAgICAgIHNyYz1cImh0dHBzOi8vY2x5cC5pdC8ke3NvdW5kX2lkfS93aWRnZXRcIiBcbiAgICAgICAgICAgZnJhbWVib3JkZXI9XCIwXCI+PC9pZnJhbWU+YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKENJX0xJTktfUkUsIHJlcGxhY2VfbGlua3MpO1xuICAgIH1cblxuICAgIF9yZXBsYWNlWW91VHViZUxpbmtzKGh0bWwpIHsgICAgICAgICBcbiAgICAgICAgbGV0IFlUX0xJTktfUkUgPSAvKD86aHR0cHM/OlxcL1xcLyk/KD86d3d3XFwuKT8oPzp5b3V0dVxcLmJlXFwvfHlvdXR1YmVcXC5jb21cXC8oPzplbWJlZFxcL3x2XFwvfHdhdGNoXFw/dj18d2F0Y2hcXD8uKyZ2PSkpKChcXHd8LSl7MTF9KS9nO1xuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZV9saW5rcyhfLCB2aWRlb19pZCkgeyAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGA8aWZyYW1lIHdpZHRoPVwiNTYwXCIgaGVpZ2h0PVwiMzE1XCJcbiAgICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJHt2aWRlb19pZH1cIlxuICAgICAgICAgICAgICBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4+XG4gICAgICAgICAgICAgIDwvaWZyYW1lPmA7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKFlUX0xJTktfUkUsIHJlcGxhY2VfbGlua3MpO1xuICAgIH1cbiAgICBcbiAgICBfcHJvY2VzcyhyYXdfaHRtbCkge1xuICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSB0aGlzLl9yZXBsYWNlWW91VHViZUxpbmtzKHJhd19odG1sKTtcbiAgICAgICAgZGVzY3JpcHRpb24gPSB0aGlzLl9yZXBsYWNlQ2x5cEl0TGlua3MoZGVzY3JpcHRpb24pO1xuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgdGl0bGUodGl0bGUpIHtcbiAgICAgICAgaWYodHlwZW9mIHRpdGxlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5pdGVtX3RpdGxlID0gdGl0bGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbV90aXRsZTtcbiAgICB9XG5cbiAgICBlZGl0KHJhd19odG1sKSB7XG4gICAgICAgIGlmKHR5cGVvZiByYXdfaHRtbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMucmF3X2h0bWwgPSByYXdfaHRtbDtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc2VkX2h0bWwgPSB0aGlzLl9wcm9jZXNzKHJhd19odG1sKTsgIFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJhd19odG1sO1xuICAgIH1cblxuICAgIHByZXZpZXcodHJ1c3RBcz10cnVlKSB7XG4gICAgICAgIGlmKHRydXN0QXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzY2UudHJ1c3RBc0h0bWwodGhpcy5wcm9jZXNzZWRfaHRtbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzZWRfaHRtbDtcbiAgICAgICAgfVxuICAgIH0gXG5cbiAgICByZXByKCkge1xuICAgICAgICB2YXIgX29iaiA9IHt9O1xuICAgICAgICBfb2JqLnRpdGxlID0gdGhpcy50aXRsZSgpO1xuICAgICAgICBfb2JqLmRlc2NyaXB0aW9uID0gdGhpcy5lZGl0KCk7XG4gICAgICAgIF9vYmouZGVzY3JpcHRpb25fbWV0YSA9IHRoaXMucHJldmlldyhmYWxzZSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gX29iajtcbiAgIH1cblxufVxuXG5jbGFzcyBMaXN0U2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoJGh0dHAsICRzY2UsICRsb2NhdGlvbikge1xuICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gICAgICAgIHRoaXMuJHNjZSA9ICRzY2U7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuXG4gICAgICAgIHRoaXMudG9wX24gPSAxMDtcbiAgICAgICAgdGhpcy5saXN0X3RpdGxlID0gJyc7XG4gICAgICAgIHRoaXMubGlzdF9pdGVtcyA9IFtdO1xuICAgIH1cblxuICAgIGl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0X2l0ZW1zO1xuICAgIH1cbiAgICBcbiAgICB0aXRsZSh0aXRsZSkge1xuICAgICAgICBpZih0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RfdGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5saXN0X3RpdGxlO1xuICAgIH1cblxuICAgIG5ld0l0ZW0odGl0bGUsIHJhd19odG1sKSB7XG4gICAgICAgIHJldHVybiBuZXcgTGlzdEl0ZW0odGhpcy4kc2NlLCB0aXRsZSwgcmF3X2h0bWwpO1xuICAgIH1cbiAgICBcbiAgICBfaW5ib3VuZHMoaWR4KSB7XG4gICAgICAgIHJldHVybiBpZHggPCB0aGlzLnNpemUoKSAmJiBpZHggPj0gMDtcbiAgICB9XG5cbiAgICBpdGVtKGlkeCwgaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5faW5ib3VuZHMoaWR4KSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdF9pdGVtc1tpZHhdID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RfaXRlbXNbaWR4XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gXG5cbiAgICBwdXNoKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zLnB1c2goaXRlbSk7ICAgIFxuICAgIH1cblxuICAgIHBvcCgpIHtcbiAgICAgICAgdGhpcy5saXN0X2l0ZW1zLnBvcCgpO1xuICAgIH1cblxuICAgIGNhcGFjaXR5KG4pIHtcbiAgICAgICAgaWYodHlwZW9mIG4gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLnRvcF9uID0gbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50b3BfbjtcbiAgICB9XG5cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0X2l0ZW1zLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5saXN0X3RpdGxlID0gJyc7XG4gICAgICAgIHRoaXMudG9wX24gPSA1O1xuICAgICAgICB0aGlzLmxpc3RfaXRlbXMgPSBbXTtcbiAgICB9XG5cbiAgICB1cGxvYWQoKSB7XG4gICAgICAgIHZhciBfcGF5bG9hZCA9IHt9O1xuICAgICAgICB2YXIgb3BlcmF0aW9uX3dpdGhfaGFzaCA9IHRoaXMuJGxvY2F0aW9uLmFic1VybHMoKS5zcGxpdCgnL2xpc3RzLycpWzFdO1xuICAgICAgICB2YXIgb3BlcmF0aW9uID0gb3BlcmF0aW9uX3dpdGhfaGFzaC5zdWJzdHJpbmcoMCwgb3BlcmF0aW9uX3dpdGhfaGFzaC5sZW5ndGggLTIpO1xuICAgICAgICB2YXIgZW5kcG9pbnQgPSAnL2xpc3RzLycgKyBvcGVyYXRpb247XG4gICAgICAgIGNvbnNvbGUubG9nKGVuZHBvaW50KTtcbiAgICAgICAgX3BheWxvYWQubGlzdCA9IHRoaXMubGlzdF9pdGVtcy5tYXAoKF9pdGVtKSA9PiBfaXRlbS5yZXByKCkpO1xuICAgICAgICBfcGF5bG9hZC5udW1iZXIgPSB0aGlzLnRvcF9uO1xuICAgICAgICBfcGF5bG9hZC50aXRsZSA9IHRoaXMubGlzdF90aXRsZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAucG9zdChlbmRwb2ludCwgX3BheWxvYWQpO1xuICAgIH1cbn1cblxuTGlzdFNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJHNjZScsICckbG9jYXRpb24nXTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdFNlcnZpY2U7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Fzc2V0cy9saXN0cy9zZXJ2aWNlcy9saXN0LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==
angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("templates/confirm.html","<h1>Preview: Your List - Top {{vm.top_n}} {{vm.list_title}}</h1><div ng-repeat=\"item in vm.items\"><h2>{{$index + 1}}. {{item.title()}}</h2><div ng-bind-html=item.preview()></div></div><div class=\"form btn-group\"><input class=btn value=Back type=Submit ng-click=vm.back()> <input class=\"btn btn-success\" type=Submit value=Finish ng-click=vm.finish()></div>");
$templateCache.put("templates/item.html","<h1>Top {{vm.top_n}} {{vm.list_title}}</h1><h2>Number {{vm.number}}: {{vm.item_title}}</h2><div class=row><div class=\"col-md-6 form-group\"><label for=itemtitle>Item Title</label> <input ng-model=vm.item_title type=text class=form-control id=itemtitle placeholder=\"Episode 4: A New Hope\" name=title ng-model-options=\"{updateOn: \'blur default\', debounce: {\'blur\': 0, \'default\': 500}}\" ng-trim=\"\" ng-maxlength=128 required></div></div><label for=toolbar>Description</label><div ng-hide=vm.show_preview()><div id=toolbar class=\"toolbar ql-toolbar ql-snow\"><span class=ql-format-group><span title=Link class=\"ql-format-button ql-link\"></span> <span class=ql-format-separator></span> <span title=Image class=\"ql-format-button ql-image\"></span></span></div><div id=editor class=\"editor ql-container ql-snow\"></div></div><div ng-show=vm.show_preview()><p ng-bind-html=vm.html_preview></p></div><div class=btn-group><label class=\"btn btn-primary\" ng-model=vm.preview_radio btn-radio=\"\'edit\'\" uncheckable=\"\">edit</label> <label class=\"btn primary\" ng-model=vm.preview_radio ng-change=vm.generate_preview() btn-radio=\"\'preview\'\" uncheckable=\"\">preview</label></div><hr><div class=\"footer btn-group\"><input class=btn value=Back type=Submit ng-click=vm.back()> <input class=btn value=Next type=Submit ng-click=vm.next()></div>");
$templateCache.put("templates/list.html","<form name=newlist novalidate><h1>Your List: Top {{vm.top_n}} {{vm.list_title}}</h1><div class=row><div class=\"col-md-6 form-group\"><label for=listnumber>Title</label> <input ng-model=vm.list_title type=text class=form-control id=listtitle placeholder=\"StarWars movies\" name=title ng-model-options=\"{updateOn: \'blur default\', debounce: {\'blur\': 0, \'default\': 500}}\" ng-trim=\"\" ng-maxlength=128 required></div></div><div class=row><div class=\"col-md-6 form-group\"><label for=listnumber>Number</label> <input ng-model=vm.top_n type=number class=form-control id=listnumber name=number min=1 max=100></div></div><div class=footer><input class=btn value=Next type=Submit ng-click=vm.next()></div></form>");}]);