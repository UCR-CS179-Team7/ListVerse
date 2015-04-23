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
