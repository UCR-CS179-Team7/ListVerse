from django.shortcuts import render
from django.views.generic import View

class SearchView(View):
    def get(self, request, category='', query=''):
        # take care of query
        print "category: " + category
        print "query: " + query
        # go through the categories
        return render(request, 'searching/index.html')
