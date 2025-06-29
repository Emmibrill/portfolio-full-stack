from django.urls import path
from . import views

urlpatterns = [
    path('display_even/', views.display_even, name='even-numbers'),
    #path('api/projects/', views.projects, name='portfolio-projects'),
    
    #path('api/projects/<int:pk>/', views.project_deatails, name='portfolio-detail'),
    #path('api/portfolio/<int:pk>/update/', views.PortfolioUpdateView.as_view(), name='portfolio-update'),
    #path('api/portfolio/<int:pk>/delete/', views.PortfolioDeleteView.as_view(), name='portfolio-delete'),
]