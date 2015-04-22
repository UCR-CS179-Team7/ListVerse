(function() {
    'use strict';
    angular.module('app.newlist', [
            'app.list',
        ])
        .controller('NewListController', NewList);

    NewList.$inject = ['$location', 'list'];

    function NewList($location, list) {
        var vm = this;
        vm.top_n = 5;
        vm.list_title = '';
        vm.next = next;

        function next() {
            list.setTitle(vm.list_title);
            list.setCapacity(vm.top_n);
            $location.path('/item/1');
        }
    }
})();
