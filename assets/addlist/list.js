    'use strict';

    class ListItem {
        constructor($sce, title='', raw_html='') {
            this.$sce = $sce;
            this.title(title);
            this.description(raw_html);
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

        static _process(raw_html) {
            return this._replaceYouTubeLinks(raw_html);
        }
        
        static _replaceYouTubeLinks(html) {         
            const EMBED_YT_HTML_START = '<iframe width="560" height="315"' + 
            ' src="https://www.youtube.com/embed/';  
        
            const EMBED_YT_HTML_END = '" frameborder="0" allowfullscreen>' +
            '</iframe>';

            var YT_LINK_RE = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/g;
            
            let replace_links = (full_match, video_id) => EMBED_YT_HTML_START + video_id + EMBED_YT_HTML_END;
            
            return html.replace(YT_LINK_RE, replace_links);
        } 
    }

    export default class List {
        constructor($http, $sce) {
            this.$http = $http;
            this.$sce = $sce;

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

        item(idx, item) {
            if (this._inbounds(idx)) {
                if (typeof item !== undefined) {
                    this.list_items[idx] = item;
                }
                return this.list_items[idx];
            }
            return undefined;
        }

        static _inbounds(idx) {
            return idx < this.getSize() && idx >= 0;
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
            var size = this.size();            
            var items = [];
            
            var _item;
            var _item_dict;

            for (var i = 0; i < size; i++) {
                _item = this.item(i);
                _item_dict = {};

                _item_dict.title = _item.title();
                _item_dict.description_meta = _item.edit();
                _item_dict.description = _item.preview(false);
                items.push(_items_dict);
            }

            return this.$http.post('/lists/new', {
                    list: items,
                    number: this.top_n,
                    title: this.list_title, 
            });
        }
    }
