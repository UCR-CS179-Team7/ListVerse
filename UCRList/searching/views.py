from django.shortcuts import render

# Create your views here.
class SearchView(View):
    def get(self, request):
        return render(request, 'searching/index.html')
