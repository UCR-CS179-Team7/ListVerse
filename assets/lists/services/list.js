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

    _replaceQuoteBlocks(html) {
       let QUOTE_RE = /`([\s\S]+)`/g;
       
       function replace_quotes(_, match) {
            let match_nl = match.replace(/<\/div\s*><div\s*>/gi, '<br>');
            console.log(match_nl);
            return `<div><blockquote>${match_nl}</blockquote></div>`;
       }
       return html.replace(QUOTE_RE, replace_quotes);
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
        var description = this._replaceQuoteBlocks(raw_html); 
        description = this._replaceYouTubeLinks(description);
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
    constructor($http, $sce, $location, $q) {
        this.$http = $http;
        this.$sce = $sce;
        this.$location = $location;
        this.$q = $q;

        this.top_n = 10;
        this.list_title = '';
        this.list_items = [];

        this.possible_tags = [{
            id: 1,
            text: 'Music'
        }, {
            id: 2,
            text: 'Movies'
        }, {
            id: 3,
            text: 'TV'
        }, {
            id: 4,
            text: 'Science'
        }, {
            id: 5,
            text: 'Politics'
        }];
        
        this.list_tags = []; 
    }
 
    possibleTags() {
        var deferred = this.$q.defer();

        deferred.resolve({
            data:this.possible_tags
        });

        return deferred.promise;
    }

    items() {
        return this.list_items;
    }

    tags() {
        return this.list_tags.slice();
    }
    
    addTagById(id) {
        for(let _possible_tag of this.possible_tags) {
            if(_possible_tag.id === id) {
                this.list_tags.push({
                    text: _possible_tag.text,
                    id: _possible_tag.id,
                });
                return;
            }
        }
    }

    addTag(tag) {
        for(let _tag of this.list_tags) {
            if(_tag.text === tag.text) {
                return;
            }
        }

        for(let _possible_tag of this.possible_tags) {
            if(_possible_tag.text === tag.text) {
                tag.id = _possible_tag.id;
                this.list_tags.push(tag);
                return;
            }
        }
    }

    clearTags(tag) {
        this.list_tags = [];
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

    upload(endpoint) {
        var _payload = {};
        _payload.list = this.list_items.map((_item) => _item.repr());
        _payload.number = this.top_n;
        _payload.title = this.list_title;
        _payload.tags = this.list_tags.map((_item) => _item.id);
        console.log(_payload);
        return this.$http.post(endpoint, _payload);
    }
}

ListService.$inject = ['$http', '$sce', '$location', '$q'];

class AddListService extends ListService {
    upload() {
        return super.upload('/lists/new');
    }
}

class EditListService extends ListService {
    slug(s) {
        if(typeof s === 'string'){
            this.list_slug = s;
        }
        return this.list_slug;
    }
    
    upload() {
        return super.upload('/lists/edit/' + this.slug());
    }
}

export {AddListService, EditListService};
