from django.db import models

# Create your models here.

class Task(models.Model):
    description=models.CharField(null=True,blank=True,max_length=500)
    done=models.BooleanField(default=False)
    title=models.CharField(max_length=200)
    created_at=models.DateTimeField(auto_now_add=True)
