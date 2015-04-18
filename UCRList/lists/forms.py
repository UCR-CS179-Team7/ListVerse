from django import forms
from .models import List

class AddListForm(forms.Form):

    content_type = forms.ChoiceField(widget=forms.Select(), label='Content Type', choices=List.CONTENT_TYPE_CHOICES)
