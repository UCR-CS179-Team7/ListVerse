from datetime import date

# Django dependencies
from django import forms
from django.conf import settings
from django.forms.extras import SelectDateWidget
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Div, Submit, HTML, Button, Row, Field
from crispy_forms.bootstrap import AppendedText, PrependedText, FormActions

from .models import Profile
from .models import InterestTopic

class AddFriendForm(forms.Form):
    def __init__(self, *args, **kwargs):
        super(AddFriendForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_class = 'blueForms'
        self.helper.form_method = 'post'
        self.helper.form_action = 'add/'
        self.helper.add_input(Submit('submit', 'Add as Friend'))

class FollowUserForm(forms.Form):
    def __init__(self, *args, **kwargs):
        super(FollowUserForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_class = 'blueForms'
        self.helper.form_method = 'post'
        self.helper.form_action = 'follow/'
        self.helper.add_input(Submit('submit', 'Follow'))

class EditProfileForm(forms.Form):
    def __init__(self, *args, **kwargs):
        current_topics = kwargs.pop('topics', {})
        current_profile = kwargs.pop('current_profile')

        super(EditProfileForm, self).__init__(*args, **kwargs)
        self.fields['hiddenfilename'].inital = current_profile.avatar
        self.fields['nickname'].initial = current_profile.nickname
        self.fields['gender'].initial = current_profile.gender
        self.fields['birthday'].initial = current_profile.birthday
        self.fields['topiclist'].initial = [c.topic for c in current_topics]

        self.helper = FormHelper()
        self.helper.form_id = 'edit_profile_form'
        self.helper.form_class = 'blueForms'
        self.helper.form_method = 'post'
        self.helper.form_action = ''

        #self.helper.add_input(Submit('submit', 'Save Changes'))

    # Year range for birthday
    years = range(1900, date.today().year)

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
    hiddenfilename = forms.CharField(widget=forms.HiddenInput(attrs={'id': 'hidden_filename'}))
    photoupload = forms.FileField(widget=forms.FileInput(attrs={'id': 'photo_file'}), label='select file for photo', required=False)
    nickname = forms.CharField(widget=forms.TextInput(attrs={'style': 'width: 200px;'}), label='Nickname',
                               max_length=100)
    gender = forms.ChoiceField(widget=forms.Select(attrs={'style': 'width: 150px;'}), label='Gender', choices=GENDERS)
    topiclist = forms.MultipleChoiceField(label='topics of interest',
                                                widget=forms.CheckboxSelectMultiple,
                                                choices=InterestTopic.TOPIC_CHOICES,
                                                required=False)
    birthday = forms.DateField(
        widget=SelectDateWidget(attrs=({'style': 'width: 125px; display: inline-block;'}), years=years),
        label='Birthday')


