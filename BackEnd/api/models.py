from django.db import models

# Create your models here.


class Note(models.Model):
  body = models.TextField(blank=True,null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  
  def __str__(self) -> str:
    return self.body[0:50]