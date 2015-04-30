class ListItem {
    constructor($sce, title='', raw_html='') {
        this.$sce = $sce;
        this.title(title);
        this.edit(raw_html);
    }

    _replaceClypItLinks(html) {
        let CI_LINK_RE = /(?:https?:\/\/)?(?:www\.)?(?:clyp\.it)\/((\w){8})/g;

        function replace_links(_, sound_id){
            return `<iframe width="100%" height="160" 
           src="https://clyp.it/${sound_id}/widget" 
           frameborder="0"></iframe>`;
        }
        return html.replace(CI_LINK_RE, replace_links);
    }

    _replaceYouTubeLinks(html) {         
        let YT_LINK_RE = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/g;
        
        function replace_links(_, video_id) {         
            return `<iframe width="560" height="315"
              src="https://www.youtube.com/embed/${video_id}"
              frameborder="0" allowfullscreen>
              </iframe>`;
        };
        
        return html.replace(YT_LINK_RE, replace_links);
    }
    
    _process(raw_html) {
        var description = this._replaceYouTubeLinks(raw_html);
        description = this._replaceClypItLinks(description);
        return description;
    }

    title(title) {
        if(typeof title === 'string') {
            this.item_title = title;
        }
        return this.item_title;
    }

    edit(raw_html) {
        if(typeof raw_html === 'string') {
            this.raw_html = raw_html;
            this.processed_html = this._process(raw_html);  
        }
        return this.raw_html;
    }

    preview(trustAs=true) {
        if(trustAs) {
            return this.$sce.trustAsHtml(this.processed_html);
        } else {
            return this.processed_html;
        }
    } 

    repr() {
        var _obj = {};
        _obj.title = this.title();
        _obj.description = this.edit();
        _obj.description_meta = this.preview(false);
        
        return _obj;
   }

}

class ListService {
    constructor($http, $sce, $location) {
        this.$http = $http;
        this.$sce = $sce;
        this.$location = $location;

        this.top_n = 10;
        this.list_title = '';
        this.list_items = [];
    }

    items() {
        return this.list_items;
    }
    
    title(title) {
        if(typeof title === 'string') {
            this.list_title = title;
        }
        return this.list_title;
    }

    newItem(title, raw_html) {
        return new ListItem(this.$sce, title, raw_html);
    }
    
    _inbounds(idx) {
        return idx < this.size() && idx >= 0;
    }

    item(idx, item) {
        if (this._inbounds(idx)) {
            if (typeof item !== 'undefined') {
                this.list_items[idx] = item;
            }
            return this.list_items[idx];
        }
        return undefined;
    } 

    push(item) {
        this.list_items.push(item);    
    }

    pop() {
        this.list_items.pop();
    }

    capacity(n) {
        if(typeof n === 'number') {
            this.top_n = n;
        }
        return this.top_n;
    }

    size() {
        return this.list_items.length;
    }

    reset() {
        this.list_title = '';
        this.top_n = 5;
        this.list_items = [];
    }

    upload() {
        var _payload = {};
        var operation_with_hash = this.$location.absUrls().split('/lists/')[1];
        var operation = operation_with_hash.substring(0, operation_with_hash.length -2);
        var endpoint = '/lists/' + operation;
        console.log(endpoint);
        _payload.list = this.list_items.map((_item) => _item.repr());
        _payload.number = this.top_n;
        _payload.title = this.list_title;
        return this.$http.post(endpoint, _payload);
    }
}

ListService.$inject = ['$http', '$sce', '$location'];

export default ListService;
