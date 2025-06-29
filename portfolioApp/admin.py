from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from portfolioApp.models import Projects, Technology

# Register your models here.

admin.site.register(Technology)
admin.site.unregister(User)


#Register our custom user admin model using the @admin.register() decorator
@admin.register(User)

#make the date joined and last login readonly and only allow superuser to edit username
class customAdmin(UserAdmin):
    readonly_fields = [
        'date_joined', 'last_login'
    ]
    def get_form(self, request, obj = None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        is_superuser = request.user.is_superuser

        if not is_superuser:
            form.base_fields['username'].disabled = True
        return form

@admin.register(Projects)
class myProjects(admin.ModelAdmin):
     list_display = ('title', 'description',)
     search_fields = ('project_title__startswith',) 