from django.shortcuts import render
from django.views.generic import View

class SearchView(View):
    def get(self, request):
        return render(request, 'searching/index.html')
