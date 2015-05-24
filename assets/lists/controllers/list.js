 class ListController {
    constructor($location, list) {
        this.$location = $location;
        this.list = list;

        this.top_n = this.list.capacity();
        this.list_title = this.list.title();
        this.privacy_level = this.list.privacy();
        this.tags = this.list.tags();
        
        this.PRIVACY_LEVELS = this.list.all_privacy_levels();
        this.TAGS = this.list.all_tags();
    }

    next() {
        this.list.clearTags();
        for(let tag of this.tags) {
            this.list.addTag(tag);
        }
        this.list.title(this.list_title);
        this.list.capacity(this.top_n);
        this.list.privacy(this.privacy_level);
        this.$location.path('/item/1');
    }
}
ListController.$inject = ['$location', 'list'];
export default ListController;
