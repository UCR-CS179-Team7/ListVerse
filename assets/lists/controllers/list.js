 class ListController {
    constructor($location, list) {
        this.$location = $location;
        this.list = list;

        this.top_n = this.list.capacity();
        this.list_title = this.list.title();
        this.tags = this.list.tags();
    }

    possible_tags(query) {
        return this.list.possible_tags();
    }

    next() {
        this.list.clear_tags();
        for(let tag of this.tags) {
            this.list.add_tags(tag);
        }
        this.list.title(this.list_title);
        this.list.capacity(this.top_n);
        this.$location.path('/item/1');
    }
}
ListController.$inject = ['$location', 'list'];
export default ListController;
