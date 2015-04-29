 class ListController {
    constructor($location, list) {
        this.$location = $location;
        this.list = list;

        this.top_n = this.list.capacity();
        this.list_title = this.list.title();
    }

    next() {
        this.list.title(this.list_title);
        this.list.capacity(this.top_n);
        this.$location.path('/item/1');
    }
}
ListController.$inject = ['$location', 'list'];
export default ListController;
