from django import forms
from .models import List

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit

from crispy_forms.bootstrap import AppendedText, PrependedText, FormActions

class AddListForm(forms.Form):
    def __init__(self, *args, **kwargs):
        super(AddListForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.post_method = 'post'
        self.helper.form_action = '/lists/'

        self.helper.add_input(Submit('submit', 'Submit List'))

    helper = FormHelper()
    helper.form_class = 'form-horizontal'

    listTitle = forms.CharField(widget=forms.TextInput(attrs={'style': 'width: 200px;'}), label='List Title', max_length=128)
    content_type = forms.ChoiceField(widget=forms.Select(), label='Content Type', choices=List.CONTENT_TYPE_CHOICES)


    itemTitle1 = forms.CharField(widget=forms.TextInput(attrs={'style': 'width: 200px;'}), label='Item 1 Title', max_length=128)
    itemBody1 = forms.CharField(widget=forms.Textarea(attrs={'style': 'width: 200px; height:200px;'}), label='Body', max_length=1024)
    itemAlt1 = forms.CharField(widget=forms.TextInput(attrs={'class':'altbody', 'style': 'width: 200px;' }), label='Quote', max_length=1024)
    itemUri1 = forms.CharField(widget=forms.TextInput(attrs={'class':'uribody', 'style': 'width: 200px;'}), label='URL', max_length=256)

    itemTitle2 = forms.CharField(widget=forms.TextInput(attrs={'style': 'width: 200px;'}), label='Item 2 Title', max_length=128)
    itemBody2 = forms.CharField(widget=forms.Textarea(attrs={'style': 'width: 200px; height:200px;'}), label='Body', max_length=1024)
    itemAlt2 = forms.CharField(widget=forms.TextInput(attrs={'class':'altbody', 'style': 'width: 200px;' }), label='Quote', max_length=1024)
    itemUri2 = forms.CharField(widget=forms.TextInput(attrs={'class':'uribody', 'style': 'width: 200px;'}), label='URL', max_length=256)

    itemTitle3 = forms.CharField(widget=forms.TextInput(attrs={'style': 'width: 200px;'}), label='Item 3 Title', max_length=128)
    itemBody3 = forms.CharField(widget=forms.Textarea(attrs={'style': 'width: 200px; height:200px;'}), label='Body', max_length=1024)
    itemAlt3 = forms.CharField(widget=forms.TextInput(attrs={'class':'altbody', 'style': 'width: 200px;' }), label='Quote', max_length=1024)
    itemUri3 = forms.CharField(widget=forms.TextInput(attrs={'class':'uribody', 'style': 'width: 200px;'}), label='URL', max_length=256)

    itemTitle4 = forms.CharField(widget=forms.TextInput(attrs={'style': 'width: 200px;'}), label='Item 4 Title', max_length=128)
    itemBody4 = forms.CharField(widget=forms.Textarea(attrs={'style': 'width: 200px; height:200px;'}), label='Body', max_length=1024)
    itemAlt4 = forms.CharField(widget=forms.TextInput(attrs={'class':'altbody', 'style': 'width: 200px;' }), label='Quote', max_length=1024)
    itemUri4 = forms.CharField(widget=forms.TextInput(attrs={'class':'uribody', 'style': 'width: 200px;'}), label='URL', max_length=256)

    itemTitle5 = forms.CharField(widget=forms.TextInput(attrs={'style': 'width: 200px;'}), label='Item 5 Title', max_length=128)
    itemBody5 = forms.CharField(widget=forms.Textarea(attrs={'style': 'width: 200px; height:200px;'}), label='Body', max_length=1024)
    itemAlt5 = forms.CharField(widget=forms.TextInput(attrs={'class':'altbody', 'style': 'width: 200px;' }), label='Quote', max_length=1024)
    itemUri5 = forms.CharField(widget=forms.TextInput(attrs={'class':'uribody', 'style': 'width: 200px;'}), label='URL', max_length=256)




