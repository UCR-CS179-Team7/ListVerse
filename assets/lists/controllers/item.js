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
        let next_location = this._next_location(this.number, this.top_n, false);
        this.$location.path(next_location);
    } 

    back() {
        this.save();  
        let next_location = this._next_location(this.number, this.top_n, true)
        this.$location.path(next_location);
    }

    _next_location(idx, num_items, back=true) {
        let next_idx = idx;
        
        if(back) {
            next_idx = idx - 1;
        } else {
            next_idx = idx + 1;
        }

        if(next_idx > 0 && next_idx <= num_items) {
            let prefix = '/item/';
            let suffix = next_idx.toString();
            return prefix + suffix;
        } else if (next_idx <= 0) {
            return '/';
        } else {
            return '/confirm';
        }
    }
}

ItemController.$inject = ['$route', '$location', 'list'];

export default ItemController;
