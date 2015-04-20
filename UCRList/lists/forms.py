from django import forms
from .models import List

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit

from crispy_forms.bootstrap import AppendedText, PrependedText, FormActions

from collections import namedtuple

class AddListForm(forms.Form):
    def __init__(self, *args, **kwargs):
        self.number = n = kwargs.pop('number', 5)
        super(AddListForm, self).__init__(*args, **kwargs)

        self.helper = FormHelper()
        self.helper.post_method = 'post'
        self.helper.form_action = '/lists/'

        self.helper.add_input(Submit('submit', 'Submit List'))

        for i in range(1, n+1):
            for itemField in self.create_item_form(i):
                self.fields[itemField.name] = itemField.form

    listTitle = forms.CharField(widget=forms.TextInput(attrs={'style': 'width: 200px;'}), label='List Title', max_length=128)

    content_type = forms.ChoiceField(widget=forms.Select(), label='Content Type', choices=List.CONTENT_TYPE_CHOICES)

    helper = FormHelper()
    helper.form_class = 'form-horizontal'

    @staticmethod
    def create_item_form(i):
        itemTitleWidgetKwargs = {
            'attrs': {
                'style': 'width: 200px;',
            },
        }

        itemTitleKwargs = {
            'label': 'Item {0} title'.format(i),
            'max_length' : 128,
        }

        itemBodyWidgetKwargs = {
            'attrs': {
                'style': '''width: 200px;
                            height: 200px;''',
            },
        }

        itemBodyKwargs = {
            'label': 'Body',
            'max_length': 1024,
        }

        itemAltWidgetKwargs = {
            'attrs': {
                'style': 'width: 200px;',
                'class': 'altbody',
            },
        }

        itemAltKwargs = {
            'label': 'Quote',
            'max_length': 1024,
        }

        itemUriWidgetKwargs = {
            'attrs': {
                'style': 'width: 200px;',
                'class': 'uribody',
            },
        }

        itemUriKwargs = {
            'label': 'URL',
            'max_length': 256
        }

        titleForm = forms.CharField(widget=forms.TextInput(**itemTitleWidgetKwargs), **itemTitleKwargs)

        bodyForm = forms.CharField(widget=forms.Textarea(**itemBodyWidgetKwargs), **itemBodyKwargs)

        altForm = forms.CharField(widget=forms.TextInput(**itemAltWidgetKwargs), **itemAltKwargs)

        uriForm = forms.CharField(widget=forms.TextInput(**itemUriWidgetKwargs), **itemUriKwargs)

        ItemFieldForm = namedtuple('ItemFieldField', ['name', 'form'])

        title = ItemFieldForm('itemTitle_{0}'.format(i), titleForm)
        body = ItemFieldForm('itemBody_{0}'.format(i), bodyForm)
        alt = ItemFieldForm('itemAlt_{0}'.format(i), altForm)
        uri = ItemFieldForm('itemUri_{0}'.format(i), uriForm);

        return [title, body, alt, uri]
