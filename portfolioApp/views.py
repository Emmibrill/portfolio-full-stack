from django.shortcuts import render
from portfolioApp.models import Projects
from portfolioApp.forms import contactForm
from django.shortcuts import redirect
from django.core.mail import send_mail
from django.conf import settings
from django.http import HttpResponseServerError

# Create your views here.

def home(request):
    context = {}
    return render(request, 'portfolioApp/home.html', context)

def about(request):
    context = {}
    return render(request, 'portfolioApp/about.html', context)

#def myProjects(request):
    #allProjects = Projects.objects.prefetch_related('technologies').all()
    #dict = {'projects': allProjects}
    #return render(request, 'portfolioApp/portfolio.html', dict) 

import logging

logger = logging.getLogger(__name__)

def myProjects(request):
    try:
        projects = Projects.objects.prefetch_related('technologies').all()
        return render(request, 'portfolioApp/portfolio.html', {"projects": projects})
    except Exception as e:
        logger.exception("Error loading projects page")
        return HttpResponseServerError("Internal Server Error")

def contact(request):
    if request.method == 'POST':
        form = contactForm(request.POST)
        if form.is_valid():
            #process the form data
            name = form.cleaned_data['name']
            email= form.cleaned_data['emailAddress']
            message = form.cleaned_data['message']


            subject = f'message from {name}',
            message = f'message: {message}\n\n from: {name} ({email})'

            #send the email
            send_mail(
                subject,
                message,
                email,
                [settings.CONTACT_EMAIL],

            )
            # Redirect to a thank-you page
            return redirect('portfolioApp/thank-you', name=name)
    else:
        form = contactForm()
    return render(request, 'portfolioApp/contact.html', {'form': form})
    

def thank_you(request, name):
    return render(request, 'portfolioApp/thank_you.html', {'name': name})


    