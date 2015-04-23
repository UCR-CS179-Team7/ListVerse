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
        vm.preview_radio = 'edit';

        vm.generate_preview = generate_preview;
        vm.show_preview = show_preview;
        
        vm.next = next;
        vm.back = back;

        var editor = new Quill('#editor', {
            modules: {
                'toolbar': {container: '#toolbar'},
                'image-tooltip': true,
                'link-tooltip': true,
            },
            theme: 'snow',
        });

        var item = list.getItem(vm.number - 1);
        vm.item_title = item.title;
        vm.preview_html = item.description;
        editor.setHTML(vm.preview_html);
         
        function show_preview() {
            return vm.preview_radio === 'preview';
        }
        
        function generate_preview() {
            save_item();
            // hack, but quill has no good support
            // for custom ebedded stuff
            vm.html_preview = list.getPreview(vm.number - 1);
        }

        function save_item() {
            var item = {
                title: vm.item_title,
                description: editor.getHTML(),
            };

            if(list.getSize() < vm.number) {
                list.pushItem(item);
            } else {
                list.setItem(item, vm.number - 1);
            }
        }

        function next() {
            save_item();
            if (vm.number + 1 <= vm.top_n) {    
                var next_number = (vm.number + 1).toString();
                $location.path('/item/' + next_number);
            } else {
                $location.path('/confirm');
            }
        }

        function back() {
            save_item();
            if (vm.number - 1 > 0) {    
                var next_number = (vm.number - 1).toString();
                $location.path('/item/' + next_number);
            } else {
                $location.path('/');
            } 
        }
    }
})();
