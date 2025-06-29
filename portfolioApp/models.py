from django.db import models

# Create your models here.

class projects(models.Model):
    title = models.CharField(max_length=200, blank=False, null=False, unique=True)  
    description = models.TextField(blank=False, null=False)
    image = models.ImageField(upload_to='projects/', blank=False, null=False)
    technologies = models.ManyToManyField('Technologies', blank=False)
    link = models.URLField(blank=False, null=False)

    def __str__(self):
        return self.title

class technologies(models.Model):
    technology = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.technology


