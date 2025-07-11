from django import forms

class contactForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        required=True,
        initial='',
       
    )
    emailAddress = forms.EmailField(
        required=True,
        initial='',
       
    )
    message = forms.CharField(
        required=True,
        initial='',
        widget=forms.Textarea(attrs={'rows': 4, 'columns': 5})
    )