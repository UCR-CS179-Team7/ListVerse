 class ItemController {
    constructor($route, $location, list) {
        this.$location = $location;
        this.list = list;

        this.top_n = list.capacity();
        this.list_title = list.title();
    
        this.number = parseInt($route.current.params.number);
        this.preview_radio = 'edit';
        this.editor = new Quill('#editor', {
            modules: {
                'toolbar': {container: '#toolbar'},
                'image-tooltip': true,
                'link-tooltip': true,
            },
            theme: 'snow',
        });

        this.idx = this.number - 1;
        this.item = list.item(this.idx);
        if(typeof this.item === 'undefined') {
            this.item = this.list.newItem();
            if(this.list.size() < this.list.capacity()) {
                this.list.push(this.item);
            }
        }
        this.item_title = this.item.title();
        this.preview_html = this.item.preview();
        this.editor.setHTML(this.item.edit());
    }
    
    show_preview() {
        return this.preview_radio === 'preview';
    }
    
    generate_preview() {
        this.item.edit(this.editor.getHTML());
        this.html_preview = this.item.preview();
    }

    save() {
        this.item.edit(this.editor.getHTML());
        this.item.title(this.item_title);
        this.list.item(this.idx, this.item); 
    }

    next() {
        this.save();
        if (this.number < this.top_n) {    
            var next_number = (this.number + 1).toString();
            this.$location.path('/item/' + next_number);
        } else {
            this.$location.path('/confirm');
        }
    }

    back() {
        this.save();  
        if (this.idx > 0) {    
            var next_number = (this.number - 1).toString();
            this.$location.path('/item/' + next_number);
        } else {
            this.$location.path('/');
        } 
    }
}

ItemController.$inject = ['$route', '$location', 'list'];

export default ItemController;
