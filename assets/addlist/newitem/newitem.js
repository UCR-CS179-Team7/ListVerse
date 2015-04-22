(function() {
    'use strict';
    angular.module('app.newitem', [
            'app.list',
        ])
        .controller('NewItemController', NewItem);

    NewItem.$inject = ['$location', 'list'];

    function NewItem($location, list) {
        var vm = this;
        vm.top_n = list.getCapacity();
        vm.list_title = list.getTitle();
    }
})();
