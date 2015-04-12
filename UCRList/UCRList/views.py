from django.views import generic

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

# NOTE Views go here
class HomePageView(generic.TemplateView):
    template_name = 'home.html'


# NOTE Forms go here
class RegisterView(generic.CreateView):
    form_class = UserCreationForm
    model = User
    template_name = 'accounts/signup.html'
