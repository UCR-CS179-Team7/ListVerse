(function() {
    'use strict';
    angular.module('app.list', [])
           .factory('list', List);
    
    List.$inject = [];
    function List() {
        var top_n = 10;
        var list_title = '';
        var list_items = [];
        var service = {
            setTitle: setTitle,
            getTitle: getTitle,
            addItem: addItem,
            popItem: popItem,
            setItem: setItem,
            getCapacity: getCapacity,
            setCapacity: setCapacity,
            getSize: getSize,
            parseYouTubeLinks: parseYouTubeLinks,
        };
        
        function setTitle(title) {
            list_title = title;
        }

        function getTitle() {
            return list_title;
        }

        function addItem(item) {
            list_items.push(item);    
        }

        function popItem() {
            list_items.pop();
        }

        function setItem(item, idx) {
            if (idx < list_items.length()) {
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
            return list_items.length();
        }

        function parseYouTubeLinks() {
            //TODO
            return [];
        }

        return service;
    }
})();
