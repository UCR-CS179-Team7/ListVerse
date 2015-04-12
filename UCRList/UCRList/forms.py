from django.contrib.auth.forms import UserCreationForm

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, ButtonHolder, Submit

class RegistrationForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super(RegistrationForm, self).__init__(*args, **kwargs)

        # Formhelper is a crispy-forms attribute for rendering the form
        self.helper = FormHelper()
        self.helper.layout = Layout(
            'username',
            'password1',
            'password2',
             ButtonHolder(
                #       name        Value (shown)  class to render button with
                Submit('register', 'Register', css_class='btn-primary')
            )
        )
