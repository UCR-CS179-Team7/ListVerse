from datetime import date

# Django dependencies
from django import forms
from django.forms.extras import SelectDateWidget
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Div, Submit, HTML, Button, Row, Field
from crispy_forms.bootstrap import AppendedText, PrependedText, FormActions

class EditProfileForm(forms.Form):
    def __init__(self, *args, **kwargs):
        current_profile = kwargs.pop('current_profile')
        super(EditProfileForm, self).__init__(*args, **kwargs)
        self.fields['nickname'].initial = current_profile.nickname
        self.fields['gender'].initial = current_profile.gender
        self.fields['birthday'].initial = current_profile.birthday

        self.helper = FormHelper()
        self.helper.form_class = 'blueForms'
        self.helper.form_method = 'post'
        self.helper.form_action = '/profiles/'

        self.helper.add_input(Submit('submit', 'Save Changes'))
    # Year range for birthday
    years=range(1900, date.today().year)

    # Gender selection list
    MALE = 'M'
    FEMALE = 'F'
    NONE = 'NA'
    GENDERS = (
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (NONE, 'Not Disclosed'),
    )
    helper = FormHelper()
    helper.form_class = 'form-horizontal'


    nickname = forms.CharField(widget=forms.TextInput(attrs={'style': 'width: 200px;'}), label='Nickname', max_length=100)
    gender = forms.ChoiceField(widget=forms.Select(attrs={'style' : 'width: 150px;'}), label='Gender', choices=GENDERS)
    birthday = forms.DateField(widget=SelectDateWidget(attrs=({'style': 'width: 125px; display: inline-block;'}), years=years), label='Birthday')




