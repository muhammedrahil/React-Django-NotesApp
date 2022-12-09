
from django.urls import path
from . import views as v
urlpatterns = [
  
    path('notes/',v.get_notes,name='notes'),
    path('notes/<str:pk>/',v.get_note,name='note'),
    
]
