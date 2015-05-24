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

const TAGS = [
    'Music',
    'Movies',
    'TV',
    'Science',
    'Politics'
];

const PRIVACY_LEVELS_KEYS = [
    'PUBLIC', 
    'PRIVATE', 
    'FRIENDS',
];

const PRIVACY_LEVELS_LIST = [{
    id: 1,
    icon: '<i class="fa fa-globe"></i>',
    name: 'Public',
    description: 'Anyone can see this list.',
}, {
    id: 2,
    icon: '<i class="fa fa-lock"></i>',
    name: 'Private',
    description: 'Only you can see this list.',
}, {
    id: 3,
    icon: '<i class="fa fa-users"></i>', 
    name: 'Friends',
    description: 'Only your friends can see this list.',
}];

const PRIVACY_LEVELS = (() => {
    let _PRIVACY_LEVELS = {};
    let i = 0;
    for (let key of PRIVACY_LEVELS_KEYS) {
       _PRIVACY_LEVELS[key] = PRIVACY_LEVELS_LIST[i]; 
       i += 1;
    }
    return _PRIVACY_LEVELS;
})();

class ListService {
    constructor($http, $sce, $location, $q) {
        this.$http = $http;
        this.$sce = $sce;
        this.$location = $location;
        this.$q = $q;

        this.top_n = 10;
        this.list_title = '';
        this.list_items = [];

        this.PRIVACY_LEVELS = PRIVACY_LEVELS;
        this.PRIVACY_LEVELS_LIST = PRIVACY_LEVELS_LIST;
        
        // privacy level is public by default
        this.privacy_level = PRIVACY_LEVELS.PUBLIC;
        
        this.tag_ids = []; 
    }
 
    privacy(level) {
        if(typeof level !== 'undefined') {
            this.privacy_level = level;     
        }
        return this.privacy_level;
    }

    items() {
        return this.list_items;
    }

    tags() {
        return this.tag_ids.map(_id => TAGS[_id - 1]);
    }
    
    addTagById(id) {
        if(id > 0 && id <= TAGS.length) {
            for (let _id of this.tag_ids) {
                if(id === _id) {
                    // dup, don't add
                    return;
                }
            }
            this.tag_ids.push(id);
        }
    }

    addTag(tag) {        
        let id = 1;
        for(let _tag of TAGS) {
            if(tag == _tag) {
                this.addTagById(id);    
                return;
            }
            id += 1;
        }
    }

    all_privacy_levels() {
        return PRIVACY_LEVELS_LIST;
    }

    all_tags() {
        return TAGS;
    }

    clearTags(tag) {
        this.tag_ids = [];
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
        _payload.list = this.list_items.map(_item => _item.repr());
        _payload.number = this.top_n;
        _payload.title = this.list_title;
        _payload.tags = this.tag_ids;
        _payload.privacy = this.privacy_level.id;
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
