from django.db import models

# Create your models here.

class Projects(models.Model):
    title = models.CharField(max_length=200, blank=False, null=False, unique=True)  
    description = models.TextField(blank=False, null=False)
    image = models.ImageField(upload_to='projects/', blank=False, null=False)
    technologies = models.ManyToManyField('Technology', blank=False)
    link = models.URLField(blank=False, null=False, default="https://example.com")

    def __str__(self):
        return self.title

class Technology(models.Model):
    technology = models.CharField(max_length=100, unique=True, default='unknown')

    def __str__(self):
        return self.technology


