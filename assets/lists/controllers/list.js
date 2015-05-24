 class ListController {
    constructor($location, $window, list) {
        this.$location = $location;
        this.$window = $window;
        this.list = list;

        this.top_n = this.list.capacity();
        this.list_title = this.list.title();
        this.privacy_level = this.list.privacy();
        this.tags = this.list.tags();
        
        this.PRIVACY_LEVELS = this.list.all_privacy_levels();
        this.TAGS = this.list.all_tags();
        this.editing = this.list.editing();
    }

    save() {
        this.list.clearTags();
        for(let tag of this.tags) {
            this.list.addTag(tag);
        }
        this.list.title(this.list_title);
        this.list.capacity(this.top_n);
        this.list.privacy(this.privacy_level);

    }

    next() {
        this.save()
        this.$location.path('/item/1');
    }
    
    finish() {
        this.save();
        this.list.upload()
        .then((response) => {
            var slug = response.data.slug;
            //this.list.reset();
            this.$window.location.href = '/lists/detail/' + slug;
        });
    }

}
ListController.$inject = ['$location', '$window', 'list'];
export default ListController;
