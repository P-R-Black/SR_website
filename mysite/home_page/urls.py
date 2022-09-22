from django.urls import path
from . import views

app_name = 'home_page'
urlpatterns = [
    path('', views.home_page_view, name='home_page_view'),

]