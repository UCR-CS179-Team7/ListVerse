from __future__ import absolute_import

from django.views import generic
from django.contrib.auth.models import User

from .forms import RegistrationForm
# NOTE Views go here
class HomePageView(generic.TemplateView):
    template_name = 'home.html'


# NOTE Forms go here
class RegisterView(generic.CreateView):
    form_class = RegistrationForm
    model = User
    template_name = 'accounts/signup.html'
