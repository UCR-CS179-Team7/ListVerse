'use strict';
import {default as controllers_module_name} from './controllers';

angular.module('app', [
    'ngRoute', 'ngSanitize', 'ngMessages',
    'ui.bootstrap', 

    'ngTagsInput',

    controllers_module_name,
])
  .config(AppRouter)
  .config(SetCSFR);

AppRouter.$inject = ['$routeProvider'];
function AppRouter($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/list.html',
        controller: 'ListController',
        controllerAs: 'vm',
        resolve: {
            load: LoadList,
        }
    })
    .when('/item/:number', {
        templateUrl: 'templates/item.html',
        controller: 'ItemController',
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
    var slug = slug_with_hash.substring(0, slug_with_hash.length -2);
    
    $http.get('/lists/json/' + slug)
    .then((response) => {
       list.reset();
       var list_data = response.data;
       list.title(list_data.title);
       list.capacity(list_data.number);
       for (let item of list_data.list) {
            let _item = list.newItem(item.title, item.description_meta);
            list.push(_item);
       }
       deferred.resolve();
    }, deferred.reject);

    return deferred.promise;
}
