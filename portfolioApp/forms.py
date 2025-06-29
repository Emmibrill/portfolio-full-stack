from django import forms

class contactForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        required=True,
        initial='',
        widget=forms.TextInput(attrs={'class': 'form_input', 'id': 'form_input'})
    )
    emailAddress = forms.EmailField(
        required=True,
        initial='',
        widget=forms.EmailInput(attrs={'class': 'form_input', 'id': 'form_input'})  
    )
    message = forms.CharField(
        required=True,
        initial='',
        widget=forms.Textarea(attrs={'class': 'form_input-message', 'rows': 4, 'columns': 5})
    )