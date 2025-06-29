#from django.shortcuts import render
from django.http import HttpResponse
#from .models import my_projects
#from .forms import myContactForm
#from django.core.mail import send_mail  # to make use of the sendemail function
#from django.conf import settings  # to access the settings file

# Create your views here.
def display_even(request):
    response = ''
    even_numbers = [1,2,3,4,5,6,7,8,9,10]
    for i in even_numbers:
        # Using modulo operator to check if the number is even
        remainder = i%2
        # If the remainder is 0, the number is even
        if remainder == 0:
            # If the number iseven, append it to the response string
            response += f'{i}<br>'
    return HttpResponse(f"Even numbers from 1 to 10: <br> {response}")
