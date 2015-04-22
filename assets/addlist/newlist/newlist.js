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
