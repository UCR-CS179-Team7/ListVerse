(function() {
    'use strict';
    angular.module('app.newitem', [
            'app.list',
        ])
        .controller('NewItemController', NewItem);

    NewItem.$inject = ['$route', '$location', 'list'];

    function NewItem($route, $location, list) {
        var vm = this;
        vm.top_n = list.getCapacity();
        vm.list_title = list.getTitle();
        vm.number = parseInt($route.current.params.number);
        vm.generate_preview = generate_preview;
        vm.show_preview = show_preview;
        vm.preview_radio = 'edit';
        
        var editor = new Quill('#editor', {
            modules: {
                'toolbar': {container: '#toolbar'},
                'image-tooltip': true,
                'link-tooltip': true,
            },
            theme: 'snow',
        });

        function show_preview() {
            return vm.preview_radio === 'preview';
        }

        function generate_preview() {
            vm.html_preview = editor.getHTML(); 
        }
    }
})();
