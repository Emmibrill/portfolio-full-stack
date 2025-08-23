from django.apps import AppConfig
import os;


class PortfolioappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'portfolioApp'

    def ready(self):
        from django.contrib.auth import get_user_model
        User = get_user_model()

        username = os.getenv("DJANGO_SUPERUSER_USERNAME")
        email = os.getenv("DJANGO_SUPERUSER_EMAIL")
        password = os.getenv("DJANGO_SUPERUSER_PASSWORD")

        if username and password and not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username=username, email=email, password=password)
            print(f"Superuser '{username}' created ✅")
