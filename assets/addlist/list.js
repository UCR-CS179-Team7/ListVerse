(function() {
    'use strict';

    angular.module('app.list', [])
           .factory('list', List);
    
    List.$inject = ['$http', '$sce'];
    function List($http, $sce) {
        var top_n = 10;
        var list_title = '';
        var list_items = [];

        var service = {
            getItems: getItems,
            setTitle: setTitle,
            getTitle: getTitle,
            getItem: getItem,
            pushItem: pushItem,
            popItem: popItem,
            setItem: setItem,
            getCapacity: getCapacity,
            setCapacity: setCapacity,
            getSize: getSize,
            reset: reset,
            getPreview: getPreview,
            upload: upload,
        };

        function getItems() {
            return list_items;
        }
        
        function setTitle(title) {
            list_title = title;
        }

        function getTitle() {
            return list_title;
        }

        function getItem(idx) {
            if (idx < list_items.length && idx >= 0) {
                return list_items[idx];
            }
            return {
                title: '',
                description: '',
            };
        }

        function pushItem(item) {
            list_items.push(item);    
        }

        function popItem() {
            list_items.pop();
        }

        function setItem(item, idx) {
            if (idx < list_items.length && idx >= 0) {
                list_items[idx] = item;
            }
        }

        function getCapacity() {
            return top_n;
        }

        function setCapacity(n) {
            top_n = n;
        }

        function getSize() {
            return list_items.length;
        }

        function reset() {
            list_title = '';
            top_n = 5;
            list_items = [];
        }

        function getPreview(idx) {
           var raw_html = getItem(idx).description;
           var html_with_embeded_yt = replaceYouTubeLinks(raw_html);
           return $sce.trustAsHtml(html_with_embeded_yt);
        }
    
        function upload() {
            var size = getSize();
            var item;
            var raw_html;
            
            for (var i = 0; i < size; i++) {
                item = getItem(i);
                raw_html = item.description;
                item.description = replaceYouTubeLinks(raw_html);
            }

            return $http.post('/lists/new', {list: list_items});
        }
        
        // end of public methods 
        var EMBED_YT_HTML_START = '<iframe width="560" height="315"' + 
            ' src="https://www.youtube.com/embed/';  
        
        var EMBED_YT_HTML_END = '" frameborder="0" allowfullscreen>' +
            '</iframe>';


        function youTubeLinkReplacer(full_match, video_id) {
            return EMBED_YT_HTML_START + video_id + EMBED_YT_HTML_END;
        }

        var YT_LINK_RE = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/g;
        function replaceYouTubeLinks(html) {         
            var ret = html.replace(YT_LINK_RE, youTubeLinkReplacer);
            return ret;
        }
 
        return service;
    }
})();
