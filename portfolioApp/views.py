from django.shortcuts import render
from portfolioApp.models import Projects
from portfolioApp.forms import contactForm
from django.shortcuts import redirect
from django.core.mail import send_mail
from django.conf import settings
from django.http import HttpResponseServerError
from django.http import HttpResponse

# Create your views here.

def home(request):
    context = {}
    return render(request, 'portfolioApp/home.html', context)

def about_me(request):
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
            name = form.cleaned_data['name']
            email = form.cleaned_data['emailAddress']
            message = form.cleaned_data['message']

            subject = f"Message from {name}"
            message_content = f"Message:\n{message}\n\nFrom: {name} <{email}>"

            # DEBUG: Print to terminal
            print("Contact form submitted")
            print("Subject:", subject)
            print("From:", email)
            print("To:", settings.CONTACT_EMAIL)
            print("Body:\n", message_content)

            try:
                send_mail(
                    subject,
                    message_content,
                    email,
                    [settings.CONTACT_EMAIL],
                )
                print("Email sent successfully")
            except Exception as e:
                print("Email sending failed:", e)

            return redirect('thank-you', name=name)  #redirect URL name
        else:
            # ✅ DEBUG: Show why form failed
            print("Form is invalid:", form.errors)
    else:
        form = contactForm()

    return render(request, 'portfolioApp/contact.html', {'form': form})

    

def thank_you(request, name):
    return render(request, 'portfolioApp/thank-you.html', {'name': name})


   

def test_email_view(request):
    send_mail(
        subject='Test Email',
        message='This is a test message.',
        from_email='test@example.com',
        recipient_list=['admin@example.com'],
    )
    return HttpResponse("✅ Email sent — check terminal.")

