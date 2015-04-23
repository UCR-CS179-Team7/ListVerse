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
