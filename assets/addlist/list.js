(function() {
    'use strict';

    class List {

        constructor($http, $sce) {
            this.$http = $http;
            this.$sce = $sce;

            this.top_n = 10;
            this.list_title = '';
            this.list_items = [];
        }

        getItems() {
            return this.list_items;
        }
        
        setTitle(title) {
            this.list_title = title;
        }

        getTitle() {
            return this.list_title;
        }

        getItem(idx) {
            if (this._inbounds(idx)) {
                return this.list_items[idx];
            }
            return {
                title: '',
                description: '',
            };
        }

        _inbounds(idx) {
            return idx < this.getSize() && idx >= 0;
        }

        pushItem(item) {
            this.list_items.push(item);    
        }

        popItem() {
            this.list_items.pop();
        }

        setItem(item, idx) {
            if (this._inbounds(idx)) {
                this.list_items[idx] = item;
            }
        }

        getCapacity() {
            return this.top_n;
        }

        setCapacity(n) {
            this.top_n = n;
        }

        getSize() {
            return this.list_items.length;
        }

        reset() {
            this.list_title = '';
            this.top_n = 5;
            this.list_items = [];
        }

        getPreview(idx) {
           var item = this.getItem(idx);
           var raw_html = item.description;
           var html_with_embeded_yt = this.replaceYouTubeLinks(raw_html);
           return this.$sce.trustAsHtml(html_with_embeded_yt);
        }
    
        upload() {
            var size = this.getSize();
            var item;
            var raw_html;
            
            for (var i = 0; i < size; i++) {
                item = this.getItem(i);
                raw_html = item.description;
                item.description_meta = raw_html;
                item.description = replaceYouTubeLinks(raw_html);
            }

            return this.$http.post('/lists/new', {
                    list: this.list_items,
                    number: this.top_n,
                    title: this.list_title, 
                });
        }
        
        // end of public methods 
        
        youTubeLinkReplacer(full_match, video_id) {
            var EMBED_YT_HTML_START = '<iframe width="560" height="315"' + 
            ' src="https://www.youtube.com/embed/';  
        
            var EMBED_YT_HTML_END = '" frameborder="0" allowfullscreen>' +
            '</iframe>';


            return EMBED_YT_HTML_START + video_id + EMBED_YT_HTML_END;
        }

        replaceYouTubeLinks(html) {         
            var YT_LINK_RE = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/g;
            var ret = html.replace(YT_LINK_RE, this.youTubeLinkReplacer);
            return ret;
        }
    }
    List.$inject = ['$http', '$sce'];

    angular.module('app.list', []).service('list', List);
     
    
})();
