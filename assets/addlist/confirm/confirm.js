(function() {
    angular.module('app.confirm', [])
        .controller('ConfirmController', Confirm);

    Confirm.$inject = ['list'];
    function Confirm(list) {
       var vm = this;
       vm.items = list.getItems();
    }
})();
