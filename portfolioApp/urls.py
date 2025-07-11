from django.urls import path
from portfolioApp import views
from django.shortcuts import render
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('', views.home, name='home'),
    path('about-me/', views.about_me, name='about-me'),
    path('projects/', views.myProjects, name='projects'),
    path('contact/', views.contact, name='contact'),
    path('thank-you/<str:name>/', views.thank_you, name='thank-you'),
    path('test-email/', views.test_email_view),
    

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)