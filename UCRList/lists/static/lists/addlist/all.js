(function() {
    'use strict';
    
    angular.module('app', [
        'ngRoute', 'ngSanitize', 'ngMessages',
        'ui.bootstrap', 
        'app.newlist',
        'app.newitem',
        'app.confirm', 
    ]).config(AppRouter)
      .config(SetCSFR);

    AppRouter.$inject = ['$routeProvider'];
    function AppRouter($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'templates/list.html',
            controller: 'NewListController',
            controllerAs: 'vm',
        })
        .when('/item/:number', {
            templateUrl: 'templates/item.html',
            controller: 'NewItemController',
            controllerAs: 'vm',
            resolve: {
                load: NewListOnRefresh,
            },
        })
        .when('/confirm', {
            templateUrl: 'templates/confirm.html', 
            controller: 'ConfirmController',
            controllerAs: 'vm',
            resolve: {
                load: NewListOnRefresh,
            },
        });
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
        if (list.getTitle() === '') {
            //logic is if the list has no title, then
            //the page must have been manually refreshed
            $location.path('/');
        }
    }
})();

(function() {
    'use strict';

    angular.module('app.list', [])
           .factory('list', List);
    
    List.$inject = ['$http', '$sce'];
    function List($http, $sce) {
        var top_n = 10;
        var list_title = '';
        var list_items = [];

        var service = {
            getItems: getItems,
            setTitle: setTitle,
            getTitle: getTitle,
            getItem: getItem,
            pushItem: pushItem,
            popItem: popItem,
            setItem: setItem,
            getCapacity: getCapacity,
            setCapacity: setCapacity,
            getSize: getSize,
            reset: reset,
            getPreview: getPreview,
            upload: upload,
        };

        function getItems() {
            return list_items;
        }
        
        function setTitle(title) {
            list_title = title;
        }

        function getTitle() {
            return list_title;
        }

        function getItem(idx) {
            if (idx < list_items.length && idx >= 0) {
                return list_items[idx];
            }
            return {
                title: '',
                description: '',
            };
        }

        function pushItem(item) {
            list_items.push(item);    
        }

        function popItem() {
            list_items.pop();
        }

        function setItem(item, idx) {
            if (idx < list_items.length && idx >= 0) {
                list_items[idx] = item;
            }
        }

        function getCapacity() {
            return top_n;
        }

        function setCapacity(n) {
            top_n = n;
        }

        function getSize() {
            return list_items.length;
        }

        function reset() {
            list_title = '';
            top_n = 5;
            list_items = [];
        }

        function getPreview(idx) {
           var raw_html = getItem(idx).description;
           var html_with_embeded_yt = replaceYouTubeLinks(raw_html);
           return $sce.trustAsHtml(html_with_embeded_yt);
        }
    
        function upload() {
            var size = getSize();
            var item;
            var raw_html;
            
            for (var i = 0; i < size; i++) {
                item = getItem(i);
                raw_html = item.description;
                item.description_meta = raw_html;
                item.description = replaceYouTubeLinks(raw_html);
            }

            return $http.post('/lists/new', {
                    list: list_items,
                    number: top_n,
                    title: list_title, 
                });
        }
        
        // end of public methods 
        var EMBED_YT_HTML_START = '<iframe width="560" height="315"' + 
            ' src="https://www.youtube.com/embed/';  
        
        var EMBED_YT_HTML_END = '" frameborder="0" allowfullscreen>' +
            '</iframe>';


        function youTubeLinkReplacer(full_match, video_id) {
            return EMBED_YT_HTML_START + video_id + EMBED_YT_HTML_END;
        }

        var YT_LINK_RE = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/g;
        function replaceYouTubeLinks(html) {         
            var ret = html.replace(YT_LINK_RE, youTubeLinkReplacer);
            return ret;
        }
 
        return service;
    }
})();

(function() {
    angular.module('app.confirm', [])
        .controller('ConfirmController', Confirm);

    Confirm.$inject = ['$location', '$window', 'list'];
    function Confirm($location, $window, list) {
       var vm = this;

       vm.items = list.getItems();
       vm.list_title = list.getTitle();
       vm.top_n = list.getCapacity();
       vm.preview = list.getPreview;
       vm.back = back;
       vm.finish = finish;

       function back() {
            var next_number = vm.top_n.toString();
            $location.url('/item/' + next_number);
       }

       function finish() {
            list.upload()
                .then(function(data) {
                    //TODO: Return slug here and redirect
                    //user to slug
                    $window.location.href = '/';
                });
       }
    }
})();

(function() {
    'use strict';
    angular.module('app.newitem', [
            'app.list',
        ])
        .controller('NewItemController', NewItem);

    NewItem.$inject = ['$route', '$location', 'list'];

    function NewItem($route, $location, list) {
        var vm = this;
        
        vm.top_n = list.getCapacity();
        vm.list_title = list.getTitle();
        
        vm.number = parseInt($route.current.params.number);
        vm.preview_radio = 'edit';

        vm.generate_preview = generate_preview;
        vm.show_preview = show_preview;
        
        vm.next = next;
        vm.back = back;

        var editor = new Quill('#editor', {
            modules: {
                'toolbar': {container: '#toolbar'},
                'image-tooltip': true,
                'link-tooltip': true,
            },
            theme: 'snow',
        });

        var item = list.getItem(vm.number - 1);
        vm.item_title = item.title;
        vm.preview_html = item.description;
        editor.setHTML(vm.preview_html);
         
        function show_preview() {
            return vm.preview_radio === 'preview';
        }
        
        function generate_preview() {
            save_item();
            // hack, but quill has no good support
            // for custom ebedded stuff
            vm.html_preview = list.getPreview(vm.number - 1);
        }

        function save_item() {
            var item = {
                title: vm.item_title,
                description: editor.getHTML(),
            };

            if(list.getSize() < vm.number) {
                list.pushItem(item);
            } else {
                list.setItem(item, vm.number - 1);
            }
        }

        function next() {
            save_item();
            if (vm.number + 1 <= vm.top_n) {    
                var next_number = (vm.number + 1).toString();
                $location.path('/item/' + next_number);
            } else {
                $location.path('/confirm');
            }
        }

        function back() {
            save_item();
            if (vm.number - 1 > 0) {    
                var next_number = (vm.number - 1).toString();
                $location.path('/item/' + next_number);
            } else {
                $location.path('/');
            } 
        }
    }
})();

(function() {
    'use strict';
    angular.module('app.newlist', [
            'app.list',
        ])
        .controller('NewListController', NewList);

    NewList.$inject = ['$location', 'list'];

    function NewList($location, list) {
        var vm = this;
        vm.top_n = list.getCapacity();
        vm.list_title = list.getTitle();
        vm.next = next;

        function next() {
            list.setTitle(vm.list_title);
            list.setCapacity(vm.top_n);
            $location.path('/item/1');
        }
    }
})();

angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("templates/confirm.html","<h1>Preview: Your List - Top {{vm.top_n}} {{vm.list_title}}</h1><div ng-repeat=\"item in vm.items\"><h2>{{$index + 1}}. {{item.title}}</h2><div ng-bind-html=vm.preview($index)></div></div><div class=\"form btn-group\"><input class=btn value=Back type=Submit ng-click=vm.back()> <input class=\"btn btn-success\" type=Submit value=Finish ng-click=vm.finish()></div>");
$templateCache.put("templates/item.html","<h1>Top {{vm.top_n}} {{vm.list_title}}</h1><h2>Number {{vm.number}}: {{vm.item_title}}</h2><div class=row><div class=\"col-md-6 form-group\"><label for=itemtitle>Item Title</label> <input ng-model=vm.item_title type=text class=form-control id=itemtitle placeholder=\"Episode 4: A New Hope\" name=title ng-model-options=\"{updateOn: \'blur default\', debounce: {\'blur\': 0, \'default\': 500}}\" ng-trim=\"\" ng-maxlength=128 required></div></div><label for=toolbar>Description</label><div ng-hide=vm.show_preview()><div id=toolbar class=\"toolbar ql-toolbar ql-snow\"><span class=ql-format-group><span title=Link class=\"ql-format-button ql-link\"></span> <span class=ql-format-separator></span> <span title=Image class=\"ql-format-button ql-image\"></span></span></div><div id=editor class=\"editor ql-container ql-snow\"></div></div><div ng-show=vm.show_preview()><p ng-bind-html=vm.html_preview></p></div><div class=btn-group><label class=\"btn btn-primary\" ng-model=vm.preview_radio btn-radio=\"\'edit\'\" uncheckable=\"\">edit</label> <label class=\"btn primary\" ng-model=vm.preview_radio ng-change=vm.generate_preview() btn-radio=\"\'preview\'\" uncheckable=\"\">preview</label></div><hr><div class=\"footer btn-group\"><input class=btn value=Back type=Submit ng-click=vm.back()> <input class=btn value=Next type=Submit ng-click=vm.next()></div>");
$templateCache.put("templates/list.html","<form name=newlist novalidate><h1>Your List: Top {{vm.top_n}} {{vm.list_title}}</h1><div class=row><div class=\"col-md-6 form-group\"><label for=listnumber>Title</label> <input ng-model=vm.list_title type=text class=form-control id=listtitle placeholder=\"StarWars movies\" name=title ng-model-options=\"{updateOn: \'blur default\', debounce: {\'blur\': 0, \'default\': 500}}\" ng-trim=\"\" ng-maxlength=128 required></div></div><div class=row><div class=\"col-md-6 form-group\"><label for=listnumber>Number</label> <input ng-model=vm.top_n type=number class=form-control id=listnumber name=number min=1 max=100></div></div><div class=footer><input class=btn value=Next type=Submit ng-click=vm.next()></div></form>");}]);