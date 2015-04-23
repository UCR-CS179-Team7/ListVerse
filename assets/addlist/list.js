(function() {
    'use strict';
    angular.module('app.list', [])
           .factory('list', List);
    
    List.$inject = ['$http'];
    function List($http) {
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
            parseYouTubeLinks: parseYouTubeLinks,
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

        function parseYouTubeLinks() {
            //TODO
            return [];
        }

        function upload() {
            return $http.post('/lists/new', {list: list_items});
        }
        return service;
    }
})();
