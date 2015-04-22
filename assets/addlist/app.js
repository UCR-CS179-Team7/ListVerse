(function() {
    'use strict';
    
    angular.module('app', [
        'ngRoute', 'ngSanitize', 'ngMessages',
        'ui.bootstrap', 
        'app.newlist',
        'app.newitem',
    ]).config(AppRouter);

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
        });
    }
})();
