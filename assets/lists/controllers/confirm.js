 class ConfirmController {
   constructor($location, $window, list) {
       this.$location = $location;
       this.$window = $window;
       this.list = list;
       
       this.items = this.list.items();
       this.list_title = this.list.title();
       this.top_n = this.list.capacity();
       this.tags = this.list.tags();
   
       this.editing = this.list.editing();
   }

   back() {
        var next_number = this.top_n.toString();
        this.$location.url('/item/' + next_number);
   }

   finish() {
        this.list.upload()
        .then((response) => {
            var slug = response.data.slug;
            //this.list.reset();
            this.$window.location.href = '/lists/detail/' + slug;
        });
   }
}

ConfirmController.$inject = ['$location', '$window', 'list'];

export default ConfirmController;
