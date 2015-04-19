from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View, DetailView

from .models import User, List
from .forms import AddListForm

class ListDetailView(DetailView):
    model = List
    context_object_name = 'l'
    template_name = 'lists/listdetail.html'

# Create your views here.
class AddListView(View):
    def get(self, request):
        current_user = request.user
        form = AddListForm()
        return render(request, 'lists/addlist.html', {'form' : form})


    #def post(self, request):

#class EditListView(View):
#    def get(self, request):
#
#    def post(self, request):
